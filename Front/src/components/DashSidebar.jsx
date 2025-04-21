import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiX,
  HiSun,
  HiMoon,
  HiViewBoards,
  HiOutlineViewGrid,
} from "react-icons/hi";
import {
  FaStar,
  FaUserPlus,
  FaUserCircle,
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaSearch,
  FaFileAlt,
  FaTimesCircle,
  FaBookmark,
  FaComments,
  FaUsersCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa"; // New icons
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
    <Sidebar className="w-full md:w-56 bg-blue-900 text-white shadow-lg">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Profile */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaUserCircle} // Updated icon
              className={`hover:bg-blue-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                tab === "profile" ? "bg-blue-700 text-white shadow-md" : ""
              }`}
            >
              {currentUser.isAdmin
                ? "Admin"
                : currentUser.moderatorRole?.isModerator
                ? `Moderator (${currentUser.moderatorRole.category})`
                : "User"}
            </Sidebar.Item>
          </Link>

          {/* Admin Dashboard */}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=admin-home">
              <Sidebar.Item
                active={tab === "admin-home"}
                icon={FaTachometerAlt} // Updated icon
                className={`hover:bg-blue-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "admin-home" ? "bg-blue-700 text-white shadow-md" : ""
                }`}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

          {/* Pending Posts */}
          {currentUser.moderatorRole?.isModerator && (
            <Link to="/dashboard?tab=pending">
              <Sidebar.Item
                active={tab === "pending"}
                icon={FaClipboardList} // Updated icon
                className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "pending" ? "bg-blue-700 text-white shadow-md" : ""
                }`}
              >
                Pending Posts
              </Sidebar.Item>
            </Link>
          )}

          {/* Club Approvals */}
          {currentUser.moderatorRole?.category === "Clubs and Societies" && (
            <Link to="/dashboard?tab=pending-clubs">
              <Sidebar.Item
                active={tab === "pending-clubs"}
                icon={FaUsers} // Updated icon
                className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "pending-clubs"
                    ? "bg-blue-700 text-white shadow-md"
                    : ""
                }`}
              >
                Club Approvals
              </Sidebar.Item>
            </Link>
          )}

          {/* Lost & Found Approvals */}
          {currentUser.moderatorRole?.category === "Lost-Found" && (
            <Link to="/dashboard?tab=pending-lostfound">
              <Sidebar.Item
                active={tab === "pending-lostfound"}
                icon={FaSearch} // Updated icon
                className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "pending-lostfound"
                    ? "bg-blue-700 text-white shadow-md"
                    : ""
                }`}
              >
                Pending Approvals
              </Sidebar.Item>
            </Link>
          )}

          {/* My Posts */}
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={FaFileAlt} // Updated icon
              className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                tab === "posts" ? "bg-blue-700 text-white shadow-md" : ""
              }`}
            >
              My Posts
            </Sidebar.Item>
          </Link>

          {/* Rejected Posts */}
          {!currentUser.isAdmin && !currentUser.moderatorRole?.isModerator && (
            <Link to="/dashboard?tab=rejected">
              <Sidebar.Item
                active={tab === "rejected"}
                icon={FaTimesCircle} // Updated icon
                className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "rejected" ? "bg-blue-700 text-white shadow-md" : ""
                }`}
              >
                My Rejected Posts
              </Sidebar.Item>
            </Link>
          )}

          {/* Saved Posts */}
          <Link to="/dashboard?tab=saved">
            <Sidebar.Item
              active={tab === "saved"}
              icon={FaBookmark} // Updated icon
              className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                tab === "saved" ? "bg-blue-700 text-white shadow-md" : ""
              }`}
            >
              Saved Posts
            </Sidebar.Item>
          </Link>

          {/* Invite Friends */}
          <Link to="/dashboard?tab=invite">
            <Sidebar.Item
              active={tab === "invite"}
              icon={FaUserPlus} // Updated icon
              className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                tab === "invite" ? "bg-blue-700 text-white shadow-md" : ""
              }`}
            >
              Invite Friends
            </Sidebar.Item>
          </Link>

          {/* Chat */}
          {/* <Link to="/dashboard/messages">
            <Sidebar.Item
              active={tab === "chat"}
              icon={FaComments} // Updated icon
              className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                tab === "chat" ? "bg-blue-700 text-white shadow-md" : ""
              }`}
            >
              Chat
            </Sidebar.Item>
          </Link> */}

          {/* Users (Admin Only) */}
          {/* {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={FaUsersCog} // Updated icon
                className={`hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2 ${
                  tab === "users" ? "bg-blue-700 text-white shadow-md" : ""
                }`}
              >
                Users
              </Sidebar.Item>
            </Link>
          )} */}

          {/* Sign Out */}
          <Sidebar.Item
            icon={FaSignOutAlt} // Updated icon
            className="cursor-pointer hover:bg-red-600 transition-colors duration-300 rounded-lg flex items-center space-x-2"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>

          {/* Theme Toggle */}
          {/* <Sidebar.Item
            icon={darkMode ? FaSun : FaMoon} // Updated icon
            className="cursor-pointer hover:bg-gray-600 transition-colors duration-300 rounded-lg flex items-center space-x-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
