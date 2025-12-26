import axios from "axios";
import Movie from "../models/movieSchema.js";

const storeMovie = async (req, res) => {
  try {
    for (let page = 1; page <= 13; page++) {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            page: page,
          },
        }
      );

      for (let m of response.data.results) {
        const exists = await Movie.findOne({ tmdbId: m.id });
        if (!exists) {
          await Movie.create({
            tmdbId: m.id,
            title: m.title,
            description: m.overview,
            rating: m.vote_average,
            releaseDate: m.release_date,
            posterPath: m.poster_path,
          });
        }
      }
    }

    res.json({ message: "250 movies saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "TMDB fetch failed" });
  }
};

export default storeMovie;
