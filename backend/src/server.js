import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "BeyondChats Backend is running 🚀" });
});

// Article routes
app.use("/api/articles", articleRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
