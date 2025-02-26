import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ComputerScienceCommunityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/image.png")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Computer Science Students Community
          </h1>
          <p className="text-lg text-white mt-4">
            Unlock your potential and join a thriving community of aspiring tech
            innovators.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Get Membership Button */}
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/membership")}
            >
              Get Membership
            </motion.button>
            {/* Login Button */}
            <motion.button
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>
          </div>
        </div>
      </div>

      {/* Community Info Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Join Our Community?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          As a member of the Computer Science Students Community, you'll gain
          access to exclusive resources, mentorship, and opportunities that will
          help you succeed in the tech industry.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Be a part of a community of forward-thinking, passionate students who
          are shaping the future of technology.
        </p>
      </div>

      {/* Social Media Links Section */}
      <div className="flex justify-center space-x-6 mb-8">
        <motion.a
          href="https://facebook.com"
          target="_blank"
          whileHover={{ scale: 1.2 }}
          className="text-3xl text-blue-600 hover:text-blue-800"
        >
          <i className="fab fa-facebook"></i>
        </motion.a>
        <motion.a
          href="https://twitter.com"
          target="_blank"
          whileHover={{ scale: 1.2 }}
          className="text-3xl text-blue-400 hover:text-blue-600"
        >
          <i className="fab fa-twitter"></i>
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          whileHover={{ scale: 1.2 }}
          className="text-3xl text-blue-700 hover:text-blue-900"
        >
          <i className="fab fa-linkedin"></i>
        </motion.a>
        <motion.a
          href="https://github.com"
          target="_blank"
          whileHover={{ scale: 1.2 }}
          className="text-3xl text-gray-800 hover:text-gray-900"
        >
          <i className="fab fa-github"></i>
        </motion.a>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2025 Computer Science Students Community. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComputerScienceCommunityPage;
