import { registrationActions } from '../../actions';
import initialState from '../../initialState';

function registration(state = initialState.registration, actions) {
  switch (actions.type) {
    case registrationActions.GET_REGISTRATION_EVENT_REQUEST:
      return {
        ...state,
        registrationEventError: {},
        gettingRegistrationEvent: true,
      };
    case registrationActions.GET_REGISTRATION_EVENT_SUCCESS:
      return {
        ...state,
        registrationEvent: actions.data,
        gettingRegistrationEvent: false,
      };
    case registrationActions.GET_REGISTRATION_EVENT_ERROR:
      return {
        ...state,
        registrationEventError: actions.error,
        gettingRegistrationEvent: false,
      };

    case registrationActions.GET_REGISTRATION_HISTORY_REQUEST:
      return {
        ...state,
        registrationHistoryError: {},
        gettingRegistrationHistory: true,
      };
    case registrationActions.GET_REGISTRATION_HISTORY_SUCCESS:
      return {
        ...state,
        registrationHistories: actions.data,
        gettingRegistrationHistory: false,
      };
    case registrationActions.GET_REGISTRATION_HISTORY_ERROR:
      return {
        ...state,
        registrationHistoryError: actions.error,
        gettingRegistrationHistory: false,
      };

    case registrationActions.REGISTER_STUDENT_REQUEST:
      return {
        ...state,
        registrationError: {},
        registeringStudent: true,
      };
    case registrationActions.REGISTER_STUDENT_SUCCESS:
      return {
        ...state,
        registrationSuccess: actions.data,
        registeringStudent: false,
      };
    case registrationActions.REGISTER_STUDENT_ERROR:
      return {
        ...state,
        registrationError: actions.error,
        registeringStudent: false,
      };
    case registrationActions.GET_COURSE_UNITS_REQUEST:
      return {
        ...state,
        getCourseUnitError: {},
        gettingCourseUnits: true,
      };
    case registrationActions.GET_COURSE_UNITS_SUCCESS:
      return {
        ...state,
        courseUnitsByStudyYear: actions.data,
        gettingCourseUnits: false,
      };
    case registrationActions.GET_COURSE_UNITS_ERROR:
      return {
        ...state,
        getCourseUnitError: actions.error,
        gettingCourseUnits: false,
      };
    case registrationActions.GET_REGISTERED_USERS_REQUEST:
      return {
        ...state,
        loadError: {},
        loading: true,
      };
    case registrationActions.GET_REGISTERED_USERS_SUCCESS:
      return {
        ...state,
        users: [actions.data, ...state.users],
        loading: false,
      };
    case registrationActions.GET_REGISTERED_USERS_ERROR:
      return {
        ...state,
        loadError: actions.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default registration;
