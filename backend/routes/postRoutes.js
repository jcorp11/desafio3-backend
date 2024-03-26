import express from "express";
import { postModel } from "../models/like.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await postModel.findAll();
  return res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const { titulo, img, descripcion } = req.body;
  const post = { titulo, img, descripcion };
  await postModel.create(post);
  return res.status(201).json(post);
});

router.put("/like/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postModel.like(id);
  return res.status(200).json(post);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await postModel.remove(id);
  return res.status(200).json(post);
});

export default router;
