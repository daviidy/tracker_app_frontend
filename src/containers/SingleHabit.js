/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import fetchSingleHabitAction from '../modules/fetchSingleHabit';
import { getHabit, getHabitsError, getHabitsPending } from '../redux/reducers/habitsReducer';
import { checkToken, checkUser } from '../modules/checkAuth';
import fetchUserAction from '../modules/fetchUser';
import deleteHabitAction from '../modules/deleteHabit';
import Spinner from '../components/Spinner';

const SingleHabit = (props) => {
  const {
    match: { params },
    fetchSingleHabit,
    fetchUser,
    error,
    pending,
    habit,
    deleteHabit,
  } = props;

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
    fetchSingleHabit(token, id);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteHabit(token, id).then((res) => {
      setRedirect(true);
    });
  };

  const shouldShowSpinner = () => {
    if (pending === false) return false;
    return true;
  };

  if (shouldShowSpinner()) {
    return (
      <Spinner />
    );
  }

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <>
          <div className="row">
            <div className="col-8">
              <h4>
                <strong>{ habit.name }</strong>
              </h4>
            </div>
            <div className="col-4 d-flex justify-content-end text-dark">
              {
                localStorage.getItem('admin') === 'true'
                  ? (
                    <>
                      <a href={`/habits/${habit.id}/edit`} className="mr-3">
                        <i className="fas fa-pencil-alt" />
                      </a>
                      <button type="button" className="btn p-0" onClick={handleDelete}>
                        <i className="fas fa-trash" />
                      </button>
                    </>
                  )
                  : null
              }

            </div>
          </div>
          <div className="mt-5 col-12 shadow p-3 mb-5 bg-white rounded">
            <a href={`/habits/${habit.id}/measurements/create`}>Add measure for this habit</a>
          </div>
          <div className="col-12 shadow p-3 mb-5 bg-white rounded">
            <a href={`/habits/${habit.id}/measurements`}>All measures for this habit</a>
          </div>
        </>
      )
  );
};

const mapStateToProps = (state) => ({
  error: getHabitsError(state),
  habit: getHabit(state),
  pending: getHabitsPending(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSingleHabit: fetchSingleHabitAction,
  deleteHabit: deleteHabitAction,
  fetchUser: fetchUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingleHabit);

SingleHabit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchSingleHabit: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  deleteHabit: PropTypes.func.isRequired,
  error: PropTypes.string,
  pending: PropTypes.bool,
  habit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

SingleHabit.defaultProps = {
  pending: true,
  error: null,
  habit: {},
};
