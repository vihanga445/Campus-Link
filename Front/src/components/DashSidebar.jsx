import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiX,
  HiSun,
  HiMoon,
} from "react-icons/hi";
import { FaStar, FaUserPlus } from "react-icons/fa"; // New icons
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, [location.search]);

  useEffect(() => {
    // Apply the theme to the root element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/Back/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={
                currentUser.isAdmin
                  ? "Admin"
                  : currentUser.moderatorRole?.isModerator
                  ? `Moderator (${currentUser.moderatorRole.category})`
                  : "User"
              }
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.moderatorRole?.isModerator && (
            <Link to="/dashboard?tab=pending">
              <Sidebar.Item active={tab === "pending"} icon={HiDocumentText}>
                Pending Posts
              </Sidebar.Item>
            </Link>
          )}

          {/* Pending Club Approvals (Only for Club Moderators) */}
          {currentUser.moderatorRole?.category === "Clubs and Societies" && (
            <Link to="/dashboard?tab=pending-clubs">
              <Sidebar.Item
                active={tab === "pending-clubs"}
                icon={HiDocumentText}
              >
                Club Approvals
              </Sidebar.Item>
            </Link>
          )}

          <Link to="/dashboard?tab=posts">
            <Sidebar.Item active={tab === "posts"} icon={HiDocumentText}>
              My Posts
            </Sidebar.Item>
          </Link>
          {!currentUser.isAdmin && !currentUser.moderatorRole?.isModerator && (
            <Link to="/dashboard?tab=rejected">
              <Sidebar.Item active={tab === "rejected"} icon={HiX}>
                My Rejected Posts
              </Sidebar.Item>
            </Link>
          )}

          {/* New Favourites button */}
          <Link to="/dashboard?tab=saved">
            <Sidebar.Item active={tab === "saved"} icon={FaStar}>
              Saved posts
            </Sidebar.Item>
          </Link>

          {/* New Invite Friends button */}
          <Link to="/dashboard?tab=invite">
            <Sidebar.Item active={tab === "invite"} icon={FaUserPlus}>
              Invite Friends
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=chat">
            <Sidebar.Item active={tab === "chat"} icon={HiUser}>
              Chat
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>

          {/* Theme toggle button */}
          <Sidebar.Item
            icon={darkMode ? HiSun : HiMoon}
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
