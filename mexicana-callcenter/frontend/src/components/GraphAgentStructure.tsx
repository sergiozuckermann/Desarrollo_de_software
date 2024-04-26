import React from 'react';
import DonutChart from '../components/DonutChart';
import BarChart from '../components/BarChart';

const GraphAgentStructure: React.FunctionComponent = () => {
    return (
        <div className='rounded-3xs box-border border-[1px] border-solid border-marco shadow-lg mr-[40px] w-[800px]'>
            <div className='flex justify-evenly'>
                <div>
                    <h1 style={{fontFamily: "Roboto", fontSize: "30px" }}>
                        Agent Status
                    </h1>
                    <DonutChart />
                </div>
                <div>
                    <h1 style={{fontFamily: "Roboto", fontSize: "30px" }}>
                        Agent Availability
                    </h1>
                    <DonutChart />
                </div>
            </div>
            <div className='flex justify-evenly'>
                <div className='mt-[120px]'>
                    <h2 style={{fontFamily: "Roboto", fontSize: "50px" }}>
                        10
                    </h2>
                    <h2 style={{fontFamily: "Roboto", fontSize: "20px" }}>
                        Customers Waiting
                    </h2>
                </div>
                <div>
                    <h1 style={{fontFamily: "Roboto", fontSize: "30px" }}>
                        Queue Issues
                    </h1>
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

export default GraphAgentStructure;
