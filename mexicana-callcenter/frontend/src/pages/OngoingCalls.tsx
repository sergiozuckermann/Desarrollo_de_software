import React from "react";
import PageStructure from "../components/PageStructure";
import CellGrid from "../components/CellGrid";
import GraphAgentStructure from "../components/GraphAgentStructure";

const OngoingCalls: React.FunctionComponent = () => {
  const backendData: [number, number][] = [
    [1, 0], [2, 1], [3, 2], [1, 3], [0, 0], [3, 1], [0, 0], [2, 2], [3, 3], [1, 0],[2, 3], [3, 2], [1, 1], [2, 0], //[3, 3],
  ]; // [callstatus, moodvalue]

  // 1. Receive the data segment (could be the combined segment: both sentiment and call status OR receive the 2 segments separately) from the established websocket connection 
  // 2. Store the segment in state (do this inside a useEffect hook that runs whenever new data is received)
  // 3. In the data state (backend data) check if there is not an already established interaction by checking every contactID
  // 4. If there is, replace the segment at that position and set the backend data state to that.
  // 5. If there is not, add the segment to the backend data


  return (
    <PageStructure title="Ongoing Calls">
      <div className="overflow-y-auto h-full pb-[3%] pt-[2%] pl-[2%]">
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