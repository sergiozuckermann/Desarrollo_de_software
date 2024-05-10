// SupervisorNotifications.tsx
import React from "react";
import PageStructure from "../components/PageStructure";
import NotificationItem from "../components/NotificationItem";

const SupervisorNotifications: React.FunctionComponent = () => {
    const notifications = [
        { id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 2, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 3, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 5, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 6, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 7, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 8, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 7, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
        { id: 8, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " }
        
    ];

    return (
        <PageStructure title="Notifications">

            <div className="flex flex-col w-full h-[90%] ">
                <div className="w-full  h-[50%] flex flex-col pb-11">
                    <div className=" pl-8 pb-6">
                        <h1 className="text-left">Today</h1>
                    </div>
                    <div className="w-full pr-8 pl-8 space-y-4 overflow-y-scroll">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                message={notification.message}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full h-[50%] flex flex-col pb-11">
                    <div className=" pl-8 pb-6">
                        <h1 className="text-left">Yesterday</h1>
                    </div>
                    <div className="w-full pr-8 pl-8 space-y-4 overflow-y-scroll">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                message={notification.message}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageStructure>
    );
};

export default SupervisorNotifications;


