import {
  singleMeasureError, singleMeasurePending, singleMeasureSuccess,
} from '../redux/actions';

const fetchSingleMeasure = (token, habitId, measureId) => async (dispatch) => {
  console.log(token);
  dispatch(singleMeasurePending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${habitId}/measurements/${measureId}`,
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
    dispatch(singleMeasureSuccess(second));
    return second;
  } catch (error) {
    dispatch(singleMeasureError(error));
    return error;
  }
};

export default fetchSingleMeasure;
