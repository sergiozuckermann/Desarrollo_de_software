import React from "react";

interface CircleNotificationProps {
  isSeen: boolean;
  isExpanded: boolean;
}

const CircleNotification: React.FC<CircleNotificationProps> = ({ isSeen, isExpanded }) => {
  const circleColor = isExpanded ? "bg-gray-500" : isSeen ? "bg-gray-500" : "bg-green-700";

  return (
    <div className="flex items-center justify-center w-4 h-4 rounded-full shadow-md">
      <div className={`w-full h-full rounded-full ${circleColor}`}></div>
    </div>
  );
};

export default CircleNotification;