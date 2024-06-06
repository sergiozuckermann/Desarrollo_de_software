import React, { useState } from "react";
import CircleNotification from "../components/CircleNotifications";
import { useNavigate } from "react-router-dom";

interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  onRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  date,
  isRead,
  onRead,
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
  // performance
  const handleShowMetrics = () => {
    navigate(`/supervisor/AgentSpotlight`);
  }
  
  const shouldShowMetricsButton =
    title.toLowerCase().includes("performance");
    

  // call overview, bad call, bad sentiment
  const handleCallOverview = () => {
    navigate(`/supervisor/calloverview`);
  };

  const shouldShowCallOverviewButton =
    title.toLowerCase().includes("call") ||
    title.toLowerCase().includes("bad sentiment");

  // agent overview, queue graphs
  const handleOnGoingCalls= () => {
    navigate(`/supervisor/ongoingcalls`);
  };
  
  const shouldShowOnGoingCallsButton =
    title.toLowerCase().includes("queue is too long");

  return (
    <div
      className="p-4 bg-[#F8F9FA] shadow-md rounded-md border cursor-pointer flex justify-between items-start dark:bg-primary"
      onClick={toggleExpanded}
    >
      <div className={`flex-1 ${expanded ? "text-left" : "truncate"}`}>
        <p className="text-lg font-bold mb-2 dark:text-white">{title}</p>
        {expanded && (
          <>
            <p className="text-base dark:text-white">{message}</p>
             {/* call */}
            {shouldShowCallOverviewButton && (
              <button
                className="bg-[#4A8B51] hover:bg-[#517054] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={handleCallOverview}
              >
                Call Overview
              </button>
            )}
            {/* performance */}
            {shouldShowMetricsButton && (
              <button
                className="bg-[#4A8B51] hover:bg-[#4A8B51] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={handleShowMetrics}
              >
                Agent Performance
              </button>
            )}
            {/* queue */}
            {shouldShowOnGoingCallsButton&& (
              <button
                className="bg-[#4A8B51] hover:bg-[#4A8B51] text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={handleOnGoingCalls}
              >
                On Going Calls
              </button>
            )}
          </>
        )}
        <p className="text-sm text-gray-500 mt-2 dark:text-white">{formatDate(date)}</p>
      </div>
      <CircleNotification isSeen={isRead} isExpanded={expanded} />
    </div>
  );
};

export default NotificationItem;