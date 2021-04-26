import {
  FETCH_MEASURE_PENDING,
  FETCH_MEASURE_SUCCESS,
  FETCH_MEASURE_ERROR,
  ADD_MEASURE_PENDING,
  ADD_MEASURE_SUCCESS,
  ADD_MEASURE_ERROR,
  UPDATE_MEASURE_PENDING,
  UPDATE_MEASURE_SUCCESS,
  UPDATE_MEASURE_ERROR,
  SINGLE_MEASURE_PENDING,
  SINGLE_MEASURE_SUCCESS,
  SINGLE_MEASURE_ERROR,
} from '../actions/actionsTypes';

export const measuresState = {
  pending: false,
  measures: [],
  singleMeasure: {},
  error: null,
};

const measures = (state = measuresState, action) => {
  switch (action.type) {
    case FETCH_MEASURE_PENDING:
      return {
        ...state,
        pending: true,
      };

    case FETCH_MEASURE_SUCCESS:
      return {
        ...state,
        pending: false,
        measures: action.measures,
      };

    case FETCH_MEASURE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case ADD_MEASURE_PENDING:
      return {
        ...state,
        pending: true,
      };

    case ADD_MEASURE_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case ADD_MEASURE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case SINGLE_MEASURE_PENDING:
      return {
        ...state,
        pending: true,
      };

    case SINGLE_MEASURE_SUCCESS:
      return {
        ...state,
        pending: false,
        singleMeasure: action.measure,
      };

    case SINGLE_MEASURE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case UPDATE_MEASURE_PENDING:
      return {
        ...state,
        pending: true,
      };

    case UPDATE_MEASURE_SUCCESS:
      return {
        ...state,
        pending: false,
      };

    case UPDATE_MEASURE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const getMeasures = (state) => state.measures.measures;
export const getMeasure = (state) => state.measures.singleMeasure;
export const getMeasuresPending = (state) => state.measures.pending;
export const getMeasuresError = (state) => state.measures.error;
export default measures;
