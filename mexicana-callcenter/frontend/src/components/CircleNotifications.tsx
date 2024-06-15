import React from "react";

// Define the prop types for CircleNotification component
interface CircleNotificationProps {
  isSeen: boolean;    // Flag indicating if the notification is seen
  isExpanded: boolean; // Flag indicating if the notification is expanded
}

// Define the CircleNotification component as a Functional Component (FC)
const CircleNotification: React.FC<CircleNotificationProps> = ({ isSeen, isExpanded }) => {
  // Determine the color of the circle based on the flags (green=not seen or gray=already seen)
  const circleColor = isExpanded ? "bg-gray-500" : isSeen ? "bg-gray-500" : "bg-green-700";

  // Render the CircleNotification component
  return (
    <div className="flex items-center justify-center w-4 h-4 rounded-full shadow-md">
      <div className={`w-full h-full rounded-full ${circleColor}`}></div> {/* Circle element */}
    </div>
  );
};

export default CircleNotification; 
