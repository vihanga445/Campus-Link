import LostFound from "../model/lostfound.model.js";
import nodemailer from "nodemailer";

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

export const sendEmailNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customMessage } = req.body; // Get the custom message from the request body

    if (!customMessage) {
      return res.status(400).json({ error: "Custom message is required." });
    }

    // Fetch the lost/found report by ID
    const report = await LostFound.findById(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found." });
    }

    const { reporterEmail, reporterName, itemName, status } = report;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Customize the email content based on the status (Lost or Found)
    const emailMessage =
      status === "Lost"
        ? `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #007bff;">Hello ${reporterName},</h2>
        <p>We have an update regarding your <strong style="color: red;">lost</strong> item:</p>
        <table style="margin: 10px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0;"><strong>📌 Item:</strong></td>
            <td style="padding: 8px 0;">${itemName}</td>
          </tr>
        </table>
        <div style="background-color: #f1f1f1; padding: 15px; border-left: 5px solid #007bff; margin: 20px 0;">
          <p style="margin: 0;"><strong>✉️ Message:</strong> ${customMessage}</p>
        </div>
        <p>If you need any further assistance, feel free to contact us anytime.</p>
        <p style="margin-top: 30px;">Warm regards,<br>
        <strong>Lost & Found Team</strong><br>
        CampusLink</p>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #28a745;">Hello ${reporterName},</h2>
        <p>We have an update regarding your <strong style="color: green;">found</strong> item:</p>
        <table style="margin: 10px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0;"><strong>📌 Item:</strong></td>
            <td style="padding: 8px 0;">${itemName}</td>
          </tr>
        </table>
        <div style="background-color: #f1f1f1; padding: 15px; border-left: 5px solid #28a745; margin: 20px 0;">
          <p style="margin: 0;"><strong>✉️ Message:</strong> ${customMessage}</p>
        </div>
        <p>Please check your CampusLink account or reach out to us to proceed with the next steps.</p>
        <p style="margin-top: 30px;">Warm regards,<br>
        <strong>Lost & Found Team</strong><br>
        CampusLink</p>
      </div>
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reporterEmail, // Send email to the reporter
      subject: `Update on Your ${status} Item: ${itemName}`,
      html: emailMessage,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true); // Show loading state

  try {
    // Send email to the reporter via backend API
    const response = await fetch(
      `http://localhost:5000/Back/lostfound/${item._id}/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customMessage: message, // Send the message as customMessage
        }),
      }
    );

    if (response.ok) {
      alert("Email sent to the reporter successfully!");
      onClose(); // Close the modal
    } else {
      alert("Failed to send email. Please try again.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("An error occurred while sending the email.");
  } finally {
    setLoading(false); // Hide loading state
  }
};
