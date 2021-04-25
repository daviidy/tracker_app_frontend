import { combineReducers } from 'redux';
import users from './usersReducer';
import habits from './habitsReducer';

export default combineReducers({
  users,
  habits,
});
