// Notification Counter Badge component to display the number of notifications

// import the FunctionComponent type
import  { FunctionComponent } from 'react';

// define the NotificationBadgeProps interface
interface NotificationBadgeProps {
    count: number; 
  }
// define the NotificationBadge component
const NotificationBadge: FunctionComponent<NotificationBadgeProps>  = ({ count }) => {
  if (count > 0) {
    return (
      <span className="badge">
        {count}
      </span>
      
    );
  }
  return null;
};
export default NotificationBadge;