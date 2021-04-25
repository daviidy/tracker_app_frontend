import {
  FETCH_HABITS_PENDING,
  FETCH_HABITS_SUCCESS,
  FETCH_HABITS_ERROR,
  ADD_HABIT_PENDING,
  ADD_HABIT_SUCCESS,
  ADD_HABIT_ERROR,
} from '../actions/actionsTypes';

export const habitsState = {
  pending: false,
  habits: [],
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

    default:
      return state;
  }
};

export const getHabits = (state) => state.habits.habits;
export const getHabitsPending = (state) => state.habits.pending;
export const getHabitsError = (state) => state.habits.error;
export default habits;
