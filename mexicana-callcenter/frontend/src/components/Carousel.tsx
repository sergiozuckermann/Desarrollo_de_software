import React, { useRef, useEffect } from 'react';
import VideoCard from './VideoCard';

interface CarouselProps {
  videos: { videoId: string; title: string; description: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ videos }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-[80%] mx-auto overflow-hidden">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', maxWidth: '100vw' }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: '300px', scrollSnapAlign: 'start' }}
          >
            <VideoCard
              videoId={video.videoId}
              title={video.title}
              description={video.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
