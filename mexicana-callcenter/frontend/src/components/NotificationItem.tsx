import React, { useState } from "react";
import CircleNotification from "../components/CircleNotifications";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  onRead: () => void;
  onDelete: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  date,
  isRead,
  onRead,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded && !isRead) {
      onRead();
    }
  };

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

  const handleShowMetrics = () => {
    navigate(`/supervisor/AgentSpotlight`);
  };

  const shouldShowMetricsButton = title.toLowerCase().includes("performance");

  const handleCallOverview = () => {
    navigate(`/supervisor/calloverview`);
  };

  const shouldShowCallOverviewButton =
    title.toLowerCase().includes("call") ||
    title.toLowerCase().includes("bad sentiment");

  const handleOnGoingCalls = () => {
    navigate(`/supervisor/ongoingcalls`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const shouldShowOnGoingCallsButton =
    title.toLowerCase().includes("queue is too long");

  return (
    <div
      className="p-4 bg-[#F8F9FA] shadow-md rounded-md border cursor-pointer flex justify-between items-start"
      onClick={toggleExpanded}
    >
      <div className={`flex-1 ${expanded ? "text-left" : "truncate"}`}>
        <p className="text-lg font-bold mb-2">{title}</p>
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
        <p className="text-sm text-gray-500 mt-2">{formatDate(date)}</p>
      </div>
      <div className="flex flex-col items-center justify-between space-y-2">
        <CircleNotification isSeen={isRead} isExpanded={expanded} />
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
