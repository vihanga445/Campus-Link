import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample social clubs data
const socialClubs = [
  {
    id: 1,
    name: "Student Volunteer Network",
    description:
      "Get involved in social causes and make a difference in the community.",
    image: "./src/cl2.jpg", // Update with actual image path
  },
  {
    id: 2,
    name: "Cultural Exchange Society",
    description:
      "Connect with students from around the world and learn about different cultures.",
    image: "./src/cl3.jpeg", // Update with actual image path
  },
  {
    id: 3,
    name: "Community Outreach Club",
    description:
      "Organize events and activities that support local communities.",
    image: "./src/cl4.jpeg", // Update with actual image path
  },
  // Add more clubs as needed
];

const SocialClubsPage = () => {
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
            <h1 className="text-5xl font-bold text-white">Social Clubs</h1>
            <p className="text-lg text-white mt-4">
              Build connections and get involved with the campus community.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Section Below Image */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Social Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Our social clubs provide a welcoming space to meet new people, get
          involved in community service, and engage in social activities.
          Whether you're interested in volunteering or simply meeting new
          friends, there's a club for you.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Check out the clubs below to find your community and make a lasting
          impact!
        </p>
      </div>

      {/* Clubs Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialClubs.map((club) => (
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

export default SocialClubsPage;
