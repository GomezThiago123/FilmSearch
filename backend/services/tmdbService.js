import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// 🔹 Obtener plataformas de streaming
export async function getWatchProviders(id, type = "movie") {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/${id}/watch/providers`,
      {
        params: { api_key: API_KEY },
      }
    );
    return data.results?.AR?.flatrate || [];
  } catch (err) {
    console.error("Error al obtener providers:", err.message);
    return [];
  }
}