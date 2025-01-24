import React from "react";
import clubImage from "../image.png"; // Assuming you have this image in your project
import { motion } from "framer-motion";

const clubsData = [
  {
    id: 1,
    name: "Coding Club",
    description:
      "Join our Coding Club to enhance your programming skills, participate in hackathons, and collaborate on projects with fellow students.",
    meetingTime: "Every Wednesday, 4:00 PM",
    location: "Tech Lab, Room 102",
  },
  {
    id: 2,
    name: "Photography Society",
    description:
      "Passionate about capturing moments? Our Photography Society organizes workshops and photo walks for students of all skill levels.",
    meetingTime: "Every Friday, 3:00 PM",
    location: "Art Studio, Room 205",
  },
  {
    id: 3,
    name: "Drama Club",
    description:
      "Express yourself through theater and drama! Our Drama Club holds regular rehearsals and performances throughout the semester.",
    meetingTime: "Every Tuesday, 6:00 PM",
    location: "Auditorium, Main Stage",
  },
  {
    id: 4,
    name: "Debate Club",
    description:
      "Develop your public speaking and debate skills. Join the Debate Club and participate in friendly debates and competitions.",
    meetingTime: "Every Thursday, 5:00 PM",
    location: "Lecture Hall, Room 303",
  },
];

const Clubspage = () => {
  return (
    <div className="min-h-screen">
      {/* Top Section with Image and Title */}
      <div className="relative w-full h-64">
        <motion.img
          src={clubImage}
          alt="Clubs"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <h1 className="text-white text-4xl font-bold">Clubs and Societies</h1>
        </motion.div>
      </div>

      {/* Club Details Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Our Clubs
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {clubsData.map((club) => (
            <div
              key={club.id}
              className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{club.name}</h3>
              <p className="mt-4 text-gray-800">{club.description}</p>
              <p className="text-gray-600 mt-4">
                <strong>Meeting Time:</strong> {club.meetingTime}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {club.location}
              </p>
              <button className="mt-4 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg">
                Join Club
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubspage;
