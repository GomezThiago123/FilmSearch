import axios from "axios";

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
    res.status(500).json({ error: "Error al buscar película" });
  }
};

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
    res.status(500).json({ error: "Error al obtener la película" });
  }
};
