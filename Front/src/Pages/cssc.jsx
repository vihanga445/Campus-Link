import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import img2 from "../avatar2.png";
import img1 from "../avatar1.png";
import img3 from "../avatar3.png";

const ComputerScienceCommunityPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const keyMembers = [
    {
      name: "Pathum Perera",
      role: "President",
      imgUrl: img2,
    },
    {
      name: "Shanika Dilrukshi",
      role: "Vice President",
      imgUrl: img1,
    },
    {
      name: "Kasun Fernando",
      role: "Secretary",
      imgUrl: img3,
    },
  ];

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-gray-100"
          : "min-h-screen bg-gray-50 text-gray-900"
      }
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <motion.button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-full shadow hover:shadow-md transition-all"
          whileHover={{ scale: 1.1 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </motion.button>
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url("./src/cssc.png")',
          backgroundPosition: "center 20px",
        }}
      >
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-40"
          } flex flex-col items-center justify-center text-center p-8`}
        >
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Computer Science Students Community
          </h1>
          <p className="text-lg text-white mt-4 max-w-3xl mx-auto">
            Unlock your potential and join a thriving community of aspiring tech
            innovators.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Get Membership Button */}
            <motion.button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/membership-form")}
            >
              Get Membership
            </motion.button>
          </div>
        </div>
      </div>

      {/* Club History Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Club History</h2>
        <p className="text-lg leading-relaxed mb-6">
          The Computer Science Students Community was founded in 2015 with the
          goal of connecting like-minded individuals passionate about
          technology. Over the years, the club has grown to become a vibrant hub
          of innovation and collaboration for students of all skill levels.
        </p>
      </div>

      {/* Key Members Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Meet Our Key Members
        </h2>
        <div className="flex justify-center space-x-8">
          {keyMembers.map((member, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg shadow-lg text-center transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 hover:shadow-gray-600"
                  : "bg-gray-100 hover:shadow-lg"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={member.imgUrl}
                alt={member.name}
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Email and Social Media Links Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-4">
          Have questions or want to reach out? Contact us via email or follow us
          on social media.
        </p>
        <p className="text-lg mb-6">
          Email:{" "}
          <a
            href="mailto:cscommunity@example.com"
            className="text-blue-500 hover:text-blue-600"
          >
            cscommunityuor@gmail.com
          </a>
        </p>
        <div className="flex justify-center space-x-6">
          {/* Social Media Links */}
          <motion.a
            href="https://facebook.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
            className="text-3xl text-blue-500 hover:text-blue-600"
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
            className="text-3xl text-blue-400 hover:text-blue-500"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
            className="text-3xl text-blue-600 hover:text-blue-700"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            whileHover={{ scale: 1.2 }}
            className="text-3xl text-gray-500 hover:text-gray-400"
          >
            <FaGithub />
          </motion.a>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className={`py-6 mt-8 ${
          darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-200 text-gray-900"
        } text-center`}
      >
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-lg mb-2">Follow us on social media for updates!</p>
          <div className="flex space-x-4 mb-4">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              className="text-2xl hover:text-blue-600"
              whileHover={{ scale: 1.2 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              className="text-2xl hover:text-blue-500"
              whileHover={{ scale: 1.2 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              className="text-2xl hover:text-blue-700"
              whileHover={{ scale: 1.2 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              className="text-2xl hover:text-gray-400"
              whileHover={{ scale: 1.2 }}
            >
              <FaGithub />
            </motion.a>
          </div>
          <p className="text-sm">
            © 2025 Computer Science Students Community. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComputerScienceCommunityPage;
