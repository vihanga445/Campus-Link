import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AcademicClubsPage = () => {
  const [aClubs, setAClubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/Back/clubs/clubs/Academic")
      .then((res) => {
        setAClubs(res.data);
      })
      .catch((e) => {
        console.error("Error fetching academic clubs:", e);
      });
  }, []);

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

      {/* Introduction Section */}
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

      {/* Clubs Display Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aClubs.map((club, index) => (
            <motion.div
              key={club._id || index}
              className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              whileHover={{ scale: 1.05 }}
            >
              {/* Club Image */}
              <img
                src={club.clubCoverPhoto || "./src/default-club.jpg"} // fallback image
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
        {aClubs.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No academic clubs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicClubsPage;
