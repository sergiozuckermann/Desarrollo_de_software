import { FunctionComponent } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import ClientForm from "../components/ClientForm";
import Suggestions from "../components/Suggestions";
import Popup from "../components/Popup";
import CCPComponent from "../components/CCPComponent";
import Chatbot from "../components/chatbot";

const BargeIn: FunctionComponent = () => (
  <PageStructure title="Ongoing Calls">
    <div className="max-h-full overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="col-span-1">
          <div className="h-[100%] pl-14">
          <ConnectHere />
          </div>
        </div>
        <div className="col-span-1">
          <Chatbot/>
        </div>
        <div className="col-span-1">
          <Suggestions />
        </div>
      </div>
    </div>
    {/* <Popup onClose={() => console.log("Popup closed")} /> */}
  </PageStructure>
);

export default BargeIn;