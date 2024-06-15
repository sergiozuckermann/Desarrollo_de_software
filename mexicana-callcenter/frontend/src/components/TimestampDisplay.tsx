// Import React and the useState and useEffect hooks
import React, { useState, useEffect } from "react";

// Define the TimestampDisplay component as a functional component
const TimestampDisplay: React.FunctionComponent = () => {
  // State variable to store the current timestamp
  const [timestamp, setTimestamp] = useState("");

  // Use the useEffect hook to update the timestamp every second
  useEffect(() => {
    // Function to update the timestamp state
    const updateTimestamp = () => {
      const now = new Date(); // Create a new Date object representing the current time
      const date = now.toLocaleDateString(); // Get the current date in a localized string format
      const time = now.toLocaleTimeString(); // Get the current time in a localized string format
      const currentTimestamp = `${date} ${time}`; // Combine date and time into a single string
      setTimestamp(currentTimestamp); // Update the timestamp state with the current timestamp
    };

    updateTimestamp(); // Call the updateTimestamp function initially

    // Set an interval to call the updateTimestamp function every 1000 milliseconds (1 second)
    const intervalId = setInterval(updateTimestamp, 1000);

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty array as the second argument to useEffect ensures the effect runs only once (on mount and unmount)

  // Render the component
  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center h-[5%] p-4 shadow-lg bg-tertiary dark:bg-gray-950">
      {/* Container div with styles for fixed positioning, full width, flex layout, height, padding, shadow, and background color */}
      <p className="text-black dark:text-white text-lg font-semibold text-center font2">
        {/* Paragraph with styles for text color, font size, font weight, text alignment, and font family */}
        {timestamp}
        {/* Display the current timestamp */}
      </p>
    </div>
  );
}

// Export the TimestampDisplay component as the default export
export default TimestampDisplay;