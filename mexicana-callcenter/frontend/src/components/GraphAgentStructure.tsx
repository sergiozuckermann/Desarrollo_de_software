import React, { useEffect, useState } from 'react';
import MyPieChart from './Charts/piechart';
import MyResponsiveBar from './Charts/barChart';
import userService from '../services/user';

interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

interface QueueDataItem {
  label: string;
  value: number;
}

interface GraphAgentStructureProps {
  agentsState: Array<PieChartDataItem>
}


const GraphAgentStructure: React.FunctionComponent<GraphAgentStructureProps> = ({ agentsState }) => {
  const [queueData, setQueueData] = useState<QueueDataItem[]>([]);


  const issueData: PieChartDataItem[] = [
    { id: "Flight Rsv", label: "Flight Rsv", value: 10 },
    { id: "Help", label: "Help", value: 20 },
    { id: "Booking or Website Issues", label: "Booking or Website Issues", value: 5 },
    { id: "Status Inquiries", label: "Status Inquiries", value: 5 },
    { id: "Special Assistance or Docs", label: "Special Assistance or Docs", value: 15 },
    { id: "Other Questions", label: "Other Questions", value: 4 },
  ];


  const [chartData2, setChartData2] = useState<PieChartDataItem[]>(issueData);


  //FETCH QUEUE METRICS EVERY 5 SECONDS
  const loadMetricsEverySecond = async () => {
    try {
      // console.log('Fetching metrics...'); // LOG FOR LOADING METRICS   
      const queueMetrics = await userService.GetQueueMetrics(); // FETCH QUEUE METRICS
      setQueueData(queueMetrics); // SET QUEUE METRICS      
      // console.log('Metrics fetched:', queueMetrics); // LOG FOR LOADED METRICS
    } catch (error) {
      console.log("Error loading metrics", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(loadMetricsEverySecond, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalCustomersWaiting = queueData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="box-border border-[1px] rounded-lg p-4 border-solid border-marco lg:h-[700px] overflow-y-auto">
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
        <h1 className="text-3xl font-roboto mb-0 text-center sm:text-left">Contacts Queued</h1>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="text-center">
            <h2 className="text-3xl font-roboto text-red-600">{totalCustomersWaiting}</h2>
            <h2 className="text-xl font-roboto">
              <a>Customer Waiting</a>
            </h2>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <MyResponsiveBar data={queueData} />
          </div>
        </div>
        <div className="text-center">
          <button onClick={() => { window.location.href = "/supervisor/agent-transfer"; }} className="rounded-full px-4 py-2 text-white font-semibold hover:bg-green-400 bg-green-600" data-cy='button' title='Click here to move agents within queues'>Manage Queues</button>
        </div>
      </div>


    </div>


  );
};

export default GraphAgentStructure;