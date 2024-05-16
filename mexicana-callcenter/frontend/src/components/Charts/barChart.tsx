import { ResponsiveBar } from '@nivo/bar';

const MyResponsiveBar = ({ data }) => {
    // Define your `barColors` mapping
    const barColors = {
        "Flight Rsv": "#F47560",
        "Help": "#E8C1A0",
        "Booking or Website Issues": "#F1E15B",
        "Status Inquiries": "#E8A838",
        "Special Assistance or Docs": "#61CDBB",
        "Other Questions": "#97E3D5"
    };

    return (
        <ResponsiveBar
            data={data}
            
            indexBy="label"
            margin={{ top: 10, right: 30, bottom: 100, left: 60 }} 
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={({ indexValue }) => barColors[indexValue]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]]
            }}
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
                legend: 'Number of Issues',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]]
            }}
            legends={[

            ]}
            role="application"
            ariaLabel="Queue Issues Bar Chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} issues for ${e.indexValue}`}
        />
    );
};

export default MyResponsiveBar;
