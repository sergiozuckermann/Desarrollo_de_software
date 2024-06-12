
import React, { useState} from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartDataItem {
    id: string | number;
    label: string;
    value: number;
    color?: string;
}

interface MyPieChartProps {
    data: PieChartDataItem[];
    unit: string;
}

const MyPieChart: React.FC<MyPieChartProps> = ({ data, unit }) => {
    const [hovered, setHovered] = useState<PieChartDataItem | null>(null);

    const handleMouseEnter = (datum: any, event: React.MouseEvent) => {
        setHovered(datum.data);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className='relative w-full h-full pb-2'>
            <ResponsivePie
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={d => d.data.color}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#808080"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                enableArcLabels={false}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                motionConfig="wobbly"
                legends={[]}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {hovered && (
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'grey',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div>{hovered.value}</div>
                    <div style={{ fontWeight: 'normal' }}>{unit}</div>
                </div>
            )}
        </div>
    );
};

export default MyPieChart;
