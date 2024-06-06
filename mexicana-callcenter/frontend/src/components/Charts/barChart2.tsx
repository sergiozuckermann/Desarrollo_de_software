// Code to create the bar chart that can be used as a component 

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Interface that defines the structure of the data that will be used to create the bar chart
interface DataPoint {
  metric: string;
  value: number;
}

// Interface that defines the properties that the component will receive
interface MyBarChart2Props {
  data: DataPoint[];
  unit: string;
}

const MyBarChart2: React.FC<MyBarChart2Props> = ({ data, unit }) => {
    // Array of colors that will be used to color the bars in the chart
  const barColors = ['#F47560', '#E8C1A0', '#F1E15B', '#E8A838', '#61CDBB', '#97E3D5'];

//   If there is no data, a message will be displayed
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
          right: 50,
          left: 80,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="metric" />
        <YAxis tickFormatter={(value) => `${value} ${unit}`} />
        <Tooltip formatter={(value) => `${value} ${unit}`} />
        <Bar
          dataKey="value"
          fill="#8884d8"
          label={{ position: 'top', fill: '#333', fontSize: 12 }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart2;
