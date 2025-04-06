import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import MembershipForm from "../components/MembershipForm";

function SingleClubPage() {
  const { id } = useParams();
  const [clubData, setClubData] = useState({});
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Back/clubs/one-club/${id}`)
      .then((res) => {
        console.log("Club Data:", res.data); // Debugging: Log the fetched data
        setClubData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (!clubData.clubName) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

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
          backgroundImage: `url(${
            clubData.clubBannerPhoto || "./src/default-banner.jpg"
          })`,
          backgroundPosition: "center 20px",
        }}
      >
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-black bg-opacity-70" : "bg-black bg-opacity-40"
          } flex flex-col items-center justify-center text-center p-8`}
        >
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            {clubData.clubName}
          </h1>
          <p className="text-lg text-white mt-4 max-w-3xl mx-auto">
            {clubData.clubTagline}
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Get Membership Button */}
            <motion.button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={handleOpenModal} // Open the modal when clicked
            >
              Get Membership
            </motion.button>
          </div>
        </div>
      </div>

      {/* Club History Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Club History</h2>
        <p className="text-lg leading-relaxed mb-6">{clubData.clubHistory}</p>
      </div>

      {/* Key Members Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Meet Our Key Members
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {clubData.clubKeyMembers &&
            clubData.clubKeyMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg shadow-lg text-center transition-all duration-300 ${
                  darkMode
                    ? "bg-dark-blue text-white hover:shadow-blue-700"
                    : "bg-dark-blue text-white hover:shadow-blue-700"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.imageUrl || "./src/default-avatar.jpg"}
                  alt={member.name}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-300 dark:text-gray-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg mb-4">
          Have questions or want to reach out? Contact us via email or follow us
          on social media.
        </p>
        <p className="text-lg mb-6">
          Email:{" "}
          <a
            href={`mailto:${clubData.clubEmail}`}
            className="text-blue-500 hover:text-blue-600"
          >
            {clubData.clubEmail}
          </a>
        </p>
        <div className="flex justify-center space-x-6">
          {clubData.socialMediaLinks && (
            <>
              <motion.a
                href={clubData.socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-blue-700 hover:text-blue-600"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href={clubData.socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-blue-400 hover:text-blue-500"
                whileHover={{ scale: 1.2 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href={clubData.socialMediaLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-blue-600 hover:text-blue-700"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin />
              </motion.a>
            </>
          )}
        </div>
      </div>

      {/* Membership Form Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={handleCloseModal} // Close modal when clicking outside the form
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
              Membership Form
            </h3>
            {/* Membership Form Component */}
            <MembershipForm
              clubEmail={clubData.clubEmail} // Pass clubEmail to the form
              onClose={handleCloseModal} // Close modal after submission
            />
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer
        className={`py-6 mt-8 ${
          darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-200 text-gray-900"
        } text-center`}
      >
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-lg mb-2">Follow us on social media for updates!</p>
          <p className="text-sm">
            © {new Date().getFullYear()} {clubData.clubName}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SingleClubPage;
