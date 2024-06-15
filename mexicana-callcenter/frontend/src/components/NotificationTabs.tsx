// Urgent and Non-urgent tabs

// import library and hook
import React, { useState } from 'react';

// define the tab data interface
interface TabData {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}
// define the HorizontalTabsProps interface
interface HorizontalTabsProps {
  data: TabData[];
  onTabChange?: (index: number) => void;  // Add onTabChange to the props interface
}

// define the HorizontalTabs component
const HorizontalTabs: React.FC<HorizontalTabsProps> = ({ data, onTabChange }) => {
  // define the activeTab state and setActiveTab function
  const [activeTab, setActiveTab] = useState(0);
  // define the handleTabClick function
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);  // Call the onTabChange callback
    }
  };
  // return the JSX of the HorizontalTabs component
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center space-x-4">
        {/* map through the tab data and return the tab content */}
        {data.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center p-2 cursor-pointer transition-colors rounded-full ${
              index === activeTab ? 'bg-[#20253F] text-white' : 'bg-transparent'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">{data[activeTab].content}</div>
    </div>
  );
};

export default HorizontalTabs;