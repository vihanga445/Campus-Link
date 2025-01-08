import React, { useState, useEffect } from "react";

const announcementsData = [
  {
    id: 1,
    title: "Mid-Semester Break Announcement",
    date: "January 10, 2025",
    description:
      "The mid-semester break will be from February 1 to February 7, 2025. All classes and campus activities will be suspended during this time.",
  },
  {
    id: 2,
    title: "COVID-19 Safety Protocol Update",
    date: "January 5, 2025",
    description:
      "Due to the rise in COVID-19 cases, all students are required to wear masks in indoor spaces. Vaccination certificates will also be checked at the campus gates.",
  },
  {
    id: 3,
    title: "New Library Hours",
    date: "December 28, 2024",
    description:
      "Starting January 2025, the university library will be open from 8:00 AM to 10:00 PM on weekdays and 10:00 AM to 6:00 PM on weekends.",
  },
  {
    id: 4,
    title: "Campus Parking Update",
    date: "December 20, 2024",
    description:
      "Due to ongoing construction near the east wing, parking will be limited. Please use alternative parking spaces located near the sports complex.",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setAnnouncements(announcementsData);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Campus Announcements</h1>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{announcement.title}</h2>
            <p className="text-gray-600">{announcement.date}</p>
            <p className="mt-4 text-gray-800">{announcement.description}</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
