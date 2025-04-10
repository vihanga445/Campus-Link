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
import DashChat from "../components/DashChat.jsx";
import DashUsers from "../components/DashUsers.jsx";
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
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {tab === "pending-clubs" && <PendingClubApprovals />}
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* posts... */}
      {tab === "posts" && <DashPosts />}
      {/* pending posts... */}
      {tab === "pending" && <PendingPosts />}
      {/* rejected posts... */}
      {tab === "rejected" && <RejectedPosts />}

      {tab === "invite" && <InviteFriends />}

      {tab === "saved" && <SavedPosts />}

      {tab === 'users' && <DashUsers/>}


    </div>
  );
}
