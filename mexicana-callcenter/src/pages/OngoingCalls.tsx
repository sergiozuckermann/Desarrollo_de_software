import { FunctionComponent, useState, useEffect } from "react";
import "../onGoingCalls.css";

const OngoingCalls: FunctionComponent = () => {
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
    <div className="flex flex-col h-screen overflow-hidden"> {/* Prevent overflow at the root level */}
      {/* Top bar with background */}
      <div className="flex h-20 bg-tertiary shadow-lg justify-between items-center p-4">
        <div>
          {/* LA RUTA ESTA A LA PÁGINA DE HELLO POR QUE TODAVÍA NO TENEMOS HOME */}
        <button 
          onClick={() => window.location.href = '/'} 
          className="flex items-center border-none bg-transparent hover-shrink-button"
        >
          <img 
            src="/logo_callCenter_color.png"  
            alt="" 
            className="w-[230px] ml-3"
          />
        </button>
        </div>
        <div className="flex items-center">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}
        <button 
          onClick={() => window.location.href = '/Notifications'} 
          className="flex items-center border-none bg-transparent hover-shrink-button"
        >
          <img 
            src="/notifications_iconn.png" 
            alt="" 
            className="w-[45px] mr-2"
          />
        </button>
          <h1 className="font">| Map</h1>
        </div>
      </div>
      {/* Main content */}
      <div className="flex h-[90%]">
        <div>
        
          <img 
            src="/onCallBlurb.png" 
            alt=""
            className="mt-12 ml-12 w-[60px] h-[60px]"
          />
        
        </div>
        <div className="flex-grow overflow-auto"> {/* Allow scrolling only within the main content if necessary */}
          <h1 className="font1">Agents Overview</h1>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="h-20 bg-tertiary shadow-lg flex justify-center items-center p-4">
          <p className = "font2" > {timestamp} </p>
      </div>
    </div>
  );
};

export default OngoingCalls;
