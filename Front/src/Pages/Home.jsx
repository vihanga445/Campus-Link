import React from "react";
import Carousel from "../components/carousel";
import UpcomingEventsCarousel from "../components/UpcomingEventsCarousel";
import ClubsAndSocietiesCarousel from "../components/ClubsAndSocietiesCarousel";
import AnnouncementsCarousel from "../components/AnnouncementsCarousel";
import LostAndFound from "../components/LostAndFound";
import Dummy from "../components/Dummy.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import image from "../logo-transparent.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Carousel Section */}
      <section className="flex-grow">
        <Carousel />
        <Dummy />
        <ClubsAndSocietiesCarousel />
        <AnnouncementsCarousel />
        <LostAndFound />
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 px-6">
          {/* Left Side: Contact Information */}
          <div className="text-sm space-y-2">
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-1">
              CONTACT
            </h3>
            <p>UNIVERSITY OF RUHUNA,</p>
            <p>WELLAMADAMA, MATARA, SRI LANKA.</p>
            <p>(+94) 041-2222681 , (+94) 041-2222682</p>
            <p>(+94) 041-2227001 , (+94) 041-2227002</p>
            <p>(+94) 041-2227003 , (+94) 041-2227004</p>
            <p>Fax: (+94) 041-222268</p>
          </div>

          {/* Center: Logo, Tagline, and Social Media Icons */}
          <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <img src={image} alt="University of Ruhuna Logo" className="h-32" />
            {/* Tagline */}
            <p className="text-sm italic text-gray-300">
              "Knowledge is the key to success"
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-3xl" />
              </a>
            </div>
            {/* Call-to-Action Button */}
            <a
              href="/contact"
              className="bg-dark-blue text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              <u>Contact Us</u>
            </a>
          </div>

          {/* Right Side: Quick Links */}
          <div className="text-lg space-y-2">
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 pb-1">
              QUICK LINKS
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/announcements"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Announcements
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/lostfound"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Lost/Found
                </a>
              </li>
              <li>
                <a
                  href="/clubs"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Clubs & Societies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm bg-dark-blue py-2">
          <p className="text-gray-400">
            © 2024 Department of Computer Science. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
