import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import moviesRoutes from "./routes/movies.js";

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

//  todas las rutas de películas
app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));