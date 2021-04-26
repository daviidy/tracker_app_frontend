import {
  fetchMeasureError, fetchMeasurePending, fetchMeasureSuccess,
} from '../redux/actions';

const fetchMeasure = (token, id) => async (dispatch) => {
  console.log(token);
  dispatch(fetchMeasurePending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${id}/measurements`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'GET',
      });
    const second = await first.json();
    dispatch(fetchMeasureSuccess(second));
    console.log(second);
    return second;
  } catch (error) {
    dispatch(fetchMeasureError(error));
    return error;
  }
};

export default fetchMeasure;
