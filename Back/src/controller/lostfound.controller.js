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
      itemName,
      reporterName,
      reporterEmail,
      moderationStatus,
    } = req.body;

    // Validate required fields
    if (
      !status ||
      !location ||
      !date ||
      !category ||
      !description ||
      !imageUrl ||
      !itemName ||
      !reporterName ||
      !reporterEmail
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
      itemName,
      reporterName,
      reporterEmail,
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

export const getPendingReports = async (req, res, next) => {
  try {
    // Fetch all reports with moderationStatus set to "Pending"
    const pendingReports = await LostFound.find({
      moderationStatus: "Pending",
    });

    res.status(200).json(pendingReports);
  } catch (error) {
    console.error("Error fetching pending reports:", error); // Log the error
    res.status(500).json({ message: "Failed to fetch pending reports." });
  }
};

export const updateModerationStatus = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the report ID from the URL
    const { moderationStatus } = req.body; // Get the new moderation status from the request body

    // Validate the moderationStatus value
    if (!["Approved", "Rejected"].includes(moderationStatus)) {
      return res.status(400).json({ error: "Invalid moderation status." });
    }

    // Find the report by ID and update its moderationStatus
    const updatedReport = await LostFound.findByIdAndUpdate(
      id,
      { moderationStatus },
      { new: true } // Return the updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found." });
    }

    res.status(200).json({
      message: `Report has been ${moderationStatus.toLowerCase()}.`,
      updatedReport,
    });
  } catch (error) {
    console.error("Error updating moderation status:", error); // Log the error
    res.status(500).json({ message: "Failed to update moderation status." });
  }
};
