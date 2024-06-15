// Import the FunctionComponent type and useState hook from the 'react' module
import { FunctionComponent, useState } from "react";

// Import the CSS file specific to the BargeIn component
import "../bargeIn.css";

// Import the PageStructure component from the '../components/PageStructure' module
import PageStructure from "../components/PageStructure";

// Import the ConnectHere component from the '../components/ConnectHere' module
import ConnectHere from "../components/ConnectHere";

// Import the Suggestions component from the '../components/Suggestions' module
import Suggestions from "../components/Suggestions";

// Import the Chatbot component from the '../components/Chatbot' module
import Chatbot from "../components/Chatbot";

// Define the BargeIn component as a functional component
const BargeIn: FunctionComponent = () => {
  // Declare a state variable 'selectedSuggestion' with its setter function
  // Initial value is set to null, and the type is either string or null
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  // Define a function to handle suggestion selection
  // It takes the selected suggestion text as a parameter and updates the state
  const handleSuggestionSelect = (suggestionText: string) => {
    setSelectedSuggestion(suggestionText);
  };

  // Render the component's JSX
  return (
    // Use the PageStructure component to provide a consistent page layout
    // Pass the page title as a prop
    <PageStructure title="Barge In">
      <div className="max-h-full p-4 overflow-y-hidden">
        {/* Create a grid layout with responsive column sizes */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* First column */}
          <div className="flex justify-center col-span-1">
            <div className="w-full max-w-md h-[85vh]">
              {/* Render the ConnectHere component */}
              <ConnectHere />
            </div>
          </div>

          {/* Second column */}
          <div className="flex justify-center col-span-1">
            <div className="w-full max-w-md h-[85vh]">
              {/* Render the Chatbot component */}
              {/* Pass the selectedSuggestion state as a prop */}
              <Chatbot selectedSuggestion={selectedSuggestion} />
            </div>
          </div>

          {/* Third column */}
          <div className="flex justify-center col-span-1">
            <div className="w-full max-w-md h-[85vh]">
              {/* Render the Suggestions component */}
              {/* Pass the handleSuggestionSelect function as a prop */}
              <Suggestions onSuggestionSelect={handleSuggestionSelect} />
            </div>
          </div>
        </div>
      </div>
    </PageStructure>
  );
};

// Export the BargeIn component as the default export
export default BargeIn;