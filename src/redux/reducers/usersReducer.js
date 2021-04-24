import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from '../actions/actionsTypes';

export const userState = {
  pending: false,
  user: {},
  error: null,
  token: '',
};

const users = (state = userState, action) => {
  switch (action.type) {
    case SIGN_UP_PENDING:
      return {
        ...state,
        pending: true,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    case SIGN_IN_PENDING:
      return {
        ...state,
        pending: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.token,
      };

    case SIGN_IN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const getUser = (state) => state.users.user;
export const getUserPending = (state) => state.users.pending;
export const getUserError = (state) => state.users.error;
export const getToken = (state) => state.users.token;
export default users;
