// Import the FunctionComponent type from React
import { FunctionComponent } from "react";
// Import the PageStructure component
import PageStructure from "../components/PageStructure";
// Import the AverageResolutionTime component
import AverageResolutionTime from "../components/AverageResolutionTime";
// Import the AverageInteractionTime component
import AverageInteractionTime from "../components/AverageInteractionTime";
// Import the AverageHoldTime component
import AverageHoldTime from "../components/AverageHoldTime";

// Define the AgentMetrics component as a FunctionComponent
const AgentMetrics: FunctionComponent = () => (
  // Render the PageStructure component with the title "Agent Performance"
  <PageStructure title="Agent Performance">
    {/* Container div with flex layout, full width, bottom margin, left padding, bottom padding, and top margin */}
    <div className="flex flex-col w-full mb-[5%] pl-[2%] pb-[60%] mt-[72%] flex-grow overflow-y-auto">
      {/* Grid container with responsive columns and gap */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[1%] flex-1">
        {/* Container div for the AverageResolutionTime component */}
        <div className="col-span-1 h-full max-h-[90%] ">
          {/* Render the AverageResolutionTime component */}
          <AverageResolutionTime />
        </div>
        {/* Container div for the AverageHoldTime component */}
        <div className="col-span-1 h-full max-h-[90%]">
          {/* Render the AverageHoldTime component */}
          <AverageHoldTime />
        </div>
        {/* Container div for the AverageInteractionTime component */}
        <div className="col-span-1 h-full max-h-[90%]">
          {/* Render the AverageInteractionTime component */}
          <AverageInteractionTime />
        </div>
      </div>
    </div>
  </PageStructure>
);

// Export the AgentMetrics component as the default export
export default AgentMetrics;