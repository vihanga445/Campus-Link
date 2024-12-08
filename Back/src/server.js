import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';


dotenv.config();
const app = express(); // create express app instance that will handle all the incoming HTTP requests.

// Middleware
app.use(cors()); // handle middleware for all incoming requests. allows handling handle requests from different oringins
app.use(express.json());// this makes the data available in req.body

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
  .connect("mongodb+srv://project:114456@finalproject.mfuor.mongodb.net/?retryWrites=true&w=majority&appName=finalProject")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Routes
app.use('/Back/auth',authRoutes);
