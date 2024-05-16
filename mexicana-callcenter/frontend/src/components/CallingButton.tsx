import React from 'react';

interface GradientButtonProps {
  mode: 'workspace' | 'calling';
  handleClick: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ mode,handleClick }) => {
  const buttonText = mode === 'workspace' ? "Workplace" : "Call incoming";
  const buttonSubtitle = mode === 'workspace' ? "See the real time metrics for all the agents" : "Answer";

  const backgroundClass = mode === 'workspace'
    ? "bg-gradient-to-r from-customGreen to-primary"
    : "bg-green-600";

    // const paddingClass = 'px-10 py-10 md:px-16 md:py-12';
    const paddingClass = 'px-4 py-4 md:px-16 md:py-12';
  const buttonTextSizeClass = mode === 'workspace' ? 'text-3xl md:text-4xl' : 'text-xl md:text-3xl';
  const buttonSubtitleSizeClass = 'text-sm md:text-base';

    return (
      <button className={`relative flex items-center justify-center w-full ${paddingClass} mt-3 text-white transition ease-in-out duration-300 rounded-xl ${backgroundClass} hover:opacity-75 border-2 border-gray-400`}
      onClick={handleClick}>
        {mode === 'workspace' && (
          <img src='/phone.svg' alt="Phone" className="w-6 h-6 mr-2 md:w-8 md:h-8" />
        )}
        <div className="text-center">
          <div className={`font-roboto ${buttonTextSizeClass}`}>{buttonText}</div>
          <div className={`font-roboto ${buttonSubtitleSizeClass}`}>{buttonSubtitle}</div>
        </div>

      </button>
    );
  };

export default GradientButton;