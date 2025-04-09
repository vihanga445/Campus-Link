import React, { useState } from "react";

// Modal Component for Club Guidelines
const GuidelinesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Club Guidelines</h2>
        <p className="mb-4">
          1. Respect all club members.
          <br />
          2. Participate actively in meetings and events.
          <br />
          3. Follow university policies while representing the club.
          <br />
          4. Adhere to the code of conduct during all activities.
          <br />
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const MembershipForm = ({ clubEmail, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    faculty: "",
    reason: "",
    phone: "",
    yearOfStudy: "",
    guidelinesAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/Back/clubs/register-mail-send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            clubEmail,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log("Email sent successfully:", data); // Set success state to show success message
      } else {
        // Handle failure
        console.error("Failed to send email:", data);
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email. Please try again.");
    }

    setLoading(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 shadow-md bg-white rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Membership Registration
        </h2>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Student ID */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Faculty */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Faculty</label>
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Year of Study */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Year of Study</label>
          <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {/* Why do you want to join this club? */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">
            Why do you want to join this club?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* Guidelines Mention */}
        <div className="mb-4">
          <p className="text-gray-600">
            Before proceeding, please read the{" "}
            <button
              type="button"
              onClick={openModal}
              className="text-blue-500 underline"
            >
              club guidelines
            </button>
            .
          </p>
        </div>

        {/* Agreement on Club Guidelines */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="guidelinesAccepted"
              checked={formData.guidelinesAccepted}
              onChange={handleChange}
              required
              className="mr-2"
            />
            <span className="text-gray-600">
              I agree to follow the club's guidelines
            </span>
          </label>
        </div>

        {/* Submit Button */}
        {!success && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}

        {/* Success Message and Close Button */}
        {success && (
          <div className="mt-4 text-center">
            <p className="text-green-500 mb-4">
              Membership submitted successfully!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        )}
      </form>

      {/* Modal Popup for Guidelines */}
      <GuidelinesModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MembershipForm;
