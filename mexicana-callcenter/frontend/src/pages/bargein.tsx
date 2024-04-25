import { FunctionComponent, useState, useEffect } from "react";
import Button from "../components/Buttons";
import Popup from "../components/Popup"; // Import the Popup component
import "../bargeIn.css";  
import PageStructure from "../components/PageStructure";
import ConnectHere from "../components/ConnectHere";
import ClientForm from "../components/ClientForm";
import Suggestions from "../components/Suggestions";

/* Mandarlo de backend????
interface BargeInProps {
  randomNumber: number; // Add this prop to receive the random number from the backend
}
*/

const BargeIn: FunctionComponent /*<BargeInProps> */= () => {
 



  /*   
  Mandarlo de backend????
  useEffect(() => {
    // Check if the random number is 1 and show the popup accordingly
    setShowPopup(randomNumber === 1);
  }, [randomNumber]); // Add randomNumber as a dependency
  
  
  Se poden cuando sea 1 (una sola vez) 
  const handlePopup = () => {
    const randomNumber = 1;
    setShowPopup(randomNumber === 1);
  };
  */
  
  return (
    <PageStructure title = "On Call">

      {/* Main content */}
      <div className="container h-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
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
