/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import signInAction from '../../modules/signIn';
import {
  getToken, getUser, getUserError, getUserPending,
} from '../../redux/reducers/usersReducer';
import { checkUser } from '../../modules/checkAuth';

const SignIn = ({
  signIn,
  token,
  pending,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      setRedirect(true);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(user).then((res) => {
      setRedirect(true);
    });
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
          <input onChange={handleChange} required type="email" name="email" placeholder="Email" />
          <input onChange={handleChange} required type="password" name="password" placeholder="Password" />
          <button type="submit">Sign In</button>
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
  signIn: signInAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  token: PropTypes.string,
};

SignIn.defaultProps = {
  pending: true,
  token: '',
};
