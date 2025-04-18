import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await axios.get("/Back/announcements");
      setAnnouncements(response.data);
    };
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1>Announcements</h1>
      {announcements.map((announcement) => (
        <div key={announcement._id} className="announcement-card">
          <h2>{announcement.title}</h2>
          <p>{announcement.message}</p>
          <p>Category: {announcement.category}</p>
          <p>Priority: {announcement.priority}</p>
          {announcement.attachments.map((file) => (
            <a key={file.fileUrl} href={file.fileUrl} download>
              {file.filename}
            </a>
          ))}
          <p>Posted by: {announcement.createdBy.username}</p>
          <p>Date: {new Date(announcement.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsPage;