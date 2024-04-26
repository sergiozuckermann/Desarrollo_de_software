import { Grid } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';

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
        horizontal: false,
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    fill: {
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0']
    }
  };

  const series = [
    {
      name: "Series 1",
      data: [9, 3, 2, 7, 1]
    }
  ];

  return (
    <Grid xs={"auto"} item>
      <Chart options={options} series={series} type="bar" width={450} height={250} />
    </Grid>
  );
};

export default BarChart;