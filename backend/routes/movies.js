import express from "express";
import { searchMovie } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/search", searchMovie);

export default router;











