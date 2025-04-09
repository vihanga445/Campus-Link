import React, { useState } from "react";
import axios from "axios";

const CreateClubForm = () => {
  const [clubName, setClubName] = useState("");
  const [clubCategory, setClubCategory] = useState("");
  const [clubEmail, setClubEmail] = useState(""); // New state for club email
  const [clubCoverPhoto, setClubCoverPhoto] = useState(null); // New state for club cover photo
  const [clubBannerPhoto, setClubBannerPhoto] = useState(null); // New state for club banner photo
  const [clubDescription, setClubDescription] = useState(""); // New state for club description
  const [clubTagline, setClubTagline] = useState(""); // New state for club tagline
  const [clubHistory, setClubHistory] = useState(""); // New state for club history
  const [clubKeyMembers, setClubKeyMembers] = useState([
    { name: "", role: "", imageUrl: "" },
  ]);
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
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
  });
  const [clubPolicies, setClubPolicies] = useState(null);
  const [approvalLetter, setApprovalLetter] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "clubCoverPhoto") {
      setClubCoverPhoto(file); // Update clubCoverPhoto state
    } else if (e.target.name === "clubBannerPhoto") {
      setClubBannerPhoto(file); // Update clubBannerPhoto state
    } else if (e.target.name === "clubPolicies") {
      setClubPolicies(file); // Update clubPolicies state
    } else if (e.target.name === "approvalLetter") {
      setApprovalLetter(file); // Update approvalLetter state
    }
  };

  const handleClubNameChange = (e) => {
    setClubName(e.target.value);
  };

  const handleClubCategoryChange = (e) => {
    setClubCategory(e.target.value);
  };

  const handleClubEmailChange = (e) => {
    setClubEmail(e.target.value); // Update club email state
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

  const handleKeyMemberChange = async (index, field, value) => {
    const updatedMembers = [...clubKeyMembers];

    if (field === "imageUrl" && value instanceof File) {
      // Upload the file to Cloudinary or another server
      const uploadedImageUrl = await uploadToCloudinary(
        value,
        "key_member_images"
      );
      updatedMembers[index][field] = uploadedImageUrl; // Set the uploaded image URL
    } else {
      updatedMembers[index][field] = value; // Update other fields
    }

    setClubKeyMembers(updatedMembers);
  };

  const addKeyMember = () => {
    setClubKeyMembers([
      ...clubKeyMembers,
      { name: "", role: "", imageUrl: "" },
    ]);
  };

  const removeKeyMember = (index) => {
    const updatedMembers = clubKeyMembers.filter((_, i) => i !== index);
    setClubKeyMembers(updatedMembers);
  };

  const validateForm = () => {
    if (
      !socialMediaLinks.facebook ||
      !socialMediaLinks.twitter ||
      !socialMediaLinks.linkedin
    ) {
      setErrorMessage("Please fill in all the required social media links.");
      return false;
    }
    if (
      !clubName ||
      !clubCategory ||
      !clubEmail ||
      !clubDescription ||
      !clubTagline ||
      !clubHistory ||
      !clubCoverPhoto ||
      clubKeyMembers.some(
        (member) => !member.name || !member.role || !member.imageUrl
      ) ||
      !socialMediaLinks.facebook ||
      !socialMediaLinks.twitter ||
      !socialMediaLinks.linkedin ||
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
      !clubBannerPhoto ||
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

  const uploadToCloudinary = async (file, folder) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "campuslink");
    cloudinaryFormData.append("folder", folder);

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dou5cuqjs/image/upload",
      cloudinaryFormData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    try {
      // Upload images to Cloudinary
      const uploadedCoverPhoto = clubCoverPhoto
        ? await uploadToCloudinary(clubCoverPhoto, "club_cover_photos")
        : null;

      const uploadedBannerPhoto = clubBannerPhoto
        ? await uploadToCloudinary(clubBannerPhoto, "club_banner_photos")
        : null;

      const uploadedPolicies = clubPolicies
        ? await uploadToCloudinary(clubPolicies, "club_policies")
        : null;

      const uploadedApprovalLetter = approvalLetter
        ? await uploadToCloudinary(approvalLetter, "approval_letters")
        : null;

      // Upload key member images to Cloudinary
      const uploadedKeyMembers = await Promise.all(
        clubKeyMembers.map(async (member) => {
          if (member.imageUrl instanceof File) {
            const uploadedImageUrl = await uploadToCloudinary(
              member.imageUrl,
              "key_member_images"
            );
            return { ...member, imageUrl: uploadedImageUrl };
          }
          return member; // If imageUrl is already a URL, keep it as is
        })
      );

      // Prepare FormData
      const formData = new FormData();
      formData.append("clubName", clubName);
      formData.append("clubCategory", clubCategory);
      formData.append("clubEmail", clubEmail);
      formData.append("clubDescription", clubDescription);
      formData.append("clubTagline", clubTagline);
      formData.append("clubHistory", clubHistory);
      formData.append("clubCoverPhoto", uploadedCoverPhoto);
      formData.append("clubBannerPhoto", uploadedBannerPhoto);
      formData.append("clubPolicies", uploadedPolicies);
      formData.append("approvalLetter", uploadedApprovalLetter);
      formData.append("termsAccepted", termsAccepted);

      for (const key in applicantDetails) {
        formData.append(`a_${key}`, applicantDetails[key]);
      }
      for (const key in facultyAdvisorDetails) {
        formData.append(`f_${key}`, facultyAdvisorDetails[key]);
      }
      formData.append("clubKeyMembers", JSON.stringify(uploadedKeyMembers));
      formData.append("socialMediaLinks", JSON.stringify(socialMediaLinks));

      console.log("FormData being sent:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Submit the form to the backend
      const response = await axios.post(
        "http://localhost:5000/Back/clubs/clubs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setFormSubmitted(true); // Show success popup
        console.log("Form successfully submitted:", response.data);
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setErrorMessage(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
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
            <option value="Creative">Creative</option>
          </select>
        </div>

        {/* Club Email */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Email
          </label>
          <input
            type="email"
            name="clubEmail"
            value={clubEmail}
            onChange={handleClubEmailChange} // Handle email change
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Club Cover Photo */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Cover Photo
          </label>
          <input
            type="file"
            name="clubCoverPhoto"
            accept="image/*"
            onChange={handleFileChange} // Handle cover photo change
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Club Banner Photo */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Banner Photo
          </label>
          <input
            type="file"
            name="clubBannerPhoto"
            accept="image/*"
            onChange={handleFileChange} // Handle banner photo change
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Club Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Description
          </label>
          <textarea
            name="clubDescription"
            value={clubDescription}
            onChange={(e) => setClubDescription(e.target.value)} // Update club description state
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows="4"
            placeholder="Describe your club's purpose, activities, and goals"
            required
          ></textarea>
        </div>

        {/* Club Tagline */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Tagline
          </label>
          <input
            type="text"
            name="clubTagline"
            value={clubTagline}
            onChange={(e) => setClubTagline(e.target.value)} // Update club tagline state
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your club's tagline"
            required
          />
        </div>

        {/* Club History */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club History
          </label>
          <textarea
            name="clubHistory"
            value={clubHistory}
            onChange={(e) => setClubHistory(e.target.value)} // Update club history state
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows="4"
            placeholder="Provide a brief history of your club"
            required
          ></textarea>
        </div>

        {/* Club Key Members */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Club Key Members
          </h3>
          {clubKeyMembers.map((member, index) => (
            <div key={index} className="space-y-4 mt-4 border p-4 rounded-lg">
              <input
                type="text"
                placeholder="Member Name"
                value={member.name}
                onChange={(e) =>
                  handleKeyMemberChange(index, "name", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="text"
                placeholder="Member Role"
                value={member.role}
                onChange={(e) =>
                  handleKeyMemberChange(index, "role", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              {/* Image URL */}
              <div>
                <label className="block text-lg font-semibold text-gray-800">
                  Member Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleKeyMemberChange(index, "imageUrl", e.target.files[0])
                  } // Pass the file
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeKeyMember(index)}
                className="text-red-500 hover:underline"
              >
                Remove Member
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addKeyMember}
            className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Add Key Member
          </button>
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
              placeholder="Faculty Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisor_advisorRole"
              value={facultyAdvisorDetails.advisorRole}
              onChange={handleChange}
              placeholder="Advisor's Role"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="text"
              name="advisor_phoneNo"
              value={facultyAdvisorDetails.phoneNo}
              onChange={handleChange}
              placeholder="Advisor's Phone Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="email"
              name="advisor_email"
              value={facultyAdvisorDetails.email}
              onChange={handleChange}
              placeholder="Advisor's Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
        </div>

        {/* Club Policies and Approval Letter */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Club Policies (PDF)
          </label>
          <input
            type="file"
            name="clubPolicies"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-800">
            Approval Letter (PDF)
          </label>
          <input
            type="file"
            name="approvalLetter"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Social Media Links */}
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-800">
                Facebook Link
              </label>
              <input
                type="url"
                name="facebook"
                value={socialMediaLinks.facebook}
                onChange={(e) =>
                  setSocialMediaLinks({
                    ...socialMediaLinks,
                    facebook: e.target.value,
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter Facebook profile or page link"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">
                Twitter Link
              </label>
              <input
                type="url"
                name="twitter"
                value={socialMediaLinks.twitter}
                onChange={(e) =>
                  setSocialMediaLinks({
                    ...socialMediaLinks,
                    twitter: e.target.value,
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter Twitter profile link"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800">
                LinkedIn Link
              </label>
              <input
                type="url"
                name="linkedin"
                value={socialMediaLinks.linkedin}
                onChange={(e) =>
                  setSocialMediaLinks({
                    ...socialMediaLinks,
                    linkedin: e.target.value,
                  })
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter LinkedIn profile or page link"
                required
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="mr-2"
          />
          <span className="text-lg">I accept the club's guidelines.</span>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Submit Form"}
          </button>
        </div>
      </form>

      {/* Form Submission Success Popup */}
      {formSubmitted && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-center text-green-500">
              Form Submitted Successfully!
            </h3>
            <p className="text-lg text-center mt-4">
              Your club creation request is under review.
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
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
