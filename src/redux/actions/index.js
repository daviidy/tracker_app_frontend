import {
  FETCH_HABITS_PENDING,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from './actionsTypes';

export const fetchHabitsPending = () => ({
  type: FETCH_HABITS_PENDING,
});

export const fetchHabitsSuccess = (habits, filter) => ({
  type: FETCH_HABITS_SUCCESS,
  habits,
  filter,
});

export const fetchHabitsError = (error) => ({
  type: FETCH_HABITS_ERROR,
  error,
});

export const signUpPending = () => ({
  type: SIGN_UP_PENDING,
});

export const signUpSuccess = (habits, filter) => ({
  type: SIGN_UP_SUCCESS,
  habits,
  filter,
});

export const signUpError = (error) => ({
  type: SIGN_UP_ERROR,
  error,
});

export const signInPending = () => ({
  type: SIGN_IN_PENDING,
});

export const signInSuccess = (habits, filter) => ({
  type: SIGN_IN_SUCCESS,
  habits,
  filter,
});

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  error,
});
