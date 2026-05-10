import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularSeries } from "../services/seriesService.jsx";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPopularSeries()
      .then((res) =>
        setSeries(res.data.results.map((s) => ({ ...s, media_type: "tv" })))
      )
      .catch(() => setError("No se pudieron cargar las series."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Series Populares</h2>
      <div style={styles.grid}>
        {series.map((s) => (
          <MovieCard key={s.id} movie={s} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
    justifyItems: "center",
  },
};
