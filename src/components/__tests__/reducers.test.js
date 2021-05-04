import reducer from '../../redux/reducers/habitsReducer';
import * as types from '../../redux/actions/actionsTypes';

describe('habits reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        pending: false,
        habits: [],
        singleHabit: {},
        error: null,
      },
    );
  });

  it('should handle FETCH_HABITS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_HABITS_SUCCESS,
        habits: [
          {
            id: 1,
            name: 'any',
          },
        ],
      }),
    ).toEqual(
      {
        pending: false,
        habits: [
          {
            id: 1,
            name: 'any',
          },
        ],
      },
    );
  });
});
