import { signUpError, signUpPending, signUpSuccess } from '../redux/actions';

const signUp = (data) => async (dispatch) => {
  dispatch(signUpPending());
  try {
    const first = await fetch('https://tracker-back-mcv.herokuapp.com/users',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
      });
    const second = await first.json();
    dispatch(signUpSuccess(second));
    localStorage.setItem('username', second.username);
    localStorage.setItem('email', second.email);
    second.password = data.password;
    return second;
  } catch (error) {
    dispatch(signUpError(error));
    return error;
  }
};

export default signUp;
