import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { enrollmentActions } from '../../actions';

function* getCurrentEvents(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/enrollment/current-events/${actions.currentStudentProgrammeId}`,
      method: 'GET',
    });
    yield put({
      type: enrollmentActions.GET_CURRENT_EVENTS_SUCCESS,
      data: response.data,
      programmeId: actions.currentStudentProgrammeId,
    });
  } catch (error) {
    yield put({
      type: enrollmentActions.GET_CURRENT_EVENTS_ERROR,
      error: error.data,
    });
  }
}

function* getEnrollmentHistory(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/enrollment/history/${actions.currentStudentProgrammeId}`,
      method: 'GET',
    });
    yield put({
      type: enrollmentActions.GET_ENROLLMENT_HISTORY_SUCCESS,
      data: response.data,
      programmeId: actions.currentStudentProgrammeId,
    });
  } catch (error) {
    yield put({
      type: enrollmentActions.GET_ENROLLMENT_HISTORY_SUCCESS,
      error: error.data,
    });
  }
}

function* enrollStudent(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/enrollment/event/enroll',
      method: 'POST',
      data: actions.data,
    });
    yield put({
      type: enrollmentActions.ENROLL_STUDENT_SUCCESS,
      data: response.data,
    });
    yield put({
      type: enrollmentActions.GET_CURRENT_EVENTS_REQUEST,
      currentStudentProgrammeId: actions.data?.student_programme_id,
    });
  } catch (error) {
    yield put({
      type: enrollmentActions.ENROLL_STUDENT_ERROR,
      error: error.data,
    });
  }
}

function* watchGetCurrentEvents() {
  yield takeLatest(
    enrollmentActions.GET_CURRENT_EVENTS_REQUEST,
    getCurrentEvents
  );
}

function* watchGetEnrollmentHistory() {
  yield takeLatest(
    enrollmentActions.GET_ENROLLMENT_HISTORY_REQUEST,
    getEnrollmentHistory
  );
}

function* watchEnrollStudent() {
  yield takeLatest(enrollmentActions.ENROLL_STUDENT_REQUEST, enrollStudent);
}

const forkFunctions = [
  fork(watchGetCurrentEvents),
  fork(watchGetEnrollmentHistory),
  fork(watchEnrollStudent),
];

export default forkFunctions;
