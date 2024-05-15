import  { FunctionComponent } from 'react';

interface NotificationBadgeProps {
    count: number; 
  }

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
