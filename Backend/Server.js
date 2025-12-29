import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/movieRoute.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
console.log("TMDB KEY:", process.env.TMDB_API_KEY); // 👈 now it will print
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/movies", router);

const PORT = process.env.PORT || 5000;
//mongoose connected
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`server is running Port ${PORT}`);
});
