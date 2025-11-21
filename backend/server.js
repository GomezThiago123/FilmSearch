import express from "express";
import cors from "cors";
import moviesRoutes from "./routes/movies.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);

app.listen(4000, () => console.log("Backend corriendo en puerto 4000"));
