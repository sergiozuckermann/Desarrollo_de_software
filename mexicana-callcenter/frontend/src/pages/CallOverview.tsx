import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import MyLineChart from "../components/Charts/linechart";
import CallCard from '../components/Callinfo';
import Card from '../components/Card';
import AHT from "../components/Charts/AHT";
import { useState } from "react";

//Aqui va la obtencion de los siguientes datos del aguente visitado: nombre del agente, puesto del agente 

//Aqui va la obtencion de los siguientes datos sobre la llamada: Asunto, Cliente, Prioridad, Razon, Tiempo de la llamada



  interface PieChartDataItem {
    id: string | number;
    label: string;
    value: number;
  }


  

const MainContent = () => {
        // Mock data
        const mockData: PieChartDataItem[] = [
          { id: "Custumer", label: "Talk Time", value: 64},
          { id: "Agent", label: "Wait Time", value: 35},
          { id: "Non-talk", label: "Hold Time", value: 20},
        ];
      
        // State initialized with mock data
        const [chartData, setChartData] = useState<PieChartDataItem[]>(mockData)

        const AnalysisData: PieChartDataItem[] = [
          { id: "Positive", label: "Positive", value: 64},
          { id: "Neutral", label: "Neutral", value: 52},
          { id: "Negative", label: "Negative", value: 12},
        ];
      
        // State initialized with mock data
        const [chartData2, setChartData2] = useState<PieChartDataItem[]>(AnalysisData)
        
        
        const sentimentData = [
          {
            id: "sentiment",
            data: [
              { x: "0", y: 0 },
              { x: "10", y: 2 },
              { x: "20", y: -3 },
              { x: "30", y: 1 },
              { x: "40", y: 4 },
              { x: "50", y: -1 },
            ]
          }
      ];

    return (
        <div className="grid w-full h-full grid-cols-1 gap-4 p-2 md:grid-cols-12">
{/* AGENT CARD */}
            <div className="md:col-span-4">
                <CallCard agentname="Juan" 
                agentposition="agent" 
                callclasification="Buy a ticket" 
                clientname="Natalia" 
                priority="high" 
                reason="High voice volume" 
                talktime={"05:30"}/>
            </div>
{/* Tables Grid */}
            <div className="z-30 h-full md:col-span-8">
                    <div className="flex items-center justify-between pt-4 mb-4">
                        <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
                        <button className="px-4 py-2 text-white rounded shadow bg-secondary">Barge In</button>
                    </div>
                    <div className="grid w-[100%] h-[80%] grid-cols-1 gap-2 md:grid-cols-2 md:col-span-8 z-30">
                        <Card title="Talk time">
                            <MyPieChart data={chartData} unit="seconds" />
                        </Card>
                      
                        <Card title="Sentiment"> 
                            <MyPieChart data={chartData2} unit="percent" />  
                        </Card>

                        <Card title="Sentiment Trend">
                            <MyLineChart data={sentimentData}/>
                        </Card>

                        <Card title="Average Handling Time">
                            <AHT classificationTime="00:03:10" currentTime="00:04:12" exceededTime="00:01:02"/>
                        </Card>
                    </div>
                </div>
        </div>
      );
    };


const CallOverview= () => {
    return (
      <PageStructure title="Call Overview">
        <MainContent />
      </PageStructure>
    );
  };
  
  export default CallOverview;