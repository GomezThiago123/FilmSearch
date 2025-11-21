import { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/movies/search?q=${query}`);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f0f0f0" }}>
      <h1>FilmSearch</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película o serie..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>Buscar</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ marginBottom: "15px", padding: "10px", background: "#fff", borderRadius: "8px" }}>
            <h2>{movie.title} ({movie.release_date?.slice(0,4)})</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
