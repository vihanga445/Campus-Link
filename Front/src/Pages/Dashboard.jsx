import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPosts from "../components/DashPosts";
import PendingPosts from "../components/PendingPosts";
import RejectedPosts from "./RejectedPosts";
import InviteFriends from "../components/InviteFriends";
import SavedPosts from "./SavedPosts";
import PendingClubApprovals from "../components/PendingClubApprovals";
import PendingReports from "../components/PendingReports.jsx";
import DashChat from "../components/DashChat.jsx";
import DashUsers from "../components/DashUsers.jsx";
import AdminHome from "../components/AdminHome.jsx";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);
  return (
    <div className="min-h-screen min-w-screen flex flex-col md:flex-row dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="md:w-56 flex-shrink-0">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {tab === "pending-clubs" && <PendingClubApprovals />}
        {tab === "pending-lostfound" && <PendingReports />}
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "pending" && <PendingPosts />}
        {tab === "rejected" && <RejectedPosts />}
        {tab === "invite" && <InviteFriends />}
        {tab === "saved" && <SavedPosts />}
        {tab === "users" && <DashUsers />}
        {tab === "admin-home" && <AdminHome />}
      </div>
    </div>
  );
}
