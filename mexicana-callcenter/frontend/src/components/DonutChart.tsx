import { Grid } from '@material-ui/core';
import React from 'react';
import Chart from "react-apexcharts";

type DonutChartProps = {
    seriesData: number[];
    labelsData: string[];
};

const DonutChart: React.FunctionComponent<DonutChartProps> = ({ seriesData, labelsData }) => {
    const options = {
        series: seriesData,
        labels: labelsData,
        plotOptions:{
            pie:{
                donut:{
                    size: "80px",
                    labels:{
                        show: true,
                        total:{
                            show: true,
                            showAlways: true,
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false 
        },
        legend: {
            show: false 
        },
        fill: {
            colors: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#99600F']
        }
    };

    return (
        <Grid xs={"auto"} item>
            <Chart
                options={options}
                series={seriesData}
                type="donut"
                width={250} 
                height={250}
            />
        </Grid>
    );
};

export default DonutChart;
