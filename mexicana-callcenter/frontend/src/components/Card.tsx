import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
  }

  const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
      <div className="z-50 max-w-md border-2 border-gray-400 shadow-lg xl:h-full md:h-[98%] rounded-xl bg-tertiary sm:max-w-full sm:w-full" style={{zIndex:60}}>
        <h2 className="z-50 mb-2 text-lg font-bold text-gray-600 font-roboto"style={{zIndex:60}}>{title}</h2>
        <div className="flex-grow h-[80%] z-70" style={{zIndex:100}}>
        {children}
        </div>
      </div>
    );
  };

export default Card;