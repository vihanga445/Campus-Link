import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample academic clubs data
const academicClubs = [
  {
    id: 1,
    name: "Computer Science Students Community",
    description: "Enhance your coding skills and explore new technologies.",
    image: "./src/cl2.jpg", // Update with actual image path
  },
  {
    id: 2,
    name: "Mathematics and Statistics Society",
    description: "Solve interesting problems and compete in math challenges.",
    image: "./src/cl3.jpeg", // Update with actual image path
  },
  {
    id: 3,
    name: "Physics Society-University of Ruhuna",
    description: "Dive into the world of physics with experiments and talks.",
    image: "./src/cl4.jpeg", // Update with actual image path
  },
  // Add more clubs as needed
];

const AcademicClubsPage = () => {
  const navigate = useNavigate(); // Hook to enable navigation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cl1.jpg")', // Replace with actual image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-8">
          <div>
            <h1 className="text-5xl font-bold text-white">Academic Clubs</h1>
            <p className="text-lg text-white mt-4">
              Discover clubs that promote academic excellence and growth.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Section Below Image */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Academic Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Whether you're passionate about technology, mathematics, physics, or
          other academic disciplines, our clubs provide a platform to grow your
          skills, engage with peers, and explore new knowledge. Join a community
          of like-minded individuals and take your academic journey to the next
          level!
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explore the clubs below and discover where your academic interests
          align!
        </p>
      </div>

      {/* Clubs Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicClubs.map((club) => (
            <motion.div
              key={club.id}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              whileHover={{ scale: 1.05 }}
            >
              {/* Club Image */}
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-60 object-cover"
              />

              {/* Club Description */}
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {club.name}
                </h3>
                <p className="text-gray-700 mt-2">{club.description}</p>

                {/* "Find Out More" Link */}
                <button
                  className="text-blue-600"
                  onClick={() => {
                    if (club.id === 1) {
                      navigate("/cssc"); // Navigate to the CSSC page
                    } else {
                      navigate(`/clubs/${club.id}`); // Default for other clubs
                    }
                  }}
                >
                  Find out more &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicClubsPage;
