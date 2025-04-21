import express from "express";
import { createAnnouncement, getAnnouncements, markAsSeen, getAllAnnouncements, deleteAnnouncement, getLatestAnnouncements } from "../controller/announcementController.js";
import { verifyToken } from "../../utils/verifyUser.js";
import { upload } from "../../utils/fileUpload.js";

const router = express.Router();

// Create an announcement (only moderators with "Announcements" category)
// router.post("/", isAuthenticated, isModerator("Announcements"), upload.array("attachments"), createAnnouncement);


router.post("/create", verifyToken,upload.array("attachments"), createAnnouncement);


// Get all announcements
router.get("/get-announcements", verifyToken, getAnnouncements);
router.get("/latest",verifyToken, getLatestAnnouncements);


router.get("/get-all-announcements", verifyToken, getAllAnnouncements);
router.delete("/:id", verifyToken, deleteAnnouncement);
// Mark an announcement as seen
router.put("/:id/seen", verifyToken, markAsSeen);

export default router;