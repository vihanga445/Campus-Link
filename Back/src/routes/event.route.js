import express from "express";
import Event from "../model/event.model.js";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch events from MongoDB
    res.json(events); // Return events as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Add a new event (optional)
router.post("/", async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // Create a new event
    const newEvent = new Event({ title, date, description });
    await newEvent.save();

    res.status(201).json(newEvent); // Return the created event
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
});

export default router;
