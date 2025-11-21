import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function searchInTMDb(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url);
    return data; // devuelve { results: [...] }
  } catch (err) {
    console.error("Error en TMDb:", err.response?.data || err.message);
    return { results: [] }; // fallback seguro
  }
}
