import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { useWebSocket } from "../hooks/useWebSocket";
import { Notification } from "../utils/interfaces";


interface PageStructureProps {
  title: string;
  children?: ReactNode;
}


const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {

  const { socket } = useWebSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const notificationsData = sessionStorage.getItem('notifications')
    if(notificationsData) {
       const allNotifications = JSON.parse(notificationsData)
       setNotifications(allNotifications)
    } else {
      sessionStorage.setItem('notifications', JSON.stringify([]))
    }
  }, [])
  
  const processNotification = (notification:Notification) => {
    const allNotifications = sessionStorage.getItem('notifications')
    let notificationsData:Notification[] = []
    if(allNotifications) {
      notificationsData = JSON.parse(allNotifications)
      const repeatedNotification = notificationsData.find(n => n.id === notification.id)
      if(!repeatedNotification) {
        notificationsData.push(notification)
        sessionStorage.setItem('notifications', JSON.stringify(notificationsData))
        setNotifications(notificationsData)
      }
    } 
  }

  useEffect(() => {
    const ws = socket;
    if (ws !== null) {
      // check that the websocket connection exists
      console.log("websocket test notifs: ", ws)

      ws.onmessage = (event) => {
        // onmessage event to receive data
        const data = JSON.parse(event.data);

        console.log("data ws: ", data)

        if (data) {
          const segment = data.message
          if(segment.notification) {
            console.log("received notification: ", segment)
            processNotification(segment.notification)
          }
        }
      };
    }
  }, [socket]);
    
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

          <NotificationsDropDown notificationsData={notifications} count={notifications.length} /> {/* Add the notification dropdown */}
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