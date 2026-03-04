import axios from "axios";

const API = "http://localhost:4000/api/series";

export const getPopularSeries = () => axios.get(`${API}/popular`);

export const getSeriesById = (id) => axios.get(`${API}/${id}`);

export const searchSeries = (query) =>
  axios.get(`${API}/search?query=${query}`);