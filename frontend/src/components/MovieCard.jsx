// src/components/MovieCard.jsx
import React from "react";

export default function MovieCard({ movie }) {
  const posterBase = "https://image.tmdb.org/t/p/w500";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        margin: "10px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        transition: "transform 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src={movie.poster_path ? posterBase + movie.poster_path : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={movie.title}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <div style={{ padding: "10px", backgroundColor: "#fff", flexGrow: 1 }}>
        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 5px 0" }}>
          {movie.title} ({movie.release_date?.slice(0, 4)})
        </h2>
        <p style={{ fontSize: "14px", color: "#555", height: "60px", overflow: "hidden" }}>
          {movie.overview || "Sin sinopsis disponible."}
        </p>
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginTop: "5px" }}>
           {movie.vote_average} ({movie.vote_count} votos)
        </p>
      </div>
    </div>
  );
}
