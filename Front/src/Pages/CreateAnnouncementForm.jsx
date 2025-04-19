import React, { useState } from "react";

const CreateAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "General",
    priority: "Normal",
    pinned: false,
  });

  const [attachments, setAttachments] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setAttachments(files);

    const previews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewFiles(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("message", formData.message);
    formPayload.append("category", formData.category);
    formPayload.append("priority", formData.priority);
    formPayload.append("pinned", formData.pinned);

    for (let i = 0; i < attachments.length; i++) {
      formPayload.append("attachments", attachments[i]);
    }

    try {
      const response = await fetch("/Back/announcement/create", {
        method: "POST",
        body: formPayload, // Do not set Content-Type — browser sets it automatically for multipart/form-data
      });

      if (response.ok) {
        setSuccessMessage("Announcement created successfully!");
        setFormData({
          title: "",
          message: "",
          category: "General",
          priority: "Normal",
          pinned: false,
        });
        setAttachments([]);
        setPreviewFiles([]);
        setErrorMessage("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create announcement.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the announcement.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Announcement</h2>
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter announcement title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter announcement message"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="pinned" className="block text-sm font-medium text-gray-700 mb-1">
              Pin to Top
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pinned"
                name="pinned"
                checked={formData.pinned}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Check to pin this announcement to the top</span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            <div className="flex flex-wrap gap-4 mt-4">
              {previewFiles.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementForm;