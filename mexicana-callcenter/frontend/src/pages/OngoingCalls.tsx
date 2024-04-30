import React from "react";
import PageStructure from "../components/PageStructure";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";

const OngoingCalls: React.FunctionComponent = () => {
  const backendData: [number, number][] = [
    [1, 0], [2, 1], [3, 2], [1, 3], [0, 0], [3, 1], [0, 0], [2, 2], [3, 3], [1, 0],[2, 3], [3, 2], [1, 1], [2, 0], //[3, 3],
  ];



return (
    <PageStructure title="Ongoing Calls">
      <div className="overflow-y-auto h-full pb-[10%] pt-[5%] ">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="col-span-1">
                <GraphAgentStructure />
              </div>
              <div className="col-span-1">
                <CellGrid data={backendData} />
              </div>
            </div>
          </div>
          

          
    </PageStructure>
  );
};

export default OngoingCalls;