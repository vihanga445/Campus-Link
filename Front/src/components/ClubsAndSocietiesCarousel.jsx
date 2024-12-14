import React, { useRef } from 'react';
import club01 from "../club1.jpg";
import club02 from "../club2.jpg";
import club03 from "../club3.jpg";
import club04 from "../club4.jpg";
import club05 from "../club5.jpg";

const ClubsSocietiesCarousel = () => {
  const clubs = [
    {
      name: "Physics Society- University of Ruhuna",
      image: club01,
      description: "Empowering frontries of physics and unlocking new possibilities",
    },
    {
      name: "Computer Science Students Community",
      image: club02,
      description: "Sri Lanka's southernmost community f tech enthusiasts",
    },
    {
      name: "Buddhist Society FoS-University of Ruhuna",
      image: club03,
      description: "Honesty is the chapter in the book of wisdom",
    },
    {
      name: "Rotaract club of University of Ruhuna",
      image: club04,
      description: "A leader is one who knows the way, goes the way, and shows the way",
    },
    {
      name: "Sports Club of Faculty of Management and Finance",
      image: club05,
      description: "Winning isn't everything, but wanting to win is.",
    },
  ];

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust the scroll distance
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust the scroll distance
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Featured Clubs & Societies</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 opacity-70 transition ml-auto mr-10">
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
          {clubs.map((club, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-4 bg-white shadow-xl rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:translate-y-2 hover:shadow-4xl"
              style={{ width: '300px' }}
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${club.image})` }}
              ></div>
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">{club.name}</h3>
                <p className="text-sm text-gray-600">{club.description}</p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 mt-4">
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
    </div>
  );
};

export default ClubsSocietiesCarousel;
