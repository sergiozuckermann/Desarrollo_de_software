import { FunctionComponent } from "react";
import "../onGoingCalls.css";

const OngoingCalls: FunctionComponent = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden"> {/* Prevent overflow at the root level */}
      {/* Top bar with background */}
      <div className="h-20 bg-tertiary shadow-lg flex justify-between items-center p-4">
        <div className="ml-auto">
          <h1 className="font">| Map</h1>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-grow overflow-auto"> {/* Allow scrolling only within the main content if necessary */}
        <h1 className="font1">Agents Overview</h1>
      </div>
      {/* Bottom bar */}
      <div className="h-20 bg-tertiary shadow-lg flex justify-center items-center p-4">
          <p> Timestamp!! </p>
      </div>
    </div>
  );
};

export default OngoingCalls;
