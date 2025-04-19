import Announcement from "../model/announcement.js";
// import { uploadFile } from "../utils/fileUpload.js"; // Utility for file uploads
import User from "../model/user.js"; // Assuming you have a User model


export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, category, priority, pinned, expirationDate } = req.body;

    // Handle file uploads
    const attachments = req.files?.map((file) => ({
      filename: file.originalname,
      fileUrl: file.path,
    }));

    const announcement = new Announcement({
      title,
      message,
      category,
      priority,
      pinned,
      expirationDate,
      attachments,
      createdBy: req.user.id, // Assuming user is authenticated
    });

    console.log(announcement);
    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error });
  }
};


export const getAnnouncements = async (req, res) => {
  try {
    const { keyword, category, date } = req.query;

    let query = {};

    // Search by keyword in title or message
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { message: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Filter by date
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(searchDate.getDate() + 1);
      query.createdAt = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const announcements = await Announcement.find(query)
      .sort({ pinned: -1, createdAt: -1 }) // Pinned items first
      .populate("createdBy", "username"); // Populate creator info

      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching announcements", error });
    }
  };




// Get all announcements
// export const getAnnouncements = async (req, res) => {
//   try {
//     const announcements = await Announcement.find()
//       .sort({ pinned: -1, createdAt: -1 }) // Pinned items first
//       .populate("createdBy", "username"); // Populate creator info

//     res.status(200).json(announcements);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching announcements", error });
//   }
// };

// Mark announcement as seen
export const markAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    if (!announcement.seenBy.includes(userId)) {
      announcement.seenBy.push(userId);
      await announcement.save();
    }

    res.status(200).json({ message: "Announcement marked as seen" });
  } catch (error) {
    res.status(500).json({ message: "Error marking announcement as seen", error });
  }
};