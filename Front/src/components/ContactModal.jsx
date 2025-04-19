import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactModal = ({ isOpen, onClose, item, reporterEmail }) => {
  const [message, setMessage] = useState(""); // State to store the user's message
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading state

    try {
      // Send email to the reporter via backend API
      const response = await fetch(
        `http://localhost:5000/Back/lostfound/${item._id}/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customMessage: message,
          }),
        }
      );

      if (response.ok) {
        alert("Email sent to the reporter successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Contact the Reporter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Regarding: <strong>{item.itemName}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update the message state
            placeholder="Type your message here..."
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default ContactModal;
