import { Grid } from '@material-ui/core';
import React from 'react';
import Chart from "react-apexcharts";

const DonutChart: React.FunctionComponent = () => {
    const options = {
        series: [2,4,5,9,10],
        labels: ["A", "B", "C", "D", "E"],
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
        }
    };
    const series = [2,4,5,9,10];

    return (
            <Grid xs={"auto"} item>
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width={250} 
                    height={250}
                />

            </Grid>
    );
};

export default DonutChart;
