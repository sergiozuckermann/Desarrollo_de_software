import React from 'react';

// Define the properties that the Card component can receive
interface CardProps {
    title: string;               // Title of the card
    children: React.ReactNode;  // Content of the card
}

// Define the Card component as a Functional Component (FC) that accepts the properties defined in CardProps
const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="max-w-md border-2 border-gray-400 shadow-lg xl:h-full md:h-[98%] rounded-xl bg-tertiary sm:max-w-full sm:w-full dark:bg-primary">
            {/* Container for the card title */}
            <div className="p-2 bg-transparent z-10">
                {/* Display the title of the card */}
                <h2 className="text-lg font-bold text-gray-600 font-roboto dark:text-white">{title}</h2>
            </div>
            {/* Container for the content of the card */}
            <div className="flex-grow p-2 h-[80%] z-50">
                {/* Display the children components passed to the card */}
                {children}
            </div>
        </div>
    );
};

export default Card; 

