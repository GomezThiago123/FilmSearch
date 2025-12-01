import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { searchInTMDb } from "./services/tmdbService.js";

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors()); // <-- habilita CORS para todas las rutas

app.get("/api/movies/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Se necesita un query" });

  try {
    const data = await searchInTMDb(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error en la búsqueda" });
  }
});

app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));

import { getWatchProviders } from "./services/tmdbService.js";

app.get("/api/movies/:id/providers", async (req, res) => {
  const { id } = req.params;
  const { type = "movie" } = req.query; // 'movie' o 'tv'

  try {
    const providers = await getWatchProviders(id, type);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener plataformas" });
  }
});
