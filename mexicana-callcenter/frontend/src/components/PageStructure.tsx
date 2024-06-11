import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { DarkModeContext } from "../Provider/ThemeProvider"; 
import { FunctionComponent, ReactNode, useContext, useEffect, useState } from "react";
import "../css/PageStructure.css";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { useWebSocket } from "../hooks/useWebSocket";
import { Interaction, Notification, SentimentSegment, UnhandledInteractions } from "../utils/interfaces";


interface PageStructureProps {
  title: string;
  children?: ReactNode;
}

const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const { isAuthenticated, role } = useAuth();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const noArrowsRoutes = ['/Supervisor/home', '/Agent/home'];


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

  useEffect(() => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions')
    if(!unhandledInteractionsData) {
      sessionStorage.setItem('unhandledInteractions', JSON.stringify([]))
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

  const processUnhandledAgentEvent = (segment:Interaction) => {
       
        const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions') 
        let unhandledInteractions:UnhandledInteractions[] = []
        if(unhandledInteractionsData) { // check if there is data
          unhandledInteractions = JSON.parse(unhandledInteractionsData) // unhandled interactions array
  
          const matchedInteraction = unhandledInteractions.find(i => i.state.key === segment.key)

          console.log("matched inter: ", matchedInteraction)

          if(matchedInteraction) { // If there is a matched interaction, update it in session storage

            if(segment.state === 'LOGOUT') { // check if object needs to be removed
              sessionStorage.setItem('unhandledInteractions', JSON.stringify(unhandledInteractions.filter(i => i.state.key !== segment.key)))
              return
            }

            const updatedInteraction = segment.state === 'ON CALL' ? 
            { // Updated interaction
              ...matchedInteraction,
              state: segment
            } : 
            {
              state: segment
            }
            
            console.log("this is updated interaction: ", updatedInteraction)

            const updatedInteractions = unhandledInteractions.map(i => i.state.key === segment.key ? updatedInteraction : i) // make the update
            sessionStorage.setItem('unhandledInteractions', JSON.stringify(updatedInteractions))
          } 
          else { // If there is no match, add the unhandled interaction to the array
            const newUnhandled = {
              state: segment
            }
            console.log('there was no match: ', newUnhandled)
            unhandledInteractions.push(newUnhandled) // add the new unhandled interaction

            sessionStorage.setItem('unhandledInteractions', JSON.stringify(unhandledInteractions)) // save it

          }
        }
      
  }

  // functio to process unhandled sentiment segments
  const processUnhandledSentimentEvent = (segment: SentimentSegment) => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions') 
    let unhandledInteractions:UnhandledInteractions[] = []
    if(unhandledInteractionsData) { // check if there is data
      unhandledInteractions = JSON.parse(unhandledInteractionsData) // unhandled interactions array

      // find a matched interaction 
      const matchedInteraction = unhandledInteractions.find(i => i.state.contactId === segment.contactId) 

      console.log("matched inter when trying to adD sentiment: ", matchedInteraction)

      if(matchedInteraction) { // if it exists, update the sentiment property of the object
        const updatedInteraction = {
          ...matchedInteraction,
          sentiment: segment
        }

        // store the updated interactions to session storage
        const updatedInteractions = unhandledInteractions.map(i => i.state.contactId === segment.contactId ? updatedInteraction : i)
        sessionStorage.setItem('unhandledInteractions', JSON.stringify(updatedInteractions))
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

          if (window.location.pathname !== '/supervisor/ongoingcalls') {
            const { segmentType } = segment // check the segment type
            if(segmentType === 'AGENT_EVENT') {
              processUnhandledAgentEvent(segment)
            } else if(segmentType === 'SENTIMENT_ANALYSIS') {
              processUnhandledSentimentEvent(segment)
            }
          }

        }
      };
    }
  }, [socket]);
    
  return (
    <div className={`flex flex-col h-screen pl-2 pr-2 md:overflow-hidden ${darkMode ? 'dark:bg-gray-900' : ''}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between h-[10%] shadow-lg bg-tertiary dark:bg-gray-900 dark:shadow-slate-800 z-50">
        <div>
          <Button onClick={() => window.location.href = '/'}>
            <img
              src={darkMode ? "/newLogo_DARK_1.png" : "/newLogo_LIGHT_1.png"}
              alt="Logo"
              className="w-[115px] sm:w-[230px] ml-3"
            />
          </Button>
        </div>
        <div className="flex items-center">
          <h1 className="hidden md:block font dark:text-white">{title}</h1>
          <div className="h-10 mx-2 border-l-2 border-primary dark:border-white"></div>
          {isAuthenticated && role === 'Supervisor' && <NotificationsDropDown notificationsData={notifications} count={notifications.length} />}
          <div className="flex items-center">
            <SettingsButton />
            {!noArrowsRoutes.includes(location.pathname) && (
              <div className="flex items-center space-x-0.1">
                <button onClick={handleBack} className="p-0 m-0">
                  <img 
                    src={darkMode ? '/leftarrow_white.svg' : '/leftarrow.svg'} 
                    alt="back arrow" 
                    className="md:w-[45px] w-[38px] space-x-0.1 ml-5" 
                  />
                </button>
                <button onClick={handleForward}>
                  <img 
                    src={darkMode ? '/rightarrow_white.svg' : '/rightarrow.svg'} 
                    alt="forward arrow" 
                    className="md:w-[45px] w-[38px] p-0 mr-5" 
                  />
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

      <TimestampDisplay />
    </div>
  );
};

export default PageStructure;
