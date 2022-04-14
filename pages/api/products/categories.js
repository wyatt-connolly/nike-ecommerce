import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const categories = ["Classics", "Running", "Lifestyle"];
  res.send(categories);
});

export default handler;
