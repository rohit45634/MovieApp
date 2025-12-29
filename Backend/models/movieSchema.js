import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: {
      type: Number,
      unique: true,
      sparse: true, //
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "No description available",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: Date,
    },
  },

  { timestamps: true }
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
