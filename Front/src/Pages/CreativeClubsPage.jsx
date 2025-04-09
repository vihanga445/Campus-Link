import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreativeClubsPage = () => {
  const [cClubs, setCClubs] = useState([]); // State to store creative clubs
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch creative clubs from the backend
    axios
      .get("http://localhost:5000/Back/clubs/clubs/Creative")
      .then((res) => {
        setCClubs(res.data);
      })
      .catch((e) => {
        console.error("Error fetching creative clubs:", e);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cl13.jpg")', // Replace with actual image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-8">
          <div>
            <h1 className="text-5xl font-bold text-white">Creative Clubs</h1>
            <p className="text-lg text-white mt-4">
              Unleash your creative potential and explore artistic expressions.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Creative Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Whether you're into photography, music, visual arts, or theater, our
          creative clubs offer a space to develop your skills and share your
          passion. Connect with other creatives and bring your artistic visions
          to life.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explore the clubs below and join the creative community that inspires
          you!
        </p>
      </div>

      {/* Clubs Display Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cClubs.map((club, index) => (
            <motion.div
              key={club._id || index}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              whileHover={{ scale: 1.05 }}
            >
              {/* Club Image */}
              <img
                src={club.clubCoverPhoto || "./src/default-club.jpg"} // Fallback image
                alt={club.clubName}
                className="w-full h-60 object-cover"
              />

              {/* Club Info */}
              <div className="p-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {club.clubName}
                </h3>
                <p className="text-gray-700 mt-2">
                  {club.clubDescription?.substring(0, 100) ||
                    "No description provided."}
                </p>

                {/* "Find Out More" Button */}
                <button
                  className="text-blue-600 mt-2"
                  onClick={() => navigate(`/one-club/${club._id}`)} // Use club._id here
                >
                  Find out more &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Clubs Message */}
        {cClubs.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No creative clubs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeClubsPage;
