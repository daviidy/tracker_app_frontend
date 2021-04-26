import {
  updateMeasureError, updateMeasurePending, updateMeasureSuccess,
} from '../redux/actions';

const updateMeasure = (token, data, habitId, measureId) => async (dispatch) => {
  dispatch(updateMeasurePending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${habitId}/measurements/${measureId}`,
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
    dispatch(updateMeasureSuccess(second));
    return second;
  } catch (error) {
    dispatch(updateMeasureError(error));
    return error;
  }
};

export default updateMeasure;
