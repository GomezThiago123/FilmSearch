import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const posterBase = "https://image.tmdb.org/t/p/w500";

  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;
  const year = date ? date.slice(0, 4) : "----";

  const handleClick = () => {
    if (movie.media_type === "tv") {
      navigate(`/series/${movie.id}`);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
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
        alt={title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <div style={{ padding: "10px", backgroundColor: "#fff" }}>
        <h3>
          {title} ({year})
        </h3>
        <p>{movie.vote_average} ⭐</p>
      </div>
    </div>
  );
}