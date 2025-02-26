import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import image1 from "../Invite-rafiki.png";

export default function InviteFriends() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const response = await fetch("http://localhost:5000/Back/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(`Invitation sent to ${email}`);

          setEmail(""); // Clear input field
        } else {
          setMessage(data.message || "Error sending invite");
        }
      } catch (error) {
        setMessage("Error sending invite");
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Gradient Background with Invite Form */}

      <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-600 via-blue-700 to-white-600 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-8">
        <motion.div
          className="max-w-lg w-full space-y-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Invite Your Friends
          </h2>

          <motion.form
            onSubmit={handleInvite}
            className="space-y-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Friend's Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Send Invite
            </motion.button>

            {message && (
              <p className="mt-4 text-center text-green-500 dark:text-green-500">
                {message}
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>

      {/* Right Side: White Background with Image */}

      <div className="hidden lg:block w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.img
            src={image1}
            alt="Invite Illustration"
            className="w-[1000px] h-auto object-contain mx-14 rounded-lg transition-transform transform hover:scale-110"
            initial={{ opacity: 0, x: "100%" }} // Start from the right side (off-screen)
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
