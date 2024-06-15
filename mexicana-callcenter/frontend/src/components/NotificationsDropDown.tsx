import React, { useState } from 'react';
import NotificationBadge from './notificationComponent';
import { useNavigate } from 'react-router-dom';

// Define the properties that the NotificationsDropDown component can receive
interface NotificationsDropDownProps {
  notificationsData: {
    id: number;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
  }[]
}

// Define the NotificationsDropDown component as a Functional Component (FC) that accepts the properties defined in NotificationsDropDownProps
const NotificationsDropDown: React.FC<NotificationsDropDownProps> = ({ notificationsData }) => {
  // State to control the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook from react-router-dom to navigate 

  // Function to toggle the dropdown visibility
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle click on notification item
  const handleNotificationClick = () => {
    navigate('/supervisor/notifications'); // Navigate to the notifications page
  };

  return (
    <div className="relative">
      {/* Button to toggle the dropdown */}
      <button className="p-2" onClick={handleToggleDropdown}>
        {/* Notification icon and badge */}
        <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
        <NotificationBadge count={notificationsData.length} />
      </button>
      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto dark:bg-gray-900">
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            {/* Render notifications if available, otherwise show a message */}
            {!notificationsData.length ? (<p>no notifications</p>) :
              notificationsData.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-item mb-4 cursor-pointer dark:text-white"
                  onClick={handleNotificationClick}
                >
                  {/* Notification title */}
                  <strong>{notification.title}</strong>
                  {/* Notification message */}
                  <p className="text-sm mt-1 overflow-hidden text-ellipsis line-clamp-2 dark:text-white">{notification.message}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropDown; 
