import { Button, TextInput, Select } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/Back/announcement/get-announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Announcements</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Search Filters</h2>

              <div className="space-y-4">
                {/* Keyword Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keyword
                  </label>
                  <TextInput
                    icon={FaSearch}
                    placeholder="Search by title or description..."
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <Select>
                    <option value="all">All Types</option>
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                  </Select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <TextInput type="date" />
                </div>

                {/* Search and Reset Buttons */}
                <div className="pt-4 space-y-2">
                  <Button gradientDuoTone="purpleToBlue" className="w-full">
                    Search Announcements
                  </Button>
                  <Button outline gradientDuoTone="purpleToBlue" className="w-full">
                    Reset Filters
                  </Button>
                  <Link to="/create-announcement">
                    <Button
                      type="button"
                      gradientDuoTone="purpleToPink"
                      className="w-full mt-2"
                    >
                      Create Announcement
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Announcement Cards */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleViewAnnouncement(announcement)}
                >
                  {announcement.image && (
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {announcement.title}
                    </h2>
                  
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <FaCalendarAlt />
                      <span>
                        Created on:{" "}
                        {announcement.createdAt
                          ? new Date(announcement.createdAt).toLocaleDateString()
                          : "Creation date not available"}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {announcement.message.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Announcement */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedAnnouncement.title}</h2>
            <p className="mb-4">{selectedAnnouncement.message}</p>
            <p className="text-sm text-gray-500 mb-4">
              Category: {selectedAnnouncement.category}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Priority: {selectedAnnouncement.priority}
            </p>
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
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Announcements;