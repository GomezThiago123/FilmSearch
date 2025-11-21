import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function searchInTMDb(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`;
  const { data } = await axios.get(url);
  return data;
}
