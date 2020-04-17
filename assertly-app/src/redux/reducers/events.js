import * as EventActions from '../actions/events';
import createReducer from '../createReducer';

const initialState = {
  loading: false,
  events: []
};

export default createReducer(initialState, {
  [EventActions.GET_TEST_SET_EVENTS]: state => ({
    ...state,
    loading: true
  }),
  [EventActions.GET_TEST_SET_EVENTS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loading: false,
      events: action.payload
    };
  },
  [EventActions.GET_TEST_SET_EVENTS_FAIL]: (state, action) => {
    return {
      ...state,
      loading: false
    };
  }
});
