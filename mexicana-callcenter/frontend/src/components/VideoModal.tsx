import React, { useRef, useEffect } from 'react';

// Define the properties that the VideoModal component can receive
interface VideoModalProps {
  videoId: string;          // Video ID for embedding the video
  onClose: () => void;      // Function to handle modal close event
}

// Define the VideoModal component as a Functional Component (FC) that accepts the properties defined in VideoModalProps
const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  // Reference to the modal div element
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to handle click outside the modal to close it
  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Call onClose function to close the modal
    }
  };

  // Set up side effect to add event listener when component mounts and remove it when unmounts
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick); // Add event listener for mouse goes down event
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // Remove event listener when component unmounts
    };
  }, []);

  // Render the modal
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      {/* Container for the modal content */}
      <div className="relative" style={{ width: '80%', height: '80%' }} ref={modalRef}>
        {/* Button to close the modal */}
        <button className="absolute top-2 right-2 text-white z-50" onClick={onClose}>
          X
        </button>
        {/* Embedded YouTube */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal; 