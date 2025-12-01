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
