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

interface PageStructureProps {
  title: string;
  children?: ReactNode;
  userId?: string | null;
  userImage?: string | null;
  userInfo?: string | null;
}

const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const { isAuthenticated, role } = useAuth();
  const { darkMode } = useDarkMode(); // Use custom hook
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const noArrowsRoutes = ['/Supervisor/home', '/Agent/home'];

  const { socket } = useWebSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const notificationsData = sessionStorage.getItem('notifications');
    if (notificationsData) {
      const allNotifications = JSON.parse(notificationsData);
      setNotifications(allNotifications);
    } else {
      sessionStorage.setItem('notifications', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    if (!unhandledInteractionsData) {
      sessionStorage.setItem('unhandledInteractions', JSON.stringify([]));
    }
  }, []);

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

  const processUnhandledAgentEvent = (segment: Interaction) => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    let unhandledInteractions: UnhandledInteractions[] = [];
    if (unhandledInteractionsData) {
      unhandledInteractions = JSON.parse(unhandledInteractionsData);

      const matchedInteraction = unhandledInteractions.find(i => i.state.key === segment.key);

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
      } else {
        const newUnhandled = { state: segment };
        unhandledInteractions.push(newUnhandled);
        sessionStorage.setItem('unhandledInteractions', JSON.stringify(unhandledInteractions));
      }
    }
  };

  const processUnhandledSentimentEvent = (segment: SentimentSegment) => {
    const unhandledInteractionsData = sessionStorage.getItem('unhandledInteractions');
    let unhandledInteractions: UnhandledInteractions[] = [];
    if (unhandledInteractionsData) {
      unhandledInteractions = JSON.parse(unhandledInteractionsData);

      const matchedInteraction = unhandledInteractions.find(i => i.state.contactId === segment.contactId);

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

  const updateMetrics = (segment: SentimentSegment, currentMetrics: callOverviewAnalytics): callOverviewAnalytics => {
    console.log('Updating metrics with segment: ', segment);

    const sentimentValue = segment.Sentiment === "POSITIVE" ? 1 : segment.Sentiment === "NEGATIVE" ? -1 : 0;
    const timeStamp = parseFloat((segment.BeginOffsetMillis / 1000).toFixed(2));

    const updatedMetrics: callOverviewAnalytics = {
      agentTalk: currentMetrics.agentTalk,
      customerTalk: currentMetrics.customerTalk,
      nonTalk: currentMetrics.nonTalk,
      sentimentTrend: [...currentMetrics.sentimentTrend, { x: timeStamp, y: sentimentValue }],
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

  useEffect(() => {
    const ws = socket;
    if (ws !== null) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          const segment = data.message
          const contactIdsToFilter = ["9272a5e8-ac7b-4402-bde9-04ddc3d85d1c","ac482bb5-cbed-473b-b04c-82f68220515e"];
          if (contactIdsToFilter.includes(segment.contactId)) {
            console.log("Filtered out message with contact ID:", contactIdsToFilter);
            return;
          }
  
          if(segment.notification) {
            console.log("received notification: ", segment)
            processNotification(segment.notification)
          }

          if (window.location.pathname !== '/supervisor/ongoingcalls') {
            const { segmentType } = segment;
            if (segmentType === 'AGENT_EVENT') {
              processUnhandledAgentEvent(segment);
            } else if (segmentType === 'SENTIMENT_ANALYSIS') {
              processUnhandledSentimentEvent(segment);
            }
          }

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

  return (
    <div className={`flex flex-col h-screen pl-2 pr-2 md:overflow-hidden ${darkMode ? 'dark:bg-gray-900' : ''}`}>
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

      <div className="flex h-[84%] w-[98%] items-center justify-center">
        {children}
      </div>

      <TimestampDisplay />
    </div>
  );
};

export default PageStructure;