import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample cultural clubs data
const culturalClubs = [
  {
    id: 1,
    name: "International Students Association",
    description:
      "Celebrate cultural diversity and engage with global communities.",
    image: "./src/cl7.jpg", // Update with actual image path
  },
  {
    id: 2,
    name: "Dance and Performance Group",
    description: "Explore different dance forms and showcase your talent.",
    image: "./src/cl6.jpg", // Update with actual image path
  },
  {
    id: 3,
    name: "Traditional Music Ensemble",
    description:
      "Experience and perform traditional music from around the world.",
    image: "./src/cl9.jpg", // Update with actual image path
  },
  // Add more clubs as needed
];

const CulturalClubsPage = () => {
  const navigate = useNavigate(); // Hook to enable navigation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cl5.jpg")', // Replace with actual image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-8">
          <div>
            <h1 className="text-5xl font-bold text-white">Cultural Clubs</h1>
            <p className="text-lg text-white mt-4">
              Embrace diversity and celebrate different cultures.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Section Below Image */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Cultural Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Our cultural clubs offer a vibrant space to celebrate global
          traditions, learn about diverse cultures, and experience the richness
          of the world around you. Whether you're passionate about music, dance,
          or cultural exchange, there's a place for you here.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Discover the clubs below to join the cultural celebration!
        </p>
      </div>

      {/* Clubs Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalClubs.map((club) => (
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
                <div className="mt-4">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/clubs/${club.id}`)} // Navigate to club details
                  >
                    Find out more &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalClubsPage;
