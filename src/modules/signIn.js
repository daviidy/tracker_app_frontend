import { signInError, signInPending, signInSuccess } from '../redux/actions';

const signIn = (data) => async (dispatch) => {
  dispatch(signInPending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/auth',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
      });
    const second = await first.json();
    console.log(second.token);
    dispatch(signInSuccess(second.token));
    localStorage.setItem('email', data.email);
    localStorage.setItem('token', second.token);
    return second.token;
  } catch (error) {
    dispatch(signInError(error));
    return error;
  }
};

export default signIn;
