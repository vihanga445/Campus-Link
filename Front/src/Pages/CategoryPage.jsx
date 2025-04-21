import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactModal from "../components/ContactModal"; // Import the ContactModal component
import EmailModal from "../components/EmailModal"; // Import the EmailModal component

export default function CategoryPage() {
  const { category } = useParams(); // Get the category from the route
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // Track the email modal state
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null); // Track error for email validation
  const lostItems = items.filter((item) => item.status === "Lost");
  const foundItems = items.filter((item) => item.status === "Found");

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Back/lostfound/approved` // Replace with your backend API endpoint
        );
        const approvedItems = response.data;

        // Filter items by category
        const filteredItems = approvedItems.filter(
          (item) => item.category === category
        );
        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching category items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [category]);

  const handleContactClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleEmailModalOpen = (item) => {
    setSelectedItem(item);
    setIsEmailModalOpen(true); // Open the email modal
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false); // Close the email modal
    setSelectedItem(null);
    setError(null); // Clear any previous error
  };

  const handleMarkAsFound = async (item, email) => {
    if (email === item.reporterEmail) {
      try {
        const response = await axios.post(
          `http://localhost:5000/Back/lostfound/${item._id}/mark-found`
        );

        if (response.status === 200) {
          // Update the item in state: set isFound to true
          setItems((prevItems) =>
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

  const handleMarkAsReturned = async (item, email) => {
    if (email === item.reporterEmail) {
      try {
        const response = await axios.post(
          `http://localhost:5000/Back/lostfound/${item._id}/mark-returned`
        );

        if (response.status === 200) {
          // Update the item in state: set isReturned to true
          setItems((prevItems) =>
            prevItems.map((i) =>
              i._id === item._id ? { ...i, isReturned: true } : i
            )
          );
          setIsEmailModalOpen(false);
          setSelectedItem(null);
          setError(null); // Clear any previous error
        }
      } catch (error) {
        console.error("Error marking item as returned:", error);
        alert("Failed to mark item as returned. Please try again later.");
      }
    } else {
      setError("The email doesn't match the reporter's email.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading items...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          No Items Found in {category}
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
        Items in {category}
      </h1>

      {/* Lost Items Section */}
      {lostItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-6">
            Lost Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lostItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.itemName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {item.itemName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Description:</strong> {item.description}
                </p>

                {/* Mark as Found Button */}
                {!item.isFound && (
                  <button
                    onClick={() => handleEmailModalOpen(item)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition mb-4"
                  >
                    Mark as Found
                  </button>
                )}

                {/* Contact the Reporter Button */}
                {!item.isFound && (
                  <button
                    onClick={() => handleContactClick(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition mt-4"
                  >
                    Contact the Reporter
                  </button>
                )}

                {/* Item Found Message */}
                {item.isFound && (
                  <p className="text-green-600 font-semibold mb-4">
                    ✅ Item marked as found!
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Found Items Section */}
      {foundItems.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-6">
            Found Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.itemName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {item.itemName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Description:</strong> {item.description}
                </p>

                {/* Mark as Returned Button */}
                {!item.isReturned && (
                  <button
                    onClick={() => handleEmailModalOpen(item)} // Open the email modal
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition mb-4"
                  >
                    Mark as Returned
                  </button>
                )}

                {/* Contact the Reporter Button */}
                {!item.isReturned && (
                  <button
                    onClick={() => handleContactClick(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                    Contact the Reporter
                  </button>
                )}

                {/* Item Returned Message */}
                {item.isReturned && (
                  <p className="text-green-600 font-semibold mt-4">
                    ✅ Item marked as returned!
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Modal */}
      {selectedItem && (
        <ContactModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
          reporterEmail={selectedItem.reporterEmail}
        />
      )}

      {/* Email Modal */}
      {selectedItem && isEmailModalOpen && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={handleEmailModalClose}
          item={selectedItem}
          onSubmit={(email) =>
            selectedItem.status === "Lost"
              ? handleMarkAsFound(selectedItem, email)
              : handleMarkAsReturned(selectedItem, email)
          }
          setError={setError}
          error={error}
          title={
            selectedItem.status === "Lost"
              ? "Mark Item as Found"
              : "Mark Item as Returned"
          }
          description={
            selectedItem.status === "Lost"
              ? "Please enter your email to mark this item as found."
              : "Please enter your email to mark this item as returned."
          }
        />
      )}
    </div>
  );
}
