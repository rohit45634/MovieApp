import Movie from "../models/movieSchema.js";
import User from "../models/userSchema.js";

// USER: fetch movies
export const getAllMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10; // movies per page
    const skip = (page - 1) * limit;

    const movies = await Movie.find().skip(skip).limit(limit);

    const totalMovies = await Movie.countDocuments();

    res.json({
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

export const sortMovies = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "title";
    const order = req.query.order === "desc" ? -1 : 1;

    const allowedFields = ["title", "rating", "releaseDate", "duration"];

    if (!allowedFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid sort field" });
    }

    const movies = await Movie.find().sort({ [sortBy]: order });

    res.status(200).json({
      movies,
      totalPages: 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Sorting failed" });
  }
};

//search movie
export const searchMovie = async (req, res) => {
  const keyword = req.query.keyword || "";

  const movie = await Movie.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  });
  res.json(movie);
};

// ADMIN: add
export const addMovie = async (req, res) => {
  try {
    console.log(req.body);
    const movie = new Movie(req.body);
    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Movie not added" });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie" });
  }
};

export const editMovie = async (req, res) => {
  try {
    console.log("EDIT BODY:", req.body); // 👈 ADD THIS

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: "Edit failed" });
  }
};

//delete movie
export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movies deleted" });
};
