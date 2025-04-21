import React, { useEffect, useState } from "react";

function AllUsers() {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/Back/user/getAllUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Profile Picture</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/50"} // Updated to use profilePicture
                    alt={user.username}
                    className="w-12 h-12 object-cover rounded-full " // Updated styling
                  />
                </td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;