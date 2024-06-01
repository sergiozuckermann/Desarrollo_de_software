// import { ResponsiveBar } from '@nivo/bar';

// const MyResponsiveBar = ({ data }) => {
   

//     const barColors = ['#F47560', '#E8C1A0', '#F1E15B', '#E8A838', '#61CDBB', '#97E3D5'];

//     if (!data || data.lenght === 0) {
//         return <p> No Available Data </p>
//     }

//     return (
//         <ResponsiveBar
//             data={data}
//             indexBy="label"
//             margin={{ top: 10, right: 30, bottom: 50, left: 60 }} 
//             padding={0.3}
//             valueScale={{ type: 'linear' }}
//             indexScale={{ type: 'band', round: true }}
//             colors={({ index }) => barColors[index % barColors.length]}
//             borderColor={{
//                 from: 'color',
//                 modifiers: [['darker', 1.6]]
//             }}
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation:0,
                
//             }}
//             axisLeft={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: 'Seconds',
//                 legendPosition: 'middle',
//                 legendOffset: -40
//             }}
//             labelSkipWidth={12}
//             labelSkipHeight={12}
//             labelTextColor={{
//                 from: 'color',
//                 modifiers: [['darker', 1.6]]
//             }}
//             legends={[

//                 ]}
//                 role="application"
//                 ariaLabel="Queue Issues Bar Chart"
//                 barAriaLabel={(e) => `${e.id}: ${e.formattedValue} issues for ${e.indexValue}`}
//             />
//     );
// };

// export default MyResponsiveBar;

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MyBarChart2 = ({ data }) => {
    const barColors = ['#F47560', '#E8C1A0', '#F1E15B', '#E8A838', '#61CDBB', '#97E3D5'];

    if (!data || data.length === 0) {
        return <p>No Available Data</p>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 60,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis tickFormatter={(value) => `${value} sec`} />
                <Tooltip formatter={(value) => `${value} sec`} />
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
