import React from "react";

const CallStatusIndicator: React.FunctionComponent<{ callStatus: number }> = ({ callStatus }) => {
  const getCallStatus = (status: number) => {
    switch (status) {
      case 1:
        return { color: "#0a8afb", text: "On Call" };
      case 2:
        return { color: "#a466e0", text: "On Hold" };
      case 3:
        return { color: "#ff7b00", text: "After Call" };
      default:
        return { color: "#808080", text: "NA" }; 
    }
  };

  const { color, text } = getCallStatus(callStatus);
  return (
    <div className="status-text px-4 py-2" style={{ backgroundColor: color, borderRadius: 50, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif"}}>
      {text}
    </div>
  );
};

export default CallStatusIndicator;
