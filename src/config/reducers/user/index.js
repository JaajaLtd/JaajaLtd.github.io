import { uniqBy } from 'lodash';
import { userActions } from '../../actions';
import initialState from '../../initialState';

function user(state = initialState.user, actions) {
  switch (actions.type) {
    case userActions.GET_USERS_REQUEST :
      return {
        ...state,
        loadError: {},
        loading: true,
      };
    case userActions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: [actions.data, ...state.users],//uniqBy([actions.data, ...state.users], 'student_number'),
        loading: false,
      };
    case userActions.GET_USERS_ERROR:
      return {
        ...state,
        loadError: actions.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default user;
