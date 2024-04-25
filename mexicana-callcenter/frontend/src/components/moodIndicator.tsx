import React from "react";

const MoodIndicator: React.FunctionComponent<{ moodValue: number }> = ({ moodValue }) => {
  const getMoodColor = (value: number) => {
    switch (value) {
      case 1:
        return "#06CB52"; // Green
      case 2:
        return "#ffd500"; // Yellow
      case 3:
        return "#ff2b00"; // Red
      default:
        return "#808080"; // Default gray
    }
  };

  const color = getMoodColor(moodValue);
  
  return (
    <div 
      className="color-circle"
      style={{
        backgroundColor: color,
        width: '30px',   
        height: '30px',  
        borderRadius: '50%', 
        display: 'inline-block', 
      }}
    ></div>
  );
};

export default MoodIndicator;
