import React from "react";

const CallStatusIndicator: React.FunctionComponent<{ callStatus: string }> = ({ callStatus }) => {
  const getCallStatus = (status: string) => {
    switch (status) {
      case "ON CALL":
        return "#0a8afb";
      case "AVAILABLE":
        return "#008000";
      case "ACW":
        return "#e29301";
      case "OFFLINE":
        return "#FF0000";
    }
  };

  const color = getCallStatus(callStatus);
  return (
    <div className="status-text px-4 py-2" style={{ backgroundColor: color, borderRadius: 50, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif"}}>
      {callStatus.toLowerCase()}
    </div>
  );
};

export default CallStatusIndicator;
