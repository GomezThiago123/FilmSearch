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
      const res = await axios.get(
        `http://localhost:4000/api/movies/search?q=${query}`
      );
      setResults(res.data.results);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al buscar películas.");
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
          placeholder="Buscar película..."
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
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
