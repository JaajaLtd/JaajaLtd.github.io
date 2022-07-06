import { uniqBy } from 'lodash';
import { enrollmentActions } from '../../actions';
import initialState from '../../initialState';

function enrollment(state = initialState.enrollment, actions) {
  switch (actions.type) {
    case enrollmentActions.GET_CURRENT_EVENTS_REQUEST:
      return {
        ...state,
        currentEventsError: {},
        gettingCurrentEvents: true,
      };
    case enrollmentActions.GET_CURRENT_EVENTS_SUCCESS: {
      const currentEvent = {
        event: actions.data,
        programme_id: actions.programmeId,
      };

      return {
        ...state,
        currentEvents: uniqBy(
          [currentEvent, ...state.currentEvents],
          'programme_id'
        ),
        gettingCurrentEvents: false,
      };
    }
    case enrollmentActions.GET_CURRENT_EVENTS_ERROR:
      return {
        ...state,
        currentEventsError: actions.error,
        gettingCurrentEvents: false,
      };

    case enrollmentActions.GET_ENROLLMENT_HISTORY_REQUEST:
      return {
        ...state,
        enrollmentHistoryError: {},
        gettingEnrollmentHistory: true,
      };
    case enrollmentActions.GET_ENROLLMENT_HISTORY_SUCCESS:
      return {
        ...state,
        enrollmentHistories: actions.data,
        gettingEnrollmentHistory: false,
      };
    case enrollmentActions.GET_ENROLLMENT_HISTORY_ERROR:
      return {
        ...state,
        enrollmentHistoryError: actions.error,
        gettingEnrollmentHistory: false,
      };

    case enrollmentActions.ENROLL_STUDENT_REQUEST:
      return {
        ...state,
        enrollError: {},
        enrolling: true,
      };
    case enrollmentActions.ENROLL_STUDENT_SUCCESS:
      return {
        ...state,
        enrollSuccess: actions.data,
        enrolling: false,
      };
    case enrollmentActions.ENROLL_STUDENT_ERROR:
      return {
        ...state,
        enrollError: actions.error,
        enrolling: false,
      };

    default:
      return state;
  }
}

export default enrollment;
