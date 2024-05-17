import { FunctionComponent, ReactNode } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";

import NotificationBadge from "./notificationComponent";
import { useNavigate } from 'react-router-dom';
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { notifications } from "./notificationsData";


interface PageStructureProps {
  title: string;
  children?: ReactNode;
}


const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
    
  return (
    <div className="flex flex-col h-screen pl-2 pr-2 md:overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between h-[10%] bg-tertiary z-50"> 
        <div>
          <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className=" w-[115px] sm:w-[230px] ml-3" />
          </Button>
        </div>
        <div className="flex items-center">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}

          <NotificationsDropDown notificationsData={notifications} /> {/* Add the notification dropdown */}
          <SettingsButton />
          <div className="h-10 mx-2 border-l-2 border-primary"></div> {/* Divisory line */}
          <div className="flex items-center">
            <h1 className="hidden md:block font">{title}</h1>
          </div>
          
        </div>
      </div>

      {/* Main content */}
      <div className="flex h-[84%] w-[98%] items-center justify-center">
        {children}
      </div>

      {/* Bottom bar */}
     <TimestampDisplay/>
    </div>
  );
};

export default PageStructure;