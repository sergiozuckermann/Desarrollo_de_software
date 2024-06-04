import { FunctionComponent, ReactNode } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import NotificationBadge from "./notificationComponent";
import { useNavigate, useLocation } from 'react-router-dom';
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { notifications } from "./notificationsData";
import { useAuth } from "../hooks/useAuth"; 

interface PageStructureProps {
  title: string;
  children?: ReactNode;
}


// Page structure component
const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const { isAuthenticated, role } = useAuth(); 
  const navigate = useNavigate(); // Hook to navigate between pages
  const location = useLocation(); // Hook to get the current location

  // Function to handle the back button
  const handleBack = () => {
    navigate(-1); 
  };

  // Function to handle the forward button
  const handleForward = () => {
    navigate(1); 
  };

  // Routes where the arrows should not be displayed
  const noArrowsRoutes = ['/Supervisor/home', '/Agent/home'];


  return (
    <div className="flex flex-col h-screen pl-2 pr-2 md:overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between h-[10%] shadow-lg bg-tertiary z-50">
        <div>
          <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className=" w-[115px] sm:w-[230px] ml-3" />
          </Button>
        </div>
        <div className="flex items-center">
          <h1 className="hidden md:block font">{title}</h1>
          <div className="h-10 mx-2 border-l-2 border-primary"></div> {/* Divisory line */}
          {/* Notificaciones renderizadas para supervisor */}
          {isAuthenticated && role === 'Supervisor' && <NotificationsDropDown notificationsData={notifications} />}
          <div className="flex items-center">
            <SettingsButton />
            {!noArrowsRoutes.includes(location.pathname) && (
              <div className="flex items-center space-x-0.1"> 
                <button onClick={handleBack} className="p-0 m-0">
                  <img src='/leftarrow.svg' alt="back arrow" className="md:w-[45px] w-[38px] space-x-0.1 ml-5" />
                </button>
                <button onClick={handleForward}>
                  <img src='/rightarrow.svg' alt="forward arrow" className="md:w-[45px] w-[38px p-0 mr-5" />
                </button>
              </div>
            )}
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
