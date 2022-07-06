import { uniqBy } from 'lodash';
import { resultActions } from '../../actions';
import initialState from '../../initialState';

function result(state = initialState.result, actions) {
  switch (actions.type) {
    case resultActions.GET_MY_RESULT_REQUEST:
      return {
        ...state,
        loadError: {},
        loading: true,
      };
    case resultActions.GET_MY_RESULT_SUCCESS:
      return {
        ...state,
        results: uniqBy([actions.data, ...state.results], 'student_number'),
        loading: false,
      };
    case resultActions.GET_MY_RESULT_ERROR:
      return {
        ...state,
        loadError: actions.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default result;
