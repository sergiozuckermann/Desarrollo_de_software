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

  const generateCells = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const cells = [];
      for (let j = 0; j < 5; j++) {
        cells.push(
          <td key={`${i}-${j}`} className="px-8 py-4" style={{ backgroundColor: "#F8F9FA", border: "1px solid"}}>
            <div className="flex flex-col">
              <p style={{fontFamily: "Arial, Helvetica, sans-serif", fontSize: "20px"}}>Nombre del agente</p>
              <div className="flex">
              <button style={{backgroundColor: "#3C72FC", borderRadius: 10, height: "40px", width: "65px", color: "white" }}>On Call</button>
                <div className="w-8 h-8 rounded-full ml-12" style={{backgroundColor: "#06CB52"}}></div>
              </div>
              <br />
              <button style={{background: "none"}}>Barge in</button>
            </div>

          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden"> {/* Prevent overflow at the root level */}
      
      {/* Top bar with background */}
      <div className="flex h-20 bg-tertiary shadow-lg justify-between items-center p-4">
        <div>
          {/* LA RUTA ESTA A LA PÁGINA DE HELLO POR QUE TODAVÍA NO TENEMOS HOME */}
        <button 
          onClick={() => window.location.href = '/'} 
          className="flex items-center border-none bg-transparent hover-shrink-button"
          style={{ cursor: 'pointer' }}
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
          style={{ cursor: 'pointer' }}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 h-[90%] justify-center items-center">
        <div className="flex items-center">
          <img 
            src="/onCallBlurb.png" 
            alt=""
            className="mt-12 ml-12 mb-12 mr-4 w-[60px] h-[60px]"
          />
          <h1 className="font1">Agents Overview</h1>
        </div>
        
        <div className="col-span-2 flex justify-center items-center mb-[40px]">
          <table className="border-collapse">
            <tbody>{generateCells()}</tbody>
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
