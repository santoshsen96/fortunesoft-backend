import express from "express";
import fs from "fs";
import movieModel from "../model/movie.model.js";
import authenticate from "../middleware/auth.middleware.js";
const movieRouter = express.Router();


movieRouter.post("/post", async (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync("movie.json", "utf-8"));

    if (!movies || movies.length === 0) {
      return res.status(400).json({ message: "No movie data found in JSON file" });
    }

    // 🧹 Clean _id field
    const cleanMovies = movies.map(movie => {
      const m = { ...movie };
      if (m._id && m._id.$oid) {
        m._id = m._id.$oid; 
      }
      return m;
    });

    await movieModel.insertMany(cleanMovies);

    res.status(201).json({
      message: "🎬 All movies inserted successfully",
      count: cleanMovies.length,
    });
  } catch (error) {
    console.error("Error inserting movies:", error.message);
    res.status(500).json({ message: "Server error while inserting movies" });
  }
});


movieRouter.get("/", authenticate, async (req, res) => {
  try {
    // Fetch all movies
    const movies = await movieModel.find();

    // Group movies by genre
    const grouped = {};

    movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!grouped[genre]) {
          grouped[genre] = [];
        }

        grouped[genre].push({
          director: movie.director,
          imdb_rating: movie.imdb_rating,
          length: movie.length,
          poster: movie.poster,
          title: movie.title,
          slug: movie.slug,
        });
      });
    });

    // Convert object to array format
    const formatted = Object.keys(grouped).map((genre) => ({
      category: genre,
      movies: grouped[genre],
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Server error while fetching movies" });
  }
});

export default movieRouter;
