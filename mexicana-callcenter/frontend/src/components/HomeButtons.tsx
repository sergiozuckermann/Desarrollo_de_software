import React from 'react';

// Define the properties that the HomeButton component can receive
interface HomeButtonProps {
  icon: string;                   // Icon image source for the button
  title: string;                  // Title for the button
  subtitle: string;               // Subtitle for the button
  handleClick: () => void;        // Function to handle click events on the button
}

// Define the HomeButton component as a Functional Component (FC) that accepts the properties defined in HomeButtonProps
const HomeButton: React.FC<HomeButtonProps> = ({ icon, title, subtitle, handleClick }) => {
  return (
    // Button element with styles and event handler
    <button className="flex items-center px-6 py-4 space-x-2 font-light text-white transition-colors duration-300 ease-in-out shadow-md bg-primary dark:bg-green-600 font-roboto rounded-3xs hover:bg-green-600 dark:hover:opacity-60" onClick={handleClick}>
      {/* Icon image */}
      <img src={icon} alt="Icon" className="w-12 h-12 md:w-10 md:h-10 lg:w-20 lg:h-20 xl:w-24 xl:h-36" />
      <div>
        {/* Title */}
        <div className='text-3xl font-[50] text-left'>{title}</div> 
        {/* Subtitle */}
        <div className='text-white text-left font-[50] text-[15px]'>{subtitle}</div>
      </div>
    </button>
  );
};

export default HomeButton; 