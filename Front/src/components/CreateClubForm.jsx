import React, { useState } from "react";

const CreateClubForm = () => {
  const [clubName, setClubName] = useState("");
  const [clubCategory, setClubCategory] = useState("");
  const [applicantDetails, setApplicantDetails] = useState({
    name: "",
    email: "",
    studentID: "",
    contactNo: "",
    department: "",
    faculty: "",
    currentRole: "",
  });
  const [facultyAdvisorDetails, setFacultyAdvisorDetails] = useState({
    name: "",
    facultyName: "",
    advisorRole: "",
    phoneNo: "",
    email: "",
  });
  const [clubPolicies, setClubPolicies] = useState(null);
  const [approvalLetter, setApprovalLetter] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "clubPolicies") {
      setClubPolicies(file);
    } else if (e.target.name === "approvalLetter") {
      setApprovalLetter(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in applicantDetails) {
      setApplicantDetails({ ...applicantDetails, [name]: value });
    } else if (name in facultyAdvisorDetails) {
      setFacultyAdvisorDetails({ ...facultyAdvisorDetails, [name]: value });
    } else {
      setClubName(value);
    }
  };

  const validateForm = () => {
    // Validate all required fields
    if (
      !clubName ||
      !clubCategory ||
      !applicantDetails.name ||
      !applicantDetails.email ||
      !applicantDetails.studentID ||
      !applicantDetails.contactNo ||
      !applicantDetails.department ||
      !applicantDetails.faculty ||
      !applicantDetails.currentRole ||
      !facultyAdvisorDetails.name ||
      !facultyAdvisorDetails.facultyName ||
      !facultyAdvisorDetails.advisorRole ||
      !facultyAdvisorDetails.phoneNo ||
      !facultyAdvisorDetails.email ||
      !clubPolicies ||
      !approvalLetter ||
      !termsAccepted
    ) {
      setErrorMessage(
        "Please fill all the required fields and accept the terms and conditions."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // After validation, set the form as submitted and show popup
      setFormSubmitted(true);
    }
  };

  const handleClosePopup = () => {
    // Close the popup after submission
    setFormSubmitted(false);
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg my-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Create Your Club
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Club Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Name
          </label>
          <input
            type="text"
            name="clubName"
            value={clubName}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Club Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Category
          </label>
          <select
            name="clubCategory"
            value={clubCategory}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          >
            <option value="Sports">Sports and Fitness</option>
            <option value="Academic">Academic</option>
            <option value="Cultural">Cultural</option>
            <option value="Social">Social</option>
            <option value="Social">Spiritual</option>
          </select>
        </div>

        {/* Applicant Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Applicant Details
          </h3>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              value={applicantDetails.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="email"
              name="email"
              value={applicantDetails.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="studentID"
              value={applicantDetails.studentID}
              onChange={handleChange}
              placeholder="Your Student ID"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="contactNo"
              value={applicantDetails.contactNo}
              onChange={handleChange}
              placeholder="Your Contact Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="department"
              value={applicantDetails.department}
              onChange={handleChange}
              placeholder="Your Department"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="faculty"
              value={applicantDetails.faculty}
              onChange={handleChange}
              placeholder="Your Faculty"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <select
              name="currentRole"
              value={applicantDetails.currentRole}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Faculty Advisor Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Faculty Advisor Details
          </h3>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              name="name"
              value={facultyAdvisorDetails.name}
              onChange={(e) =>
                setFacultyAdvisorDetails({
                  ...facultyAdvisorDetails,
                  name: e.target.value,
                })
              }
              placeholder="Advisor Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="facultyName"
              value={facultyAdvisorDetails.facultyName}
              onChange={(e) =>
                setFacultyAdvisorDetails({
                  ...facultyAdvisorDetails,
                  facultyName: e.target.value,
                })
              }
              placeholder="Faculty Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisorRole"
              value={facultyAdvisorDetails.advisorRole}
              onChange={(e) =>
                setFacultyAdvisorDetails({
                  ...facultyAdvisorDetails,
                  advisorRole: e.target.value,
                })
              }
              placeholder="Advisor Role"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="phoneNo"
              value={facultyAdvisorDetails.phoneNo}
              onChange={(e) =>
                setFacultyAdvisorDetails({
                  ...facultyAdvisorDetails,
                  phoneNo: e.target.value,
                })
              }
              placeholder="Advisor Phone Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="email"
              name="email"
              value={facultyAdvisorDetails.email}
              onChange={(e) =>
                setFacultyAdvisorDetails({
                  ...facultyAdvisorDetails,
                  email: e.target.value,
                })
              }
              placeholder="Advisor Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
        </div>

        {/* Upload Club Policies */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Upload Club Policies
          </label>
          <input
            type="file"
            name="clubPolicies"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            accept="image/png, image/jpeg"
            required
          />
        </div>

        {/* Upload Approval Letter */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Upload Approval Letter
          </label>
          <input
            type="file"
            name="approvalLetter"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            accept="image/png, image/jpeg"
            required
          />
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="h-5 w-5 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <span className="ml-2 text-gray-800">
            I accept the Terms and Conditions
          </span>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Club Request
          </button>
        </div>
      </form>

      {/* Popup Confirmation */}
      {formSubmitted && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleClosePopup}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Club Request Submitted Successfully!
            </h3>
            <p className="text-lg text-gray-800 mb-4">
              Your club creation request has been submitted successfully. Our
              team will review your request soon.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateClubForm;
