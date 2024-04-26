import { Grid } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";

const BarChart: React.FunctionComponent = () => {
    const options = {
        chart: {
            toolbar: {
                show: false // descargar grafica
            }
        },
        xaxis: {
            categories: ["A", "B", "C", "D", "E"] 
        },
        plotOptions: {
            bar: {
                horizontal: false 
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        }
    };
    const series = [{
        name: "Series 1",
        data: [10, 4, 2, 8, 3]
    }];

    return (
        <Grid xs={"auto"} item>
            <Chart
                options={options}
                series={series}
                type="bar" 
                width={450}
                height={250}
            />
        </Grid>
    );
};

export default BarChart;
