import React, { useState } from 'react';
interface SuggestionsProps {
  onSuggestionSelect: (suggestionText: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ onSuggestionSelect }) => {
  const handleClick = (suggestionText: string) => {
    onSuggestionSelect(suggestionText);
  };
    return (
        <div className="w-full h-[93%] max-w-screen-md pt-2 mx-auto rounded-lg shadow-xl sm:p-8 overflow-hidden" style={{ backgroundColor: "#E8E9EA" }}>
            <div>
                <h1 className="text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-roboto mb-8"> Hi, looking for help? </h1>
                <h2 className="text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-roboto mb-8"> Suggestions </h2>

                <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto">
                    <ul className="divide-y-2 divide-gray-500 overflow-hidden">
                        <li onClick={() => handleClick("How do I help a customer book a flight?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How do I help a customer book a flight?</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("Adding additional services to a reservation")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">Adding additional services to a reservation</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("How can I assist a customer with canceling a flight?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I assist a customer with canceling a flight?</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("Loyalty program information")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">Loyalty program information</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("How can I assist a customer in claiming their lost luggage during a connecting flight?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I assist a customer in claiming their lost luggage during a connecting flight?</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("How can I change the customer's name on a paid flight?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change the customer's name on a paid flight?</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("How can I change a customer's flight destination?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How can I change a customer's flight destination?</h3>
                            </a>
                        </li>
                        <li onClick={() => handleClick("How to select a customer's seat?")}>
                            <a href="#" className="block p-5 hover:bg-gray-200">
                                <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">How to select a customer's seat?</h3>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Suggestions;