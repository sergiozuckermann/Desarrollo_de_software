import React from 'react';

interface CallCardProps {
  title: string;
  content: string;
}

const CallCard: React.FC<CallCardProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="hidden md:block w-full h-full pt-[12%]">
        <div className="flex flex-col items-center justify-center h-full p-8 shadow-xl rounded-xl card">
          <div className="items-center px-8 py-4 text-center">
            <h2 className="pb-2 mb-2 text-lg">{title}</h2>
            <p className="pb-6 text-base text-gray-700">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCard;