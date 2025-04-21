import React, { useState } from "react";

const EmailModal = ({
  isOpen,
  onClose,
  onSubmit = () => {},
  item,
  setError,
  error, // Accept error as a prop
}) => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    console.log("Entered email:", email);
    console.log("Reporter email:", item.reporterEmail);
    if (email === item.reporterEmail) {
      onSubmit(email);
      onClose();
      setError(null);
    } else {
      setError("The email doesn't match the reporter's email.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          Mark Item as Found
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Please enter your email to mark this item as found.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-md w-full mb-4"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-between items-center">
          <button
            onClick={handleEmailSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
