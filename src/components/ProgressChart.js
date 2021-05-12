/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';

const ProgressChart = ({ labels, results }) => {
  let canvas = null;

  const data = {
    labels,
    datasets: [{
      label: 'My progress',
      data: results,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };
  const config = {
    type: 'line',
    data,
  };

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      canvas = document.querySelector('#chart');

      new Chart(canvas, config);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <canvas id="chart" />
      </div>
    </div>
  );
};

export default ProgressChart;

ProgressChart.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.string,
  ),
  results: PropTypes.arrayOf(
    PropTypes.number,
  ),
};

ProgressChart.defaultProps = {
  labels: [],
  results: [],
};
