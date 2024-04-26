import { FunctionComponent, useState, useEffect } from "react";
import Button from "../components/Buttons";
import Popup from "../components/Popup"; // Import the Popup component
import "../bargeIn.css";  
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import ClientForm from "../components/ClientForm";
import Suggestions from "../components/Suggestions";


const BargeIn: FunctionComponent /*<BargeInProps> */= () => {
 
  
  return (
    <PageStructure title = "On Call">

      {/* Main content */}
    
        <div className="h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 justify-items-center">
          <ConnectHere />
          <ClientForm />
          <Suggestions />
        </div>

      {/* Pop Up */}
      <Popup onClose={() => console.log("Popup closed")} />
      
    </PageStructure>
  );
};

export default BargeIn;
