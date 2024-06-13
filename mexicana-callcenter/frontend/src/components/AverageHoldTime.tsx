// Import the userService from '../services/user'
import userService from '../services/user';
// Import the useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// Define an interface for the Metric object
interface Metric {
  name: string; // The name property is a string
  time: string; // The time property is a string
}

// Define the AverageHoldTime functional component
const AverageHoldTime = () => {
    
    // Define the ScaleIcon constant as a string containing the path to the scale icon image
    const ScaleIcon = '/scale.svg';

    // Define the data state variable using the useState hook and initialize it as an empty array of Metric objects
    const [data, setData] = useState<Metric[]>([]);

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
      // Define an async function to fetch data
      const fetchData = async () => {
        try {
          // Call the GetPerformanceMetrics function from the userService and pass the string "ACHT" as an argument
          const response = await userService.GetPerformanceMetrics("ACHT");
          // Update the data state variable with the response from the API
          setData(response);
        } catch (error) {
          // Log any errors that occur while fetching the data
          console.error('Error fetching metric data:', error);
        }
      };
      // Call the fetchData function
      fetchData();
    }, []);

    // Return the JSX code to render the component
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8 card overflow-hidden bg-[#F8F9FA] dark:bg-primary">
        {/* Container div with full width, padding, card styles, overflow hidden, and background color */}
        <div className="max-w-xl mx-auto">
          {/* Centered container with a maximum width */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-roboto mb-8">
            {/* Heading with responsive font sizes and font family */}
            Average Handle Time
          </h1>
          <div
            className="rounded-lg p-2 overflow-y-auto mt-4 overflow-hidden pb-16"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              maxHeight: '480px'
            }}
          >
            {/* Container with rounded corners, padding, vertical auto-scrolling, overflow hidden, and max height */}
            <div className="mb-4 flex items-center">
              {/* Flex container with margin-bottom and centered items */}
              <span className="text-red-500 text-2xl">
                {/* Red text span with larger font size */}
                Needs your attention
              </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              {/* Grid container with two columns (auto and 1fr) and gap */}
              <img src={ScaleIcon} alt="Scale Icon" className="h-full w-auto" />
              {/* Image with height set to full and auto width */}
              <div>
                {/* Container div for rendering data items */}
                {/* Map over the data array and render a div for each item */}
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 dark:text-white"
                  >
                    {/* Flex container with space between, centered items, margin-bottom, and white text (dark mode) */}
                    <div className="flex items-center">
                      {/* Flex container with centered items */}
                      <span className="text-lg font-bold mr-2">
                        {/* Bold text span with larger font size and right margin */}
                        {index + 1}.
                      </span>
                      <span className="text-lg">
                        {/* Text span with larger font size */}
                        {item.name}
                      </span>
                    </div>
                    <span className="text-lg">
                      {/* Text span with larger font size */}
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {/* Flex container with margin-top and centered items */}
              <span className="text-green-500 text-2xl">
                {/* Green text span with larger font size */}
                Is doing great
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Export the AverageHoldTime component as the default export
export default AverageHoldTime;