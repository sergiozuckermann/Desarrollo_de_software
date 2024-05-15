import { ReactNode } from "react";
import "../bargeIn.css";    

const ScrollableRectangle = ({ children, bgColor = 'bg-blue-200', borderColor = 'border-blue-500' }: 
  {
    children: ReactNode,
    bgColor: string,
    borderColor: string
  }
) => {
  return (
    <div className={`container rectangle overflow-auto ${borderColor} border-2 p-2 ${bgColor} text-black`}>
      {children}
    </div>
  );
};

export default ScrollableRectangle;
