import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import CORS from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoute.js";
import catergoryRoutes from "./Routes/categoryRoute.js";
const app = express();

// config env file

dotenv.config();

// database config
connectDB();

// Middlwares
app.use(express.json());
app.use(CORS());
app.use(morgan("dev"));

// APIS
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", catergoryRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "I am Shivani",
  });
});
const PORT = process.env.PORT || 6060;

// PW - iHVqxvtSB0T4URzy
// atlas - mongodb+srv://patil31shivani:iHVqxvtSB0T4URzy@mean-app.2sk3u2a.mongodb.net/?retryWrites=true&w=majority&appName=MEAN-APP

// app.listen(`App listen on {$PORT}`);
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.DEV_MODE} mode on  ${PORT}`);
});
