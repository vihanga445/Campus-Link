import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ContactModal = ({ isOpen, onClose, item, reporterEmail }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send message to backend to contact reporter (example API)
    try {
      const response = await fetch("http://localhost:5000/contact-reporter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, reporterEmail }),
      });

      if (response.ok) {
        alert("Message sent to the reporter successfully!");
        onClose(); // Close the modal
        navigate("/thank-you"); // Optional: navigate to a thank you page
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  if (!isOpen) return null;

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
          Regarding: {item.itemName}
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            Send Message
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
