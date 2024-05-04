import { FunctionComponent } from "react";
import PageStructure from "../components/PageStructure";
import AverageHandleTime from "../components/AverageHandleTime";
import FirstContactResolution from "../components/FirstContactResolution";
import ScheduleAdherence from "../components/ScheduleAdherence";

const AgentMetrics: FunctionComponent = () => (
  <PageStructure title="Weekly Agent Metrics">
    <div className="overflow-y-auto max-h-full pt-2 pb-20">
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