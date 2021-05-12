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
import Spinner from '../components/Spinner';

const Habits = ({
  allHabits,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,
  fetchHabits,

}) => {
  const [redirect, setRedirect] = useState(false);

  const { pathname } = window.location;

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

  const renderHabits = (arr) => (arr.map((val) => (
    <div className="col-12 shadow p-3 mb-5 bg-white rounded" key={val.id}>
      <a href={`/habits/${val.id}`} className="font-weight-bold">
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
      <Spinner />
    );
  }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : renderHabits(allHabits)
  );
};

const mapStateToProps = (state) => ({
  allHabits: getHabits(state),
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
  allHabits: PropTypes.arrayOf(PropTypes.shape({
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
  allHabits: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
