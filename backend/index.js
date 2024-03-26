import express from "express";
import cors from "cors";
import "dotenv/config";
import postRoutes from "./routes/postRoutes.js";

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Desafio 3 backend app listening on port ${PORT}`);
});
