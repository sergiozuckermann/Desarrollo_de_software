import React, { useState } from "react";
import NotificationBadge from "./notificationComponent";
import { useNavigate } from "react-router-dom";

interface NotificationsDropDownProps {
  notificationsData: {
    id: number;
    title: string;
    message: string;
    date: string;
  }[],
  count: number
}

const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({ notificationsData, count }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = () => {
    navigate("/supervisor/notifications");
  };

  // const isUrgent = (message: string) => {
  //   return message.toLowerCase().includes("call") ||
  //          message.toLowerCase().includes("performance");
  // };

  // const unreadUrgentNotifications = notificationsData
  //   .filter(notification => isUrgent(notification.message) && !notification.isRead)
  //   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative">
      <button className="p-2" onClick={handleToggleDropdown}>
        <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
        <NotificationBadge count={count} />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            {
              !notificationsData.length ? (<p>no notifications</p>) :
            notificationsData.map((notification) => (
              <div
                key={notification.id}
                className="notification-item mb-4 cursor-pointer"
                onClick={handleNotificationClick}
              >
                <strong>{notification.title}</strong>
                <p className="text-sm mt-1 overflow-hidden text-ellipsis line-clamp-2">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropDown;