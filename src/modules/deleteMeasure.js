import {
  deleteMeasureError, deleteMeasurePending, deleteMeasureSuccess,
} from '../redux/actions';

const deleteMeasure = (token, habitId, measureId) => async (dispatch) => {
  dispatch(deleteMeasurePending());
  try {
    const first = await fetch(`https://tracker-back-mcv.herokuapp.com/habits/${habitId}/measurements/${measureId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        mode: 'cors',
        method: 'DELETE',
      });
    const second = await first.json();
    dispatch(deleteMeasureSuccess(second));
    return second;
  } catch (error) {
    dispatch(deleteMeasureError(error));
    return error;
  }
};

export default deleteMeasure;
