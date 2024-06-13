// Import the React library
import React from 'react';

// Define the interface for the CallCardProps
interface CallCardProps {
  title: string; // The title of the call card
  content: string; // The content of the call card
}

// Define the CallCard component as a functional component
const CallCard: React.FC<CallCardProps> = ({ title, content }) => {
  // Render the component
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* Render the main content block, hidden on small screens */}
      <div className="hidden md:block w-full h-full pt-[12%]">
        {/* Render a card container with styles */}
        <div className="flex flex-col items-center justify-center h-full p-8 shadow-xl rounded-xl card">
          {/* Render the card content */}
          <div className="items-center px-8 py-4 text-center">
            {/* Render the title */}
            <h2 className="pb-2 mb-2 text-lg">{title}</h2>
            {/* Render the content */}
            <p className="pb-6 text-base text-gray-700">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the CallCard component as the default export
export default CallCard;