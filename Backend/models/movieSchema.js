import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, unique: true },

    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: Date,
    },
    posterPath: { type: String },
  },

  { timestamps: true }
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
