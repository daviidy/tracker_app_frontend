import { singleHabitError, singleHabitPending, singleHabitSuccess } from '../redux/actions';

const fetchSingleHabit = (token, data) => async (dispatch) => {
  console.log(data);
  console.log(token);
  dispatch(singleHabitPending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${data}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'GET',
      });
    const second = await first.json();
    console.log(second);
    dispatch(singleHabitSuccess(second));
    return second;
  } catch (error) {
    dispatch(singleHabitError(error));
    return error;
  }
};

export default fetchSingleHabit;
