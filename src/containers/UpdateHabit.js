/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchSingleHabitAction from '../modules/fetchSingleHabit';
import updateHabitAction from '../modules/updateHabit';
import fetchUserAction from '../modules/fetchUser';
import {
  getHabit,
  getHabitsError,
  getHabitsPending,
} from '../redux/reducers/habitsReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';
import Spinner from '../components/Spinner';

const UpdateHabit = ({
  match: { params },
  fetchSingleHabit,
  updateHabit,
  singleHabit,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,

}) => {
  const [habit, setHabit] = useState({
    name: '',
  });

  const { id } = params;

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
    fetchSingleHabit(token, id);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setHabit({
      ...habit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHabit(token, habit, id).then((res) => {
      setRedirect(true);
    });
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

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{singleHabit.name}</label>
          <input
            onChange={handleChange}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          <button type="submit">Update Habit</button>
        </form>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getHabitsError(state),
  pending: getHabitsPending(state),
  singleHabit: getHabit(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateHabit: updateHabitAction,
  fetchSingleHabit: fetchSingleHabitAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHabit);

UpdateHabit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updateHabit: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchSingleHabit: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
  singleHabit: PropTypes.shape({
    name: PropTypes.string,
  }),
};

UpdateHabit.defaultProps = {
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
  singleHabit: {},
};
