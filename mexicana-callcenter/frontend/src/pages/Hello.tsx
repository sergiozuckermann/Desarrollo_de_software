// Import the FunctionComponent type from the 'react' library
import { FunctionComponent } from "react";
// Import the FrameComponent1 component from the "../components/HelloFrameComponent1" module
import FrameComponent1 from "../components/HelloFrameComponent1";
// Import the FrameComponent component from the "../components/HelloFrameComponent" module
import FrameComponent from "../components/HelloFrameComponent";
// Import the CSS file for styling the Hello component
import "../css/HelloComponent.css";

// Define the Hello component as a functional component
const Hello: FunctionComponent = () => {
  // Return the JSX markup for the Hello component
  return (
    // Render a div with the class name "main-container"
    <div className="main-container">
      {/* Render a div with the class name "blur-left" */}
      <div className="blur-left"></div>
      {/* Render a div with the class name "blur-right" */}
      <div className="blur-right"></div>

      {/* Render a div with the class name "content" */}
      <div className="content">
        {/* Render a div with flexbox styling */}
        <div className="flex flex-col justify-center h-screen">
          {/* Render the FrameComponent1 component */}
          <FrameComponent1 />
          {/* Render a div with flexbox styling */}
          <div className="flex items-center justify-center">
            {/* Render the FrameComponent component */}
            <FrameComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Hello component as the default export
export default Hello;