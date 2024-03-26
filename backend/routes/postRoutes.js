import express from "express";
import { postModel } from "../models/like.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const { titulo, img, descripcion } = req.body;
  if (!titulo || !img) {
    return res.status(400).json({ message: "Missing data" });
  }
  const newPost = { titulo, img, descripcion };
  try {
    await postModel.create(newPost);
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/like/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.like(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.remove(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
