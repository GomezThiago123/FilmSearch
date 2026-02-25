import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState([]); // nuevo estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieAndProviders = async () => {
      try {
        // obtener info de la película
        const movieRes = await axios.get(
          `http://localhost:4000/api/movies/${id}`
        );
        setMovie(movieRes.data);

        // obtener plataformas de streaming
        const providersRes = await axios.get(
          `http://localhost:4000/api/movies/${id}/providers`
        );
        setProviders(providersRes.data || []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la película o sus plataformas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndProviders();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const posterBase = "https://image.tmdb.org/t/p/w500";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h1>

      <img
        src={
          movie.poster_path
            ? posterBase + movie.poster_path
            : "https://via.placeholder.com/400x600?text=Sin+imagen"
        }
        alt={movie.title}
        style={{
          width: "300px",
          borderRadius: "10px",
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      />

      <p style={{ marginTop: "15px" }}>
        {movie.overview || "Sin descripción disponible."}
      </p>

      <h3 style={{ marginTop: "30px" }}>Dónde verla</h3>

      {providers.length > 0 ? (
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {providers.map((p) => (
            <div
              key={p.provider_name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                alt={p.provider_name}
                title={p.provider_name}
                style={{
                  borderRadius: "8px",
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  backgroundColor: "white",
                  padding: "5px",
                }}
              />
              <span style={{ marginTop: "5px", fontSize: "14px" }}>
                {p.provider_name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "gray" }}>
          No hay plataformas disponibles para Argentina.
        </p>
      )}
    </div>
  );
}