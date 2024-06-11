import { ResponsiveLine } from '@nivo/line'

const MyLineChart = ({data}) => (
    <div className='w-full h-full z-70' style={{ position: 'relative', zIndex:100, paddingBottom:10, height:'300px'}}>
    <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom:60, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 3,
            max: -3,
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: 'Seconds',
            legendOffset: 25,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Sentiment',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0,
            tickValues:[3,0,-3]
        }}
        pointSize={10}
        pointColor={{"from": "color", "modifiers": [ [ "darker", 0.3 ] ]}}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        pointLabel="data.yFormatted"
        enableTouchCrosshair={true}
        useMesh={true}
        colors={'#E13434'}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)

export default MyLineChart;