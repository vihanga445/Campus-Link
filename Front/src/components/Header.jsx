import React, { useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import logo from "../logo.png";
import { signoutSuccess } from "../redux/user/userSlice";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false); // State to toggle the Features dropdown
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleFeatures = () => {
    setFeaturesOpen(!featuresOpen); // Toggle the Features dropdown
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Navigate to the search results page
      setSearchQuery(""); // Clear the search input
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/Back/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-dark-blue py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="University of Ruhuna Logo"
              className="w-24 h-12"
            />
            <span className="ml-2 text-white text-2xl font-bold">
              CampusLink
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-dark-blue rounded-xl px-2 py-2 w-1/5 h-10 mx-6 ml-auto"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-xl text-gray-200 bg-transparent placeholder-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="text-blue-600 hover:text-blue-800 font-bold ml-2"
          >
            <FaSearch className="text-lg" /> {/* Search Icon */}
          </button>
        </form>

        {/* Hamburger Menu Button */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center space-y-6 md:space-y-0 md:space-x-6 ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            {currentUser && (
              <div className="flex items-center gap-4">
                <NotificationBell />
              </div>
            )}
          </li>
          <li>
            <Link to="/" className="text-white hover:text-gray-300 text-lg ">
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleFeatures}
              className="text-white hover:text-gray-300 text-lg focus:outline-none"
            >
              Features
            </button>
            {featuresOpen && (
              <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48">
                <li>
                  <Link
                    to="/events"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setFeaturesOpen(false)} // Close the dropdown
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clubs"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setFeaturesOpen(false)} // Close the dropdown
                  >
                    Clubs and Societies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/announcements"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setFeaturesOpen(false)} // Close the dropdown
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lost-and-founds"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setFeaturesOpen(false)} // Close the dropdown
                  >
                    Lost and Founds
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 text-lg "
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 text-lg "
            >
              Contact Us
            </Link>
          </li>
          <li>
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => navigate("/dashboard?tab=profile")}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link
                to="/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold shadow-lg text-lg"
              >
                Sign Up
              </Link>
            )}
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
