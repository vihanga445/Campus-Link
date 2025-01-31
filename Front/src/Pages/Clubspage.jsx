import React from "react";
import clubImage from "../clubbg.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Category images
import academicImg from "../clb1.png";
import creativeImg from "../clb2.png";
import socialImg from "../clb3.png";
import culturalImg from "../clb4.png";
import spiritualImg from "../clb5.png";
import sportsImg from "../clb6.png";

const clubCategories = [
  {
    id: 1,
    name: "Academic Clubs",
    image: academicImg,
    description: "Explore academic growth and knowledge sharing.",
  },
  {
    id: 2,
    name: "Creative Clubs",
    image: creativeImg,
    description: "Foster your creative skills and artistic talents.",
  },
  {
    id: 3,
    name: "Social Clubs",
    image: socialImg,
    description: "Engage with social activities and connect with peers.",
  },
  {
    id: 4,
    name: "Cultural Clubs",
    image: culturalImg,
    description: "Embrace diversity and celebrate different cultures.",
  },
  {
    id: 5,
    name: "Spiritual Clubs",
    image: spiritualImg,
    description: "Connect on a deeper, spiritual level with others.",
  },
  {
    id: 6,
    name: "Sports & Fitness Clubs",
    image: sportsImg,
    description: "Stay fit, active, and competitive through sports.",
  },
];

const Clubspage = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section with Image and Title */}
      <div className="relative w-full h-80">
        <motion.img
          src={clubImage}
          alt="Clubs"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-start p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          {/* Glass effect div */}
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h1 className="text-white text-6xl lg:text-7xl font-extrabold drop-shadow-md">
              Clubs and Societies
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Introductory Text Section */}
      <div className="container mx-auto p-8 text-center">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Whether you're into technology, arts, sports, or cultural activities,
          CampusLink has a wide range of clubs and societies just for you.
        </p>
        <p className="text-lg text-gray-800 leading-relaxed">
          Looking to develop new skills, connect with like-minded students, or
          simply take part in something you enjoy? CampusLink's clubs and
          societies offer something for everyone. Discover what suits you and
          join the fun!
        </p>
      </div>

      {/* Club Categories Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-10">
          Browse By Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubCategories.map((category) => (
            <motion.div
              key={category.id}
              className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {category.name}
                </h3>
                <p className="text-white text-center mb-4">
                  {category.description}
                </p>
                <button className="bg-white text-black py-2 px-4 rounded-lg">
                  More Info
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* New Club Section */}
      <div className="container mx-auto p-8 mt-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          Want to Start a New Club?
        </h2>
        <p className="text-lg text-gray-800 text-center leading-relaxed mb-6">
          Starting a club or society is a great way to make like-minded friends,
          engage with the campus community, and learn life-long skills in
          management and organization. Whether you want to start a creative,
          sports, academic, cultural, or spiritual club through CampusLink, the
          opportunities are endless.
        </p>
        <p className="text-lg text-gray-800 text-center leading-relaxed mb-6">
          Take the lead and create a space where students can connect, grow, and
          enjoy their passions. Start a new chapter for your club journey today
          with CampusLink!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/start-club")} // Navigate to StartClubPage
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Your Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clubspage;
