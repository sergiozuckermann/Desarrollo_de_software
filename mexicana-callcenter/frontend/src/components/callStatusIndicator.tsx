// Import the React library
import React from "react";

// Define the CallStatusIndicator component as a functional component
// that takes a callStatus prop of type string
const CallStatusIndicator: React.FunctionComponent<{ callStatus: string }> = ({ callStatus }) => {
  // Define a function to get the corresponding color for a given call status
  const getCallStatus = (status: string) => {
    // Use a switch statement to map the status to a color
    switch (status) {
      case "ON CALL":
        return "#0a8afb"; // Return a blue color
      case "AVAILABLE":
        return "#008000"; // Return a green color
      case "ACW":
        return "#e29301"; // Return an orange color
      case "OFFLINE":
        return "#FF0000"; // Return a red color
    }
  };

  // Call the getCallStatus function with the callStatus prop and get the corresponding color
  const color = getCallStatus(callStatus);

  // Render the component
  return (
    <div
      className="status-text px-4 py-2"
      style={{
        backgroundColor: color, // Set the background color based on the call status
        borderRadius: 50, // Apply a rounded border radius
        color: "white", // Set the text color to white
        display: "flex", // Use a flex layout
        alignItems: "center", // Center the items vertically
        justifyContent: "center", // Center the items horizontally
        fontFamily: "Inter, sans-serif", // Set the font family
      }}
    >
      {callStatus.toLowerCase()} {/* Render the call status in lowercase */}
    </div>
  );
};

// Export the CallStatusIndicator component as the default export
export default CallStatusIndicator;
