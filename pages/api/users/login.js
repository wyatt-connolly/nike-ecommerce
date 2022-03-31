import nc from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import config from "../../../lib/config";
import { signToken } from "../../../lib/auth";
import client from "../../../lib/sanity";

const handler = nc();

handler.post(async (req, res) => {
  const query = `*[_type == "user" && email == $email]`;
  const param = {
    email: req.body.email,
  };
  if (user && bcrypt.compareAsync(req.body.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.send();
  }
  const user = await client.fetch(query, param);
  res.send({ ...user, token });
});

export default handler;
