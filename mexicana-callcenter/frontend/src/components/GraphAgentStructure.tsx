import React, { useState } from 'react';
import MyPieChart from './Charts/piechart';
import MyResponsiveBar from './Charts/barChart';

interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

interface GraphAgentStructureProps {
  agentsState: Array<PieChartDataItem>
}

const GraphAgentStructure: React.FunctionComponent<GraphAgentStructureProps> = ({agentsState}) => {
 

  const issueData: PieChartDataItem[] = [
    { id: "Flight Rsv", label: "Flight Rsv", value: 10 },
    { id: "Help", label: "Help", value: 20 },
    { id: "Booking or Website Issues", label: "Booking or Website Issues", value: 5 },
    { id: "Status Inquiries", label: "Status Inquiries", value: 5 },
    { id: "Special Assistance or Docs", label: "Special Assistance or Docs", value: 15 },
    { id: "Other Questions", label: "Other Questions", value: 4 },
  ];


  const [chartData2, setChartData2] = useState<PieChartDataItem[]>(issueData);

  const queueData = [
    {id:"FlightManagement", label: "Flight Rsv", value: 1 },
    {id:"CustomerCare", label: "Customer Care", value: 2 },
    {id:"WebsiteAssistance", label: "Booking or Website Issues", value: 5 },
    {id:"TravelInformation", label: "Status Inquiries", value: 3 },
    {id:"SpecialAssitance", label: "Special Assistance or Docs", value: 6 },
    {id:"OtherQuestions", label: "Other Questions", value: 4 }
  ];

  const totalCustomersWaiting = queueData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="box-border border-[1px] rounded-lg shadow p-4 border-solid border-marco shadow-lg lg:h-[700px] overflow-y-auto">
      <div className="flex flex-col items-center space-y-8 w-full">
        <div className="w-full">
          <h1 className="text-3xl font-roboto mb-4 text-center sm:text-left">Agent Status</h1>
          <div className="flex justify-center">
            <div style={{ width: '100%', height: '300px' }}>
              {
                agentsState.every(state => state.value === 0) ? 
                <h1>No active agents</h1> :  
                <MyPieChart data={agentsState} unit="Agents" />
              }
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-roboto mb-4 text-center sm:text-left">Agent Availability</h1>
          <div className="flex justify-center">
            <div style={{ width: '100%', height: '300px' }}>
              <MyPieChart data={chartData2} unit="Agents" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-roboto mb-0 text-center sm:text-left">Queue Issues</h1> 
          <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="text-center">
                  <h2 className="text-3xl font-roboto text-red-600">{totalCustomersWaiting}</h2>
                  <h2 className="text-xl font-roboto">Customers</h2>
                  <h2 className="text-xl font-roboto">Waiting</h2>
              </div>
              <div style={{ width: '100%', height: '300px' }}>
                  <MyResponsiveBar data={queueData} />
              </div>
          </div>
      </div>

</div>

    
  );
};

export default GraphAgentStructure;