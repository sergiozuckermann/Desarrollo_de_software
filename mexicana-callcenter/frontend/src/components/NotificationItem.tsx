import React from "react";
import CircleNotification from "../components/CircleNotifications";

interface NotificationItemProps {
    message: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message }) => {
    return (
        
        <div
            className="p-4 bg-[#F8F9FA] shadow-md rounded-md border cursor-pointer flex justify-between"
                onClick={() => {
                    console.log("Elemento clickeado");
                }}
        >
            <p className="text-lg font-medium">{message}</p>
            <CircleNotification isSeen={false} />
            
        </div>
    );
};

export default NotificationItem;
