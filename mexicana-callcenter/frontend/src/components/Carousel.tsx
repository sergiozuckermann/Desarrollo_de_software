import React, { useRef, useEffect } from 'react';
import VideoCard from './VideoCard';

// Define the properties that the Carousel component can receive
interface CarouselProps {
  videos: { videoId: string; title: string; description: string }[]; // Array of video objects containing videoId, title, and description
}

// Define the Carousel component as a Functional Component (FC) that accepts the properties defined in CarouselProps
const Carousel: React.FC<CarouselProps> = ({ videos }) => {
  // Create a reference to the carousel div element
  const carouselRef = useRef<HTMLDivElement>(null);

  // Set up a side effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
    };

    // Add an event listener for scroll events when the component mounts
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
    }

    // Remove the event listener when the component unmounts
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Dependency array is empty, so this effect only runs once after the initial render

  // Render the carousel component
  return (
    <div className="w-[80%] mx-auto overflow-hidden">
      {/* Container for the carousel */}
      <div
        ref={carouselRef} // Set the reference to the carousel div element
        className="flex overflow-x-auto scrollbar-hide" // Flex container to allow horizontal scrolling
        style={{ scrollSnapType: 'x mandatory', maxWidth: '100vw' }} // Style for scroll snapping and maximum width
      >
        {/* Map through the videos array and render a VideoCard component for each video */}
        {videos.map((video, index) => (
          <div
            key={index} // Set the key as the index of the video in the array
            className="flex-shrink-0" // Style for flex-shrink to prevent resizing of videos
            style={{ width: '300px', scrollSnapAlign: 'start' }} // Style for width and scroll snap alignment
          >
            {/* Render the VideoCard component with videoId, title, and description */}
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

