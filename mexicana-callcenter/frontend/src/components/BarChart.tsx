import { Grid } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
    data: number[];
    categories: string[];
}

const BarChart: React.FunctionComponent<BarChartProps> = ({ data,  categories }) => {
  const options = {
    chart: {
      toolbar: {
        show: false // descargar grafica
      }
    },
    xaxis: {
      categories: categories
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
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#4BC0C0', '#99600F']
    }
  };

  const series = [
    {
      name: "",
      data: data
    }
  ];

  return (
    <Grid xs={"auto"} item>
      <Chart options={options} series={series} type="bar" width={450} height={250} />
    </Grid>
  );
};

export default BarChart;
