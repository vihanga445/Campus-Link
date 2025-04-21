import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MembershipForm from "../components/MembershipForm";

const ClubsSocietiesCarousel = () => {
  const [clubs, setClubs] = useState([]); // State to store all clubs
  const [selectedClub, setSelectedClub] = useState(null); // State to store the selected club for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const carouselRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch clubs from multiple endpoints
    const fetchClubs = async () => {
      try {
        const sportsClubs = await axios.get(
          "http://localhost:5000/Back/clubs/clubs/Sports"
        );
        const culturalClubs = await axios.get(
          "http://localhost:5000/Back/clubs/clubs/Cultural"
        );
        const academicClubs = await axios.get(
          "http://localhost:5000/Back/clubs/clubs/Academic"
        );

        // Combine all clubs into a single array
        const allClubs = [
          ...sportsClubs.data,
          ...culturalClubs.data,
          ...academicClubs.data,
        ];

        setClubs(allClubs); // Set the combined data to state
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust the scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust the scroll distance
      behavior: "smooth",
    });
  };

  const openModal = (club) => {
    setSelectedClub(club); // Set the selected club
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedClub(null); // Clear the selected club
    setIsModalOpen(false); // Close the modal
  };

  const navigateToAllClubs = () => {
    navigate("/clubs"); // Navigate to the "All Clubs" page
  };

  return (
    <div className="relative my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Featured Clubs & Societies</h2>
        <button
          className="bg-blue-800 text-white py-2 px-4 rounded-lg shadow-lg transition ml-auto mr-10"
          onClick={navigateToAllClubs} // Navigate to "All Clubs" page
        >
          See All Clubs
        </button>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollLeft}
        >
          &#8249;
        </button>

        {/* Carousel Container */}
        <div
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
          ref={carouselRef}
        >
          {clubs.map((club) => (
            <div
              key={club.clubId} // Use clubId as the unique key
              className="w-full flex-shrink-0 p-4 bg-white shadow-xl rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:translate-y-2 hover:shadow-4xl"
              style={{ width: "300px" }}
            >
              {/* Club Cover Photo */}
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    club.clubCoverPhoto || "./src/default-club.jpg"
                  })`, // Fallback image
                }}
              ></div>

              {/* Club Details */}
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">{club.clubName}</h3>{" "}
                {/* Club Name */}
                <p className="text-sm text-gray-600">
                  {club.clubDescription?.substring(0, 100) ||
                    "No description provided."}
                </p>
                <button
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 mt-4"
                  onClick={() => openModal(club)} // Open modal with the selected club
                >
                  Get Membership
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollRight}
        >
          &#8250;
        </button>
      </div>

      {/* Membership Form Modal */}
      {isModalOpen && selectedClub && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={closeModal} // Close modal when clicking outside the form
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
              Membership Form
            </h3>
            {/* Membership Form Component */}
            <MembershipForm
              clubEmail={selectedClub.clubEmail} // Pass clubEmail to the form
              onClose={closeModal} // Close modal after submission
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubsSocietiesCarousel;
