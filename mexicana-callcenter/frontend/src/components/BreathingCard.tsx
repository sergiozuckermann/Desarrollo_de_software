import React, { useState } from 'react';
import VideoModal from './VideoModal'; // Import the VideoModal component from the VideoModal.js file in the same directory

// Here is where we define the properties that the BreathingCard component can receive
interface BreathingCardProps {
  imageSrc: string;      // Source of the image for the card
  description: string;   // Description of the card
  videoId: string;       // ID of the video associated with the card
}

// Define the BreathingCard component as a Functional Component (FC) that accepts the properties defined in BreathingCardProps
const BreathingCard: React.FC<BreathingCardProps> = ({ imageSrc, description, videoId }) => {
  // Define the local state 'showVideo' and its update function 'setShowVideo' with useState, initialized to 'false'
  const [showVideo, setShowVideo] = useState(false);

  // Function to handle click on the card, sets 'showVideo' to 'true' to display the video
  const handleCardClick = () => {
    setShowVideo(true);
  };

  // Function to close the video, sets 'showVideo' to 'false' to hide the video
  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  // Return the content of the component
  return (
    <>
      {/* Div representing the card, displaying the image and the description */}
      <div className="flex flex-col items-center p-4 shadow-md transform transition-transform hover:scale-105 cursor-pointer" onClick={handleCardClick}>
        <img src={imageSrc} alt={description} className="w-64 h-64 object-cover rounded-full" />
        <p className="text-2xl font-medium mt-10 whitespace-nowrap dark:text-white">{description}</p>
      </div>
      {/* Render the VideoModal component if 'showVideo' is 'true', passing the video ID and the function to close the video */}
      {showVideo && <VideoModal videoId={videoId} onClose={handleCloseVideo} />}
    </>
  );
};

export default BreathingCard; 
