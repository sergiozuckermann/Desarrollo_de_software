// Bar Chart component

// Importing React and necessary components from 'recharts' library
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Defining the properties for the MyBarChart component
interface MyBarChartProps {
    data: { metric: string, percentage: number }[];
}

// Defining the MyBarChart component
const MyBarChart: React.FC<MyBarChartProps> = ({ data }) => {
    // If there's no data or the data array is empty, display a message
    if (!data || data.length === 0) {
        return <p>No Available Data</p>;
    }
    // If there's data, display a bar chart with the data
    return (
        // A container that adjusts its size to the parent container with the bar chart inside
        <ResponsiveContainer width="100%" height="100%">
            {/* A bar chart with the data */}
            <BarChart
                layout="vertical"
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="metric" />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="percentage" fill="#8BC34A" background={{ fill: '#eee' }} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;
