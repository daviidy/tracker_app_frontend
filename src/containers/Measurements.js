/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchMeasureAction from '../modules/fetchMeasure';
import fetchUserAction from '../modules/fetchUser';
import {
  getMeasures,
  getMeasuresError,
  getMeasuresPending,
} from '../redux/reducers/measuresReducer';

import {
  getUser, getUserError, getUserPending,
} from '../redux/reducers/usersReducer';

import { checkToken, checkUser } from '../modules/checkAuth';
import Measure from '../components/Measure';

const Measures = ({
  match: { params },
  allMeasures,
  pending,
  error,
  getUser,
  getUserError,
  getUserPending,
  fetchUser,
  fetchMeasures,

}) => {
  const [redirect, setRedirect] = useState(false);

  const { id } = params;

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
    console.log('fetching measures');
    fetchMeasures(token, id);
  }, []);

  console.log(allMeasures);

  const renderMeasures = (arr) => (arr.map((val) => (
    <div key={val.id}>
      <a href={`/measures/${val.id}`}>
        <Measure measure={val} />
      </a>
    </div>
  )));

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
      : renderMeasures(allMeasures)
  );
};

const mapStateToProps = (state) => ({
  allMeasures: getMeasures(state),
  error: getMeasuresError(state),
  pending: getMeasuresPending(state),
  getUser: getUser(state),
  getUserError: getUserError(state),
  getUserPending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMeasures: fetchMeasureAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Measures);

Measures.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchMeasures: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  allMeasures: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  pending: PropTypes.bool,
  error: PropTypes.string,
  getUserPending: PropTypes.bool,
  getUserError: PropTypes.string,
  getUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

Measures.defaultProps = {
  allMeasures: [],
  pending: true,
  error: null,
  getUserPending: true,
  getUserError: null,
  getUser: {},
};
