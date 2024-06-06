// Code created to display the page that the agent sees when they access their workspace.
// This is the page where agents will spend most of their time.
import { FunctionComponent } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import Suggestions from "../components/Suggestions";
import Chatbot from "../components/chatbot";

const AgentMain: FunctionComponent = () => (
  // Page structure used in all pages
  <PageStructure title="Ongoing Calls">
    <div className="w-full max-h-full">
      <div className="grid h-full grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="h-full col-span-1">
          {/* Connect component (ccp) */}
          <div className="w-full h-full pt-3 pl-12">
            <ConnectHere />
          </div>
        </div>
      {/* Chatbot component */}
        <div className="w-full h-full col-span-1">
          <div className="w-full h-full pt-3">
            <Chatbot />
          </div>
        </div>
        {/* Suggestions to ask the bot */}
        <div className="h-full col-span-1">
          <div className="h-full pt-3">
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  </PageStructure>
);

export default AgentMain;


