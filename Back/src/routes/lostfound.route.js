import express from "express";
import {
  createLostFound,
  getPendingReports,
  updateModerationStatus,
} from "../controller/lostfound.controller.js";
import LostFound from "../model/lostfound.model.js"; // Import the LostFound model

const router = express.Router();

// Route to create a lost/found entry
router.post("/", createLostFound);

// Route to fetch pending lost/found reports
router.get("/pending", getPendingReports);

// Route to update the moderation status of a report
router.patch("/:id/moderation", updateModerationStatus);

// Route to approve a report
router.patch("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReport = await LostFound.findByIdAndUpdate(
      id,
      { moderationStatus: "Approved" },
      { new: true } // Return the updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found." });
    }

    res
      .status(200)
      .json({ message: "Report approved successfully.", updatedReport });
  } catch (error) {
    console.error("Error approving report:", error);
    res.status(500).json({ message: "Failed to approve report." });
  }
});

// Route to reject a report
router.patch("/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReport = await LostFound.findByIdAndUpdate(
      id,
      { moderationStatus: "Rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found." });
    }

    res
      .status(200)
      .json({ message: "Report rejected successfully.", updatedReport });
  } catch (error) {
    console.error("Error rejecting report:", error);
    res.status(500).json({ message: "Failed to reject report." });
  }
});

// Route to fetch approved lost/found reports
router.get("/approved", async (req, res) => {
  try {
    // Fetch all reports with moderationStatus set to "Approved"
    const approvedReports = await LostFound.find({
      moderationStatus: "Approved",
    });

    res.status(200).json(approvedReports);
  } catch (error) {
    console.error("Error fetching approved reports:", error);
    res.status(500).json({ message: "Failed to fetch approved reports." });
  }
});

export default router;
