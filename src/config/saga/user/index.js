import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  userActions,
} from '../../actions';

function* getUsers(actions) {
  try {
    const response = yield axios({
      url: '/authenticate-user',
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: userActions.GET_USERS_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: userActions.GET_USERS_ERROR ,
      error: error.data,
    });
  }
}

function* watchGetUsers() {
  yield takeLatest(userActions.GET_USERS_REQUEST , getUsers);
}

const forkFunctions = [
  fork(watchGetUsers),
];

export default forkFunctions;
