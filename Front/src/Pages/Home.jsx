import React from 'react';
import logo from '../logo.png'; 
import Carousel from '../components/carousel';
import UpcomingEventsCarousel from '../components/UpcomingEventsCarousel';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <img src={logo} alt="University of Ruhuna Logo" className="w-24 h-12" />
              <span className="ml-2 text-white text-2xl font-bold">CampusLink</span>
            </a>
          </div>

          <ul className="flex space-x-6 text-white">
            <li><a href="/" className="hover:text-gray-300 underline">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300 underline">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300 underline">Contact Us</a></li>
            <li><a href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold shadow-lg"> Sign Up </a>
</li>

          </ul>
        </div>
      </nav>

      {/* Carousel Section */}
      <section className="flex-grow">
        <Carousel />
        <UpcomingEventsCarousel/>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-0 mt-auto ">
        <div className="container mx-auto flex justify-between">
          {/* Left Side: Contact Information */}
          <div className="text-sm space-y-2 ml-40">
            <h3 className="text-lg font-semibold">CONTACT</h3>
            <p>UNIVERSITY OF RUHUNA,</p>
            <p>WELLAMADAMA, MATARA, SRI LANKA.</p>
            <p>(+94) 041-2222681 , (+94) 041-2222682</p>
            <p>(+94) 041-2227001 , (+94) 041-2227002</p>
            <p>(+94) 041-2227003 , (+94) 041-2227004</p>
            <p>Fax: (+94) 041-222268</p>
          </div>

          {/* Right Side: Quick Links */}
          <div className="text-lg space-y-3 mr-20">
            <h3 className="text-lg font-semibold">QUICK LINKS</h3>
            <ul>
              <li><a href="#home" className="hover:text-gray-400">Home</a></li>
              <li><a href="#announcements" className="hover:text-gray-400">Announcements</a></li>
              <li><a href="#events" className="hover:text-gray-400">Events</a></li>
              <li><a href="#lost/found" className="hover:text-gray-400">Lost/found</a></li>
              <li><a href="#societies" className="hover:text-gray-400">Clubs & Societies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center text-sm bg-gray-800 py-2">
          © 2024 Department of Computer Science. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
