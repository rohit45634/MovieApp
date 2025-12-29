import express from "express";
import {
  addMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getCurrentUser,
  getMovieById,
  searchMovie,
  sortMovies,
} from "../Controllers/movieController.js";
import storeMovie from "../Controllers/storeMovie.js";
import isAuth from "../middleware/isuserAuth.js";
import isAdmin from "../middleware/isadmin.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/", isAuth, getAllMovies);
router.get("/search", isAuth, searchMovie);
router.get("/sorted", isAuth, sortMovies);

router.post("/seed", storeMovie);
router.get("/:id", isAuth, getMovieById);

router.post("/", isAuth, isAdmin, addMovie);
router.put("/:id", isAuth, isAdmin, editMovie);
router.delete("/:id", isAuth, isAdmin, deleteMovie);

export default router;
