import React, { useState } from 'react';
import VideoModal from './VideoModal';

// Define the properties that the VideoCard component can receive
interface VideoCardProps {
  videoId: string;        // Video ID for embedding the video
  title: string;          // Title of the video
  description: string;    // Description of the video
}

// Define the VideoCard component as a Functional Component (FC) that accepts the properties defined in VideoCardProps
const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, description }) => {
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // URL for the video taking the videoId of YOUTUBE
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {/* Container for the video card */}
      <div onClick={handleOpenModal} className="cursor-pointer">
        {/* Video */}
        <img className="w-full" src={thumbnailUrl} alt={title} />
        <div className="px-6 py-4">
          {/* Video title */}
          <div className="font-bold text-xl mb-2 dark:text-white">{title}</div>
          {/* Video description */}
          <p className="text-gray-700 text-base dark:text-white">{description}</p>
        </div>
      </div>
      {/* Render video modal if modal is open */}
      {isModalOpen && (
        <VideoModal videoId={videoId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default VideoCard; 
