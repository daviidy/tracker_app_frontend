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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchMeasureAction from '../modules/fetchMeasure';
import fetchUserAction from '../modules/fetchUser';
import deleteMeasureAction from '../modules/deleteMeasure';
import {
  getMeasures,
  getMeasuresError,
  getMeasuresPending,
} from '../redux/reducers/measuresReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';
import Measure from '../components/Measure';
import Spinner from '../components/Spinner';

const Progress = ({
  allProgress,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,
  fetchMeasures,
  deleteMeasure,

}) => {
  const [redirect, setRedirect] = useState(false);

  let token = localStorage.getItem('token');

  let canvas = null;

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const data = {
    labels,
    datasets: [{
      label: 'My progress',
      data: [65, 59, 80, 81, 56, 55, 40],
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
    if (checkUser()) {
      token = localStorage.getItem('token');
    } else if (checkToken()) {
      token = localStorage.getItem('token');
      fetchUser(token);
    } else {
      setRedirect(true);
    }

    fetchMeasures(token);
    const timer = setTimeout(() => {
      canvas = document.querySelector('#chart');
      new Chart(canvas, config);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleDelete = (e, habitId, measureId) => {
    e.preventDefault();
    deleteMeasure(token, habitId, measureId).then((res) => {
      setRedirect(true);
    });
  };

  //   const shouldShowSpinner = () => {
  //     if (pending === false) return false;
  //     return true;
  //   };

  //   if (shouldShowSpinner()) {
  //     return (
  //       <Spinner />
  //     );
  //   }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <div className="row">
          <div className="col-12">
            <canvas id="chart" />
          </div>
        </div>
      )
  );
};

const mapStateToProps = (state) => ({
  allProgress: getMeasures(state),
  error: getMeasuresError(state),
  pending: getMeasuresPending(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMeasures: fetchMeasureAction,
  fetchUser: fetchUserAction,
  deleteMeasure: deleteMeasureAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Progress);

Progress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchMeasures: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  deleteMeasure: PropTypes.func.isRequired,
  allProgress: PropTypes.arrayOf(PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  )),
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Progress.defaultProps = {
  allProgress: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
