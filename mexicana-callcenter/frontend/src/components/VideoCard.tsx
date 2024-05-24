import React, { useState } from 'react';

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      {!isPlaying ? (
        <div onClick={handleClick} className="cursor-pointer">
          <img className="w-full" src={thumbnailUrl} alt={title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      ) : (
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
