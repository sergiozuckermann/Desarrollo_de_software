import { FunctionComponent, ReactNode } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { notifications } from "./notificationsData";

interface PageStructureProps {
  title: string;
  children?: ReactNode;
}

// ... (rest of the imports and component code)

const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
      
  const fetchMockNotifications = () => {
        console.log("Fetching mock notifications...");
        setTimeout(() => {
            // Simulated data
            const simulatedResponse = {
                count: 5, 
            };
            setNotificationCount(simulatedResponse.count);
            console.log("Mock notifications fetched:", simulatedResponse.count);
        }, 1500); 
    };

  fetchMockNotifications();


    updateTimestamp(); // Update the timestamp initially 

    const intervalId = setInterval(updateTimestamp, 1000); // Update the timestamp every second
    return () => {
      clearInterval(intervalId); //Cleaar the interval when the component unmounts
    };
  }, []);

  const handleNotificationClick = () => {
    setNotificationCount(0); 
    setTimeout(() => {
      navigate('notifications'); 
    }, 10); 
  };

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