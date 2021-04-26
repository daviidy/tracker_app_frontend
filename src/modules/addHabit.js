import { addHabitError, addHabitPending, addHabitSuccess } from '../redux/actions';

const addHabit = (token, data) => async (dispatch) => {
  console.log(data);
  console.log(token);
  dispatch(addHabitPending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/habits',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
      });
    const second = await first.json();
    dispatch(addHabitSuccess(second));
    return second;
  } catch (error) {
    dispatch(addHabitError(error));
    return error;
  }
};

export default addHabit;
