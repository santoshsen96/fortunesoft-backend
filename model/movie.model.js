import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  backdrop: { type: String },
  cast: { type: [String] },
  classification: { type: String },
   director: {
    type: mongoose.Schema.Types.Mixed,
    set: (value) => {
      // Convert array → comma-separated string
      if (Array.isArray(value)) return value.join(", ");
      return value;
    },
  },
  genres: { type: [String] },
  id: { type: String, required: true, unique: true },
  imdb_rating: { type: Number },
  length: { type: String },
  overview: { type: String },
  poster: { type: String },
  released_on: { type: Date },
  slug: { type: String },
  title: { type: String, required: true }
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
