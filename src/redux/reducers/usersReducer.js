import { SIGN_UP_PENDING, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from '../actions/actionsTypes';

export const userState = {
  pending: false,
  user: {},
  error: null,
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
        photos: action.photos,
        filter: action.filter,
      };

    case SIGN_UP_ERROR:
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
export default users;
