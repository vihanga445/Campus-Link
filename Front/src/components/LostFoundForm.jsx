import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LostFoundForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialStatus = queryParams.get("status") || "Lost";

  const [status, setStatus] = useState(initialStatus);
  const [itemName, setItemName] = useState(""); // New field for item name
  const [reporterName, setReporterName] = useState(""); // New field for reporter name
  const [reporterEmail, setReporterEmail] = useState(""); // New field for reporter email
  const [locationInput, setLocationInput] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const categories = [
    { name: "Wallets", icon: "💳" },
    { name: "ID", icon: "🆔" },
    { name: "Phones", icon: "📱" },
    { name: "Accessories", icon: "🎧" },
    { name: "Books", icon: "📚" },
    { name: "Other", icon: "📦" },
  ];

  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please upload an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "campuslink"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dou5cuqjs/image/upload", // Replace with your Cloudinary URL
        formData
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    if (
      !itemName ||
      !reporterName ||
      !reporterEmail ||
      !locationInput ||
      !category ||
      !date ||
      !description
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Set loading to true

    // Upload the image to Cloudinary
    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) {
      setLoading(false); // Stop loading if image upload fails
      return;
    }

    // Prepare form data
    const formData = {
      status, // Lost or Found
      itemName, // Name of the item
      reporterName, // Name of the reporter
      reporterEmail, // Email of the reporter
      location: locationInput,
      date,
      category,
      description,
      imageUrl: uploadedImageUrl,
      moderationStatus: "Pending", // Default moderation status
    };

    // Log the form data before sending
    console.log("Form Data to be sent:", formData);

    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:5000/Back/lostfound", // Replace with your backend API endpoint
        formData
      );

      // Log the backend response
      console.log("Backend Response:", response);

      if (response.status === 201) {
        toast.success(
          "Item successfully reported! Awaiting moderator approval."
        );
        setTimeout(() => navigate("/lostfound"), 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleStatusToggle = (newStatus) => {
    setStatus(newStatus);
    navigate(`/lostfoundform?status=${newStatus}`); // Update the URL query parameter
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
      <ToastContainer /> {/* Toast container for notifications */}
      <h2 className="text-2xl font-bold mb-4 text-center">Report an Item</h2>
      {/* Status */}
      <div className="flex justify-center gap-4 mb-4">
        {["Lost", "Found"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md font-semibold ${
              status === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleStatusToggle(type)}
          >
            I have {type.toLowerCase()}
          </button>
        ))}
      </div>
      {/* Item Name */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Item Name *</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter the name of the item"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* Reporter Name */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Your Name *</label>
        <input
          type="text"
          value={reporterName}
          onChange={(e) => setReporterName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* Reporter Email */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Your Email *</label>
        <input
          type="email"
          value={reporterEmail}
          onChange={(e) => setReporterEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* Location */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Where? *</label>
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Enter the location"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* Date */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">When? *</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* Category */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select a category *</label>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`cursor-pointer p-3 border rounded-xl text-center ${
                category === cat.name ? "bg-blue-100 border-blue-500" : ""
              }`}
            >
              <div className="text-3xl mb-1">{cat.icon}</div>
              <span className="text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Item Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the item"
          className="w-full p-2 border rounded-md"
          rows="4"
          required
        ></textarea>
      </div>
      {/* Image Upload */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Upload an Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
        onClick={handleSubmit}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Submitting..." : "Add my item"}
      </button>
    </div>
  );
};

export default LostFoundForm;
