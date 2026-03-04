import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      // Buscar películas
      const moviesRes = await axios.get(
        `http://localhost:4000/api/movies/search?q=${query}`
      );

      // Buscar series
      const seriesRes = await axios.get(
        `http://localhost:4000/api/series/search?query=${query}`
      );

      // Unir resultados
      const movies = moviesRes.data.results.map((m) => ({
        ...m,
        media_type: "movie",
      }));

      const series = seriesRes.data.results.map((s) => ({
        ...s,
        media_type: "tv",
      }));

      setResults([...movies, ...series]);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al buscar contenido.");
      setResults([]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>FilmSearch</h1>

      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película o serie..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "5px" }}>
          Buscar
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "15px",
          justifyItems: "center"
        }}
      >
        {results.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}