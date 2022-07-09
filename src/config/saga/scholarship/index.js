import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  authActions,
  scholarshipActions,
  paymentReferenceActions,
} from '../../actions';

function* getScholarships(actions) {
  try {
    const response = yield axios({
      url: '/scholarships',
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: scholarshipActions.GET_SCHOLARSHIPS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: scholarshipActions.GET_SCHOLARSHIPS_ERROR ,
      error: error.data,
    });
  }
}

function* watchGetScholarships() {
  yield takeLatest(scholarshipActions.GET_SCHOLARSHIPS_REQUEST , getScholarships);
}

const forkFunctions = [
  fork(watchGetScholarships),
];

export default forkFunctions;
