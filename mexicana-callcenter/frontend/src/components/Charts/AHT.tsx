import React from 'react';

interface AHTProps {
//Format for all of them is "HH:MM:SS"
  classificationTime: string; 
  currentTime: string; 
  exceededTime: string;
}

const AHT: React.FC<AHTProps> = ({ classificationTime, currentTime, exceededTime }) => {
    return (
    <div className="">
    <p className="mb-12 text-sm">
      <strong>For this classification:</strong> {classificationTime}
    </p>
    <p className="mb-12 text-sm">
      <strong>Talk time of current Call:</strong> {currentTime}
    </p>
    <p className="mb-12 text-sm">
      <strong>Exceeded AHT by:</strong> {exceededTime}
    </p>
  </div>
);
};

// /* For this classification */

// position: absolute;
// width: 321px;
// height: 32px;

// font-family: 'Inter';
// font-style: normal;
// font-weight: 700;
// font-size: 18px;
// line-height: 22px;
// display: flex;
// align-items: center;

// color: #000000;


export default AHT;
