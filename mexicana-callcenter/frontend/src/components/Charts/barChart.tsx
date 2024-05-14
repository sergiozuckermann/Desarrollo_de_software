import { ResponsiveBar, BarDatum } from '@nivo/bar';



const MyResponsiveBar = ({ data }: {data:Array<BarDatum>}) => {
    // Define your `barColors` mapping
    const barColors = [
        { id: "Flight Rsv", color: "#F47560" },
        { id: "Help", color: "#E8C1A0" },
        { id: "Booking or Website Issues", color: "#F1E15B" },
        { id: "Status Inquiries", color: "#E8A838" },
        { id: "Special Assistance or Docs", color: "#61CDBB" },
        { id: "Other Questions", color: "#97E3D5" }
    ]

    // function to find a color given a key
    const getColor =(key:string|number) => {
        const barColor = barColors.find((barColor) => barColor.id === key ? barColor : null)
        return barColor!.color
    }

    return (
        <ResponsiveBar
            data={data}
            
            indexBy="label"
            margin={{ top: 10, right: 30, bottom: 100, left: 60 }} 
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={({ indexValue }) => getColor(indexValue)}
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
