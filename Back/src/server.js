import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config.js";

// Import routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import eventRoutes from "./routes/event.route.js";
import inviteRoutes from "./routes/invite.route.js";
import clubRoutes from "./routes/club.route.js";

const app = express();

// Middleware
app.use(cors()); // Allow requests from client
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Adds security headers
app.use(morgan("dev")); // Logs HTTP requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Routes
app.use("/Back/auth", authRoutes);
app.use("/Back/user", userRoutes);
app.use("/Back/post", postRoutes);
app.use("/Back/events", eventRoutes); // Event routes
app.use("/Back/invite", inviteRoutes);
app.use("/Back/clubs", clubRoutes);

// 404 Error handler for unhandled routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack); // Log stack trace for development
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
