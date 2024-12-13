import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-900 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="#home" className="flex items-center">
            <img src={logo} alt="University of Ruhuna Logo" className="w-24 h-12" />
            <span className="ml-2 text-white text-2xl font-bold">CampusLink</span>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Navigation Links */}
        <ul
          className={`fixed md:static top-0 left-0 w-full md:w-auto bg-blue-900 md:bg-transparent h-screen md:h-auto flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 transition-transform transform md:translate-x-0 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative z-40`}
        >
          <li><Link to="/" className="text-white hover:text-gray-300 text-lg underline">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-300 text-lg underline">About Us</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-300 text-lg underline">Contact Us</Link></li>
          <li>
            <Link
              to="/sign-up"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold shadow-lg text-lg"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for menu on mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
