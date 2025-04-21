import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/Back/notification');
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (currentUser) {
      fetchNotifications();
    }
  }, [currentUser]);

  const markAsRead = async (id) => {
    try {
      await fetch(`/Back/notification/${id}/read`, {
        method: 'PUT',
      });
      setNotifications(
        notifications.map((n) =>
          n._id === id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        className="p-2 relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaBell
          className={`text-2xl ${
            unreadCount > 0 ? 'text-blue-500' : 'text-gray-500'
          } hover:text-blue-600 transition-colors`}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b bg-gray-100">
            <h3 className="text-lg font-semibold text-gray-700">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification._id)}
                >
                  <p className="text-sm font-medium text-gray-800">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="p-4 text-center">
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => setShowDropdown(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}