import { FunctionComponent, useState, useEffect, ReactNode } from "react";
import "../css/PageStructure.css";

// Define a type for the props for better TypeScript support
interface PageStructureProps {
    title: string; // title of the page
    children?: ReactNode; // main div content
  }
  const PageStructure: FunctionComponent<PageStructureProps> = ({ title, children }) => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const currentTimestamp = `${date} ${time}`;
      setTimestamp(currentTimestamp);
    };

    updateTimestamp(); // Actualizar el timestamp inicialmente

    const intervalId = setInterval(updateTimestamp, 1000); // Actualizar el timestamp cada segundo

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
    };
  }, []);

  return (
    <div className="flex flex-col h-screen pl-2 pr-2 sm:overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between h-[10%] shadow-lg bg-tertiary"> 
        <div>
          <img 
            src="/logo_callCenter_color.png"  
            alt="" 
            className=" w-[115px] sm:w-[230px] ml-3"
          />
        </div>
        <div className="flex items-center justify-center ">
          <img 
            src="/notifications_iconn.png" 
            alt="" 
            className="w-[30px] sm:w-[45px] mr-2"
          />
          <div className="h-10 mx-2 border-l-2 border-primary"></div> {/* Divisory line */}
          <div className="flex items-center">
            <h1 className="font">{title}</h1>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex h-[90%] w-[98%] items-center justify-center">
        {children}
      </div>
      {/* Bottom bar */}
      <div className="flex items-center justify-center h-20 p-4 shadow-lg bg-tertiary">
          <p className = "font2" > {timestamp} </p>
      </div>
    </div>
  );
};

export default PageStructure;