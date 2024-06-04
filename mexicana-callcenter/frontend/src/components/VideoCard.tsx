import React, { useState } from 'react';
import VideoModal from './VideoModal';

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div onClick={handleOpenModal} className="cursor-pointer">
        <img className="w-full" src={thumbnailUrl} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
      {isModalOpen && (
        <VideoModal videoId={videoId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default VideoCard;
