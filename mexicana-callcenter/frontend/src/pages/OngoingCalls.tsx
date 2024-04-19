import { FunctionComponent, useState, useEffect } from "react";
import "../onGoingCalls.css";
import Button from "../components/Buttons";


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

  

  const getMood = (valueMood:number) => {
    switch (valueMood) {
      case 1:
        return "#06CB52"; // Green
      case 2:
        return "#ffd500"; // Yellow 
      case 3: 
        return "#ff2b00"; // Red
      // We can add more for other values if needed
      default:
        return "#808080" // Defalt gray if no match
    }
  };

  const getCallStatus = (callStatus:number) => {
    let statusColor = "#808080"; // Default color (gray)
    let statusText = ""; // Default text (empty)

    switch(callStatus){
      case 1:
        statusColor = "#0a8afb";
        statusText = "On Call";
        break;
      case 2:
        statusColor = "#a466e0";
        statusText = "On Hold";
        break;
      case 3:
        statusColor = "#ff7b00";
        statusText = "After Call";
        break;
      default:
        break; //Keep the default values      
    }
    return{statusColor, statusText};
  };

  const generateCells = (data:[number,number][]) => {
    const cells = [];
    for (let i = 0; i < data.length; i++) {
        const [callStatus, valueMood] = data[i]; //get value from the backend data
        const color = getMood(valueMood); // get the color based on the value
        const {statusColor, statusText} = getCallStatus(callStatus); // get the status color and text based on the callStatus
        
        cells.push(
          <td key={`${i}`} className="px-8 py-4" style={{ backgroundColor: "#F8F9FA", border: "1px solid"}}>
            <div className="flex flex-col">
              <div className="flex">
                <p className = "font2" >Nombre del agente</p>
                <img 
                  src="/i_icon.png"  
                  alt="i_icon" 
                  style={{width: "30px", height: "30px", cursor: 'pointer'}}
                />
              </div>
              <div className="flex status-container">
                <div className="status-text" style={{backgroundColor: statusColor, borderRadius: 10, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif"}}>{statusText}</div>
                <div className="color-circle" style={{backgroundColor: color}}></div>
              </div>
              <br />
              <button style={{background: "none", fontSize: "15px", cursor: 'pointer'}}>Barge in</button>
            </div>

          </td>
        );
      }
    return (
      <div className="grid grid-cols-5 gap-1 responsive-grid1 responsive-grid2 responsive-grid3 responsive-grid4 responsive-grid5">
        {cells}
      </div>
    );
  };

  type BackendData = [number, number][];
  
  // Example suage with backend data
  // bad = 3; medium = 2; good = 1, default = 0
  // defatuly = 0, On call = 1, on hold = 2, alter call = 3
  const backendData: BackendData = [
    [1, 0], [2, 1], [3, 2], [1, 3], [0, 0], [3, 1], [0, 0], [2, 2], [3, 3], [1, 0],[2, 3], [3, 2], [1, 1], [2, 0], [3, 3],
  ];

  return (
    <div className="flex flex-col min-h-screen"> {/* Prevent overflow at the root level */}
      
      {/* Top bar with background */}
      <div className="flex h-20 bg-tertiary shadow-lg justify-between items-center p-4">
        <div>
          {/* LA RUTA ESTA A LA PÁGINA DE HELLO POR QUE TODAVÍA NO TENEMOS HOME */}
          <Button onClick={() => window.location.href = '/'}>
            <img src="/logo_callCenter_color.png" alt="" className="w-[230px] ml-3 logo" />
          </Button>
       
        </div>
        <div className="flex map-container">
          {/* LA RUTA ESTA A UNA PÁGINA VACIA */}
          <Button onClick={() => window.location.href = '/Notifications'} className="hover-shrink-button">
            <img src="/notifications_iconn.png" alt="" className="w-[45px] mr-2 notification-bell" />
          </Button>

          <h1 className="font">| Map</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 h-[90%] justify-center items-center">
        <div className="flex items-center">
          <img 
            src="/onCallBlurb.png" 
            alt=""
            className="mt-12 ml-12 mb-12 mr-4 w-[60px] h-[60px]"
          />
          <h1 className="font1">Agents Overview</h1>
        </div>
        
        <div className="col-span-2 flex justify-center items-center mb-[30px]">
          <table className="border-collapse">
            <tbody>{generateCells(backendData)}</tbody>
          </table>
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
