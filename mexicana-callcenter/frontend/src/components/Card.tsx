import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
  }

  const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className=" max-w-md border-2 border-gray-400 shadow-lg xl:h-full md:h-[98%] rounded-xl bg-tertiary sm:max-w-full sm:w-full dark:bg-primary">
            <div className="p-2 bg-transparent z-10">
                <h2 className="text-lg font-bold text-gray-600 font-roboto dark:text-white">{title}</h2>
            </div>
            <div className="flex-grow p-2 h-[80%] z-50">
                {children}
            </div>
        </div>
    );
};
export default Card;
