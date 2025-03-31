import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingClubApprovals = () => {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fileToView, setFileToView] = useState(null);
  const [currentClub, setCurrentClub] = useState(null); // Track current club being viewed

  // Fetch pending clubs data from the backend
  useEffect(() => {
    const fetchPendingClubs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Back/clubs/clubs/pending"
        );
        setPendingClubs(response.data);
      } catch (error) {
        setErrorMessage("Error fetching pending clubs. Please try again.");
        console.error("Error fetching pending clubs:", error);
      }
    };

    fetchPendingClubs();
  }, []);

  // Handle approve club request
  const handleApprove = async (clubId) => {
    try {
      await axios.put(
        `http://localhost:5000/Back/clubs/clubs/${clubId}/approve`
      );
      setPendingClubs(pendingClubs.filter((club) => club._id !== clubId));
    } catch (error) {
      console.error("Error approving club:", error);
    }
  };

  // Handle reject club request
  const handleReject = async (clubId) => {
    try {
      await axios.put(
        `http://localhost:5000/Back/clubs/clubs/${clubId}/reject`
      );
      setPendingClubs(pendingClubs.filter((club) => club._id !== clubId));
    } catch (error) {
      console.error("Error rejecting club:", error);
    }
  };

  // Handle file view in modal
  const handleViewFile = (fileType, club) => {
    setFileToView(fileType);
    setCurrentClub(club); // Set the club for which file is being viewed
    setModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setFileToView(null); // Reset the file to be viewed
    setCurrentClub(null); // Reset the club
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Pending Club Approvals
      </h1>

      {/* Show error message if there's any */}
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-4 rounded-md mb-6 text-center">
          {errorMessage}
        </div>
      )}

      <div className="pending-clubs-list">
        {pendingClubs.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No pending clubs for approval.
          </p>
        ) : (
          pendingClubs.map((club) => (
            <div
              key={club._id}
              className="club-details mb-6 p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {club.clubName}
              </h3>
              <p className="text-gray-600">
                <strong>Category:</strong> {club.clubCategory}
              </p>

              {/* Applicant Details */}
              <h4 className="font-semibold mt-4 text-gray-800">
                Applicant Details
              </h4>
              <p>
                <strong>Name:</strong> {club.applicantDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {club.applicantDetails.email}
              </p>
              <p>
                <strong>Student ID:</strong> {club.applicantDetails.studentID}
              </p>
              <p>
                <strong>Contact No:</strong> {club.applicantDetails.contactNo}
              </p>
              <p>
                <strong>Department:</strong> {club.applicantDetails.department}
              </p>
              <p>
                <strong>Faculty:</strong> {club.applicantDetails.faculty}
              </p>
              <p>
                <strong>Current Role:</strong>{" "}
                {club.applicantDetails.currentRole}
              </p>

              {/* Faculty Advisor Details */}
              <h4 className="font-semibold mt-4 text-gray-800">
                Faculty Advisor Details
              </h4>
              <p>
                <strong>Name:</strong> {club.facultyAdvisorDetails.name}
              </p>
              <p>
                <strong>Faculty:</strong>{" "}
                {club.facultyAdvisorDetails.facultyName}
              </p>
              <p>
                <strong>Role:</strong> {club.facultyAdvisorDetails.advisorRole}
              </p>
              <p>
                <strong>Phone No:</strong> {club.facultyAdvisorDetails.phoneNo}
              </p>
              <p>
                <strong>Email:</strong> {club.facultyAdvisorDetails.email}
              </p>

              {/* Club Policies (Link to open modal) */}
              <h4 className="font-semibold mt-4 text-gray-800">
                Club Policies
              </h4>
              <p>
                <strong>File:</strong>
                <button
                  onClick={() => handleViewFile("policies", club)}
                  className="text-blue-600 underline hover:text-blue-800 transition-all duration-300"
                >
                  View Policies
                </button>
              </p>

              {/* Approval Letter (Link to open modal) */}
              <h4 className="font-semibold mt-4 text-gray-800">
                Approval Letter
              </h4>
              <p>
                <strong>File:</strong>
                <button
                  onClick={() => handleViewFile("approvalLetter", club)}
                  className="text-blue-600 underline hover:text-blue-800 transition-all duration-300"
                >
                  View Approval Letter
                </button>
              </p>

              {/* Accept and Reject Buttons */}
              <div className="mt-6 flex space-x-4 justify-center">
                <button
                  onClick={() => handleApprove(club._id)}
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(club._id)}
                  className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal to display the file */}
      {modalVisible && currentClub && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              View File
            </h2>
            {fileToView === "policies" ? (
              <iframe
                src={currentClub.clubPolicies} // Use dynamic club's policy file
                title="Policies File"
                className="w-full h-96"
                frameBorder="0"
              ></iframe>
            ) : fileToView === "approvalLetter" ? (
              <iframe
                src={currentClub.approvalLetter} // Use dynamic club's approval letter file
                title="Approval Letter"
                className="w-full h-96"
                frameBorder="0"
              ></iframe>
            ) : (
              <p>No file to display</p>
            )}

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingClubApprovals;
