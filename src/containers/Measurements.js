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

const Measures = ({
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

  const renderMeasuresToday = (arr) => (arr.map((val) => (
    <div className="col-12 shadow p-3 mb-5 bg-white rounded" key={val.id}>
      <Measure measure={val} habitId={val.habit_id} handleDelete={handleDelete} />
    </div>
  )));

  const renderMeasuresYesterday = (arr) => (arr.map((val) => (
    <div className="col-12 shadow p-3 mb-5 bg-white rounded" key={val.id}>
      <Measure measure={val} habitId={val.habit_id} handleDelete={handleDelete} />
    </div>
  )));

  const renderMeasuresLastWeek = (arr) => (arr.map((val) => (
    <div className="col-12 shadow p-3 mb-5 bg-white rounded" key={val.id}>
      <Measure measure={val} habitId={val.habit_id} handleDelete={handleDelete} />
    </div>
  )));

  const shouldShowSpinner = () => {
    if (pending === false) return false;
    return true;
  };

  if (shouldShowSpinner()) {
    return (
      <Spinner />
    );
  }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <div className="row">
          <div className="col-12 mb-3 pl-0">
            <h3 className="font-weight-bold">Today</h3>
          </div>
          { allMeasures[0] ? renderMeasuresToday(allMeasures[0]) : null}
          <div className="col-12 mb-3 pl-0">
            <h3 className="font-weight-bold">Yesterday</h3>
          </div>
          { allMeasures[1] ? renderMeasuresYesterday(allMeasures[1]) : null}
          <div className="col-12 mb-3 pl-0">
            <h3 className="font-weight-bold">Last week</h3>
          </div>
          { allMeasures[2] ? renderMeasuresLastWeek(allMeasures[2]) : null}
        </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(Measures);

Measures.propTypes = {
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

Measures.defaultProps = {
  allMeasures: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
