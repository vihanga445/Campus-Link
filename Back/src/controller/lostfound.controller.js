import LostFound from "../model/lostfound.model.js";

export const createLostFound = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Log the incoming request body

    const {
      status,
      location,
      date,
      category,
      description,
      imageUrl,
      moderationStatus,
    } = req.body;

    // Validate required fields
    if (
      !status ||
      !location ||
      !date ||
      !category ||
      !description ||
      !imageUrl
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new lost/found entry
    const lostFound = new LostFound({
      status,
      location,
      date,
      category,
      description,
      imageUrl,
      moderationStatus: moderationStatus || "Pending", // Default to "Pending" if not provided
    });

    // Save to the database
    await lostFound.save();

    res
      .status(201)
      .json({ message: "Lost/Found entry created successfully.", lostFound });
  } catch (error) {
    console.error("Error in createLostFound:", error); // Log the error
    next(error); // Pass errors to the error-handling middleware
  }
};
