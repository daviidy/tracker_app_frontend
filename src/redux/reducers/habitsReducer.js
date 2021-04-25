import {
  FETCH_HABITS_PENDING,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  ADD_HABIT_PENDING,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_ERROR,
  UPDATE_HABIT_PENDING,
  UPDATE_HABIT_SUCCESS,
  UPDATE_HABIT_ERROR,
  SINGLE_HABIT_PENDING,
  SINGLE_HABIT_SUCCESS,
  SINGLE_HABIT_ERROR,
} from '../actions/actionsTypes';

export const habitsState = {
  pending: false,
  habits: [],
  singleHabit: {},
  error: null,
};

const habits = (state = habitsState, action) => {
  switch (action.type) {
    case FETCH_HABITS_PENDING:
      return {
        ...state,
        pending: true,
      };

    case FETCH_HABITS_SUCCESS:
      return {
        ...state,
        pending: false,
        habits: action.habits,
      };

    case FETCH_HABITS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case ADD_HABIT_PENDING:
      return {
        ...state,
        pending: true,
      };

    case ADD_HABIT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case ADD_HABIT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case SINGLE_HABIT_PENDING:
      return {
        ...state,
        pending: true,
      };

    case SINGLE_HABIT_SUCCESS:
      return {
        ...state,
        pending: false,
        singleHabit: action.habit,
      };

    case SINGLE_HABIT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case UPDATE_HABIT_PENDING:
      return {
        ...state,
        pending: true,
      };

    case UPDATE_HABIT_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case UPDATE_HABIT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const getHabits = (state) => state.habits.habits;
export const getHabit = (state) => state.habits.singleHabit;
export const getHabitsPending = (state) => state.habits.pending;
export const getHabitsError = (state) => state.habits.error;
export default habits;
