/*
 * Chatbot Component: This component renders a chatbot interface where users can send messages to a bot 
 * and receive responses. It integrates with a backend API for processing user messages and handling responses.
 * It also supports displaying a welcome message and pre-filling the input field with a selected suggestion.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";

// Interface for the Chatbot component props
interface ChatbotProps {
  selectedSuggestion: string | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ selectedSuggestion }) => {
  // State for managing messages and input
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [hasWelcomeMessageDisplayed, setHasWelcomeMessageDisplayed] = useState(false);

  // Effect to display welcome message and handle selected suggestion
  useEffect(() => {
    if (!hasWelcomeMessageDisplayed) {
      // Display welcome message if not already displayed
      setMessages([{ sender: "bot", text: "Hello, I'm MexiBot. How can I help you?" }]);
      setHasWelcomeMessageDisplayed(true);
    }
    // Set input if a suggestion is selected
    if (selectedSuggestion) {
      setInput(selectedSuggestion);
    }
  }, [selectedSuggestion, hasWelcomeMessageDisplayed]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (input.trim()) {
      setInput(""); // Clear input field before sending message
      // Add user message to messages
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
      try {
        // Send user message to backend for processing
        const requestBody = JSON.stringify({ content: input });
        const response = await axios.post(
          "https://api-openai.azurewebsites.net/openai/",
          requestBody,
          { 
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        // Add bot response to messages
        const botMessage = response.data.response;
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botMessage }]);
      } catch (error) {
        // Handle error if message sending fails
        console.error("Error sending message to backend:", error);
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, there was an error processing your request." }]);
      }
    }
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

   // Render the Chatbot component
   return (
    <div className="flex flex-col items-start justify-start py-0 pr-1.5 pl-0 box-border w-full h-[93%]">
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border w-full h-full">
        <div className="flex flex-col items-start justify-start flex-1 w-full h-full">
          <div className="flex flex-col items-start justify-start w-full h-full text-xl text-left font-roboto">
            <div className="box-border flex flex-col items-start self-stretch justify-center w-full h-full py-0 pl-px pr-0 text-lg text-left">
              <div className="flex-1 rounded-3xs box-border flex flex-col items-start justify-start pt-[13px] pb-3.5 pr-2.5 pl-[17px] gap-[5px] w-full h-full" style={{ backgroundColor: "#E8E9EA" }}>
                <div className="box-border relative w-full h-full p-4 overflow-y-auto bg-gray-50 rounded-3xs">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`w-full flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 m-1 rounded ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-green-700 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full mt-4 ">
                  <input
                    className="flex-1 p-2 border rounded bg-gray-50 focus:outline-none"
                    type="text"
                    placeholder="Write a message..."
                    value={input}
                    onChange={handleInputChange}
                  />
                  <button
                    className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;