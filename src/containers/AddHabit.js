/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import addHabitAction from '../modules/addHabit';
import fetchUserAction from '../modules/fetchUser';
import {
  getHabitsError,
  getHabitsPending,
} from '../redux/reducers/habitsReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';

const AddHabit = ({
  addHabit,
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
    addHabit(token, habit).then((res) => {
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
          <input onChange={handleChange} required type="text" name="name" placeholder="Name" />
          <button type="submit">Create Habit</button>
        </form>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getHabitsError(state),
  pending: getHabitsPending(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addHabit: addHabitAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddHabit);

AddHabit.propTypes = {
  addHabit: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

AddHabit.defaultProps = {
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
