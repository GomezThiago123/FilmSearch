import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/series/${id}`
        );

        // Compatible con cualquier estructura
        setSeries(res.data.series || res.data);
        setProviders(res.data.providers || null);

      } catch (error) {
        console.error("Error al cargar la serie:", error);
      }
    };

    fetchSeries();
  }, [id]);

  if (!series) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  const posterBase = "https://image.tmdb.org/t/p/w500";
  const logoBase = "https://image.tmdb.org/t/p/w200";

  const title = series.name;
  const year = series.first_air_date
    ? series.first_air_date.slice(0, 4)
    : "----";

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      
      <h1 style={{ marginBottom: "20px" }}>
        {title} ({year})
      </h1>

      <img
        src={
          series.poster_path
            ? posterBase + series.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        style={{
          width: "300px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
        }}
      />

      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        {series.overview}
      </p>

      <h3 style={{ marginTop: "20px" }}>
        ⭐ {series.vote_average}
      </h3>

      <h3 style={{ marginTop: "25px" }}>Plataformas:</h3>

      {providers?.flatrate ? (
        <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          {providers.flatrate.map((p) => (
            <img
              key={p.provider_id}
              src={`${logoBase}${p.logo_path}`}
              alt={p.provider_name}
              title={p.provider_name}
              style={{
                width: "55px",
                borderRadius: "10px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)"
              }}
            />
          ))}
        </div>
      ) : (
        <p>No disponible en streaming</p>
      )}

    </div>
  );
}