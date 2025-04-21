import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ContactModal from "../components/ContactModal"; // Import Modal

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch all accepted lost items from the backend
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Back/lostfound/approved"
        );
        const approvedLostItems = response.data.filter(
          (item) => item.status === "Lost"
        );
        setLostItems(approvedLostItems);

        // Log a message when data is fetched completely
        console.log("All lost items fetched successfully:", approvedLostItems);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  const handleContactClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Reset selected item when closing the modal
  };

  const handleSendEmail = async (item, message) => {
    const subject = `Inquiry about the lost item: ${item.itemName}`;
    console.log("Sending email with data:", {
      reporterEmail: item.reporterEmail,
      subject: subject,
      message: message,
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/Back/lostfound/${item._id}/send-email`,
        {
          reporterEmail: item.reporterEmail,
          subject: subject,
          message: message,
        }
      );

      if (response.status === 200) {
        alert("Email sent successfully to the reporter!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading lost items...</p>;
  }

  if (lostItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          No Lost Items Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-[#03396c] dark:text-cyan-100 mb-12">
        All Lost Items
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lostItems.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/150"}
              alt={item.itemName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {item.itemName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Location:</strong> {item.location}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              <strong>Description:</strong> {item.description}
            </p>
            <button
              onClick={() => handleContactClick(item)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Contact the Reporter
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal for Contacting the Reporter */}
      {selectedItem && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
          reporterEmail={selectedItem.reporterEmail} // Assuming this is stored
          onSend={(message) => handleSendEmail(selectedItem, message)} // Pass the message to handleSendEmail
        />
      )}
    </div>
  );
};

export default LostItemsPage;
