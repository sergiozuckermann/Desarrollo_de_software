import { FunctionComponent } from "react";

const OngoingCalls: FunctionComponent = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Top bar with background */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-tertiary shadow-lg flex justify-between items-center p-4">
        {/* Title on the right */}
        <h1 className="text-2xl font-bold">Agents Overview</h1>
        {/* Home text on the right */}
        <h1 className="text-2xl font-bold">Map</h1>
      </div>
    </div>
  );
};

export default OngoingCalls;
