import { FunctionComponent, useState, useEffect, ReactNode } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import NotificationBadge from "./notificationComponent";
import { useNavigate } from 'react-router-dom';
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";

// Define a type for the props for better TypeScript support
interface PageStructureProps {
    title: string; // title of the page
    children?: ReactNode; // main div content
  }
  const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const [timestamp, setTimestamp] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const currentTimestamp = `${date} ${time}`;
      setTimestamp(currentTimestamp);
    };

  //   const fetchNotifications = async () => {
  //     setLoading(true);
  //     setError("");
  //     try {
  //         const response = await fetch('YOUR_API_ENDPOINT_HERE', {
  //             headers: {
  //                 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
  //                 // Include other headers as needed
  //             }
  //         });
  //         if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setNotificationCount(data.count);  // Assume the API returns an object with a 'count' property
  //     } catch (error) {
  //         setError('Failed to fetch notifications');
  //         console.error('Error fetching notifications:', error);
  //     }
  //     setLoading(false);
  // };
      
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


    updateTimestamp(); // Actualizar el timestamp inicialmente

    const intervalId = setInterval(updateTimestamp, 1000); // Actualizar el timestamp cada segundo

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, []);

  const handleNotificationClick = () => {
    setNotificationCount(0); 
    setTimeout(() => {
      navigate('notifications'); 
    }, 10); 
  };

  return (
    <div className="flex flex-col h-screen pl-2 pr-2 sm:overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between h-[10%] shadow-lg  bg-tertiary z-50"> 
        <div>
        <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className=" w-[115px] sm:w-[230px] ml-3" />
          </Button>
        </div>
        <div className="flex items-center">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}
          {/* 
          <Button onClick={handleNotificationClick} className="relative hover-shrink-button">
            <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
            <NotificationBadge count={notificationCount} />
          </Button>
          */}
           <NotificationsDropDown/>
           <SettingsButton />
          <div className="h-10 mx-2 border-l-2 border-primary"></div> {/* Divisory line */}
          <div className="flex items-center">
            <h1 className="font">{title}</h1>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex h-[90%] w-[98%] items-center justify-center">
        {children}
      </div>
      {/* Bottom bar */}
      <TimestampDisplay />
    </div>
  );
};

export default PageStructure;

