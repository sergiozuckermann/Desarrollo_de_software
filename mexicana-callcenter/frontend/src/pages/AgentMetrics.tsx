import { FunctionComponent } from "react";
import PageStructure from "../components/PageStructure";
import AverageResolutionTime from "../components/AverageResolutionTime";
import AverageInteractionTime from "../components/AverageInteractionTime";
import AverageHoldTime from "../components/AverageHoldTime";


const AgentMetrics: FunctionComponent = () => (
  <PageStructure title="Agent Performance">
    <div className="flex flex-col w-full mb-[5%] pl-[2%] pb-[60%] mt-[72%] flex-grow overflow-y-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[1%] flex-1">
        <div className="col-span-1 h-full max-h-[90%] ">
          <AverageResolutionTime />
        </div>
        <div className="col-span-1 h-full max-h-[90%]">
          <AverageHoldTime />
        </div>
        <div className="col-span-1 h-full max-h-[90%]">
          <AverageInteractionTime />
        </div>
      </div>
    </div>
  </PageStructure>
);

export default AgentMetrics;