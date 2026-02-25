import axios from "axios";
import { getWatchProviders } from "../services/tmdbService.js";

//Buscar películas
export const searchMovie = async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: q,
          language: "es-ES",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al buscar:", error.message);
    res.status(500).json({ error: "Error al buscar película" });
  }
};

//Obtener una película por ID
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "es-ES",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener película:", error.message);
    res.status(500).json({ error: "Error al obtener película" });
  }
};

// Obtener plataformas (Netflix, Disney+, etc.)
export const getMovieProviders = async (req, res) => {
  const { id } = req.params;
  try {
    const providers = await getWatchProviders(id);
    res.json(providers);
  } catch (error) {
    console.error("Error al obtener plataformas:", error.message);
    res.status(500).json({ error: "Error al obtener plataformas" });
  }
};