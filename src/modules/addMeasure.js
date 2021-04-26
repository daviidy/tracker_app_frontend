import {
  addMeasureError, addMeasurePending, addMeasureSuccess,
} from '../redux/actions';

const addMeasure = (token, data, id) => async (dispatch) => {
  dispatch(addMeasurePending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${id}/measurements`,
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
    dispatch(addMeasureSuccess(second));
    return second;
  } catch (error) {
    dispatch(addMeasureError(error));
    return error;
  }
};

export default addMeasure;
