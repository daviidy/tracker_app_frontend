import 'regenerator-runtime/runtime';
import fetch from 'jest-fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../redux/actions/index';
import fetchHabits from '../../modules/fetchHabits';
import * as types from '../../redux/actions/actionsTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
fetch.enableMocks();

describe('actions', () => {
  it('should create an action to pend habits fetching', () => {
    const expectedAction = {
      type: types.FETCH_HABITS_PENDING,
    };
    expect(actions.fetchHabitsPending()).toEqual(expectedAction);
  });

  it('should create an action to fetch habits successfully', () => {
    const habits = [];
    const expectedAction = {
      type: types.FETCH_HABITS_SUCCESS,
      habits,
    };
    expect(actions.fetchHabitsSuccess(habits)).toEqual(expectedAction);
  });

  it('should create an action to fetch habits with an error', () => {
    const error = 'any error';
    const expectedAction = {
      type: types.FETCH_HABITS_ERROR,
      error,
    };
    expect(actions.fetchHabitsError(error)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    fetch.resetMocks();
  });
  test('creates FETCH_TODOS_SUCCESS when fetching habits has been done', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      [{
        id: 1,
        name: 'any',
      },
      {
        id: 2,
        name: 'test',
      }],
    ));

    const store = mockStore({
      habits: {
        habits: [],
      },
    });

    await store.dispatch(fetchHabits('any_token'));
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(store.getActions()[0].type).toEqual(types.FETCH_HABITS_PENDING);
    expect(store.getActions()[1].type).toEqual(types.FETCH_HABITS_SUCCESS);
  });
});
