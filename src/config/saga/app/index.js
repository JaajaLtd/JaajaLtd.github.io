import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import  appActions  from '../../actions';

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

function* watchGetMetadata() {
  yield takeLatest(appActions.GET_META_DATA_REQUEST, getAllMetadata);
}


const forkFunctions = [
  fork(watchGetMetadata),
];

export default forkFunctions;
