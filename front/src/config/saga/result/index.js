import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { resultActions } from '../../actions';

function* getMyResult(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/result/${actions.studentProgrammeId}`,
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: resultActions.GET_MY_RESULT_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: resultActions.GET_MY_RESULT_ERROR,
      error: error.data,
    });
  }
}

function* watchGetMyResult() {
  yield takeLatest(resultActions.GET_MY_RESULT_REQUEST, getMyResult);
}

const forkFunctions = [fork(watchGetMyResult)];

export default forkFunctions;
