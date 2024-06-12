import { useState, useEffect } from 'react';

interface CallTimeDisplayProps {
  callStartTime: number;
}

const CallTimeDisplay: React.FunctionComponent<CallTimeDisplayProps> = ({callStartTime}) => {
  const [callTime, setCallTime] = useState('00:00:00'); 
  
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - callStartTime) / 1000);
      setCallTime(formatDuration(duration));
    }, 1000);
    return () => clearInterval(interval);
}, [callStartTime]); 

  return (
    <p className="pt-4 pr-2 pl-2 " style={{ fontSize: '12px' }}>
        {callTime}
    </p>
  );
};

export default CallTimeDisplay;
