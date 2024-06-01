import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const MyResponsiveBar2 = ({ data }) => {
    // Define your `barColors` mapping
    const barColors = {
        "Flight Management": "#F47560",
        "Travel Information": "#E8C1A0",
        "Special Assistance": "#61CDBB",
        "Website Support": "#E8A838",
        "Other Questions": "#97E3D5",
        "Customer Service": "#F1E15B"
    };

    return (
        <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="queue"
            margin={{ top: 10, right: 30, bottom: 100, left: 60 }}
            padding={0.3}
            colors={({ indexValue }) => barColors[indexValue]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -35,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of Customers',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[]}
            role="application"
            ariaLabel="Contacts on Queue Bar Chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} issues for ${e.indexValue}`}
        />
    );
};

export default MyResponsiveBar2;
