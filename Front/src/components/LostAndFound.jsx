import React from "react";

const LostAndFoundSection = () => {
  const lostItems = [
    {
      item: "Black Leather Wallet",
      location: "Near University Library",
      description: "Contains student ID and credit cards.",
      date: "December 12, 2024",
    },
    {
      item: "Silver MacBook Pro",
      location: "CS Lab, Room 204",
      description: "Has a sticker with 'Code Warriors'.",
      date: "December 11, 2024",
    },
    {
      item: "Physics Notebook",
      location: "Cafeteria",
      description: "Black spiral notebook with important notes.",
      date: "December 10, 2024",
    },
  ];

  const foundItems = [
    {
      item: "Blue Water Bottle",
      location: "Gym Locker Room",
      description: "Blue water bottle with 'Nike' logo.",
      date: "December 12, 2024",
    },
    {
      item: "Wireless Earbuds",
      location: "Bus Stop",
      description: "White AirPods case with initials 'A.M.'",
      date: "December 11, 2024",
    },
    {
      item: "Sports Jacket",
      location: "Basketball Court",
      description: "Red jacket, size M, left after practice.",
      date: "December 10, 2024",
    },
  ];

  return (
    <div className=" py-12 px-6">
      <div className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Lost and Found</h2>

        {/* Lost Items */}
        <div className=" mb-10">
          <h3 className="text-2xl font-semibold mb-6">Lost Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostItems.map((lost, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <p className="font-bold text-lg">{lost.item}</p>
                <p className="text-gray-700 mt-2">{lost.location}</p>
                <p className="text-gray-700 mt-1">{lost.description}</p>
                <p className="text-gray-500 mt-2">Date: {lost.date}</p>
                <button className="mt-4 text-blue-600 font-semibold">View Lost Item</button>
              </div>
            ))}
          </div>
        </div>

        {/* Found Items */}
        <div>
          <h3 className=" text-2xl font-semibold mb-6">Found Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundItems.map((found, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <p className="font-bold text-lg">{found.item}</p>
                <p className="text-gray-700 mt-2">{found.location}</p>
                <p className="text-gray-700 mt-1">{found.description}</p>
                <p className="text-gray-500 mt-2">Date: {found.date}</p>
                <button className="mt-4 text-green-600 font-semibold">View Found Item</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundSection;
