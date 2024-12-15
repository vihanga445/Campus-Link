import React from 'react';
import banner from '../banner5.jpg';  // Import the background image
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import icons from react-icons

const ContactUs = () => {
  return (
    <div className="relative w-full h-screen bg-blue-900">
      {/* Background Image */}
      <img
        src={banner}
        alt="Contact Us Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay to add transparency to the image */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contact Us content */}
      <div className="relative flex flex-col justify-center items-center h-full text-center text-white">
        {/* Page Title */}
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>

        {/* Contact Information */}
        <div className="space-y-4">
          <p className="text-lg">
            We'd love to hear from you! Whether you have questions, suggestions, or feedback, we're always ready to listen and help. CampusLink was built with the goal of connecting our campus community, and your input is invaluable to making that goal a reality.
            <br />
            Feel free to reach out to us through email, phone, or connect with us on social media. You can also find us on campus, and we're always available for a chat!
          </p>

          <p className="flex justify-center items-center">
            <i className="fas fa-envelope mr-2"></i>
            <a href="mailto:contact@campuslink.com" className="hover:underline">
              contact@campuslink.com
            </a>
          </p>

          <p className="flex justify-center items-center">
            <i className="fas fa-phone-alt mr-2"></i>
            <a href="tel:+123456789" className="hover:underline">
              +123 456 789
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="relative w-full mt-8 h-72 md:w-3/4 lg:w-1/2">
          <iframe
            src="https://maps.google.com/maps?q=University%20of%20Ruhuna&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full rounded-lg"
            allowFullScreen
            loading="lazy"
            title="University of Ruhuna Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
