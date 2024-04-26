import React, { useState } from 'react';
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
    const [hovered, setHovered] = useState<PieChartDataItem | null>(null);

    const brightColors = ['#5BC0EB', '#004BA8', '#4A525A', '#c7f9cc', '#57cc99', '#800080', '#FF4500', '#9ACD32'];

    const handleMouseEnter = (datum: any, event: React.MouseEvent) => {
        setHovered(datum.data);  // Ensure datum.data is used to refer to the slice's data
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className='w-full h-full z-70' style={{ position: 'relative', zIndex:100, paddingBottom:10}}>
            <ResponsivePie
                data={data}
                margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={brightColors}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
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
                    color: 'grey' || '#333',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    textAlign: 'center', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                    <div>{hovered.value}</div>
                    <div style={{fontWeight:'normal'}}>seconds</div>
                </div>
            )}
        </div>
    );
};

export default MyPieChart;
