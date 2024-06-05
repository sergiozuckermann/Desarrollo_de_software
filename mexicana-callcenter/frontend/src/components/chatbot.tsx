import React, { useState, useEffect } from "react";

const Chatbot: React.FC = () => {
  // State for managing messages and input text
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // useEffect hook to add a welcome message when the component mounts
  useEffect(() => {
    // Add a welcome message at the beginning
    setMessages([{ sender: "bot", text: "Hello, I'm MexiBot. How can I help you?" }]);
  }, []);

  // Handler function to update input state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handler function to send message and simulate chatbot response
  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user's message to messages state
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulate chatbot response after 1 second
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Thank you for your message. Is there anything else I can help you with?" },
        ]);
      }, 1000);
    }
  };

  // Render the Chatbot component
  return (
    <div className="flex flex-col h-full items-start justify-start py-0 pr-1.5 pl-0 box-border w-full">
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border w-full h-full">
        <div className="flex flex-col items-start justify-start flex-1 w-full h-full">
          <div className="flex flex-col items-start justify-start w-full h-full text-xl text-left font-roboto">
            <div className="box-border flex flex-col items-start self-stretch justify-center w-full h-full py-0 pl-px pr-0 text-lg text-left">
              <div className="flex-1 rounded-3xs box-border flex flex-col items-start justify-start pt-[13px] pb-3.5 pr-2.5 pl-[17px] gap-[5px] w-full h-full" style={{ backgroundColor: "#E8E9EA" }}>
                <div className="box-border relative w-full h-full p-4 overflow-y-auto rounded-3xs" style={{ backgroundColor: "#E8E9EA" }}>
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
                <div className="flex items-center justify-between w-full mt-4">
                  <input
                    className="flex-1 p-2 mr-2 border rounded bg-slate-50"
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
