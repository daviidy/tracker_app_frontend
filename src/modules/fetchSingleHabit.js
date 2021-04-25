import { fetchHabitsError, fetchHabitsPending, fetchHabitsSuccess } from '../redux/actions';

const fetchHabits = (token, data) => async (dispatch) => {
  console.log(data);
  console.log(token);
  dispatch(fetchHabitsPending());
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
    dispatch(fetchHabitsSuccess(second));
    return second;
  } catch (error) {
    dispatch(fetchHabitsError(error));
    return error;
  }
};

export default fetchHabits;
