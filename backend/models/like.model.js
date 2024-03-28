import { pool } from "../database/conection.js";

const findAll = async () => {
  console.log("obteniendo posts");

  const query = "SELECT * FROM posts ORDER BY id ASC";
  const { rows } = await pool.query(query);
  return rows;
};
const create = async (post) => {
  console.log("creando post");
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [
    post.titulo,
    post.img,
    post.descripcion,
    0,
  ]);
  console.log("post creado", rows[0]);
  return rows[0];
};

const like = async (id) => {
  console.log("likeando post");
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  console.log("post likeado", rows[0]);
  return rows[0];
};

const remove = async (id) => {
  console.log("borrando post");
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  console.log("post borrado", rows[0]);
  return rows[0];
};

export const postModel = {
  findAll,
  create,
  like,
  remove,
};
