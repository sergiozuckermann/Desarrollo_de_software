import { Grid, useTheme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import Chart from 'react-apexcharts';

interface BarChartProps {
  data: number[];
  categories: string[];
}

const BarChart: React.FunctionComponent<BarChartProps> = ({ data, categories }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Grid item xs={12}>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={isSmallScreen ? 300 : 450}
        height={250}
      />
    </Grid>
  );
};

export default BarChart;