import express from "express";
import cors from "cors";
import "dotenv/config";
import { postModel } from "./models/like.model.js";

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const posts = await postModel.findAll();
  return res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  //   console.log(req.body);
  const { titulo, img, descripcion } = req.body;
  const post = { titulo, img, descripcion };
  await postModel.create(post);
  return res.status(201).json(post);
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postModel.like(id);
  return res.status(200).json(post);
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postModel.remove(id);
  return res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Desafio 3 backend app listening on port ${PORT}`);
});
