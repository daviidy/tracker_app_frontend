/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import signUpAction from '../../modules/signUp';
import {
  getToken, getUser, getUserError, getUserPending,
} from '../../redux/reducers/usersReducer';
import signInAction from '../../modules/signIn';

const SignUp = ({
  signUp,
  getUser,
  error,
  token,
  pending,
  signIn,
}) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.passwordConfirmation) {
      alert("Passwords don't match");
    } else {
      signUp(user).then((data) => {
        const info = {
          email: data.email,
          password: data.password,
        };
        signIn(info).then((res) => {
          setRedirect(true);
        });
      });
    }
  };

  const shouldShowSpinner = () => {
    if (pending === false) return false;
    return true;
  };

  if (shouldShowSpinner()) {
    return (
      <p>Spinner</p>
    );
  }

  return (
    redirect
      ? <Redirect to="/habits/" />
      : (
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} required type="text" name="username" placeholder="Username" />
          <input onChange={handleChange} required type="email" name="email" placeholder="Email" />
          <input onChange={handleChange} required type="password" name="password" placeholder="Password" />
          <input onChange={handleChange} required type="password" name="passwordConfirmation" placeholder="Confirm password" />
          <button type="submit">Sign Up</button>
        </form>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getUserError(state),
  getUser: getUser(state),
  pending: getUserPending(state),
  token: getToken(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signUp: signUpAction,
  signIn: signInAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  error: PropTypes.string,
  token: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  pending: true,
  error: null,
  getUser: {},
  token: '',
};
