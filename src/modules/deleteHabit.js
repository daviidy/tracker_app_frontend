import {
  deleteHabitError, deleteHabitPending, deleteHabitSuccess,
} from '../redux/actions';

const deleteHabit = (token, data) => async (dispatch) => {
  console.log(data);
  console.log(token);
  dispatch(deleteHabitPending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${data}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'DELETE',
      });
    const second = await first.json();
    dispatch(deleteHabitSuccess(second));
    return second;
  } catch (error) {
    dispatch(deleteHabitError(error));
    return error;
  }
};

export default deleteHabit;
