import { pool } from "../database/conection.js";

const findAll = async () => {
  const query = "SELECT * FROM posts";
  const { rows } = await pool.query(query);
  return rows;
};
const create = async (post) => {
  console.log("creando post", post);
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [
    post.titulo,
    post.img,
    post.descripcion,
    0,
  ]);
  return rows[0];
};

export const postModel = {
  findAll,
  create,
};
