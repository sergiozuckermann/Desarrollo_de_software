// Import the React library
import React from 'react';
// Import the CSS file for styling
import "../bargeIn.css";

// Define the interface for the ScrollableRectangle component props
interface ScrollableRectangleProps {
  children: React.ReactNode; // The children elements to be rendered inside the component
  borderColor?: string; // The color of the border (optional)
  bgColor?: string; // The background color (optional)
}

// Define the ScrollableRectangle component as a functional component
const ScrollableRectangle: React.FC<ScrollableRectangleProps> = ({ children, borderColor = '', bgColor = '' }) => {
  // Render the component
  return (
    <div className={`container rectangle overflow-auto border-2 p-2 ${borderColor} ${bgColor} text-black`}>
      {/* Render the children elements */}
      {children}
    </div>
  );
};

// Export the ScrollableRectangle component as the default export
export default ScrollableRectangle;