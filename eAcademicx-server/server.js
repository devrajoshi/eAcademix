import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/index.js";

dotenv.config(); // Load the environment variables from .env file
const app = express(); // Create an instance of express app

// Middleware
app.use(cors());
app.use(express.json()); // to parse json bodies

// Connect to database
connectDb();

// Add routes here
app.use("/api", router);

// Define a port to listen to
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
