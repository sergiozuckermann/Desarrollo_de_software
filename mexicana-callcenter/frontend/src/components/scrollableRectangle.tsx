import React from 'react';
import "../bargeIn.css";

interface ScrollableRectangleProps {
  children: React.ReactNode;
  borderColor?: string;
  bgColor?: string;
}

const ScrollableRectangle: React.FC<ScrollableRectangleProps> = ({ children, borderColor = '', bgColor = '' }) => {
  return (
    <div className={`container rectangle overflow-auto border-2 p-2 ${borderColor} ${bgColor} text-black`}>
      {children}
    </div>
  );
};

export default ScrollableRectangle;

