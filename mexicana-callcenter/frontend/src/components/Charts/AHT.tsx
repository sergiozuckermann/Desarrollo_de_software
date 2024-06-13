import React from 'react';

interface AHTProps {
  callDuration: string;
}

const AHT: React.FC<AHTProps> = ({ callDuration }) => {
  return (
    <div className='w-full h-full z-70 pl-8' style={{ position: 'relative', zIndex:100, paddingBottom:10}}>
      <p className="mb-12 text-sm dark:text-white">
        <strong>Talk time of current Call:</strong> {callDuration}
      </p>
    </div>
  );
};

export default AHT;
