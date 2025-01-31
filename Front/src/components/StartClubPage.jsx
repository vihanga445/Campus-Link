import React from "react";
import { motion } from "framer-motion";

const StartClubPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Top Section with Plain Color Background and Title */}
      <div className="relative w-full h-64 bg-mid-blue flex items-center justify-left ">
        <h1 className="text-white text-5xl lg:text-5xl mx-10 font-bold">
          Starting a Club
        </h1>
      </div>

      {/* Information Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Learn how to start a club or society affiliated with CampusLink.
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed text-center mb-10">
          Starting a club is a fantastic way to make like-minded friends, engage
          with the CampusLink community, and develop valuable skills in
          management and organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Steps Section */}
          <div>
            <h3 className="text-3xl font-semibold mb-6 text-blue-600">
              Steps to Starting a Club
            </h3>
            <ol className="list-decimal list-inside space-y-6 text-gray-800">
              <li>
                <strong>Find Members:</strong> Gather at least 15 interested
                members. Make sure to get their names and student numbers.
              </li>
              <li>
                <strong>Find Committee Members:</strong> You need a committee of
                at least 4 members:{" "}
                <u>President, Vice President, Secretary, and Treasurer.</u>
              </li>
              <li>
                <strong>Complete Required Paperwork:</strong> Submit necessary
                approval letters through the CampusLink.
              </li>
              <li>
                <strong>Finalize Your Club:</strong> Once approved, you'll
                receive the website access to officially start your club.
              </li>
            </ol>
          </div>

          {/* Illustration Section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="bg-blue-100 p-10 rounded-2xl shadow-lg">
              <h3 className="text-xl text-blue-600 mb-4">Start Your Journey</h3>
              <p className="text-gray-700">
                Building a club is a journey filled with opportunities to learn,
                grow, and create a positive impact on the CampusLink community.
                Follow the steps and get started today!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final Call-to-Action Section */}
      <div className="bg-light-blue py-12 mt-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Club?
          </h2>
          <p className="text-lg text-white mb-8">
            Take the first step today and build your own community within
            CampusLink.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Get Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartClubPage;
