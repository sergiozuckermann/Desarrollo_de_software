import React from 'react';
import DonutChart from '../components/DonutChart';
import BarChart from '../components/BarChart';

const GraphAgentStructure: React.FunctionComponent = () => {
    return (
        <div className="rounded-3xs box-border border-[1px] border-solid border-marco shadow-lg mr-4 sm:mr-[40px] w-full lg:h-[700px]">
          <div className="flex flex-col sm:flex-row justify-evenly items-center">
            <div className="mb-8 sm:mb-0">
              <h1 className="text-3xl sm:text-2xl font-roboto mb-4 text-center sm:text-left">Agent Status</h1>
              <div className="flex justify-center sm:block">
                <DonutChart seriesData={[20, 10, 30]} labelsData={["Available", "On Call", "After Call"]} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-2xl font-roboto mb-4 text-center sm:text-left">Agent Availability</h1>
              <div className="flex justify-center sm:block">
                <DonutChart seriesData={[10, 20, 5, 5, 16, 4]} labelsData={["Flight Rsv", "Help", "Booking or Website Issues", "Status Inquiries", "Special Assistance or Docs", "Other Questions"]} />
              </div>
            </div>
          </div>
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-evenly sm:items-start">
  <div className="mt-8 sm:mt-[50px] mb-8 sm:mb-0 text-center sm:ml-8">
    <h2 className="text-3xl sm:text-3xl font-roboto">
      10
    </h2>
    <h2 className="text-3xl sm:text-3xl font-roboto">
      Customers
    </h2>
    <h2 className="text-3xl sm:text-3xl font-roboto">
      Waiting
    </h2>
  </div>
  <div className="flex-grow">
    <h1 className="text-3xl sm:text-2xl font-roboto mb-4 text-center">
      Queue Issues
    </h1>
    <div className="flex justify-center">
      <BarChart
        data={[10, 20, 5, 5, 16, 4]} categories={["Flight Rsv", "Help", "Booking or Website Issues", "Status Inquiries", "Special Assistance or Docs", "Other Questions"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphAgentStructure;
