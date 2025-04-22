import React from "react";
import { FaCalendarAlt, FaBullhorn, FaSearch, FaUsers, FaUserShield } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-2">
      {/* Top Section: Total Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Events */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaCalendarAlt size={40} className="mb-4" />
          <h2 className="text-xl font-bold"> Events</h2>
          
            <Link to="/all-events" >
          <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            Show All
          </button>
            </Link>
        </div>

        {/* Total Announcements */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaBullhorn size={40} className="mb-4" />
          <h2 className="text-xl font-bold"> Announcements</h2>
          
          <Link to="/all-announcements" >
          <button className="mt-4 bg-white text-green-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            Show All
          </button>
          </Link>

        </div>

        {/* Total Lost & Found */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaSearch size={40} className="mb-4" />
          <h2 className="text-xl font-bold"> Lost & Found</h2>
          <button className="mt-4 bg-white text-yellow-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            Show All
          </button>
        </div>

        {/* Total Clubs */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <MdGroups size={40} className="mb-4" />
          <h2 className="text-xl font-bold"> Clubs</h2>
          <button className="mt-4 bg-white text-purple-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            Show All
          </button>
        </div>
      </div>

      {/* Middle Section: Moderators and Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moderators */}
        <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserShield size={40} className="mb-4" />
          <h2 className="text-xl font-bold">Moderators</h2>
          
          <Link to="/all-moderators" >
          <button className="mt-4 bg-white text-indigo-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            View All
          </button>
          </Link>
        </div>

        {/* Users */}
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUsers size={40} className="mb-4" />
          <h2 className="text-xl font-bold">Users</h2>
          <Link to="/all-users" >
          <button className="mt-4 bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-gray-200">
            View All
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;