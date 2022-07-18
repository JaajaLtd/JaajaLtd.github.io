import { uniqBy } from 'lodash';
import { scholarshipActions } from '../../actions';
import initialState from '../../initialState';

function scholarship(state = initialState.scholarship, actions) {
  switch (actions.type) {
    case scholarshipActions.GET_SCHOLARSHIPS_REQUEST:
      return {
        ...state,
        loadError: {},
        loading: true,
      };
    case scholarshipActions.GET_SCHOLARSHIPS_SUCCESS:
      return {
        ...state,
        scholarships: [actions.data, ...state.scholarships],//uniqBy([actions.data, ...state.scholarships], 'student_number'),
        loading: false,
      };
    case scholarshipActions.GET_SCHOLARSHIPS_ERROR:
      return {
        ...state,
        loadError: actions.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default scholarship;
