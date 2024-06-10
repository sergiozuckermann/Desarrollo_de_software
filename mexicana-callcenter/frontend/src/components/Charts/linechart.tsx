import { ResponsiveLine } from '@nivo/line'

const MyLineChart = ({ data }) => {
  const formatYAxis = (value) => {
    if (value === 0) return 'Neutral';
    if (value === 1) return 'Positive';
    if (value === -1) return 'Negative';
    return value;
  };

  return (
    <div className='w-full h-full'>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: -1, max: 1, stacked: false, reverse: false }}
        yFormat={formatYAxis}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'Iterative interaction',
          legendOffset: 25,
          legendPosition: 'middle',
          tickValues: []
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: [-1, 0, 1],
          format: formatYAxis,
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableCrosshair={true}
        useMesh={true}
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
  );
};

export default MyLineChart;
