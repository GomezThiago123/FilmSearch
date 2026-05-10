import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/movies`;

export const getPopularMovies = () => axios.get(`${API}/popular`);
export const searchMovies = (q) => axios.get(`${API}/search?q=${q}`);
export const getMovieById = (id) => axios.get(`${API}/${id}`);
export const getMoviePlatforms = (id) => axios.get(`${API}/${id}/platforms`);
export const listMovies = (page = 1, genre) => {
  const params = { page };
  if (genre) params.genre = genre;
  return axios.get(API, { params });
};
