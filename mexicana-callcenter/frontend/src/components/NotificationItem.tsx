import React, { useState, useEffect } from "react";
import CircleNotification from "../components/CircleNotifications";

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

  return (
    <div
      className="p-4 bg-[#F8F9FA] shadow-md rounded-md border cursor-pointer flex justify-between items-start"
      onClick={toggleExpanded}
    >
      <div className={`flex-1 ${expanded ? "text-left" : "truncate"}`}>
        <p className="text-lg font-bold mb-2">{title}</p>
        {expanded && <p className="text-base">{message}</p>}
        <p className="text-sm text-gray-500 mt-2">{formatDate(date)}</p>
      </div>
      <CircleNotification isSeen={isRead} isExpanded={expanded} />
    </div>
  );
};

export default NotificationItem;