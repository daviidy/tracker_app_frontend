import { fetchUserError, fetchUserPending, fetchUserSuccess } from '../redux/actions';

const fetchUser = (data) => async (dispatch) => {
  dispatch(fetchUserPending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/auth',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data}`,
        },
        mode: 'cors',
        method: 'GET',
      });
    const second = await first.json();
    dispatch(fetchUserSuccess(second));
    console.log(second);
    localStorage.setItem('id', second.id);
    localStorage.setItem('username', second.username);
    localStorage.setItem('email', second.email);
    localStorage.setItem('admin', second.admin);
    return second;
  } catch (error) {
    dispatch(fetchUserError(error));
    return error;
  }
};

export default fetchUser;
