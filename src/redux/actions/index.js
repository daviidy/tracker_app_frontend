import {
  FETCH_HABITS_PENDING,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  ADD_HABIT_PENDING,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_ERROR,
  SINGLE_HABIT_PENDING,
  SINGLE_HABIT_SUCCESS,
  SINGLE_HABIT_ERROR,
  UPDATE_HABIT_PENDING,
  UPDATE_HABIT_SUCCESS,
  UPDATE_HABIT_ERROR,
  DELETE_HABIT_PENDING,
  DELETE_HABIT_SUCCESS,
  DELETE_HABIT_ERROR,
  FETCH_MEASURE_PENDING,
  FETCH_MEASURE_SUCCESS,
  FETCH_MEASURE_ERROR,
  ADD_MEASURE_PENDING,
  ADD_MEASURE_SUCCESS,
  ADD_MEASURE_ERROR,
  SINGLE_MEASURE_PENDING,
  SINGLE_MEASURE_SUCCESS,
  SINGLE_MEASURE_ERROR,
  UPDATE_MEASURE_PENDING,
  UPDATE_MEASURE_SUCCESS,
  UPDATE_MEASURE_ERROR,
  DELETE_MEASURE_PENDING,
  DELETE_MEASURE_SUCCESS,
  DELETE_MEASURE_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './actionsTypes';

export const fetchHabitsPending = () => ({
  type: FETCH_HABITS_PENDING,
});

export const fetchHabitsSuccess = (habits) => ({
  type: FETCH_HABITS_SUCCESS,
  habits,
});

export const fetchHabitsError = (error) => ({
  type: FETCH_HABITS_ERROR,
  error,
});

export const addHabitPending = () => ({
  type: ADD_HABIT_PENDING,
});

export const addHabitSuccess = () => ({
  type: ADD_HABIT_SUCCESS,
});

export const addHabitError = (error) => ({
  type: ADD_HABIT_ERROR,
  error,
});

export const singleHabitPending = () => ({
  type: SINGLE_HABIT_PENDING,
});

export const singleHabitSuccess = (habit) => ({
  type: SINGLE_HABIT_SUCCESS,
  habit,
});

export const singleHabitError = (error) => ({
  type: SINGLE_HABIT_ERROR,
  error,
});

export const updateHabitPending = () => ({
  type: UPDATE_HABIT_PENDING,
});

export const updateHabitSuccess = () => ({
  type: UPDATE_HABIT_SUCCESS,
});

export const updateHabitError = (error) => ({
  type: UPDATE_HABIT_ERROR,
  error,
});

export const deleteHabitPending = () => ({
  type: DELETE_HABIT_PENDING,
});

export const deleteHabitSuccess = () => ({
  type: DELETE_HABIT_SUCCESS,
});

export const deleteHabitError = (error) => ({
  type: DELETE_HABIT_ERROR,
  error,
});

export const fetchMeasurePending = () => ({
  type: FETCH_MEASURE_PENDING,
});

export const fetchMeasureSuccess = (measures) => ({
  type: FETCH_MEASURE_SUCCESS,
  measures,
});

export const fetchMeasureError = (error) => ({
  type: FETCH_MEASURE_ERROR,
  error,
});

export const addMeasurePending = () => ({
  type: ADD_MEASURE_PENDING,
});

export const addMeasureSuccess = () => ({
  type: ADD_MEASURE_SUCCESS,
});

export const addMeasureError = (error) => ({
  type: ADD_MEASURE_ERROR,
  error,
});

export const singleMeasurePending = () => ({
  type: SINGLE_MEASURE_PENDING,
});

export const singleMeasureSuccess = (measure) => ({
  type: SINGLE_MEASURE_SUCCESS,
  measure,
});

export const singleMeasureError = (error) => ({
  type: SINGLE_MEASURE_ERROR,
  error,
});

export const updateMeasurePending = () => ({
  type: UPDATE_MEASURE_PENDING,
});

export const updateMeasureSuccess = () => ({
  type: UPDATE_MEASURE_SUCCESS,
});

export const updateMeasureError = (error) => ({
  type: UPDATE_MEASURE_ERROR,
  error,
});

export const deleteMeasurePending = () => ({
  type: DELETE_MEASURE_PENDING,
});

export const deleteMeasureSuccess = () => ({
  type: DELETE_MEASURE_SUCCESS,
});

export const deleteMeasureError = (error) => ({
  type: DELETE_MEASURE_ERROR,
  error,
});

export const signUpPending = () => ({
  type: SIGN_UP_PENDING,
});

export const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  user,
});

export const signUpError = (error) => ({
  type: SIGN_UP_ERROR,
  error,
});

export const signInPending = () => ({
  type: SIGN_IN_PENDING,
});

export const signInSuccess = (token) => ({
  type: SIGN_IN_SUCCESS,
  token,
});

export const signInError = (error) => ({
  type: SIGN_IN_ERROR,
  error,
});

export const getUserPending = () => ({
  type: GET_USER_PENDING,
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserError = (error) => ({
  type: GET_USER_ERROR,
  error,
});

export const fetchUserPending = () => ({
  type: FETCH_USER_PENDING,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user,
});

export const fetchUserError = (error) => ({
  type: FETCH_USER_ERROR,
  error,
});
