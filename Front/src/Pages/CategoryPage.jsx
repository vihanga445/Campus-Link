import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactModal from "../components/ContactModal"; // Import the ContactModal component

export default function CategoryPage() {
  const { category } = useParams(); // Get the category from the route
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
                <button
                  onClick={() => handleContactClick(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Contact the Reporter
                </button>
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
                <button
                  onClick={() => handleContactClick(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Contact the Reporter
                </button>
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
    </div>
  );
}
