import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Sample sports and fitness clubs data
const sportsAndFitnessClubs = [
  {
    id: 1,
    name: "Elle Club- University of Ruhuna",
    description:
      "Join us for football matches, training, and friendly competitions.",
    image: "./src/cl25.jpg", // Update with actual image path
  },
  {
    id: 2,
    name: "Badminton Club- University of Ruhuna",
    description:
      "Focus on improving your fitness with group workouts and wellness sessions.",
    image: "./src/cl24.jpg", // Update with actual image path
  },
  {
    id: 3,
    name: "Basketball Society",
    description:
      "Practice basketball with fellow enthusiasts, participate in games and tournaments.",
    image: "./src/cl22.jpg", // Update with actual image path
  },
  // Add more clubs as needed
];

const SportsAndFitnessClubsPage = () => {
  const navigate = useNavigate(); // Hook to enable navigation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cl23.jpg")', // Replace with actual image path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-8">
          <div>
            <h1 className="text-5xl font-bold text-white">
              Sports and Fitness Clubs
            </h1>
            <p className="text-lg text-white mt-4">
              Stay active and healthy by joining a sports or fitness community.
            </p>
          </div>
        </div>
      </div>

      {/* Exploration Section Below Image */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Sports and Fitness Clubs
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Whether you love playing sports or want to improve your fitness, our
          clubs provide opportunities for regular practice, tournaments, and
          overall wellness.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explore the clubs below to find your fitness path and join a team!
        </p>
      </div>

      {/* Clubs Section */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportsAndFitnessClubs.map((club) => (
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

export default SportsAndFitnessClubsPage;
