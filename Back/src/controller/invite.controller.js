import fs from "fs";
import path from "path";
import mailer from "../controller/mail.controller.js";
import "dotenv/config.js";

// Directly hardcoded path to the HTML template file
const filePath = path.join(
  "C:",
  "Users",
  "MN",
  "Desktop",
  "New folder",
  "final_project",
  "Back",
  "src",
  "inviteEmailTemplate.html"
);
export const sendInvite = async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Check if the file exists at the hardcoded path
    if (!fs.existsSync(filePath)) {
      console.error("File not found at path:", filePath);
      return res.status(500).json({
        success: false,
        message: "HTML template file not found",
      });
    }

    // Read the HTML template from the hardcoded path
    const htmlMessage = fs.readFileSync(filePath, "utf8");

    // Send the email
    await mailer.sendMail({
      from: '"CampusLink" <campuslinkuor@gmail.com>',
      to: email,
      subject: "Join CampusLink! Your Gateway to University Life!",
      html: htmlMessage,
    });

    // If email is successfully sent
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    // Catch and handle errors
    console.error("Error sending email:", error); // Optional: log for debugging
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message, // Optional: return error message
    });
  }
};
