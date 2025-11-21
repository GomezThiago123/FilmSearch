import { searchInTMDb } from "../services/tmdbService.js";

export async function searchMovie(req, res) {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Se necesita un query" });

  try {
    const data = await searchInTMDb(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
