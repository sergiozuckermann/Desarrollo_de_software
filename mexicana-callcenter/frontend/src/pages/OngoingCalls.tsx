import React from "react";
import PageStructure from "../components/PageStructure";
import TimestampDisplay from "../components/TimestampDisplay";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";

const OngoingCalls: React.FunctionComponent = () => {
  const backendData: [number, number][] = [
    [1, 0], [2, 1], [3, 2], [1, 3], [0, 0], [3, 1], [0, 0], [2, 2], [3, 3], [1, 0],[2, 3], [3, 2], [1, 1], [2, 0], //[3, 3],
  ];

  return (
    <PageStructure title="Ongoing Calls">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 h-[90%] justify-center items-center">
          <div className="col-span-2 flex justify-center items-center mb-[30px]">
            <div className="flex gap-x-[5%]">
              <GraphAgentStructure/>
              <CellGrid data={backendData} />
            </div>
          </div>
        </div>
          <TimestampDisplay />
      </div>
    </PageStructure>
  );
};

export default OngoingCalls;
