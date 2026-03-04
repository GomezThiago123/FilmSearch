import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail"; // 👈 IMPORTAR

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/series/:id" element={<SeriesDetail />} /> {/* 👈 AGREGAR */}
      </Routes>
    </BrowserRouter>
  );
}
