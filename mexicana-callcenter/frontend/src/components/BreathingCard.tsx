import React, { useState } from 'react';
import VideoModal from './VideoModal'; 

interface BreathingCardProps {
  imageSrc: string;
  description: string;
  videoId: string;
}

const BreathingCard: React.FC<BreathingCardProps> = ({ imageSrc, description, videoId }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleCardClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4  shadow-md transform transition-transform hover:scale-105 cursor-pointer" onClick={handleCardClick}>
        <img src={imageSrc} alt={description} className="w-64 h-64 object-cover rounded-full" />
        <p className="mt-4 text-center">{description}</p>
      </div>
      {showVideo && <VideoModal videoId={videoId} onClose={handleCloseVideo} />}
    </>
  );
};

export default BreathingCard;
