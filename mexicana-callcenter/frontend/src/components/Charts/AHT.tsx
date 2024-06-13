// Average Handle Time component

// Importes React Library
import React from 'react';

// Defines the properties of the AHT component
interface AHTProps {
  callDuration: string;
}

// Defines the AHT component
const AHT: React.FC<AHTProps> = ({ callDuration }) => {
  return (
    // Returns a div with the call duration of the current call 
    <div className='w-full h-full z-70 pl-8' style={{ position: 'relative', zIndex:100, paddingBottom:10}}>
      <p className="mb-12 text-sm dark:text-white">
        <strong>Talk time of current Call:</strong> {callDuration}
      </p>
    </div>
  );
};

export default AHT;
