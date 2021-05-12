/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
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
import ProgressChart from '../components/ProgressChart';

const Progress = ({
  allMeasures,
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
  const [progress, setProgress] = useState(false);

  let token = localStorage.getItem('token');

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
  }, []);

  const handleDelete = (e, habitId, measureId) => {
    e.preventDefault();
    deleteMeasure(token, habitId, measureId).then((res) => {
      setRedirect(true);
    });
  };

  const labels = [];
  const results = [];

  allMeasures.forEach((measure) => {
    measure.forEach((data) => {
      labels.push(data.date);
      results.push(data.value);
    });
  });

  const renderChart = () => {
    setProgress(true);
  };

  const shouldShowSpinner = () => {
    if (pending === false) return false;
    return true;
  };

  if (shouldShowSpinner()) {
    return (
      <Spinner />
    );
  }

  if (progress === true) {
    return (
      <ProgressChart labels={labels} results={results} />
    );
  }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : renderChart()
  );
};

const mapStateToProps = (state) => ({
  allMeasures: getMeasures(state),
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
  allMeasures: PropTypes.arrayOf(PropTypes.arrayOf(
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
  allMeasures: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
