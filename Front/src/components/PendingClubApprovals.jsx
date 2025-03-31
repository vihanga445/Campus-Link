import { useEffect, useState } from "react";

export default function PendingClubApprovals() {
  const [pendingClubs, setPendingClubs] = useState([]);

  useEffect(() => {
    const fetchPendingClubs = async () => {
      try {
        const response = await fetch("/Back/clubs/pending");
        const data = await response.json();
        setPendingClubs(data);
      } catch (error) {
        console.error("Error fetching pending clubs:", error);
      }
    };

    fetchPendingClubs();
  }, []);

  // Function to approve a club
  const handleApprove = async (clubId) => {
    try {
      const res = await fetch(`/Back/clubs/${clubId}/approve`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setPendingClubs((prev) => prev.filter((club) => club._id !== clubId));
        alert("Club approved successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error approving club:", error);
    }
  };

  // Function to reject a club
  const handleReject = async (clubId) => {
    try {
      const res = await fetch(`/Back/clubs/${clubId}/reject`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setPendingClubs((prev) => prev.filter((club) => club._id !== clubId));
        alert("Club rejected successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error rejecting club:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Club Approvals</h2>
      {pendingClubs.length === 0 ? (
        <p>No pending clubs for approval.</p>
      ) : (
        <ul>
          {pendingClubs.map((club) => (
            <li key={club._id} className="p-4 border-b">
              <h3 className="text-lg font-semibold">{club.clubName}</h3>
              <p>Category: {club.clubCategory}</p>
              <p>Applicant: {club.applicantDetails.name}</p>
              <p>Email: {club.applicantDetails.email}</p>
              <p>Status: {club.status}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleApprove(club._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleReject(club._id)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
