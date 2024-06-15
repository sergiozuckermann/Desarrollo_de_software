// Import the React library
import React from 'react';
// Import the CCPComponent component
import CCPComponent from "../components/CCPComponent";

// Define the ConnectHere component as a React functional component
const ConnectHere: React.FC = () => {
    // Render the component
    return (
        <div className="w-full h-full rounded-xl bg-[#F8F9FA] dark:bg-gray-900">
            {/* Container div with full width, full height, rounded corners, and background color based on light/dark mode */}
            <div className='h-[93%]'>
                {/* Inner div with a height of 93% */}
                <CCPComponent />
                {/* Render the CCPComponent */}
            </div>
        </div>
    );
};

// Export the ConnectHere component as the default export
export default ConnectHere;