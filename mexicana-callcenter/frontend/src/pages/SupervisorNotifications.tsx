import React, { useState, useEffect } from "react";
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";
import { notifications } from "../components/notificationsData"; 
import HorizontalTabs from "../components/NotificationTabs";
import { FaExclamationCircle, FaBook } from 'react-icons/fa';

// Placeholder functions for fetching data
const fetchSentimentAnalysis = async () => {
  // data fetching logic from kinesis
  return [];
};

const fetchAgentPerformance = async () => {
  // data fetching logic from metrics
  return [];
};

const fetchQueueData = async () => {
  // data fetching logic from Amazon Connect
  return [];
};

const SupervisorNotifications: React.FunctionComponent = () => {
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  const [deletedNotifications, setDeletedNotifications] = useState<number[]>([]);
  const [urgentNotifications, setUrgentNotifications] = useState<any[]>([]);
  const [nonUrgentNotifications, setNonUrgentNotifications] = useState<any[]>([]);
  const [hasNewUrgent, setHasNewUrgent] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);


  useEffect(() => {
    const storedReadNotifications = localStorage.getItem("readNotifications");
    const storedDeletedNotifications = localStorage.getItem("deletedNotifications");
    
    if (storedReadNotifications) {
      setReadNotifications(JSON.parse(storedReadNotifications));
    }
    if (storedDeletedNotifications) {
      setDeletedNotifications(JSON.parse(storedDeletedNotifications));
    }
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sentimentData = await fetchSentimentAnalysis();
      const agentPerformanceData = await fetchAgentPerformance();
      const queueData = await fetchQueueData();

      const urgent = notifications.filter(notification => 
        sentimentData.some(sentiment => sentiment.id === notification.id && sentiment.isBad) ||
        agentPerformanceData.some(agent => agent.id === notification.id && agent.isPerformingBadly) ||
        queueData.some(queue => queue.id === notification.id && queue.isTooLong) ||
        notification.title.toLowerCase().includes("call") ||
        notification.title.toLowerCase().includes("performance") ||
        notification.title.toLowerCase().includes("bad sentiment") ||
        notification.title.toLowerCase().includes("queue")
      );

      // Sort urgent notifications by priority: "call", "queue", "performance"
      const sortedUrgent = urgent.sort((a, b) => {
        const keywords = ["call", "queue", "performance"];
        const getPriority = (title) => {
          for (let i = 0; i < keywords.length; i++) {
            if (title.toLowerCase().includes(keywords[i])) {
              return i;
            }
          }
          return keywords.length; // Default priority if no keywords match
        };

        return getPriority(a.title) - getPriority(b.title);
      });

      const nonUrgent = notifications.filter(notification => 
        !sortedUrgent.some(urgentNotification => urgentNotification.id === notification.id)
      );

      const filteredUrgent = sortedUrgent.filter(notification => !deletedNotifications.includes(notification.id));
      const filteredNonUrgent = nonUrgent.filter(notification => !deletedNotifications.includes(notification.id));

      setUrgentNotifications(filteredUrgent);
      setNonUrgentNotifications(filteredNonUrgent);

      const hasUnreadUrgent = filteredUrgent.some(notification => !readNotifications.includes(notification.id));
      setHasNewUrgent(hasUnreadUrgent);

      const unreadCount = filteredUrgent.filter(notification => !readNotifications.includes(notification.id)).length +
                          filteredNonUrgent.filter(notification => !readNotifications.includes(notification.id)).length;
      setUnreadNotificationsCount(unreadCount);
    };

    fetchData();
  }, [readNotifications, deletedNotifications]);

  const handleTabChange = (index: number) => {
    if (index === 0 && hasNewUrgent) {
      setHasNewUrgent(false);
    }
  };

  const handleNotificationRead = (notificationId: number) => {
    if (!readNotifications.includes(notificationId)) {
      const updatedReadNotifications = [...readNotifications, notificationId];
      setReadNotifications(updatedReadNotifications);
      localStorage.setItem("readNotifications", JSON.stringify(updatedReadNotifications));
      
      const allUrgentRead = urgentNotifications.every(notification => updatedReadNotifications.includes(notification.id));
      setHasNewUrgent(!allUrgentRead);

      const unreadCount = urgentNotifications.filter(notification => !updatedReadNotifications.includes(notification.id)).length +
                          nonUrgentNotifications.filter(notification => !updatedReadNotifications.includes(notification.id)).length;
      setUnreadNotificationsCount(unreadCount);
    }
  };

  const handleDeleteNotification = (notificationId: number) => {
    if (!deletedNotifications.includes(notificationId)) {
      const updatedDeletedNotifications = [...deletedNotifications, notificationId];
      setDeletedNotifications(updatedDeletedNotifications);
      localStorage.setItem("deletedNotifications", JSON.stringify(updatedDeletedNotifications));

      setUrgentNotifications(prev => prev.filter(notification => notification.id !== notificationId));
      setNonUrgentNotifications(prev => prev.filter(notification => notification.id !== notificationId));

      const unreadCount = updatedUrgent.filter(notification => !readNotifications.includes(notification.id)).length +
                          updatedNonUrgent.filter(notification => !readNotifications.includes(notification.id)).length;
      setUnreadNotificationsCount(unreadCount);
    }
  };

  const tabData = [
    {
      label: "Urgent",
      icon: <FaExclamationCircle className={hasNewUrgent ? 'flash-red' : ''} />,
      content: (
        <div className="w-full pr-8 pl-16 space-y-4">
          {urgentNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
              date={notification.date}
              isRead={readNotifications.includes(notification.id)}
              onRead={() => handleNotificationRead(notification.id)}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))}
        </div>
      ),
    },
    {
      label: "Non Urgent",
      icon: <FaBook />,
      content: (
        <div className="w-full pr-8 pl-16 space-y-4">
          {nonUrgentNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
              date={notification.date}
              isRead={readNotifications.includes(notification.id)}
              onRead={() => handleNotificationRead(notification.id)}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))}
        </div>
      ),
    }
  ];

  return (
    <PageStructure title="Notifications">
      <div className="flex flex-col w-full h-[90%] overflow-y-auto">
        <HorizontalTabs data={tabData} onTabChange={handleTabChange} />
      </div>
    </PageStructure>
  );
};

export default SupervisorNotifications;

export const getUnreadNotificationsCount = () => {
  const storedReadNotifications = localStorage.getItem("readNotifications");
  const readNotifications = storedReadNotifications ? JSON.parse(storedReadNotifications) : [];
  const storedDeletedNotifications = localStorage.getItem("deletedNotifications");
  const deletedNotifications = storedDeletedNotifications ? JSON.parse(storedDeletedNotifications) : [];
  return notifications.filter((notification) => !readNotifications.includes(notification.id) && !deletedNotifications.includes(notification.id)).length;
};
