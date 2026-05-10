import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav style={styles.nav}>
      <span style={styles.brand} onClick={() => navigate("/")}>
        FilmSearch
      </span>
      {!isHome && (
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ← Volver
        </button>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  },
  brand: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    color: "#e94560",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #e94560",
    color: "#e94560",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};
