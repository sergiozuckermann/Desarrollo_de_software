import userService from '../services/user';
import { useState, useEffect } from 'react';

interface Metric {
  name: string;
  time: string;
}

const AverageInteractionTime = () => {
    
    const ScaleIcon = '/scale.svg';

    const [data, setData] = useState<Metric[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await userService.GetPerformanceMetrics("AIT");
          setData(response);
        } catch (error) {
          console.error('Error fetching metric data:', error);
        }
      };
      fetchData();
    }, []);

    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden" style={{ backgroundColor: '#F8F9FA'}}>
        <div className="max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">
              Average Interaction Time
          </h1>
          <div className="rounded-lg p-2 overflow-y-auto mt-4 pb-16" 
          style={{WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none", maxHeight: '480px' }} >
            <div className="mb-4 flex items-center"> 
              <span className="text-red-500 text-2xl"> Needs your attention </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              <img src={ScaleIcon} alt="Scale Icon" className="h-full w-auto" />
              <div>
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{index + 1}.</span>
                      <span className="text-lg">{item.name}</span>
                    </div>
                    <span className="text-lg">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 text-2xl"> Is doing great </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AverageInteractionTime;
