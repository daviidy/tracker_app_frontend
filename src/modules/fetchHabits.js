import { fetchHabitsError, fetchHabitsPending, fetchHabitsSuccess } from '../redux/actions';

const fetchHabits = (token) => async (dispatch) => {
  dispatch(fetchHabitsPending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/habits',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'GET',
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
