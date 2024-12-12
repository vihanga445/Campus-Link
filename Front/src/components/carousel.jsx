import React, { useState, useEffect } from "react";
import bgImage from "../bcg.jpg";
import eventsImage from "../events.jpg";
import clubsImage from "../clubs.jpg";
import announcementsImage from "../announcements.jpg";
import lostFoundImage from "../lostfound.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      text: "Welcome to CampusLink!",
      button: "Sign In",
      bgImage: bgImage,
    },
    {
      text: "Events on Campus!",
      button: "Events",
      bgImage: eventsImage,
    },
    {
      text: "Find Your Community!",
      button: "Clubs & Societies",
      bgImage: clubsImage,
    },
    {
      text: "Stay Informed!",
      button: "Announcements",
      bgImage: announcementsImage,
    },
    {
      text: "Reunite with Your Belongings!",
      button: "Lost/Found",
      bgImage: lostFoundImage,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((slide, index) => (
            <div
              key={index}
              className="w-full h-screen flex-shrink-0 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="text-center text-white bg-opacity-20">
                <h1 className="text-6xl font-bold">{slide.text}</h1>
                {index === 0 && (
                  <p className="mt-2 text-2xl font-light-bold">
                    Connect with your university like never before.
                  </p>
                )}
                {index === 1 && (
                 <p className="mt-2 text-2xl font-light-bold">
                     See what is happening around campus
                  </p>
                )}
                {index === 2 && (
                 <p className="mt-2 text-2xl font-light-bold">
                     Find your tribe and grow together
                  </p>
                )}
                {index === 3 && (
                 <p className="mt-2 text-2xl font-light-bold">
                     Get the latest news and updates here.
                  </p>
                )}
                {index === 4 && (
                 <p className="mt-2 text-2xl font-light-bold">
                     Lost something? We're here to help!
                  </p>
                )}
                <button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white py-2 px-6 rounded-lg text-lg">
                  {slide.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left and Right Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
        onClick={prevSlide}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
        onClick={nextSlide}
      >
        &#8250;
      </button>

      {/* Down Arrow to Indicate Scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white">
        <a href="#content" className="text-3xl">
          &#8595;
        </a>
      </div>
    </div>
  );
};

export default Carousel;
