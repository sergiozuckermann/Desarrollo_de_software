
import { ResponsivePie } from '@nivo/pie';

interface PieChartDataItem {
    id: string | number;
    label: string;
    value: number;
    color?: string;
  }

  interface MyPieChartProps {
    data: PieChartDataItem[];
  }

  const MyPieChart: React.FC<MyPieChartProps> = ({ data }) => {
  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={data}
        margin={{top:10, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        tooltip={({ datum }) => (
          <div style={{ color: datum.data.color, padding: '5px 9px', background: '#ffffff', boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)' }}>
            <strong>{datum.id}:</strong> {datum.value}
          </div>
        )}
        theme={{
          tooltip: {
            container: {
              background: '#333',
            },
          },
        }}
      />
    </div>
  );
};


export default MyPieChart;
