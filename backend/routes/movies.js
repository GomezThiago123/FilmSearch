import express from "express";
import { searchMovie, getMovieById } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/search", searchMovie);
router.get("/:id", getMovieById); // 👈 PARA /api/movies/50

export default router;
