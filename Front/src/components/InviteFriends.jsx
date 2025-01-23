import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import image1 from '../invite.jpg';

export default function InviteFriends() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();

    if (email) {
      try {
        const response = await fetch('http://localhost:5000/Back/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(`Invitation sent to ${email}`);
          setEmail(''); // Clear input field
        } else {
          setMessage(data.message || 'Error sending invite');
        }
      } catch (error) {
        setMessage('Error sending invite');
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Gradient Background with Invite Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-indigo-500 via-blue-900 to-white-400 flex items-center justify-center p-8">
        <motion.div
          className="max-w-lg w-full space-y-6 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Invite Your Friends</h2>

          <motion.form
            onSubmit={handleInvite}
            className="space-y-6"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Friend's Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Send Invite
            </motion.button>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </motion.form>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 text-center">Or Share via:</h3>
            <div className="flex gap-6 justify-center mt-4">
              {/* Facebook Button */}
              <motion.button
                className="flex items-center gap-3 bg-blue-900 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-facebook-f text-xl"></i> Facebook
              </motion.button>

              {/* Twitter Button */}
              <motion.button
                className="flex items-center gap-3 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-500 focus:ring-4 focus:ring-blue-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-twitter text-xl"></i> Twitter
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: White Background with Image */}
      <div className="hidden lg:block w-1/2 bg-white flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.img
            src={image1}
            alt="Invite Illustration"
            className="w-[1000px] h-auto object-contain mx-14 rounded-lg transition-transform transform hover:scale-110"
            initial={{ opacity: 0, x: '100%' }}  // Start from the right side (off-screen)
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.0, ease: 'easeOut', type: 'spring', stiffness: 100, damping: 20 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
