import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/movies/${id}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la película");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{movie.title} ({movie.releaseYear})</h1>

      <p style={{ marginTop: "15px" }}>
        {movie.overview || "Sin descripción disponible."}
      </p>

      <h3 style={{ marginTop: "30px" }}>Dónde verla</h3>

      {movie.providers?.flatrate ? (
        <ul>
          {movie.providers.flatrate.map((p) => (
            <li key={p.provider_id}>{p.provider_name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay plataformas disponibles para Argentina.</p>
      )}
    </div>
  );
}
///ucducbuc