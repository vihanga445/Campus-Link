import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import eventRoutes from "./routes/event.route.js"; // Import the event routes
import inviteRoutes from "./routes/invite.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
// Log the environment variables
console.log("EMAIL_USER:", process.env.EMAIL_USER); // Check if EMAIL_USER is loaded
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); // Check if EMAIL_PASS is loaded
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Sample route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://project:114456@finalproject.mfuor.mongodb.net/?retryWrites=true&w=majority&appName=finalProject"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/Back/auth", authRoutes);
app.use("/Back/user", userRoutes);
app.use("/Back/post", postRoutes);
app.use("/Back/events", eventRoutes); // Use the event routes
app.use("/Back/invite", inviteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
