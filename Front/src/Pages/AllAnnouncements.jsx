import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

function AllAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/Back/announcement/get-all-announcements");
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Delete announcement
  const handleDelete = async () => {
    try {
      const response = await fetch(`/Back/announcement/${announcementToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete announcement");
      }
      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement._id !== announcementToDelete)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete announcement:", error);
    }
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">All Announcements</h1>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Date Created</th>
              <th className="p-4 text-center">Title</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id} className="border-b">
                <td className="p-4">{new Date(announcement.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-center">{announcement.title}</td>
                <td className="p-4 flex justify-center gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowViewModal(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => {
                      setAnnouncementToDelete(announcement._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Announcement Modal */}
        {showViewModal && selectedAnnouncement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedAnnouncement.title}</h2>

              {/* Category */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <span className="px-2 py-1 text-sm font-medium rounded-md bg-blue-100 text-blue-800">
                  {selectedAnnouncement.category}
                </span>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-md ${
                    selectedAnnouncement.priority === "Important"
                      ? "bg-red-100 text-red-800"
                      : selectedAnnouncement.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {selectedAnnouncement.priority}
                </span>
              </div>

              {/* Message */}
              <p className="mb-4">{selectedAnnouncement.message}</p>

              {/* Attachments */}
              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold mb-2">Attachments:</h3>
                  {selectedAnnouncement.attachments.map((file, index) => (
                    <div key={index}>
                      <a
                        href={`http://localhost:5000/${file.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {file.filename}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Created Date */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <FaCalendarAlt />
                <span>
                  Created on:{" "}
                  {selectedAnnouncement.createdAt
                    ? new Date(selectedAnnouncement.createdAt).toLocaleDateString()
                    : "Creation date not available"}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Delete Announcement</h2>
              <p>Are you sure you want to delete this announcement?</p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAnnouncements;