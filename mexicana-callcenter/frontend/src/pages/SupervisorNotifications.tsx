import React, { useState, useEffect } from "react";
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";
import { notifications } from "../components/notificationsData"; 
import HorizontalTabs from "../components/NotificationTabs";
import { FaExclamationCircle, FaBook } from 'react-icons/fa';

// Placeholder functions for fetching data
const fetchSentimentAnalysis = async () => {
  // data fetching logic from Amazon Lex
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
  const [urgentNotifications, setUrgentNotifications] = useState<any[]>([]);
  const [nonUrgentNotifications, setNonUrgentNotifications] = useState<any[]>([]);

  useEffect(() => {
    const storedReadNotifications = localStorage.getItem("readNotifications");
    if (storedReadNotifications) {
      setReadNotifications(JSON.parse(storedReadNotifications));
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

      const nonUrgent = notifications.filter(notification => 
        !urgent.some(urgentNotification => urgentNotification.id === notification.id)
      );

      setUrgentNotifications(urgent);
      setNonUrgentNotifications(nonUrgent);
    };

    fetchData();
  }, []);

  const handleNotificationRead = (notificationId: number) => {
    if (!readNotifications.includes(notificationId)) {
      setReadNotifications([...readNotifications, notificationId]);
      localStorage.setItem("readNotifications", JSON.stringify([...readNotifications, notificationId]));
    }
  };

  const tabData = [
    {
      label: "Urgent",
      icon: <FaExclamationCircle />,
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
            />
          ))}
        </div>
      ),
    }
  ];

  return (
    <PageStructure title="Notifications">
      <div className="flex flex-col w-full h-[90%] overflow-y-auto">
        <HorizontalTabs data={tabData} />
      </div>
    </PageStructure>
  );
};

export const getUnreadNotificationsCount = () => {
  const storedReadNotifications = localStorage.getItem("readNotifications");
  const readNotifications = storedReadNotifications ? JSON.parse(storedReadNotifications) : [];
  return notifications.filter((notification) => !readNotifications.includes(notification.id)).length;
};

export default SupervisorNotifications;
