import { FunctionComponent } from "react";
import FrameComponent1 from "../components/HelloFrameComponent1";
import FrameComponent from "../components/HelloFrameComponent"; 
import "../HelloComponent.css"

const Hello: FunctionComponent = () => {
    return (
      <div className="main-container">
        <div className="blur-left"></div>
        <div className="blur-right"></div>
        
        <div className="content">
          <div className="flex flex-col h-screen justify-center">
            <FrameComponent1 />
            <div className="flex items-center justify-center">
              <FrameComponent />
            </div>
          </div>
        </div>
      </div>
    );
};
  
  export default Hello;
  