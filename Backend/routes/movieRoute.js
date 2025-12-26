import express from "express";
import {
  addMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getMovieById,
  searchMovie,
  sortMovies,
} from "../Controllers/movieController.js";
import storeMovie from "../Controllers/storeMovie.js";
import isAuth from "../middleware/isuserAuth.js";
import isAdmin from "../middleware/isadmin.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/search", searchMovie);
router.get("/sorted", sortMovies);

router.post("/seed", storeMovie);
router.get("/:id", getMovieById);

router.post("/", isAuth, isAdmin, addMovie);
router.patch("/:id", isAuth, isAdmin, editMovie);
router.delete("/:id", isAuth, isAdmin, deleteMovie);

export default router;
