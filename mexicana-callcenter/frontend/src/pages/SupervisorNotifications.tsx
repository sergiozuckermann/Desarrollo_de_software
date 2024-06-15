// Import necessary dependencies from React
// - useState: A hook for managing state within the component
// - useEffect: A hook for performing side effects in the component
import React, { useState, useEffect } from "react";

// Import custom components
// - PageStructure: A component for providing a consistent page layout
// - NotificationItem: A component for rendering individual notification items
// - notifications: An array of notification data imported from a separate file
// - HorizontalTabs: A component for rendering horizontal tabs
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";
import HorizontalTabs from "../components/NotificationTabs";

// Import icons from react-icons library
// - FaExclamationCircle: An icon for representing urgent notifications
// - FaBook: An icon for representing non-urgent notifications
import { FaExclamationCircle, FaBook } from 'react-icons/fa';

// Define the shape of a Notification object using an interface
// - id: A unique identifier for the notification
// - title: The title of the notification
// - message: The message content of the notification
// - date: The date of the notification
// - isRead: A boolean indicating whether the notification has been read
interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

// Define the SupervisorNotifications component as a functional component
const SupervisorNotifications: React.FunctionComponent = () => {
  // State variables
  // - readNotifications: An array of notification IDs that have been marked as read
  // - deletedNotifications: An array of notification IDs that have been deleted
  // - urgentNotifications: An array of urgent notification objects
  // - nonUrgentNotifications: An array of non-urgent notification objects
  // - hasNewUrgent: A boolean indicating whether there are new urgent notifications
  const [readNotifications, setReadNotifications] = useState<number[]>([]);
  const [deletedNotifications, setDeletedNotifications] = useState<number[]>([]);
  const [urgentNotifications, setUrgentNotifications] = useState<Notification[]>([]);
  const [nonUrgentNotifications, setNonUrgentNotifications] = useState<Notification[]>([]);
  const [hasNewUrgent, setHasNewUrgent] = useState<boolean>(false);

  // useEffect hook to load read and deleted notifications from localStorage on component mount
  // - Retrieves the stored read and deleted notifications from localStorage
  // - Parses the stored data from JSON string to an array
  // - Updates the respective state variables with the parsed data
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

  // useEffect hook to fetch and process notifications data
  // - Defines an asynchronous function fetchData to retrieve and process notifications
  // - Retrieves notifications data from sessionStorage
  // - Filters urgent notifications based on specific keywords in the title
  // - Sorts urgent notifications by priority: "call", "queue", "performance"
  // - Filters non-urgent notifications by excluding the urgent ones
  // - Removes deleted notifications from both urgent and non-urgent lists
  // - Updates the state variables with the filtered and sorted notifications
  useEffect(() => {
    const fetchData = async () => {
      const notificationsData = sessionStorage.getItem('notifications')
      if(notificationsData) {
        const notifications:Notification[] = JSON.parse(notificationsData)
        const urgent = notifications.filter(notification => 
          notification.title.toLowerCase().includes("call") ||
          notification.title.toLowerCase().includes("performance") ||
          notification.title.toLowerCase().includes("bad sentiment") ||
          notification.title.toLowerCase().includes("queue")
        );

        const sortedUrgent = urgent.sort((a, b) => {
          const keywords = ["call", "queue", "performance"];
          const getPriority = (title:string) => {
            for (let i = 0; i < keywords.length; i++) {
              if (title.toLowerCase().includes(keywords[i])) {
                return i;
              }
            } 
            return keywords.length;
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
      }
    };

    fetchData();
  }, [readNotifications, deletedNotifications]);

  // Function to handle tab change
  // - Receives the index of the selected tab
  // - If the selected tab is the first tab (index 0) and there are new urgent notifications,
  //   it sets hasNewUrgent to false
  const handleTabChange = (index: number) => {
    if (index === 0 && hasNewUrgent) {
      setHasNewUrgent(false);
    }
  };

  // Function to handle marking a notification as read
  // - Receives the ID of the notification to be marked as read
  // - Checks if the notification is not already in the readNotifications array
  // - If not, it adds the notification ID to the readNotifications array
  // - Updates the readNotifications state variable and stores the updated array in localStorage
  // - Checks if all urgent notifications are now marked as read
  // - Sets hasNewUrgent based on whether all urgent notifications are read
  const handleNotificationRead = (notificationId: number) => {
    if (!readNotifications.includes(notificationId)) {
      const updatedReadNotifications = [...readNotifications, notificationId];
      setReadNotifications(updatedReadNotifications);
      localStorage.setItem("readNotifications", JSON.stringify(updatedReadNotifications));
      
      const allUrgentRead = urgentNotifications.every(notification => updatedReadNotifications.includes(notification.id));
      setHasNewUrgent(!allUrgentRead);
    }
  };

  // Function to handle deleting a notification
  // - Receives the ID of the notification to be deleted
  // - Checks if the notification is not already in the deletedNotifications array
  // - If not, it adds the notification ID to the deletedNotifications array
  // - Updates the deletedNotifications state variable and stores the updated array in localStorage
  // - Filters out the deleted notification from the urgentNotifications and nonUrgentNotifications arrays
  // - Updates the respective state variables with the filtered arrays
  const handleDeleteNotification = (notificationId: number) => {
    if (!deletedNotifications.includes(notificationId)) {
      const updatedDeletedNotifications = [...deletedNotifications, notificationId];
      setDeletedNotifications(updatedDeletedNotifications);
      localStorage.setItem("deletedNotifications", JSON.stringify(updatedDeletedNotifications));

      const updatedUrgent = urgentNotifications.filter(notification => notification.id !== notificationId);
      const updatedNonUrgent = nonUrgentNotifications.filter(notification => notification.id !== notificationId);

      setUrgentNotifications(updatedUrgent);
      setNonUrgentNotifications(updatedNonUrgent);
    }
  };

  // Define the data for the horizontal tabs
  // - Each tab is an object with a label, icon, and content
  // - The first tab represents urgent notifications and uses the FaExclamationCircle icon
  //   - If there are new urgent notifications, the icon has a 'flash-red' class for visual indication
  //   - The content of the first tab renders a list of urgent notification items using the NotificationItem component
  //   - If there are no urgent notifications, it displays a message indicating so
  // - The second tab represents non-urgent notifications and uses the FaBook icon
  //   - The content of the second tab renders a list of non-urgent notification items using the NotificationItem component
  //   - If there are no non-urgent notifications, it displays a message indicating so
  const tabData = [
    {
      label: "Urgent",
      icon: <FaExclamationCircle className={hasNewUrgent ? 'flash-red' : ''} />,
      content: (
        <div className="w-full pr-8 pl-16 space-y-4">
          {!urgentNotifications.length ? (<p>no urgent notifications</p>) : urgentNotifications.map((notification) => (
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
          {!nonUrgentNotifications.length ? (<p>no notifications</p>) : nonUrgentNotifications.map((notification) => (
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

  // Render the SupervisorNotifications component
  // - Uses the PageStructure component to provide a consistent page layout and title
  // - Renders a container div with flexbox styling and overflow-y set to auto
  //   - The container div has a height of 90% to allow for scrolling if needed
  // - Renders the HorizontalTabs component with the tabData and handleTabChange function as props
  return (
    <PageStructure title="Notifications">
      <div className="flex flex-col w-full h-[90%] overflow-y-auto">
        <HorizontalTabs data={tabData} onTabChange={handleTabChange} />
      </div>
    </PageStructure>
  );
};

// Helper function to get the count of unread notifications
// - Retrieves the stored read and deleted notifications from localStorage
// - Parses the stored data from JSON string to an array (if available, otherwise uses an empty array)
// - Filters the notifications array to include only notifications that are not in the readNotifications and deletedNotifications arrays
// - Returns the length of the filtered array, representing the count of unread notifications
export const getUnreadNotificationsCount = () => {
  const storedReadNotifications = localStorage.getItem("readNotifications");
  const readNotifications = storedReadNotifications ? JSON.parse(storedReadNotifications) : [];
  const storedDeletedNotifications = localStorage.getItem("deletedNotifications");
  const deletedNotifications = storedDeletedNotifications ? JSON.parse(storedDeletedNotifications) : [];
  return notifications.filter((notification) => !readNotifications.includes(notification.id) && !deletedNotifications.includes(notification.id)).length;
};

// Export the SupervisorNotifications component as the default export
export default SupervisorNotifications;