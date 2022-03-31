import nc from "next-connect";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";
import client from "../../../lib/sanity";

const handler = nc();

handler.post(async (req, res) => {
  const query = `*[_type == "user" && email == $email][0]`;
  const param = {
    email: req.body.email,
  };
  const user = await client.fetch(query, param);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.send(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
