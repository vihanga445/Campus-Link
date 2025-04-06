import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";

export const applyForMembership = async (req, res) => {
  try {
    // Get user email from token
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const senderEmail = decoded.email; // Extract logged-in user's email

    // Destructure form data from the request body
    const {
      receiverEmail,
      name,
      email,
      studentId,
      faculty,
      reason,
      phone,
      yearOfStudy,
    } = req.body;

    // Validate that required fields are provided
    if (
      !receiverEmail ||
      !name ||
      !email ||
      !studentId ||
      !faculty ||
      !reason ||
      !phone ||
      !yearOfStudy
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Construct the email message
    const message = `
      New Membership Application:
      
      Name: ${name}
      Email: ${email}
      Student ID: ${studentId}
      Phone: ${phone}
      Faculty: ${faculty}
      Year of Study: ${yearOfStudy}
      Reason for Joining: ${reason}
    `;

    const subject = "New Club Membership Application";

    // Send email to the relevant club email
    await sendEmail(senderEmail, receiverEmail, subject, message);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
