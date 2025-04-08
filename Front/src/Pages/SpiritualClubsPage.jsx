import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SpiritualClubsPage = () => {
  const [spiritualClubs, setSpiritualClubs] = useState([]); // State to store spiritual clubs
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch spiritual clubs from the backend
    axios
      .get("http://localhost:5000/Back/clubs/clubs/Spiritual") // Update endpoint for spiritual clubs
      .then((res) => {
        setSpiritualClubs(res.data);
      })
      .catch((e) => {
        console.error("Error fetching spiritual clubs:", e);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cl18.jpg")', // Replace with actual image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-8">
          <div>
            <h1 className="text-5xl font-bold text-white">Spiritual Clubs</h1>
            <p className="text-lg text-white mt-4">
              Explore spiritual growth and mindfulness through community.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Section Below Image */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Spiritual Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Engage in practices that promote spiritual growth, mental wellness,
          and mindfulness. Our spiritual clubs provide a safe space for personal
          development, self-reflection, and inner peace.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explore the clubs below to start your spiritual journey!
        </p>
      </div>

      {/* Clubs Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spiritualClubs.map((club) => (
            <motion.div
              key={club._id} // Use unique identifier from the backend
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              whileHover={{ scale: 1.05 }}
            >
              {/* Club Image */}
              <img
                src={club.clubCoverPhoto || "./src/default-club.jpg"} // Fallback image
                alt={club.clubName}
                className="w-full h-60 object-cover"
              />

              {/* Club Description */}
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {club.clubName}
                </h3>
                <p className="text-gray-700 mt-2">
                  {club.clubDescription?.substring(0, 100) ||
                    "No description provided."}
                </p>

                {/* "Find Out More" Link */}
                <div className="mt-4">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/one-club/${club._id}`)} // Navigate to club details
                  >
                    Find out more &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Clubs Message */}
        {spiritualClubs.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No spiritual clubs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default SpiritualClubsPage;
