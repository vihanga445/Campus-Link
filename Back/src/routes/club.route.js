import express from "express";
import Club from "../model/club.model.js";
import multer from "multer";
import { sendEmail } from "../../utils/sendEmail.js";

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
  upload.fields([
    { name: "clubCoverPhoto", maxCount: 1 },
    { name: "clubBannerPhoto", maxCount: 1 },
    { name: "clubPolicies", maxCount: 1 },
    { name: "approvalLetter", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Request Files:", req.files);

      // Destructure fields from the request body
      const {
        clubName,
        clubCategory,
        clubEmail,
        clubDescription,
        clubTagline,
        clubHistory,
        clubKeyMembers,
        socialMediaLinks,
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

      if (!clubEmail) {
        return res.status(400).json({ error: "Club email is required." });
      }

      // Handle file uploads
      const clubCoverPhoto = req.files["clubCoverPhoto"]
        ? req.files["clubCoverPhoto"][0].path
        : req.body.clubCoverPhoto;
      const clubBannerPhoto = req.files["clubBannerPhoto"]
        ? req.files["clubBannerPhoto"][0].path
        : req.body.clubBannerPhoto;
      const clubPolicies = req.files["clubPolicies"]
        ? req.files["clubPolicies"][0].path
        : req.body.clubPolicies;
      const approvalLetter = req.files["approvalLetter"]
        ? req.files["approvalLetter"][0].path
        : req.body.approvalLetter;

      // Parse JSON fields
      const parsedKeyMembers = clubKeyMembers ? JSON.parse(clubKeyMembers) : [];
      const parsedSocialMediaLinks = socialMediaLinks
        ? JSON.parse(socialMediaLinks)
        : { facebook: "", twitter: "", linkedin: "" };

      // Validate missing fields
      const missingFields = [];
      if (!clubName) missingFields.push("clubName");
      if (!clubCategory) missingFields.push("clubCategory");
      if (!clubEmail) missingFields.push("clubEmail");
      if (!clubDescription) missingFields.push("clubDescription");
      if (!clubTagline) missingFields.push("clubTagline");
      if (!clubHistory) missingFields.push("clubHistory");
      if (!clubCoverPhoto) missingFields.push("clubCoverPhoto");
      if (!clubBannerPhoto) missingFields.push("clubBannerPhoto");
      if (!clubPolicies) missingFields.push("clubPolicies");
      if (!approvalLetter) missingFields.push("approvalLetter");
      if (parsedKeyMembers.length === 0) missingFields.push("clubKeyMembers");
      if (
        !parsedSocialMediaLinks.facebook &&
        !parsedSocialMediaLinks.twitter &&
        !parsedSocialMediaLinks.linkedin
      ) {
        // Do not add to missingFields if socialMediaLinks is optional
        console.warn("Social media links are empty but optional.");
      }
      if (!a_name) missingFields.push("applicantDetails.name");
      if (!a_email) missingFields.push("applicantDetails.email");
      if (!a_studentID) missingFields.push("applicantDetails.studentID");
      if (!a_contactNo) missingFields.push("applicantDetails.contactNo");
      if (!a_department) missingFields.push("applicantDetails.department");
      if (!a_faculty) missingFields.push("applicantDetails.faculty");
      if (!a_currentRole) missingFields.push("applicantDetails.currentRole");
      if (!f_name) missingFields.push("facultyAdvisorDetails.name");
      if (!f_facultyName)
        missingFields.push("facultyAdvisorDetails.facultyName");
      if (!f_advisorRole)
        missingFields.push("facultyAdvisorDetails.advisorRole");
      if (!f_phoneNo) missingFields.push("facultyAdvisorDetails.phoneNo");
      if (!f_email) missingFields.push("facultyAdvisorDetails.email");
      if (!termsAccepted) missingFields.push("termsAccepted");

      if (missingFields.length > 0) {
        console.error("Missing Fields:", missingFields);
        return res
          .status(400)
          .json({ error: "Missing required fields!", missingFields });
      }

      // Create the club object
      const club = new Club({
        clubName,
        clubCategory,
        clubEmail,
        clubDescription,
        clubTagline,
        clubHistory,
        clubCoverPhoto, // Cloudinary URL or multer path
        clubBannerPhoto, // Cloudinary URL or multer path
        clubPolicies, // Cloudinary URL or multer path
        approvalLetter, // Cloudinary URL or multer path
        clubKeyMembers: parsedKeyMembers,
        socialMediaLinks: parsedSocialMediaLinks,
        applicantDetails: {
          name: a_name,
          email: a_email,
          studentID: a_studentID,
          contactNo: a_contactNo,
          department: a_department,
          faculty: a_faculty,
          currentRole: a_currentRole,
        },
        facultyAdvisorDetails: {
          name: f_name,
          facultyName: f_facultyName,
          advisorRole: f_advisorRole,
          phoneNo: f_phoneNo,
          email: f_email,
        },
        termsAccepted,
        status: "pending",
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

// Fetch Pending Club Approvals (Only for Club Moderators)
router.get("/clubs/pending", async (req, res) => {
  try {
    const pendingClubs = await Club.find({ status: "pending" }); // Fetch only pending clubs
    return res.status(200).json(pendingClubs);
  } catch (error) {
    console.error("Error fetching pending clubs:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Approve a club
router.put("/clubs/:id/approve", async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    return res
      .status(200)
      .json({ message: "Club approved successfully!", club });
  } catch (error) {
    console.error("Error approving club:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Reject a club
router.put("/clubs/:id/reject", async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    return res
      .status(200)
      .json({ message: "Club rejected successfully!", club });
  } catch (error) {
    console.error("Error rejecting club:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Retrieve clubs using its type
router.get("/clubs/:category", async (req, res) => {
  try {
    const clubs = await Club.find({
      clubCategory: req.params.category,
      status: "approved",
    });
    return res.json(clubs);
  } catch (error) {
    console.error("Error fetching pending clubs:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Retrieve club using its id
router.get("/one-club/:id", async (req, res) => {
  try {
    const clubs = await Club.findOne({
      _id: req.params.id,
      status: "approved",
    });
    return res.json(clubs);
  } catch (error) {
    console.error("Error fetching pending clubs:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Send registration email
router.post("/register-mail-send", async (req, res) => {
  try {
    const {
      clubEmail,
      name,
      email,
      faculty,
      studentId,
      phone,
      yearOfStudy,
      reason,
      guidelinesAccepted,
    } = req.body;

    // Log the request body for debugging
    console.log("Request Body:", req.body);

    if (!clubEmail) {
      console.error("Club email is missing.");
      return res.status(400).json({ error: "Club email is required." });
    }

    console.log("Club Email:", clubEmail);

    await sendEmail(
      clubEmail,
      "New Membership Request for Your Club",
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#150285; text-align: center;">New Membership Request</h2>
          <p>Hello,</p>
          <p>You have received a new membership request for your club. Below are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Field</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Name</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${name}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Faculty</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${faculty}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Student ID</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${studentId}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Phone</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${phone}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Year of Study</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${yearOfStudy}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Reason for Joining</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${reason}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Guidelines Accepted</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  guidelinesAccepted ? "Yes" : "No"
                }</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top: 20px;">Please review this request and take appropriate action.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p style="font-weight: bold; color:#150285;">CampusLink Team</p>
        </div>
      `
    );

    return res.status(200).json({ message: "Successfully sent" });
  } catch (error) {
    res.status(500).json({ error: "Error on register mail send" });
  }
});

export default router;
