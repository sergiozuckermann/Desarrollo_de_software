import React from "react";

//function to change color of indicator in cellgrid
const MoodIndicator: React.FunctionComponent<{ moodValue: string }> = ({ moodValue }) => {
  const getMoodColor = (value: string) => {
    switch (value) {
      case "POSITIVE":
        return "#06CB52"; // Green for POSITIVE sentiment
      case "NEUTRAL":
        return "#808080"; // Gray for NEUTRAL sentiment
      case "NEGATIVE":
        return "#ff2b00"; // Red for NEGATIVE sentiment
    }
  };

  // Get the color based on the mood value
  const color = getMoodColor(moodValue);
  
  // Return the color circle with the appropriate col
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
