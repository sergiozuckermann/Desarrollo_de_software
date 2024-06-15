// Pie Chart component for metrics visualization

// Importing necessary libraries and modules
import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
// Defines the structure of the data used for the Pie Chart
export interface PieChartDataItem {
    id: string | number;
    label: string;
    value: number;
    color?: string;
}
// Defines the properties of the Pie Chart component
interface PieChartProps {
    data: PieChartDataItem[];
    unit: string;
}
// Pie Chart component
const PieChart: React.FC<PieChartProps> = ({ data, unit }) => {
    // State to store the hovered data item
    const [hovered, setHovered] = useState<PieChartDataItem | null>(null);
    // Function to handle mouse enter event
    const handleMouseEnter = (datum: { data: PieChartDataItem }) => {
        setHovered(datum.data);
    };
    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className='relative w-full h-full pb-2'>
            {/* A responsive pie chart that adjusts its size to the parent container */}
            <ResponsivePie
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={(d) => d.data.color || '#000'} // Ensure color is always a string
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
            {/* Display the hovered value */}
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

export default PieChart;