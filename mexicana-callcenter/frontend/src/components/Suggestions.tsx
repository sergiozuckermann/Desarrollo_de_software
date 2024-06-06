import React, { useState } from 'react';


const suggestionsData = [
    { question: "How do I start a new conversation with MexiChat?", answer: "To start a new conversation, simply type 'Hi' or 'Hello' in the chat window." },
    { question: "How do I reset MexiChat?", answer: "To reset MexiChat, type 'reset' or click the reset button at the bottom of the chat window." },
    { question: "What are some common topics I can ask MexiChat about?", answer: "You can ask MexiChat about booking flights, changing reservations, mental health resources, loyalty program details, and more." },
    { question: "How do I provide feedback on MexiChat's responses?", answer: "To provide feedback, type 'feedback' followed by your comments. For example, 'feedback The response was not helpful.'" },
    { question: "Can MexiChat handle multiple languages?", answer: "Yes, MexiChat can handle multiple languages. You can change the language settings by typing 'change language' followed by the desired language." },
    { question: "What should I do if MexiChat doesn't understand my question?", answer: "If MexiChat doesn't understand your question, try rephrasing it or ask for help by typing 'help'." },
    { question: "How can I end the conversation with MexiChat?", answer: "To end the conversation, type 'goodbye' or 'end chat.'" }
];

const Suggestions = () => {
  function toggleQuestion(index: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="pt-2 w-[90%] rounded-lg h-full sm:p-8 shadow-xl" style={{ backgroundColor: "#E8E9EA" }}>
      <div>
        <h1 className="mb-8 text-5xl md:text-3xl lg:text-4xl font-roboto"> Hi, looking for help? </h1>
        <h2 className="mb-8 text-3xl md:text-2xl lg:text-3xl font-roboto"> Suggestions </h2>

        <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto">
          <ul className="space-y-4 divide-y divide-gray-400">
            {suggestionsData.map((item, index) => (
              <li key={index} className="mt-4">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="block w-full p-5 text-left transition-shadow duration-200 rounded-md shadow-sm bg-gray-50 hover:shadow-md"
                >
                  <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto">{item.question}</h3>
                </button>
                {openIndex === index && (
                  <div className="p-4 mt-2 rounded-md shadow-inner bg-gray-50">
                    <p className="text-gray-700 text-md md:text-lg lg:text-lg xl:text-lg font-roboto">{item.answer}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
