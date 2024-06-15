// Import necessary React hooks and types
import { FunctionComponent, useState, useEffect } from "react";

// Define the interface for the Popup component props
interface PopupProps {
  onClose: () => void; // A function to be called when the popup is closed
}

// Define the Popup component as a functional component
const Popup: FunctionComponent<PopupProps> = ({ onClose }) => {
  // State to control the visibility of the popup
  const [visible, setVisible] = useState(false);
  // State to keep track of the current image index
  const [imageIndex, setImageIndex] = useState(0);
  // Array of image paths for the popup
  const popupImages = [
    "/LogoMexicanaAudifonos.svg",
    "/LogoMexicanaAudifonosIN.svg",
    "/LogoMexicanaAudifonosOUT.svg",
  ];

  // Use an effect hook to set the popup visible after 15 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(true);
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Use an effect hook to control the image index based on the visibility
  useEffect(() => {
    // This effect hook is triggered whenever the 'visible' state changes
  
    if (visible) {
      // If the 'visible' state is true, execute the following code
  
      const timer1 = setTimeout(() => {
        // Set a timeout timer1 to execute after 4 seconds (4000 milliseconds)
        setImageIndex(1); // Set the 'imageIndex' state to 1 (which will display the second image in the array)
      }, 4000);
  
      const timer2 = setTimeout(() => {
        // Set a timeout timer2 to execute after 7 seconds (7000 milliseconds)
        setImageIndex(2); // Set the 'imageIndex' state to 2 (which will display the third image in the array)
      }, 7000);
  
      const timer3 = setInterval(() => {
        // Set an interval timer3 to execute repeatedly every 3 seconds (3000 milliseconds)
        setImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1)); // Toggle the 'imageIndex' state between 1 and 2
      }, 3000);
  
      return () => {
        // This return function is a cleanup function that will be executed when the component is unmounted
        // or when the 'visible' state changes (e.g., from true to false)
  
        clearTimeout(timer1); // Clear the timeout for timer1
        clearTimeout(timer2); // Clear the timeout for timer2
        clearInterval(timer3); // Clear the interval for timer3
      };
    }
  }, [visible]);

  // Function to handle the close popup event
  const handleClosePopup = () => {
    if (imageIndex === 2) {
      setVisible(false);
      onClose(); // Call the onClose function from the props
    }
  };

  // Render the component
  return (
    <>
      {/* Conditionally render the popup based on the visible state */}
      {visible && (
        <div className="fixed bottom-4 right-4 rounded-lg p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6">
          {/* Render the popup image */}
          <img
            src={popupImages[imageIndex]} // Use the image path from the popupImages array based on the current index
            alt="Logo"
            className="w-full h-auto cursor-pointer"
            onClick={handleClosePopup} // Add a click event handler to close the popup
          />
        </div>
      )}
    </>
  );
};

// Export the Popup component as the default export
export default Popup;