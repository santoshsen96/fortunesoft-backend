import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  connectDB  from "./db.js";
import movieRouter from "./routes/movie.route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/movies", movieRouter);

app.listen(process.env.port, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${process.env.port}`);
  } catch (err) {
    console.error("Something went wrong:", err);
  }
});
