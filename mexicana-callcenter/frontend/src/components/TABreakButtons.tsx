import React from 'react';

// Define the properties that the TABreakButtons component can receive
interface TABreakButtonsProps {
  picture: string;               // Image source for the button
  title: string;                 // Title for the button
  handleClick: () => void;       // Function to handle click events on the button
}

// Define the TABreakButtons component as a Functional Component (FC) that accepts the properties defined in TABreakButtonsProps
const TABreakButtons: React.FC<TABreakButtonsProps> = ({ picture, title, handleClick }) => {
  return (
    // Button element with styles and event handler
    <button className="flex items-center px-12 py-12 space-x-2 font-light transition-colors duration-300 ease-in-out shadow-md bg-[#D9D9D9] font-roboto rounded-3xs text-primary hover:text-white hover:bg-primary dark:bg-primary dark:text-white dark:hover:text-black dark:hover:opacity-40" onClick={handleClick}>
        {/* Container for the image and title */}
        <div className="flex flex-col justify-center items-center">
            {/* Image */}
            <img src={picture} alt="Pic" className="w-[250px] h-[250px]" />
            {/* Title */}
            <div className="text-2xl font-medium mt-2 whitespace-nowrap">{title}</div> 
        </div>
    </button>
  );
};

export default TABreakButtons; 