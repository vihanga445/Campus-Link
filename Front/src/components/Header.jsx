import React, { useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../logo.png";
import { signoutSuccess } from "../redux/user/userSlice";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    <nav className="bg-blue-900 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="#home" className="flex items-center">
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
            <Link
              to="/"
              className="text-white hover:text-gray-300 text-lg underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/fearures"
              className="text-white hover:text-gray-300 text-lg underline"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 text-lg underline"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 text-lg underline"
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
