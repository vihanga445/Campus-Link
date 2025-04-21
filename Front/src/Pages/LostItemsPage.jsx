import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ContactModal from "../components/ContactModal";
import EmailModal from "../components/EmailModal"; // Import the EmailModal component

const LostItemsPage = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // Track the email modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [emailInput, setEmailInput] = useState(""); // Store entered email for comparison
  const [error, setError] = useState(null);

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

  const handleEmailModalOpen = (item) => {
    setSelectedItem(item);
    setIsEmailModalOpen(true); // Open the email modal
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false); // Close the email modal
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

  const handleMarkAsFound = async (item, email) => {
    if (email === item.reporterEmail) {
      try {
        const response = await axios.post(
          `http://localhost:5000/Back/lostfound/${item._id}/mark-found`
        );

        if (response.status === 200) {
          // Update the item in state: set isFound to true
          setLostItems((prevItems) =>
            prevItems.map((i) =>
              i._id === item._id ? { ...i, isFound: true } : i
            )
          );
          setIsEmailModalOpen(false);
          setSelectedItem(null);
          setError(null); // Clear any previous error
        }
      } catch (error) {
        console.error("Error marking item as found:", error);
        alert("Failed to mark item as found. Please try again later.");
      }
    } else {
      setError(
        "The email doesn't match the reporter's email. Please try again."
      );
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

            {item.status === "Lost" && !item.isFound ? (
              <div>
                <button
                  onClick={() => handleEmailModalOpen(item)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition mb-4"
                >
                  Mark as Found
                </button>
              </div>
            ) : (
              item.isFound && (
                <p className="text-green-600 font-semibold mb-4">
                  ✅ Item marked as found!
                </p>
              )
            )}

            {/* Hide the "Contact the Reporter" button if the item is found */}
            {!item.isFound && (
              <button
                onClick={() => handleContactClick(item)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Contact the Reporter
              </button>
            )}
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

      {/* Modal for Email Input */}
      {selectedItem && isEmailModalOpen && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={handleEmailModalClose} // Close email modal
          item={selectedItem}
          onSubmit={(email) => handleMarkAsFound(selectedItem, email)} // Trigger mark as found with email validation
          setError={setError}
          error={error} // Pass setError to EmailModal
        />
      )}
    </div>
  );
};

export default LostItemsPage;
