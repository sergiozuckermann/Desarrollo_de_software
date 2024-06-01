import { FunctionComponent } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import ClientForm from "../components/ClientForm";
import Suggestions from "../components/Suggestions";
import Popup from "../components/Popup";
import CCPComponent from "../components/CCPComponent";

const BargeIn: FunctionComponent = () => (
  <PageStructure title="Ongoing Calls">
    <div className="overflow-y-auto max-h-full">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="h-[100%]">
          <ConnectHere />
          </div>
        </div>
        <div className="col-span-1">
          <ClientForm />
        </div>
        <div className="col-span-1">
          <Suggestions />
        </div>
      </div>
    </div>
    <Popup onClose={() => console.log("Popup closed")} />
  </PageStructure>
);

export default BargeIn;