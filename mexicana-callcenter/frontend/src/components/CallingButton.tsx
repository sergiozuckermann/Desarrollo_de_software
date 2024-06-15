import React from 'react';

// Define the prop types for GradientButton component
interface GradientButtonProps {
  mode: string;           // Mode of the button ('workspace' or 'calling')
  handleClick: () => void; // Function to handle click event
}

// Define the GradientButton component as a Functional Component (FC)
const GradientButton: React.FC<GradientButtonProps> = ({ mode, handleClick }) => {
  // Determine the text and subtitle based on the mode
  const buttonText = mode === 'workspace' ? 'Workspace' : 'Calling';
  const buttonSubtitle = mode === 'workspace' ? 'See the real-time metrics for all the agents' : 'Call to discuss';

  // Define the CSS classes for background gradient, padding, text size
  const backgroundClass = "bg-gradient-to-r from-customGreen to-primary";
  const paddingClass = 'px-4 py-4 md:px-16 md:py-12';
  const buttonTextSizeClass = 'text-3xl md:text-4xl';
  const buttonSubtitleSizeClass = 'text-sm md:text-base';

  // Render the GradientButton component
  return (
    <button
      className={`relative flex items-center justify-center w-full ${paddingClass} mt-3 text-white transition ease-in-out duration-300 shadow-md rounded-xl ${backgroundClass} hover:opacity-75 border-2 border-gray-400`}
      onClick={handleClick} // Handle click event
    >
      <img src='/phone.svg' alt="Phone" className="w-6 h-6 mr-2 md:w-8 md:h-8" /> {/* Phone icon */}
      <div className="text-center">
        <div className={`font-roboto ${buttonTextSizeClass}`}>{buttonText}</div> {/* Button text */}
        <div className={`font-roboto ${buttonSubtitleSizeClass}`}>{buttonSubtitle}</div> {/* Button subtitle */}
      </div>
    </button>
  );
};

export default GradientButton; 
