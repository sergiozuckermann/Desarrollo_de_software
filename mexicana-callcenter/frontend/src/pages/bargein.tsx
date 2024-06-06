import React, { FunctionComponent } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import Suggestions from "../components/Suggestions";
import Chatbot from "../components/chatbot";

const BargeIn: FunctionComponent = () => (
  <PageStructure title="Barge In">
    <div className="max-h-full p-4 overflow-y-hidden">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
            <ConnectHere />
          </div>
        </div>
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
            <Chatbot />
          </div>
        </div>
        <div className="flex justify-center col-span-1">
          <div className="w-full max-w-md h-[85vh]">
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  </PageStructure>
);

export default BargeIn;
