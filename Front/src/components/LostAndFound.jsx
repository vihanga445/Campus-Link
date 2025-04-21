import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LostAndFoundSection = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const lostCarouselRef = useRef(null);
  const foundCarouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLostAndFoundItems = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/Back/lostfound/approved"
        );
        const data = await res.json();
        if (res.ok) {
          // Filter items based on their status
          const filteredLostItems = data.filter(
            (item) => item.status === "Lost"
          );
          const filteredFoundItems = data.filter(
            (item) => item.status === "Found"
          );

          setLostItems(filteredLostItems || []);
          setFoundItems(filteredFoundItems || []);
        } else {
          console.error("Failed to fetch items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchLostAndFoundItems();
  }, []);

  const scrollLeft = (ref) => {
    ref.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-12 px-6">
      <div className="my-12">
        {/* Lost and Found Button */}
        <div className="text-center mb-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-3xl font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate("/lostfound")}
          >
            Lost and Found
          </button>
        </div>

        {/* Lost Items */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Lost Items</h3>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/lostitems")}
            >
              View All Lost Items
            </button>
          </div>
          <div className="relative">
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
              onClick={() => scrollLeft(lostCarouselRef)}
            >
              &#8249;
            </button>

            {/* Carousel */}
            <div
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth no-scrollbar"
              ref={lostCarouselRef}
            >
              {lostItems.length > 0 ? (
                lostItems.map((lost) => (
                  <div
                    key={lost._id}
                    className="flex-none w-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => navigate(`/lostitems/${lost._id}`)} // Navigate to the lost item's page
                  >
                    <img
                      src={lost.imageUrl || "https://via.placeholder.com/150"}
                      alt={lost.itemName}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {lost.itemName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Location:</strong> {lost.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Date:</strong>{" "}
                      {new Date(lost.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lost items available.</p>
              )}
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
              onClick={() => scrollRight(lostCarouselRef)}
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* Found Items */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Found Items</h3>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition"
              onClick={() => navigate("/founditems")}
            >
              View All Found Items
            </button>
          </div>
          <div className="relative">
            {/* Left Arrow */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
              onClick={() => scrollLeft(foundCarouselRef)}
            >
              &#8249;
            </button>

            {/* Carousel */}
            <div
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth no-scrollbar"
              ref={foundCarouselRef}
            >
              {foundItems.length > 0 ? (
                foundItems.map((found) => (
                  <div
                    key={found._id}
                    className="flex-none w-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => navigate(`/founditems/${found._id}`)} // Navigate to the found item's page
                  >
                    <img
                      src={found.imageUrl || "https://via.placeholder.com/150"}
                      alt={found.itemName}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {found.itemName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Location:</strong> {found.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Date:</strong>{" "}
                      {new Date(found.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No found items available.</p>
              )}
            </div>

            {/* Right Arrow */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
              onClick={() => scrollRight(foundCarouselRef)}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundSection;
