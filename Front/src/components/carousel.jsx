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
              aria-label={slide.text}
            >
              <div className="text-center text-white bg-opacity-20 p-4">
                <h1 className="text-4xl md:text-6xl font-bold">{slide.text}</h1>
                <p className="mt-2 text-lg md:text-2xl font-light-bold">
                  {index === 0 && "Connect with your university like never before."}
                  {index === 1 && "See what is happening around campus."}
                  {index === 2 && "Find your tribe and grow together."}
                  {index === 3 && "Get the latest news and updates here."}
                  {index === 4 && "Lost something? We're here to help!"}
                </p>
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white w-12 h-12 text-3xl rounded-md opacity-75 hover:opacity-100 flex items-center justify-center"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white w-12 h-12 text-3xl rounded-md opacity-75 hover:opacity-100 flex items-center justify-center"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &#8250;
      </button>

      {/* Smart Down Arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#content" aria-label="Scroll down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
