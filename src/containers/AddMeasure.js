/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import addMeasureAction from '../modules/addMeasure';
import fetchUserAction from '../modules/fetchUser';
import {
  getMeasuresError,
  getMeasuresPending,
} from '../redux/reducers/measuresReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';

const AddMeasure = ({
  match: { params },
  addMeasure,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,

}) => {
  const [measure, setMeasure] = useState({
    value: 0,
    date: null,
    user_id: 0,
  });

  const { id } = params;

  const [redirect, setRedirect] = useState(false);

  let token = localStorage.getItem('token');

  useEffect(() => {
    if (checkUser()) {
      token = localStorage.getItem('token');
    } else if (checkToken()) {
      token = localStorage.getItem('token');
      fetchUser(token);
    } else {
      setRedirect(true);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setMeasure({
      ...measure,
      [e.target.name]: e.target.value,
      user_id: localStorage.getItem('id'),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeasure(token, measure, id).then((res) => {
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
      ? <Redirect to="/users/sign_in" />
      : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="form-control" onChange={handleChange} required type="text" name="value" placeholder="Value" />
          </div>
          <div className="form-group">
            <input className="form-control" onChange={handleChange} required type="date" name="date" />
          </div>
          <button className="btn bg-blue-color text-white" type="submit">Create Measure</button>
        </form>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getMeasuresError(state),
  pending: getMeasuresPending(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addMeasure: addMeasureAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddMeasure);

AddMeasure.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addMeasure: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

AddMeasure.defaultProps = {
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
