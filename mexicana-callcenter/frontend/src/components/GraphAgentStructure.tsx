import React, { useEffect, useState } from 'react';
import MyPieChart from './Charts/piechart';
import MyBarChart2 from './Charts/barChart2';
import userService from '../services/user';
import InfoCard from './InfoCard';


export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

interface QueueDataItem {
  label: string;
  value: number;
}

interface DataPoint {
  metric: string;
  value: number;
}

interface GraphAgentStructureProps {
  agentsState: Array<PieChartDataItem>;
  agentsAvailability: Array<PieChartDataItem>;
}

const GraphAgentStructure: React.FunctionComponent<GraphAgentStructureProps> = ({ agentsState, agentsAvailability }) => {
  const [queueData, setQueueData] = useState<QueueDataItem[]>([]);

  //FETCH QUEUE METRICS EVERY 5 SECONDS
  const loadMetricsEverySecond = async () => {
    try {
      const queueMetrics = await userService.GetQueueMetrics(); // FETCH QUEUE METRICS
      setQueueData(queueMetrics); // SET QUEUE METRICS
    } catch (error) {
      console.log('Error loading metrics', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(loadMetricsEverySecond, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalCustomersWaiting = queueData.reduce((sum, item) => sum + item.value, 0);

  const data: DataPoint[] = queueData.map(item => ({
    metric: item.label,
    value: item.value,
  }));

  return (
    <div className="box-border border-[1px] rounded-lg p-4 border-solid border-marco shadow-lg lg:h-[700px] overflow-y-auto">
      <div className="flex flex-col items-center w-full space-y-8">
        <div className="w-full">
          <h1 className="mb-4 text-3xl text-center font-roboto sm:text-left dark:text-white">Agent Status</h1>
          <div className="flex justify-center">
            <div style={{ width: '100%', height: '300px' }}>
              {agentsState.every(state => state.value === 0) ? (
                <InfoCard description="Information about agent status will display here" />
              ) : (
                <MyPieChart data={agentsState} unit="Agents" />
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1 className="mb-4 text-3xl text-center font-roboto sm:text-left dark:text-white">Agent Availability</h1>
          <div className="flex justify-center">
            <div style={{ width: '100%', height: '300px' }}>
              {agentsAvailability.every(a => a.value === 0) ? (
                <InfoCard description="Information about current queue occupancy will display here" />
              ) : (
                <MyPieChart data={agentsAvailability} unit="Agents" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="mb-0 text-3xl text-center font-roboto sm:text-left dark:text-white">Contacts Queued</h1>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-col md:flex-col lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="text-center">
            <h2 className="text-3xl text-red-600 font-roboto">{totalCustomersWaiting}</h2>
            <h2 className="text-xl font-roboto dark:text-white">
              <a>Customer Waiting</a>
            </h2>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            {!queueData || queueData.every(a => a.value === 0) ? (
              <InfoCard description="Information about contacts waiting in queue will display here" />
            ) : (
              <MyBarChart2 data={data} unit="customers" />
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              window.location.href = '/supervisor/agent-transfer';
            }}
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded-full hover:bg-green-400"
            data-cy="button"
            title="Click here to move agents within queues"
          >
            Manage Queues
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphAgentStructure;
