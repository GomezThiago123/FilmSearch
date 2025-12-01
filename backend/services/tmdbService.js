import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function searchInTMDb(query) {
  const url = `https://api.themoviedb.org/3/search/movie`;

  try {
    const { data } = await axios.get(url, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
        include_adult: false,
        language: "es-ES",
        page: 1,
      },
    });

    return data;
  } catch (err) {
    console.error("Error en TMDb:", err.response?.data || err.message);
    return { results: [] };
  }
}

export async function getWatchProviders(id, type = "movie") {
  const url = `https://api.themoviedb.org/3/${type}/${id}/watch/providers`;

  try {
    const { data } = await axios.get(url, {
      params: { api_key: process.env.TMDB_API_KEY },
    });

    // Solo proveedores de España, por ejemplo
    return data.results?.ES?.flatrate || []; // array de providers
  } catch (err) {
    console.error("Error al obtener providers:", err.message);
    return [];
  }
}
