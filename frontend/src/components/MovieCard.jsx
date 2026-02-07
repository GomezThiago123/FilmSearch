import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const posterBase = "https://image.tmdb.org/t/p/w500";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        margin: "10px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        cursor: "pointer"
      }}
    >
      <img
        src={
          movie.poster_path
            ? posterBase + movie.poster_path
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <div style={{ padding: "10px", backgroundColor: "#fff" }}>
        <h3>
          {movie.title} ({movie.release_date?.slice(0, 4)})
        </h3>
        <p>{movie.vote_average} ⭐</p>
      </div>
    </div>
  );
}
