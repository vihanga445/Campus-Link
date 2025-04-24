import express from "express";
import {
  createLostFound,
  getPendingReports,
  updateModerationStatus,
  sendEmailNotification,
} from "../controller/lostfound.controller.js";
import LostFound from "../model/lostfound.model.js"; // Import the LostFound model
import nodemailer from "nodemailer";

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
    const { rejectionReason } = req.body; // Get the rejection reason from the request body

    if (!rejectionReason) {
      return res.status(400).json({ error: "Rejection reason is required." });
    }

    // Update the report's moderation status to "Rejected"
    const updatedReport = await LostFound.findByIdAndUpdate(
      id,
      { moderationStatus: "Rejected" },
      { new: true } // Return the updated document
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found." });
    }

    // Send an email to the reporter with the rejection reason
    const { reporterEmail, reporterName, itemName } = updatedReport;

    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reporterEmail,
      subject: `Your Lost/Found Report for "${itemName}" Has Been Rejected`,
      html: `
        <h3>Hello ${reporterName},</h3>
        <p>We regret to inform you that your lost/found report for the item <strong>${itemName}</strong> has been rejected.</p>
        <p><strong>Reason for Rejection:</strong> ${rejectionReason}</p>
        <p>If you have any questions, please feel free to contact us.</p>
        <p>Best regards,<br>Lost & Found Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Report rejected successfully and email sent to the reporter.",
      updatedReport,
    });
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

// Route to send an email notification
router.post("/:id/send-email", sendEmailNotification);

// PUT /lostfound/request-found/:id
router.put("/request-found/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const updatedItem = await LostFound.findByIdAndUpdate(
      itemId,
      { foundRequest: true },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Found request submitted", item: updatedItem });
  } catch (error) {
    console.error("Error requesting found:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ NEW: Route to mark item as found
router.post("/:id/mark-found", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await LostFound.findByIdAndUpdate(
      id,
      { isFound: true },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item marked as found successfully.",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error marking item as found:", error);
    res.status(500).json({ message: "Failed to mark item as found." });
  }
});

// Route to mark item as returned
router.post("/:id/mark-returned", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await LostFound.findByIdAndUpdate(
      id,
      { isReturned: true },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item marked as returned successfully.",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error marking item as returned:", error);
    res.status(500).json({ error: "Failed to mark item as returned" });
  }
});

export default router;
