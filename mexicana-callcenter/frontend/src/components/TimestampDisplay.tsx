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
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center h-[5%] p-4 shadow-lg bg-tertiary dark:bg-gray-950">
      <p className="text-black dark:text-white text-lg font-semibold text-center font2">
        {timestamp}
      </p>
    </div>
  );
}

export default TimestampDisplay;
