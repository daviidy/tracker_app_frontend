import {
  fetchMeasureError, fetchMeasurePending, fetchMeasureSuccess,
} from '../redux/actions';

const fetchMeasure = (token) => async (dispatch) => {
  dispatch(fetchMeasurePending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/measures',
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
    return second;
  } catch (error) {
    dispatch(fetchMeasureError(error));
    return error;
  }
};

export default fetchMeasure;
