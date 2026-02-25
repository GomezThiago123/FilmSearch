import express from "express";
import {
  searchMovie,
  getMovieById,
  getMovieProviders,
} from "../controllers/moviesController.js";

const router = express.Router();

// rutas
router.get("/search", searchMovie);          // /api/movies/search?q=batman
router.get("/:id", getMovieById);            // /api/movies/550
router.get("/:id/providers", getMovieProviders); // /api/movies/550/providers

export default router;