import {
  updateHabitError, updateHabitPending, updateHabitSuccess,
} from '../redux/actions';

const updateHabit = (token, data, id) => async (dispatch) => {
  dispatch(updateHabitPending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(data),
      });
    const second = await first.json();
    dispatch(updateHabitSuccess(second));
    return second;
  } catch (error) {
    dispatch(updateHabitError(error));
    return error;
  }
};

export default updateHabit;
