import React, { useState } from 'react';
import NotificationBadge from './notificationComponent';
import { useNavigate } from 'react-router-dom';


const NotificationsDropDown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();

    const notificationsData = [
        { id: 1, title: 'Mensaje 1', content: 'Contenido del mensaje 1' },
        { id: 2, title: 'Mensaje 2', content: 'Contenido del mensaje 2' },
        { id: 3, title: 'Mensaje 3', content: 'Contenido del mensaje 3' },
        { id: 4, title: 'Mensaje 4', content: 'Contenido del mensaje 4' },
        { id: 5, title: 'Mensaje 5', content: 'Contenido del mensaje 5' },
        { id: 6, title: 'Mensaje 6', content: 'Contenido del mensaje 6' },
        { id: 7, title: 'Mensaje 7', content: 'Contenido del mensaje 7' },
        { id: 8, title: 'Mensaje 8', content: 'Contenido del mensaje 8' },
    ];

    const totalMessages = notificationsData.length;

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleNotificationClick = () => {
        // página de notificaciones
        navigate('/supervisor/notifications');
        
    };

    return (
        <div className="relative">
            <button className="p-2" onClick={handleToggleDropdown}>
                <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
                <NotificationBadge count={totalMessages} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {/* Contenido del dropdown */}
                    <div className="p-2">
                        <h3 className="text-lg font-semibold mb-4 ">Notificaciones</h3>
                        {notificationsData.map(notification => (
                            <div
                                key={notification.id}
                                className="notification-item mb-4 cursor-pointer"
                                onClick={handleNotificationClick}
                            >
                                <strong>{notification.title}</strong>
                                <p className="text-sm mt-1">{notification.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsDropDown;
