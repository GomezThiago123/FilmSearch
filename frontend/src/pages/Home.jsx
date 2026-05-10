import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/moviesService";
import { getPopularSeries, searchSeries } from "../services/seriesService.jsx";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          getPopularMovies(),
          getPopularSeries(),
        ]);
        const movies = moviesRes.data.results.map((m) => ({
          ...m,
          media_type: "movie",
        }));
        const series = seriesRes.data.results.map((s) => ({
          ...s,
          media_type: "tv",
        }));
        setResults([...movies, ...series]);
      } catch {
        setError("No se pudo cargar el contenido popular.");
      } finally {
        setLoading(false);
      }
    };
    loadPopular();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const [moviesRes, seriesRes] = await Promise.all([
        searchMovies(query),
        searchSeries(query),
      ]);
      const movies = moviesRes.data.results.map((m) => ({
        ...m,
        media_type: "movie",
      }));
      const series = seriesRes.data.results.map((s) => ({
        ...s,
        media_type: "tv",
      }));
      setResults([...movies, ...series]);
    } catch {
      setError("Error al buscar contenido.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setLoading(true);
    setError("");
    Promise.all([getPopularMovies(), getPopularSeries()])
      .then(([moviesRes, seriesRes]) => {
        const movies = moviesRes.data.results.map((m) => ({ ...m, media_type: "movie" }));
        const series = seriesRes.data.results.map((s) => ({ ...s, media_type: "tv" }));
        setResults([...movies, ...series]);
      })
      .catch(() => setError("No se pudo cargar el contenido popular."))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película o serie..."
          style={styles.input}
        />
        <button type="submit" style={styles.btnSearch}>Buscar</button>
        {query && (
          <button type="button" onClick={handleClear} style={styles.btnClear}>
            ✕
          </button>
        )}
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: "center", color: "#666" }}>Cargando...</p>
      ) : (
        <>
          <h2 style={styles.sectionTitle}>
            {query ? `Resultados para "${query}"` : "Populares ahora"}
          </h2>
          {results.length === 0 && (
            <p style={{ textAlign: "center", color: "#666" }}>Sin resultados.</p>
          )}
          <div style={styles.grid}>
            {results.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  input: {
    padding: "10px 14px",
    width: "320px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  btnSearch: {
    padding: "10px 18px",
    backgroundColor: "#e94560",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  btnClear: {
    padding: "10px 12px",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#666",
  },
  sectionTitle: {
    marginBottom: "16px",
    fontSize: "1.2rem",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
    justifyItems: "center",
  },
};
