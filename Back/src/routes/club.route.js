import express from "express";
import Club from "../model/club.model.js";
import multer from "multer"; // For handling file uploads

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create Club Route
router.post(
  "/clubs",
  upload.fields([{ name: "clubPolicies" }, { name: "approvalLetter" }]),
  async (req, res) => {
    try {
      // Check if files are uploaded
      if (!req.files["clubPolicies"] || !req.files["approvalLetter"]) {
        return res.status(400).json({ error: "Files are required!" });
      }

      // Destructure fields from the request body
      const {
        clubName,
        clubCategory,
        a_name,
        a_email,
        a_studentID,
        a_contactNo,
        a_department,
        a_faculty,
        a_currentRole,
        f_name,
        f_facultyName,
        f_advisorRole,
        f_phoneNo,
        f_email,
        termsAccepted,
      } = req.body;

      const applicantDetails = {
        name: a_name,
        email: a_email,
        studentID: a_studentID,
        contactNo: a_contactNo,
        department: a_department,
        faculty: a_faculty,
        currentRole: a_currentRole,
      };

      const facultyAdvisorDetails = {
        name: f_name,
        facultyName: f_facultyName,
        advisorRole: f_advisorRole,
        phoneNo: f_phoneNo,
        email: f_email,
      };

      // console.log(req.body);

      // Check if all required fields are present
      if (
        !clubName ||
        !clubCategory ||
        !applicantDetails ||
        !facultyAdvisorDetails ||
        !termsAccepted
      ) {
        return res.status(400).json({ error: "Missing required fields!" });
      }

      // Create the club object
      const club = new Club({
        clubName,
        clubCategory,
        applicantDetails: applicantDetails,
        facultyAdvisorDetails: facultyAdvisorDetails,
        clubPolicies: req.files["clubPolicies"][0].path,
        approvalLetter: req.files["approvalLetter"][0].path,
        termsAccepted,
      });

      // Save to the database
      await club.save();

      return res.status(201).json({ message: "Club created successfully!" });
    } catch (error) {
      console.error("Error creating club:", error); // Log error for debugging
      return res
        .status(500)
        .json({ error: "Server error. Please try again later." });
    }
  }
);

export default router;
