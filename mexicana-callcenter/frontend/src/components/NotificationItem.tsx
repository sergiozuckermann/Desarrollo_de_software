// Display of a single notification item in the notification list

// Imports necessary libraries, hooks, and components
import React, { useState } from "react";
import CircleNotification from "../components/CircleNotifications";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

// Defines the properties of the notifications
interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  onRead: () => void;
  onDelete: () => void;
}

// Defines the properties of the notification item
const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  date,
  isRead,
  onRead,
  onDelete,
}) => {
  // Defines the states of the notification item
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded && !isRead) {
      onRead();
    }
  };
  // Function to format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  // Function to display Agent Spotlight button when necessary
  const handleShowMetrics = () => {
    navigate(`/supervisor/AgentSpotlight`);
  };
  // Rule to display Agent Spotlight button
  const shouldShowMetricsButton = title.toLowerCase().includes("performance");

  // Function to display Call Overview button when necessary
  const handleCallOverview = () => {
    navigate(`/supervisor/calloverview`);
  };
  // Rule to display Call Overview button
  const shouldShowCallOverviewButton =
    title.toLowerCase().includes("negative sentiment")

  // Function to display On Going Calls button when necessary
  const handleOnGoingCalls = () => {
    navigate(`/supervisor/ongoingcalls`);
  };
  // Delete button function
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };
  // Rule to display On Going Calls button
  const shouldShowOnGoingCallsButton =
    title.toLowerCase().includes("new call");

  // Returns the notification list
  return (
    // Notification list item
    <div 
      className="p-4 bg-[#F8F9FA] shadow-md rounded-md border cursor-pointer flex justify-between items-start dark:bg-primary"
      onClick={toggleExpanded}
    >
      <div className={`flex-1 ${expanded ? "text-left" : "truncate"}`}>
        <p className="text-lg font-bold mb-2 dark:text-white">{title}</p>
        {expanded && (
          <>
            <p className="text-base">{message}</p>
            {shouldShowCallOverviewButton && (
              <button
                className="bg-[#4A8B51] hover:bg-[#4A8B51] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCallOverview();
                }}
              >
                Call Overview
              </button>
            )}
            {shouldShowMetricsButton && (
              <button
                className="bg-[#4A8B51] hover:bg-[#4A8B51] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowMetrics();
                }}
              >
                Agent Performance
              </button>
            )}
            {shouldShowOnGoingCallsButton && (
              <button
                className="bg-[#4A8B51] hover:bg-[#4A8B51] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnGoingCalls();
                }}
              >
                On Going Calls
              </button>
            )}
          </>
        )}
        <p className="text-sm text-gray-500 mt-2 dark:text-white">{formatDate(date)}</p>
      </div>
      <div className="flex flex-col items-center justify-between space-y-2">
        {/* Seen button notifier */}
        <CircleNotification isSeen={isRead} isExpanded={expanded} />
        {/* Delete button */}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDeleteClick} 
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
