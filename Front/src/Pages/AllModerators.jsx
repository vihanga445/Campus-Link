import React, { useEffect, useState } from "react";

function AllModerators() {
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await fetch("/Back/user/moderators");
        if (!response.ok) {
          throw new Error("Failed to fetch moderators");
        }
        const data = await response.json();
        setModerators(data);
      } catch (error) {
        console.error("Failed to fetch moderators:", error);
      }
    };
    fetchModerators();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4 text-center">All Moderators</h1>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Profile Picture</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {moderators.map((moderator) => (
              <tr key={moderator._id} className="border-b">
                <td className="p-4">
                  <img
                    src={moderator.profilePicture || "https://via.placeholder.com/50"}
                    alt={moderator.username}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-4">{moderator.username}</td>
                <td className="p-4">{moderator.email}</td>
                <td className="p-4">{moderator.moderatorRole.category || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllModerators;