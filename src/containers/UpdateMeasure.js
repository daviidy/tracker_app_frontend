/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchSingleMeasureAction from '../modules/fetchSingleMeasure';
import updateMeasureAction from '../modules/updateMeasure';
import fetchUserAction from '../modules/fetchUser';
import {
  getMeasure,
  getMeasuresError,
  getMeasuresPending,
} from '../redux/reducers/measuresReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';

const UpdateMeasure = ({
  match: { params },
  fetchSingleMeasure,
  updateMeasure,
  singleMeasure,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,

}) => {
  const [measure, setMeasure] = useState({
    value: 0,
    date: null,
    user_id: 0,
  });

  const { habitId } = params;

  const { measureId } = params;

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
    fetchSingleMeasure(token, habitId, measureId);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setMeasure({
      ...measure,
      [e.target.name]: e.target.value,
      user_id: localStorage.getItem('id'),
    });
  };

  console.log(singleMeasure);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(measure);
    updateMeasure(token, measure, habitId, measureId).then((res) => {
      setRedirect(true);
    });
  };

  const shouldShowSpinner = () => {
    if (pending === false) return false;
    return true;
  };

  if (shouldShowSpinner()) {
    return (
      <p>Spinner</p>
    );
  }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="value">{singleMeasure.value}</label>
          <input
            onChange={handleChange}
            required
            type="text"
            id="name"
            name="value"
            placeholder="Value"
          />
          <input
            onChange={handleChange}
            required
            type="date"
            name="date"
          />
          <button type="submit">Update Measure</button>
        </form>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getMeasuresError(state),
  pending: getMeasuresPending(state),
  singleMeasure: getMeasure(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateMeasure: updateMeasureAction,
  fetchSingleMeasure: fetchSingleMeasureAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeasure);

UpdateMeasure.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      habitId: PropTypes.string,
      measureId: PropTypes.string,
    }),
  }).isRequired,
  updateMeasure: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchSingleMeasure: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
  singleMeasure: PropTypes.shape({
    value: PropTypes.number,
  }),
};

UpdateMeasure.defaultProps = {
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
  singleMeasure: {},
};
