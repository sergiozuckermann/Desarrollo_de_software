import { useState, useEffect } from 'react';

const CallTimeDisplay = () => {
  const [callTime, setCallTime] = useState('00:00:00'); 

  useEffect(() => {
    const simulateFetchCallTime = () => {
      setTimeout(() => {
        setCallTime('02:34:56'); 
      }, 1000); 
    };

    simulateFetchCallTime();
  }, []); 
  return (
    <p className="pt-4 pr-2 pl-2 " style={{ fontSize: '12px' }}>
        {callTime}
    </p>
  );
};

export default CallTimeDisplay;
