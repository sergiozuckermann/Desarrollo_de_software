import { FunctionComponent } from "react";
import PageStructure from "../components/PageStructure";
import AverageHandleTime from "../components/AverageHandleTime";
import FirstContactResolution from "../components/FirstContactResolution";
import ScheduleAdherence from "../components/ScheduleAdherence";

const AgentMetrics: FunctionComponent = () => (
  <PageStructure title="Weekly Agent Performance">
    <div className="flex flex-col w-full h-[90%] pl-8 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-1">
          <AverageHandleTime />
        </div>
        <div className="col-span-1">
          <FirstContactResolution />
        </div>
        <div className="col-span-1">
          <ScheduleAdherence />
        </div>
      </div>
    </div>
  </PageStructure>
);

export default AgentMetrics;