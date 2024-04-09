import { FunctionComponent } from "react";

const OngoingCalls: FunctionComponent = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* "Home" text in the top right corner */}
      <div className="absolute top-0 right-0 p-4">
        <a href="/" className="text-lg font-medium ">Home</a>
      </div>

      <div className="absolute top-0 left-0 bg-tertiary shadow-lg w-full h-28" />
      {/* Placeholder for central content */}
      <div className="absolute inset-x-0 bottom-0 bg-tertiary shadow-inner w-full flex flex-row items-center justify-center py-2.5 px-4 text-center text-lg">
        <div className="relative">29/02/2024 15:00:43</div>
      </div>
    </div>
  );
};

export default OngoingCalls;


