// Page Structure

// Imports libraries, hooks, and components
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import "../css/PageStructure.css";
import { useDarkMode } from "../hooks/useDarkMode";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import Button from "./Buttons";
import SettingsButton from "./SettingsButton";
import TimestampDisplay from "./TimestampDisplay";
import NotificationsDropDown from "./NotificationsDropDown";
import { useWebSocket } from "../hooks/useWebSocket";
import { Interaction, Notification, SentimentSegment, UnhandledInteractions, callOverviewAnalytics } from "../utils/interfaces";

// Define types for PageStructureProps
interface PageStructureProps {
  title: string;
  children?: ReactNode;
  userId?: string | null;
  userImage?: string | null;
  userInfo?: string | null;
}

// Define PageStructure component
const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const { isAuthenticated, role } = useAuth(); // authentication hook
  const { darkMode } = useDarkMode(); // dark mode hook
  const navigate = useNavigate(); // navigation hook
  const location = useLocation(); // location hook
  // handleBack function. going back to the previous page
  const handleBack = () => {
    navigate(-1);
  };
  // handleForward function. going forward to the next page
  const handleForward = () => {
    navigate(1);
  };
  // sets pages where arrows are not displayed
  const noArrowsRoutes = ['/Supervisor/home', '/Agent/home'];
  // useWebSocket hook to get the socket 
  const { socket } = useWebSocket();
  // useState hook to store notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // useEffect hook to get notifications from session storage
  useEffect(() => {
    const notificationsData = sessionStorage.getItem('notifications');
    if (notificationsData) {
      const allNotifications = JSON.parse(notificationsData);
      setNotifications(allNotifications);
    } else {
      sessionStorage.setItem('notifications', JSON.stringify([]));
    }
  }, []);
  // processNotification function to process notifications
  useEffect(() => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    if (!unhandledInteractionsData) {
      sessionStorage.setItem('unhandledInteractions', JSON.stringify([]));
    }
  }, []);
  // process notifications
  const processNotification = (notification: Notification) => {
    const allNotifications = sessionStorage.getItem('notifications');
    let notificationsData: Notification[] = [];
    if (allNotifications) {
      notificationsData = JSON.parse(allNotifications);
      const repeatedNotification = notificationsData.find(n => n.contactId === notification.contactId && n.segmentType === notification.segmentType);
      if (!repeatedNotification) {
        notificationsData.push(notification);
        sessionStorage.setItem('notifications', JSON.stringify(notificationsData));
        setNotifications(notificationsData);
      }
    }
  };
  // process unhandled agent events
  const processUnhandledAgentEvent = (segment: Interaction) => {
    // get unhandled interactions from session storage
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    // set unhandled interactions to an empty array
    let unhandledInteractions: UnhandledInteractions[] = [];
    // if unhandled interactions data is available in session storage then parse it
    if (unhandledInteractionsData) {
      unhandledInteractions = JSON.parse(unhandledInteractionsData);

      const matchedInteraction = unhandledInteractions.find(i => i.state.key === segment.key);
      // if matched interaction is found then update the interaction state with the new segment state
      if (matchedInteraction) {
        if (segment.state === 'LOGOUT') {
          sessionStorage.setItem('unhandledInteractions', JSON.stringify(unhandledInteractions.filter(i => i.state.key !== segment.key)));
          return;
        }

        const updatedInteraction = segment.state === 'ON CALL'
          ? { ...matchedInteraction, state: segment }
          : { state: segment };

        const updatedInteractions = unhandledInteractions.map(i => i.state.key === segment.key ? updatedInteraction : i);
        sessionStorage.setItem('unhandledInteractions', JSON.stringify(updatedInteractions));
        // if matched interaction is not found then create a new interaction state with the new segment state
      } else {
        const newUnhandled = { state: segment };
        unhandledInteractions.push(newUnhandled);
        sessionStorage.setItem('unhandledInteractions', JSON.stringify(unhandledInteractions));
      }
    }
  };
  // process unhandled sentiment events 
  const processUnhandledSentimentEvent = (segment: SentimentSegment) => {
    // get unhandled interactions from session storage
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    // set unhandled interactions to an empty array
    let unhandledInteractions: UnhandledInteractions[] = [];
    // if unhandled interactions data is available in session storage then parse it 
    if (unhandledInteractionsData) {
      unhandledInteractions = JSON.parse(unhandledInteractionsData);

      const matchedInteraction = unhandledInteractions.find(i => i.state.contactId === segment.contactId);
      // if matched interaction is found then update the interaction state with the new segment state
      if (matchedInteraction) {
        if (!matchedInteraction.state.callOverviewAnalytics) {
          matchedInteraction.state.callOverviewAnalytics = {
            agentTalk: 0,
            customerTalk: 0,
            nonTalk: 0,
            sentimentTrend: [],
            sentimentPercentages: { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 },
            callDuration: 0,
            key: matchedInteraction.state.key,
            contactId: matchedInteraction.state.contactId || ''
          };
        }
        segment.callOverviewAnalytics = updateMetrics(segment, matchedInteraction.state.callOverviewAnalytics);

        const updatedInteraction = {
          ...matchedInteraction,
          state: {
            ...matchedInteraction.state,
            callOverviewAnalytics: segment.callOverviewAnalytics
          },
          sentiment: segment
        };

        const updatedInteractions = unhandledInteractions.map(i => i.state.contactId === segment.contactId ? updatedInteraction : i);
        sessionStorage.setItem('unhandledInteractions', JSON.stringify(updatedInteractions));
      }
    }
  };
  // update metrics function 
  const updateMetrics = (segment: SentimentSegment, currentMetrics: callOverviewAnalytics): callOverviewAnalytics => {
    console.log('Updating metrics with segment: ', segment);
    // get sentiment value
    const sentimentValue = segment.Sentiment === "POSITIVE" ? 1 : segment.Sentiment === "NEGATIVE" ? -1 : 0;
    // get timestamp
    const timeStamp = parseFloat((segment.BeginOffsetMillis / 1000).toFixed(2));
    // update metrics with the new segment state for agent, customer, non-talk, sentiment trend, sentiment percentages, call duration, key, and contact id
    const updatedMetrics: callOverviewAnalytics = {
      agentTalk: currentMetrics.agentTalk,
      customerTalk: currentMetrics.customerTalk,
      nonTalk: currentMetrics.nonTalk,
      sentimentTrend: [...currentMetrics.sentimentTrend, { time: timeStamp, sentiment: sentimentValue }],
      sentimentPercentages: {
        POSITIVE: currentMetrics.sentimentPercentages.POSITIVE,
        NEGATIVE: currentMetrics.sentimentPercentages.NEGATIVE,
        NEUTRAL: currentMetrics.sentimentPercentages.NEUTRAL
      },
      callDuration: currentMetrics.callDuration,
      key: currentMetrics.key,
      contactId: currentMetrics.contactId
    };

    updatedMetrics.sentimentPercentages[segment.Sentiment as 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'] += 1;

    if (segment.ParticipantRole === "AGENT") {
      updatedMetrics.agentTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
    } else if (segment.ParticipantRole === "CUSTOMER") {
      updatedMetrics.customerTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
    } else {
      updatedMetrics.nonTalk += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));
    }

    updatedMetrics.callDuration += parseFloat(((segment.EndOffsetMillis - segment.BeginOffsetMillis) / 1000).toFixed(2));

    return updatedMetrics;
  };
  // useEffect hook to get notifications
  useEffect(() => {
    // get socket
    const ws = socket;
    // if socket is not null then get notifications
    if (ws !== null) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          const segment = data.message;
          if (segment.notification) {
            processNotification(segment.notification);
          }
          // if the current page is not '/supervisor/ongoingcalls' then process unhandled agent events
          if (window.location.pathname !== '/supervisor/ongoingcalls') {
            const { segmentType } = segment;
            if (segmentType === 'AGENT_EVENT') {
              processUnhandledAgentEvent(segment);
            } else if (segmentType === 'SENTIMENT_ANALYSIS') {
              processUnhandledSentimentEvent(segment);
            }
          }
          // if the current page is '/supervisor/ongoingcalls' then process unhandled sentiment events
          if (window.location.pathname === '/supervisor/ongoingcalls') {
            const { segmentType } = segment;
            if (segmentType === 'SENTIMENT_ANALYSIS') {
              processUnhandledSentimentEvent(segment);
            }
          }
        }
      };
    }
  }, [socket]);
  // return JSX component
  return (
    <div className={`flex flex-col h-screen pl-2 pr-2 md:overflow-hidden ${darkMode ? 'dark:bg-gray-900' : ''}`}>
      <div className="flex items-center justify-between h-[10%] shadow-lg bg-tertiary dark:bg-gray-900 dark:shadow-slate-800 z-50">
        <div>
          {/* Home Button */}
          <Button onClick={() => window.location.href = '/'}>
            <img
              src={darkMode ? "/newLogo_DARK_1.png" : "/newLogo_LIGHT_1.png"}
              alt="Logo"
              className="w-[115px] sm:w-[230px] ml-3"
            />
          </Button>
        </div>
        <div className="flex items-center">
          {/* Notifications */}
          <h1 className="hidden md:block font dark:text-white">{title}</h1>
          <div className="h-10 mx-2 border-l-2 border-primary dark:border-white"></div>
          {isAuthenticated && role === 'Supervisor' && <NotificationsDropDown notificationsData={notifications} count={notifications.length} />}
          <div className="flex items-center">
            {/* Settings Button */}
            <SettingsButton />
            {/* Arrow for page navigation */}
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

      <div className="flex h-[84%] w-[98%] items-center justify-center">
        {children}
      </div>
      {/* Timestamp */}
      <TimestampDisplay />
    </div>
  );
};

export default PageStructure;