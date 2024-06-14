import React from 'react';

interface AHTProps {
//Format for all of them is "HH:MM:SS"
  classificationTime: string; 
  currentTime: string; 
  exceededTime: string;
}

const AHT: React.FC<AHTProps> = ({ classificationTime, currentTime, exceededTime }) => {
  
    return (
      <div className='w-full h-full z-70 pl-8' style={{ position: 'relative', zIndex:100, paddingBottom:10}}>
    <p className="mb-12 text-sm dark:text-white">
      <strong>For this classification:</strong> {classificationTime}
    </p>
    <p className="mb-12 text-sm dark:text-white">
      <strong>Talk time of current Call:</strong> {currentTime}
    </p>
    <p className="mb-12 text-sm dark:text-white">
      <strong>Exceeded AHT by:</strong> {exceededTime}
    </p>
  </div>
);
};

export default AHT;
