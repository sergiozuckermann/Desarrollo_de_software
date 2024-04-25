import PageStructure from "../components/PageStructure";
import MyPieChart from "../components/Charts/piechart";
import { useState } from "react";

interface CardProps {
    title: string;
    children: React.ReactNode;
  }

  interface PieChartDataItem {
    id: string | number;
    label: string;
    value: number;
    color?: string;
  }

  const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="max-w-md p-4 overflow-hidden border-2 border-gray-400 shadow-lg rounded-xl md:block bg-tertiary">
      <h2 className="mb-4 text-lg font-bold text-gray-600 font-roboto">{title}</h2>
        {children}
      </div>
    );
  };
  

const MainContent = () => {
        // Mock data
        const mockData: PieChartDataItem[] = [
          { id: "talk", label: "Talk Time", value: 64, color: "hsl(35, 53%, 69%)" },
          { id: "wait", label: "Wait Time", value: 35, color: "hsl(28, 100%, 53%)" },
          { id: "hold", label: "Hold Time", value: 20, color: "hsl(56, 68%, 72%)" },
        ];
      
        // State initialized with mock data
        const [chartData, setChartData] = useState<PieChartDataItem[]>(mockData)

    return (
        <div className="grid w-full h-full grid-cols-1 gap-4 p-4 md:grid-cols-12">
{/* AGENT CARD */}
            <div className="md:col-span-4">
                {/* Contenido */}
            </div>
{/* Tables Grid */}
            <div className="h-full md:col-span-8">
                    <div className="flex items-center justify-between pt-4 mb-4">
                        <h2 className="text-xl text-gray-600 font-roboto">Call Metrics</h2>
                        <button className="px-4 py-2 text-white rounded shadow bg-secondary">Barge In</button>
                    </div>
                    <div className="grid h-[85%] grid-cols-1 gap-4 md:grid-cols-2 md:col-span-8">
                        <Card title="Talk time">
                            <MyPieChart data={chartData} />
                        </Card>
                      
                        <Card title="Sentiment">   
                        </Card>

                        <Card title="Sentiment Trend">
                        </Card>

                        <Card title="Average Handling Time">
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
  