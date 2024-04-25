import React, { useState, useEffect } from "react";

const TimestampDisplay: React.FunctionComponent = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const currentTimestamp = `${date} ${time}`;
      setTimestamp(currentTimestamp);
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full" style={{ boxShadow: '0 4px 6px rgba(1, 1, 1, 1)' }}>
      <p className="text-black text-lg font-semibold text-center font2">
        {timestamp}
      </p>
    </div>
  );
}

export default TimestampDisplay;
