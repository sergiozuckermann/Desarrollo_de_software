// SupervisorNotifications.tsx
import React, { useState, useEffect } from "react";
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";
import { notifications } from "../components/notificationsData";

const SupervisorNotifications: React.FunctionComponent = () => {
  const [readNotifications, setReadNotifications] = useState<number[]>([]);

  useEffect(() => {
    const storedReadNotifications = localStorage.getItem("readNotifications");
    if (storedReadNotifications) {
      setReadNotifications(JSON.parse(storedReadNotifications));
    }
  }, []);

  const handleNotificationRead = (notificationId: number) => {
    if (!readNotifications.includes(notificationId)) {
      setReadNotifications([...readNotifications, notificationId]);
      localStorage.setItem("readNotifications", JSON.stringify([...readNotifications, notificationId]));
    }
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const lastMonth = new Date(lastWeek);
  lastMonth.setMonth(lastWeek.getMonth() - 1);

  const groupedNotifications = {
    today: notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      return notificationDate.toDateString() === today.toDateString();
    }),
    yesterday: notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      return notificationDate.toDateString() === yesterday.toDateString();
    }),
    lastWeek: notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      return notificationDate > lastWeek && notificationDate <= yesterday;
    }),
    lastMonth: notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      return notificationDate > lastMonth && notificationDate <= lastWeek;
    }),
    older: notifications.filter((notification) => {
      const notificationDate = new Date(notification.date);
      return notificationDate <= lastMonth;
    }),
  };

  return (
    <PageStructure title="Notifications">
      <div className="flex flex-col w-full h-[90%] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {/* Today */}
        {groupedNotifications.today.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="pl-24 pb-2">
              <h1 className="text-left text-4xl">Today</h1>
            </div>
            <div className="w-full pr-8 pl-16 space-y-4">
              {groupedNotifications.today.map((notification) => (
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
          </div>
        )}

        {/* Yesterday */}
        {groupedNotifications.yesterday.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="pl-24 pb-2 pt-6">
              <h1 className="text-left text-4xl">Yesterday</h1>
            </div>
            <div className="w-full pr-8 pl-16 space-y-4">
              {groupedNotifications.yesterday.map((notification) => (
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
          </div>
        )}

        {/* Last 7 Days */}
        {groupedNotifications.lastWeek.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="pl-24 pb-2 pt-6">
              <h1 className="text-left text-4xl">Last 7 Days</h1>
            </div>
            <div className="w-full pr-8 pl-16 space-y-4">
              {groupedNotifications.lastWeek.map((notification) => (
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
          </div>
        )}

        {/* Last 30 Days */}
        {groupedNotifications.lastMonth.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="pl-24 pb-2 pt-6">
              <h1 className="text-left text-4xl">Last 30 Days</h1>
            </div>
            <div className="w-full pr-8 pl-16 space-y-4">
              {groupedNotifications.lastMonth.map((notification) => (
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
          </div>
        )}

        {/* Older */}
        {groupedNotifications.older.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="pl-24 pb-2 pt-6">
              <h1 className="text-left text-4xl">Older</h1>
            </div>
            <div className="w-full pr-8 pl-16 space-y-4">
              {groupedNotifications.older.map((notification) => (
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
          </div>
        )}
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