// import React, { useState, useEffect } from 'react';
// import { ResponsivePie } from '@nivo/pie';

// interface PieChartDataItem {
//     id: string | number;
//     label: string;
//     value: number;
//     color?: string;
// }

// interface MyPieChartProps {
//     data: PieChartDataItem[];
//     unit: string;
// }

// const MyPieChart: React.FC<MyPieChartProps> = ({ data,unit }) => {
//     const [hovered, setHovered] = useState<PieChartDataItem | null>(null);
//     const [colors, setColors] = useState<string[]>([]);
                                        
//     const brightColors = ['#ADB5BD'];
    
//     const shuffleArray = (array: string[]) => {
//         let result = [...array];
//         for (let i = result.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [result[i], result[j]] = [result[j], result[i]]; // Swap elements
//         }
//         return result;
//     };

//     // Initialize colors on component mount
//     useEffect(() => {
//         setColors(shuffleArray(brightColors));
//     }, []); 
    
//     const handleMouseEnter = (datum: any, event: React.MouseEvent) => {
//         setHovered(datum.data);  // Ensure datum.data is used to refer to the slice's data
//     };

//     const handleMouseLeave = () => {
//         setHovered(null);
//     };

//     return (
//         <div className='w-full h-full z-[100] relative pb-2'> 
//         {/* //style={{ position: 'relative', zIndex:100, paddingBottom:10}} */}
//             <ResponsivePie
//                 data={data}
//                 margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//                 innerRadius={0.5}
//                 padAngle={0.7}
//                 cornerRadius={3}
//                 activeOuterRadiusOffset={8}
//                 colors={colors}
//                 borderWidth={1}
//                 borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
//                 arcLinkLabelsSkipAngle={10}
//                 arcLinkLabelsTextColor="#808080"
//                 arcLinkLabelsThickness={2}
//                 arcLinkLabelsColor={{ from: 'color' }}
//                 arcLabelsSkipAngle={10}
//                 enableArcLabels={false}
//                 arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
//                 motionConfig="wobbly"
//                 legends={[]}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//             />
//             {hovered && (
//                 <div style={{
//                     position: 'absolute',
//                     top: '45%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     color: 'grey' || '#333',
//                     fontWeight: 'bold',
//                     fontSize: '24px',
//                     textAlign: 'center', 
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center', 
//                     justifyContent: 'center'
//                 }}>
//                     <div>{hovered.value}</div>
//                     <div style={{ fontWeight: 'normal' }}>{unit}</div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyPieChart;

import React, { useState, useEffect } from 'react';
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

    // Define colors for each sentiment
    const colors = {
        CustomerTime: '#66BB6A', // Green
        AgentTime: '#FFA726',  // Orange
        NonTalkTime: '#EF5350',  // Red
        Positive: '#66BB6A', // Green
        Neutral: '#FFA726',  // Orange
        Negative: '#EF5350'  // Red

    };

    // Assign colors to data items based on their labels (assuming labels represent sentiment)
    const coloredData = data.map(item => ({
        ...item,
        color: colors[item.label as keyof typeof colors] || '#ADB5BD' // Default to grey if no match
    }));

    const handleMouseEnter = (datum: any, event: React.MouseEvent) => {
        setHovered(datum.data); // Ensure datum.data is used to refer to the slice's data
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className='w-full h-full z-[100] relative pb-2'>
            <ResponsivePie
                data={coloredData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ datum: 'data.color' }}
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
                    color: '#333',
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
