/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchHabitAction from '../modules/fetchHabits';
import fetchUserAction from '../modules/fetchUser';
import {
  getHabits,
  getHabitsError,
  getHabitsPending,
} from '../redux/reducers/habitsReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';
import Habit from '../components/Habit';

const Habits = ({
  habits,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,
  fetchHabits,

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
    fetchHabits(token);
  }, []);

  console.log(habits);

  const renderHabits = (arr) => (arr.map((val) => (
    <div key={val.id}>
      <a href={`/habits/${val.id}`}>
        <Habit habit={val} />
      </a>
    </div>
  )));

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
      : renderHabits(habits)
  );
};

const mapStateToProps = (state) => ({
  habits: getHabits(state),
  error: getHabitsError(state),
  pending: getHabitsPending(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchHabits: fetchHabitAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Habits);

Habits.propTypes = {
  fetchHabits: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  habits: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Habits.defaultProps = {
  habits: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
