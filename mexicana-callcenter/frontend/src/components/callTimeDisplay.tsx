// Import the useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// Define the CallTimeDisplay component as a functional component
const CallTimeDisplay = () => {
  // State variable to store the call time
  const [callTime, setCallTime] = useState('00:00:00');

  // Use the useEffect hook to simulate fetching the call time
  useEffect(() => {
    // Define a function to simulate fetching the call time
    const simulateFetchCallTime = () => {
      // Use setTimeout to simulate an asynchronous operation
      setTimeout(() => {
        // After 1 second, update the callTime state with a new value
        setCallTime('02:34:56');
      }, 1000); // Delay of 1 second (1000 milliseconds)
    };

    // Call the simulateFetchCallTime function
    simulateFetchCallTime();
  }, []); // Empty dependency array to run the effect only once (on component mount)

  // Render the component
  return (
    <p className="pt-4 pr-2 pl-2" style={{ fontSize: '12px' }}>
      {/* Paragraph element with padding and font size styles */}
      {callTime}
      {/* Render the callTime state */}
    </p>
  );
};

// Export the CallTimeDisplay component as the default export
export default CallTimeDisplay;