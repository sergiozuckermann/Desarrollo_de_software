import React, { useState } from 'react';
import PageStructure from '../components/PageStructure';
import MyPieChart from '../components/Charts/piechart';
import MyLineChart from '../components/Charts/linechart';
import CallCard from '../components/Callinfo';
import AHT from '../components/Charts/AHT';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export interface PieChartDataItem {
  id: string | number;
  label: string;
  value: number;
}

const MainContent = () => {
  // Mock data
  const mockData: PieChartDataItem[] = [
    { id: "Customer", label: "Talk Time", value: 64 },
    { id: "Agent", label: "Wait Time", value: 35 },
    { id: "Non-talk", label: "Hold Time", value: 20 },
  ];

  const [chartData, setChartData] = useState<PieChartDataItem[]>(mockData);

  const analysisData: PieChartDataItem[] = [
    { id: "Positive", label: "Positive", value: 64 },
    { id: "Neutral", label: "Neutral", value: 52 },
    { id: "Negative", label: "Negative", value: 12 },
  ];

  const [chartData2, setChartData2] = useState<PieChartDataItem[]>(analysisData);

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
      ],
    },
  ];

  return (
    <div className="grid items-center justify-center w-full h-screen grid-cols-1 gap-4 p-2 lg:grid-cols-12">
      {/* AGENT CARD */}
      <div className="flex items-center justify-center pt-[12%] lg:col-span-4 sm:col-span-12">
        <CallCard
          agentname="Juan"
          agentposition="agent"
          callclasification="Buy a ticket"
          clientname="Natalia"
          priority="high"
          reason="High voice volume"
          talktime={"05:30"}
        />
      </div>
      {/* Tables Grid */}
      <div className="z-30 lg:col-span-8 sm:col-span-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl text-gray-600 font-roboto">Call Metrics</h2>
          <button className="w-5/12 px-4 py-2 text-white rounded-lg shadow bg-secondary hover:opacity-75 mr-7" onClick={() => window.location.href = '/supervisor/bargein'}>Barge In</button>
        </div>
        <div className="grid w-full h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:col-span-8">
          <div className="p-4 bg-white rounded-md shadow-lg card"
            data-tooltip-id="tooltipTalkTime"
            data-tooltip-content="This is the total talk time.">
            <h3 className="text-lg font-bold">Talk time</h3>
            <div className="h-[92%]">
              <MyPieChart data={chartData} unit="seconds" />
            </div>
            <Tooltip id="tooltipTalkTime" className="custom-tooltip" />
          </div>

          <div className="p-4 bg-white rounded-md shadow-lg card"
            data-tooltip-id="tooltipSentiment"
            data-tooltip-content="This is the sentiment analysis.">
            <h3 className="text-lg font-bold">Sentiment</h3>
            <div className="h-[92%]">
              <MyPieChart data={chartData2} unit="percent" />
            </div>
            <Tooltip id="tooltipSentiment" className="custom-tooltip" />
          </div>

          <div className="p-4 bg-white rounded-md shadow-lg card"
            data-tooltip-id="tooltipSentimentTrend"
            data-tooltip-content="This shows the sentiment trend over time.">
            <h3 className="text-lg font-bold">Sentiment Trend</h3>
            <div className="h-[92%]">
              <MyLineChart data={sentimentData} />
            </div>
            <Tooltip id="tooltipSentimentTrend" className="custom-tooltip" />
          </div>

          <div className="p-4 bg-white rounded-md shadow-lg card"
            data-tooltip-id="tooltipAHT"
            data-tooltip-content="Average Handling Time">
            <h3 className="text-lg font-bold">Average Handling Time</h3>
            <div className="h-[92%]">
              <AHT classificationTime="00:03:10" currentTime="00:04:12" exceededTime="00:01:02" />
            </div>
            <Tooltip id="tooltipAHT" className="custom-tooltip" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CallOverview = () => {
  return (
    <PageStructure title="Call Overview">
      <MainContent />
    </PageStructure>
  );
};

export default CallOverview;
