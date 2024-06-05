import React, { useState, useContext } from "react";
import NotificationBadge from "./notificationComponent";
import { useNavigate } from "react-router-dom";
import { getUnreadNotificationsCount } from "../pages/SupervisorNotifications";
import { DarkModeContext } from "../Provider/ThemeProvider"; // Asegúrate de importar el contexto

interface NotificationsDropDownProps {
  notificationsData: {
    id: number;
    title: string;
    message: string;
    date: string;
  }[];
}

const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({ notificationsData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext); // Obtén el estado del tema desde el contexto

  const unreadCount = getUnreadNotificationsCount();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = () => {
    navigate("/supervisor/notifications");
  };

  const isUrgent = (message: string) => {
    return message.toLowerCase().includes("call") ||
           message.toLowerCase().includes("performance");
  };

  const unreadUrgentNotifications = notificationsData
    .filter(notification => isUrgent(notification.message) && !notification.isRead)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative">
      <button className="p-2" onClick={handleToggleDropdown}>
        {/* Utiliza la clase condicional para cambiar el color del trazo en modo oscuro */}
        <img src={darkMode ? "/notifications_iconn.svg" : "/notifications_iconn_dark.svg"} alt="" className={`w-[45px] mr-2 ${darkMode ? 'stroke-white' : ''}`} />
        <NotificationBadge count={unreadCount} />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-gray-900">
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Notifications</h3>
            {unreadUrgentNotifications.slice(0, 5).map((notification) => (
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
