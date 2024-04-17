import React from 'react';

interface OverviewButtonProps {
  handleClick: () => void;
}

const SupervisorButton: React.FC<OverviewButtonProps> = ({ handleClick }) => {
 
    const paddingClass = 'px-10 py-10 md:px-16 md:py-12';
  const buttonTextSizeClass = 'text-3xl md:text-4xl';
  const buttonSubtitleSizeClass = 'text-sm md:text-base';

    return (
      <button className={`relative flex items-center justify-center w-full ${paddingClass} mt-3 text-white transition bg-gradient-to-r from-customGreen to-primary ease-in-out duration-300 shadow-md rounded-xl  hover:opacity-75 border-2 border-gray-400`}
      onClick={handleClick}>
        
          <img src='/phone.svg' alt="Phone" className="w-6 h-6 mr-2 md:w-8 md:h-8" />
        <div className="text-center">
          <div className={`font-roboto ${buttonTextSizeClass}`}>Agent Overview</div>
          <div className={`font-roboto ${buttonSubtitleSizeClass}`}>See the status of the ongoing calls</div>
        </div>

      </button>
    );
  };

export default SupervisorButton;