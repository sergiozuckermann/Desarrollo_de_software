import React, { useState } from 'react';

const suggestionsData = [
    { question: "How do I start a new conversation with MexiBot?", answer: "To start a new conversation, simply type 'Hi' or 'Hello' in the chat window." },
    { question: "How do I reset MexiBot?", answer: "To reset MexiBot, type 'reset' or click the reset button at the bottom of the chat window." },
    { question: "What are some common topics I can ask MexiBot about?", answer: "You can ask MexiBot about booking flights, changing reservations, mental health resources, loyalty program details, and more." },
    { question: "How do I provide feedback on MexiBot's responses?", answer: "To provide feedback, type 'feedback' followed by your comments. For example, 'feedback The response was not helpful.'" },
    { question: "Can MexiBot handle multiple languages?", answer: "Yes, MexiBot can handle multiple languages. You can change the language settings by typing 'change language' followed by the desired language." },
    { question: "What should I do if MexiBot doesn't understand my question?", answer: "If MexiBot doesn't understand your question, try rephrasing it or ask for help by typing 'help'." },
    { question: "How can I end the conversation with MexiBot?", answer: "To end the conversation, type 'goodbye' or 'end chat.'" }
];

const Suggestions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-[93%] max-w-screen-md pt-2 mx-auto rounded-lg shadow-xl sm:p-8 bg-[#F8F9FA] dark:bg-primary">
      <div>
        <h1 className="mb-2 text-3xl md:text-4xl lg:text-3xl font-roboto dark:text-white"> Hi, looking for help? </h1>
        <h2 className="mb-2 text-2xl md:text-3xl lg:text-2xl font-roboto dark:text-white"> Suggestions </h2>

        <div className="max-h-[400px] sm:max-h-[400px] overflow-y-auto">
          <ul className="space-y-4 divide-y divide-gray-400">
            {suggestionsData.map((item, index) => (
              <li key={index} className="mt-4">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="block w-full p-5 text-left transition-shadow duration-200 rounded-md shadow-sm bg-gray-50 hover:shadow-md dark:bg-gray-900"
                >
                  <h3 className="text-lg md:text-xl lg:text-xl xl:text-xl font-roboto dark:text-white">{item.question}</h3>
                </button>
                {openIndex === index && (
                  <div className="p-4 mt-2 rounded-md shadow-inner bg-gray-50 dark:bg-primary">
                    <p className="text-gray-700 text-md md:text-lg lg:text-lg xl:text-lg font-roboto dark:text-white">{item.answer}</p>
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
