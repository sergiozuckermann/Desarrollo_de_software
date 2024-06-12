import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MyBarChartProps {
    data: { metric: string, percentage: number }[];
}

const MyBarChart: React.FC<MyBarChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No Available Data</p>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
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
