import { combineReducers } from 'redux';
import users from './usersReducer';
import habits from './habitsReducer';
import measures from './measuresReducer';

export default combineReducers({
  users,
  habits,
  measures,
});
