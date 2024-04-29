import { FunctionComponent } from "react";
import "../bargeIn.css";
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import ClientForm from "../components/ClientForm";
import Suggestions from "../components/Suggestions";
import Popup from "../components/Popup";

const BargeIn: FunctionComponent = () => (
  <PageStructure title="Ongoing Calls">
    <div className="h-full flex items-center">
      <div className="h-84 grid grid-cols-1 xl:grid-cols-3 gap-4 py-2">
        <div className="col-span-1">
          <ConnectHere />
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