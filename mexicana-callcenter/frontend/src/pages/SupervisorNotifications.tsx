// SupervisorNotifications.tsx
import React, { useState, useEffect } from "react";
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";

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
          localStorage.setItem('readNotifications', JSON.stringify([...readNotifications, notificationId]));
        }
      };

    const notifications = [
        {
          id: 1,
          title: "High Call Volume",
          message: "The call center is experiencing a high volume of incoming calls. All available agents are currently assisting customers. Estimated wait time is 10 minutes.",
          date: "2024-05-16 09:30:00",
        },
        {
          id: 2,
          title: "System Update Scheduled",
          message: "A system update has been scheduled for today at 11:00 PM. The call center system will be unavailable for approximately 30 minutes during the update.",
          date: "2024-05-16 10:15:00",
        },
        {
          id: 3,
          title: "New Agent Training",
          message: "A new batch of agents has completed their training and will be joining the call center team starting next Monday. Please ensure they are properly onboarded and assigned to their respective queues.",
          date: "2024-05-15 12:00:00",
        },
        {
          id: 4,
          title: "Customer Satisfaction Survey Results",
          message: "The results of the latest customer satisfaction survey are now available. Overall satisfaction rate has increased by 5% compared to the previous quarter. Great job, team!",
          date: "2024-05-15 11:45:00",
        },
        {
          id: 5,
          title: "Agent Performance Review",
          message: "The monthly agent performance review is scheduled for next Friday. Please prepare your feedback and discuss areas of improvement with your team members.",
          date: "2024-05-15 16:30:00",
        },
        {
          id: 6,
          title: "New Script Guidelines",
          message: "Updated script guidelines have been released for the sales campaign. All agents are required to familiarize themselves with the new guidelines and adhere to them during customer interactions.",
          date: "2024-05-14 13:20:00",
        },
        {
          id: 7,
          title: "System Outage Resolved",
          message: "The issue with the call center system has been resolved. All services are now back to normal. Thank you for your patience and understanding during the outage.",
          date: "2024-05-13 15:00:00",
        },
        {
          id: 8,
          title: "Agent of the Month",
          message: "Congratulations to Emily Davis for being recognized as the Agent of the Month! Her outstanding performance and dedication to customer service have set a great example for the team.",
          date: "2024-05-06 11:00:00",
        },
        {
          id: 9,
          title: "New Quality Assurance Process",
          message: "A new quality assurance process has been implemented to enhance the monitoring and evaluation of customer interactions. Supervisors will be conducting regular call reviews and providing feedback to agents.",
          date: "2024-05-05 14:30:00",
        },
        {
          id: 10,
          title: "Upcoming Holiday Schedule",
          message: "Please be informed that the call center will be operating on a reduced schedule during the upcoming holidays. Agents are requested to submit their availability for the holiday shifts by the end of this week.",
          date: "2024-05-05 10:00:00",
        },
        {
          id: 11,
          title: "New Product Launch",
          message: "We are excited to announce the launch of our new product line. All agents will receive training on the product features and benefits next week. Get ready to promote and support this exciting addition to our offerings!",
          date: "2024-04-04 13:45:00",
        },
        {
          id: 12,
          title: "Shift Swap Request",
          message: "Agent Michael Thompson has requested a shift swap for next Tuesday. If anyone is available to cover his shift, please contact the scheduling team.",
          date: "2024-04-04 09:15:00",
        },
        {
          id: 13,
          title: "Compliance Training Reminder",
          message: "This is a reminder that all agents must complete the mandatory compliance training by the end of this month. Please ensure you have allocated time to complete the training modules.",
          date: "2023-05-03 16:20:00",
        },
        {
          id: 14,
          title: "New Customer Feedback Channel",
          message: "We have introduced a new customer feedback channel through our website. Agents are encouraged to promote this channel to customers and encourage them to provide their valuable feedback.",
          date: "2023-05-03 11:30:00",
        },
        {
          id: 15,
          title: "Updated Contact Information",
          message: "Please update your contact information in the employee portal. This includes your current phone number, email address, and emergency contact details.",
          date: "2024-05-10 14:00:00",
        },
      ];

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
          <div className="flex flex-col w-full h-[90%] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
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
    
    export default SupervisorNotifications;