import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import  appActions  from '../../actions';

function* getCurrentSemester() {
  try {
    const response = yield axios({
      url: '/student-portal/enrollment/current-semester',
      method: 'GET',
    });
    yield put({
      type: appActions.GET_CURRENT_SEMESTER_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_CURRENT_SEMESTER_ERROR,
      error: error.data,
    });
  }
}

function* getInstitutionStructure(actions) {
  try {
    const response = yield axios({
      url: '/app/institution-structure/student-portal',
      method: 'GET',
      params: actions.params,
    });
    yield put({
      type: appActions.GET_INSTITUTION_STRUCTURE_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_INSTITUTION_STRUCTURE_ERROR,
      error: error.data,
    });
  }
}
function* getAllMetadata(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/metadata',
      method: 'GET',
      data: actions.data,
    });
    yield put({
      type: appActions.GET_META_DATA_SUCCESS,
      data: response.metadata,
    });
  } catch (error) {
    yield put({
      type: appActions.GET_META_DATA_ERROR,
      error: error.data,
    });
  }
}

function* watchGetCurrentSemester() {
  yield takeLatest(appActions.GET_CURRENT_SEMESTER_REQUEST, getCurrentSemester);
}

function* watchGetMetadata() {
  yield takeLatest(appActions.GET_META_DATA_REQUEST, getAllMetadata);
}

function* watchGetInstitutionStructures() {
  yield takeLatest(
    appActions.GET_INSTITUTION_STRUCTURE_REQUEST,
    getInstitutionStructure
  );
}

const forkFunctions = [
  fork(watchGetCurrentSemester),
  fork(watchGetMetadata),
  fork(watchGetInstitutionStructures),
];

export default forkFunctions;
