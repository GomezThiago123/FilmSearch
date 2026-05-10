import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeriesById } from "../services/seriesService.jsx";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const LOGO_BASE = "https://image.tmdb.org/t/p/w200";
const PLACEHOLDER = "https://placehold.co/300x450?text=Sin+imagen";

export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getSeriesById(id);
        setSeries(res.data.series || res.data);
        setProviders(res.data.providers || null);
      } catch {
        setError("No se pudo cargar la serie.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p style={styles.centered}>Cargando...</p>;
  if (error) return <p style={{ ...styles.centered, color: "red" }}>{error}</p>;
  if (!series) return null;

  const title = series.name;
  const year = series.first_air_date ? series.first_air_date.slice(0, 4) : "----";

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <img
          src={series.poster_path ? POSTER_BASE + series.poster_path : PLACEHOLDER}
          alt={title}
          style={styles.poster}
        />
        <div style={styles.info}>
          <h1 style={styles.title}>
            {title} <span style={styles.year}>({year})</span>
          </h1>
          <p style={styles.rating}>⭐ {series.vote_average?.toFixed(1)}</p>
          <p style={styles.overview}>{series.overview || "Sin descripción disponible."}</p>

          <h3 style={styles.subtitle}>Plataformas</h3>
          {providers?.flatrate?.length > 0 ? (
            <div style={styles.providers}>
              {providers.flatrate.map((p) => (
                <div key={p.provider_id} style={styles.providerItem}>
                  <img
                    src={`${LOGO_BASE}${p.logo_path}`}
                    alt={p.provider_name}
                    title={p.provider_name}
                    style={styles.logo}
                  />
                  <span style={styles.providerName}>{p.provider_name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#888" }}>No disponible en streaming para Argentina.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  centered: { textAlign: "center", marginTop: "40px" },
  container: { padding: "24px", maxWidth: "900px", margin: "0 auto" },
  hero: { display: "flex", gap: "32px", flexWrap: "wrap" },
  poster: {
    width: "260px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
    flexShrink: 0,
  },
  info: { flex: 1, minWidth: "240px" },
  title: { fontSize: "1.8rem", margin: "0 0 8px" },
  year: { color: "#888", fontWeight: "normal", fontSize: "1.2rem" },
  rating: { fontSize: "1.1rem", margin: "0 0 16px" },
  overview: { lineHeight: "1.7", color: "#444" },
  subtitle: { marginTop: "28px", marginBottom: "12px" },
  providers: { display: "flex", gap: "16px", flexWrap: "wrap" },
  providerItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  logo: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "contain",
    backgroundColor: "#fff",
    padding: "4px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  providerName: { marginTop: "6px", fontSize: "12px", color: "#555" },
};
