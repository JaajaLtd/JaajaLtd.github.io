import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { enrollmentActions, registrationActions } from '../../actions';

function* getRegistrationEvent(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/registration/event',
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: registrationActions.GET_REGISTRATION_EVENT_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: registrationActions.GET_REGISTRATION_EVENT_ERROR,
      error: error.data,
    });
  }
}

function* getRegistrationHistory(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/registration/history/${actions.studentProgrammeId}`,
      method: 'GET',
    });
    yield put({
      type: registrationActions.GET_REGISTRATION_HISTORY_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: registrationActions.GET_REGISTRATION_HISTORY_SUCCESS,
      error: error.data,
    });
  }
}

function* registerStudent(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/registration/event/register',
      method: 'POST',
      data: actions.data,
    });
    yield put({
      type: registrationActions.REGISTER_STUDENT_SUCCESS,
      data: response.data,
    });
    yield put({
      type: enrollmentActions.GET_CURRENT_EVENTS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: registrationActions.REGISTER_STUDENT_ERROR,
      error: error.data,
    });
  }
}

function* getCourseUnits(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/registration/course-units/${actions.programmeId}`,
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: registrationActions.GET_COURSE_UNITS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: registrationActions.GET_COURSE_UNITS_ERROR,
      error: error.data,
    });
  }
}

function* watchGetRegistrationEvent() {
  yield takeLatest(
    registrationActions.GET_REGISTRATION_EVENT_REQUEST,
    getRegistrationEvent
  );
}

function* watchGetRegistrationHistory() {
  yield takeLatest(
    registrationActions.GET_REGISTRATION_HISTORY_REQUEST,
    getRegistrationHistory
  );
}

function* watchRegisterStudent() {
  yield takeLatest(
    registrationActions.REGISTER_STUDENT_REQUEST,
    registerStudent
  );
}

function* watchGetCourseUnits() {
  yield takeLatest(
    registrationActions.GET_COURSE_UNITS_REQUEST,
    getCourseUnits
  );
}

const forkFunctions = [
  fork(watchGetRegistrationEvent),
  fork(watchGetRegistrationHistory),
  fork(watchRegisterStudent),
  fork(watchGetCourseUnits),
];

export default forkFunctions;
