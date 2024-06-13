// Bar chart component that displays the number of customers in each queue

// Import necessary libraries
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Define a type for the metrics
type Metric = "Flight Management" | "Travel Information" | "Special Assistance" | "Website Assistance" | "Other Questions" | "Customer Service" | "Service Level" | "No Data";

// Interface that defines the structure of the data used for the bar chart
interface DataPoint {
  metric: Metric;
  value: number;
}

// Interface that defines the props received by the component
interface MyBarChart2Props {
  data: DataPoint[];
  unit: string;
}

// Mapping colors for the metrics
const barColors: Record<Metric, string> = {
  "Flight Management": "#20253F",
  "Travel Information": "#4A8B51",
  "Special Assistance": "#6BBF70",
  "Website Assistance": "#FFA500",
  "Other Questions": "#ADD8E6",
  "Customer Service": "#4B4B4B",
  "Service Level": "#FF6347", // Example color
  "No Data": "#D3D3D3"
};

// Bar chart component
const MyBarChart2: React.FC<MyBarChart2Props> = ({ data, unit }) => {
  // If there is no data, a message will be shown
  if (!data || data.length === 0) {
    return <p>No Available Data</p>;
  }

  return (
    // The chart is created using the BarChart component from recharts
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 60, 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="metric" 
          tick={{ angle: -30, textAnchor: 'end', fontSize: 10 } as any} // Adjusted angle and font size
          interval={0} 
        />
        <YAxis tickFormatter={(value) => `${value} ${unit}`} />
        <Tooltip formatter={(value) => `${value} ${unit}`} />
        <Bar dataKey="value" fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[entry.metric]} />
          ))}
          <LabelList dataKey="value" position="top" fill="#333" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart2;