import { FunctionComponent, useState, useEffect } from "react";
import Button from "../components/Buttons";
import ScrollableRectangle from "../components/scrollableRectangle";
import "../bargeIn.css";   

const BargeIn: FunctionComponent = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      const currentTimestamp = `${date} ${time}`;
      setTimestamp(currentTimestamp);
    };

    updateTimestamp(); 

    const intervalId = setInterval(updateTimestamp, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden"> {/* Prevent overflow at the root level */}
      
      {/* Top bar with background */}
      <div className="flex h-20 bg-tertiary shadow-lg justify-between items-center p-4">
        <div>
          {/* LA RUTA ESTA A LA PÁGINA DE HELLO POR QUE TODAVÍA NO TENEMOS HOME */}
          <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className="w-[230px] ml-3" />
          </Button>
       
        </div>
        <div className="flex items-center">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}
          <Button onClick={() => window.location.href = '/Notifications'} className="hover-shrink-button">
            <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2" />
          </Button>
        
          <h1 className="font">| On Call </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container">
        <ScrollableRectangle>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>
                <h1 className="font2 text-3xl">CCP </h1>

            </div>
        </ScrollableRectangle>

        <ScrollableRectangle>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
                <h1 className="font2 text-3xl">NOTEPAD</h1>
            </div>
        </ScrollableRectangle>

        <ScrollableRectangle>
            <div className="flex flex-col items-center justify-center">
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
                <h1 className="font2 text-3xl">Q&A</h1>
            </div>
        </ScrollableRectangle>

      </div>

      {/* Bottom bar */}
      <div className="h-20 bg-tertiary shadow-lg flex justify-center items-center p-4">
          <p className = "font2" > {timestamp} </p>
      </div>
    </div>
  );
};

export default BargeIn;
