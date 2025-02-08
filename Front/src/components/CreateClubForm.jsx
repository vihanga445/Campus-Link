import React, { useState } from "react";
import axios from "axios";

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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "clubPolicies") {
      setClubPolicies(file);
    } else if (e.target.name === "approvalLetter") {
      setApprovalLetter(file);
    }
  };

  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleClubCategoryChange = (e) => {
    setClubCategory(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("applicant_")) {
      // Update applicant details
      const applicantField = name.replace("applicant_", "");
      setApplicantDetails((prevDetails) => ({
        ...prevDetails,
        [applicantField]: value,
      }));
    } else if (name.startsWith("advisor_")) {
      // Update faculty advisor details
      const advisorField = name.replace("advisor_", "");
      setFacultyAdvisorDetails((prevDetails) => ({
        ...prevDetails,
        [advisorField]: value,
      }));
    }
  };

  const validateForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("clubName", clubName);
      formData.append("clubCategory", clubCategory);
      for (const key in applicantDetails) {
        formData.append(`a_${key}`, applicantDetails[key]);
      }
      for (const key in facultyAdvisorDetails) {
        formData.append(`f_${key}`, facultyAdvisorDetails[key]);
      }
      formData.append("clubPolicies", clubPolicies);
      formData.append("approvalLetter", approvalLetter);
      formData.append("termsAccepted", termsAccepted);

      try {
        const response = await axios.post(
          "http://localhost:5000/Back/clubs/clubs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFormSubmitted(true);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error ||
            "Failed to submit the form. Please try again."
        );
      }
    }
  };

  const handleClosePopup = () => {
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
            onChange={handleClubNameChange}
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
            onChange={handleClubCategoryChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          >
            <option value="">Select a Category</option>
            <option value="Sports">Sports and Fitness</option>
            <option value="Academic">Academic</option>
            <option value="Cultural">Cultural</option>
            <option value="Social">Social</option>
            <option value="Spiritual">Spiritual</option>
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
              name="applicant_name"
              value={applicantDetails.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="email"
              name="applicant_email"
              value={applicantDetails.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="applicant_studentID"
              value={applicantDetails.studentID}
              onChange={handleChange}
              placeholder="Your Student ID"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="applicant_contactNo"
              value={applicantDetails.contactNo}
              onChange={handleChange}
              placeholder="Your Contact Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="applicant_department"
              value={applicantDetails.department}
              onChange={handleChange}
              placeholder="Your Department"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="applicant_faculty"
              value={applicantDetails.faculty}
              onChange={handleChange}
              placeholder="Your Faculty"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="applicant_currentRole"
              value={applicantDetails.currentRole}
              onChange={handleChange}
              placeholder="Your Current Role"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
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
              name="advisor_name"
              value={facultyAdvisorDetails.name}
              onChange={handleChange}
              placeholder="Faculty Advisor Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisor_facultyName"
              value={facultyAdvisorDetails.facultyName}
              onChange={handleChange}
              placeholder="Faculty Advisor's Faculty"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisor_advisorRole"
              value={facultyAdvisorDetails.advisorRole}
              onChange={handleChange}
              placeholder="Faculty Advisor's Role"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisor_phoneNo"
              value={facultyAdvisorDetails.phoneNo}
              onChange={handleChange}
              placeholder="Faculty Advisor's Phone Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="email"
              name="advisor_email"
              value={facultyAdvisorDetails.email}
              onChange={handleChange}
              placeholder="Faculty Advisor's Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
        </div>

        {/* Club Policies */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Policies (PNG, JPEG, JPG, PDF files)
          </label>
          <input
            type="file"
            name="clubPolicies"
            accept=".png,.jpeg,.jpg,.pdf"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Approval Letter */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Approval Letter (PNG, JPEG, JPG, PDF files)
          </label>
          <input
            type="file"
            name="approvalLetter"
            accept=".png,.jpeg,.jpg,.pdf"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-6 w-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <label className="text-lg font-semibold text-gray-800">
            I accept the terms and conditions.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>

      {/* Success Popup */}
      {formSubmitted && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">
              Form Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-800 mb-6">
              Your club creation request has been submitted for approval.
            </p>
            <button
              onClick={handleClosePopup}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
