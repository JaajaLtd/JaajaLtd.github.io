import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { authActions } from '../../actions';
import { clearToken } from '../../services/storageService';

function* loginStudent(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/auth/login',
      method: 'POST',
      data: actions.data,
    });
    yield put({
      type: authActions.LOGIN_STUDENT_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.GET_AUTH_USER_REQUEST,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
  } catch (error) {
    yield put({
      type: authActions.LOGIN_STUDENT_ERROR,
      error: error.data,
    });
  }
}

function* logoutUser() {
  try {
    const response = yield axios({
      url: '/student-portal/auth/logout',
      method: 'POST',
    });
    clearToken();
    yield put({
      type: authActions.LOGOUT_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.REMOVE_AUTH_USER,
    });
    yield put({
      type: authActions.SET_IS_AUTHENTICATED,
      payload: false,
    });
  } catch (error) {
    if (error.status === 403 || error.status === 401) clearToken();
    yield put({
      type: authActions.LOGOUT_ERROR,
      error: error.data,
    });
  }
}

function* fetchAuthUser() {
  try {
    const response = yield axios({
      url: '/student-portal/auth/profile',
      method: 'GET',
    });
    yield put({
      type: authActions.GET_AUTH_USER_SUCCESS,
      data: response.data,
    });
    yield put({
      type: authActions.SET_AUTH_USER,
      user: response.data,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
  } catch (error) {
    yield put({
      type: authActions.GET_AUTH_USER_ERROR,
      error: error.data,
    });
  }
}

function* getAuthUserBalance() {
  try {
    const response = yield axios({
      url: '/student-portal/auth/account-balance',
      method: 'GET',
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_SUCCESS,
      data: response.accountBalance,
    });
  } catch (error) {
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_ERROR,
      error: error.data,
    });
  }
}

function* getStudentProgrammes() {
  try {
    const response = yield axios({
      url: '/student-portal/auth/academic-records',
      method: 'GET',
    });
    yield put({
      type: authActions.GET_STUDENT_PROGRAMMES_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: authActions.GET_STUDENT_PROGRAMMES_ERROR,
      error: error.data,
    });
  }
}

function* changePassword(action) {
  try {
    const response = yield axios({
      url: `/student-portal/auth/change-password`,
      method: 'PUT',
      data: action.data,
    });
    yield put({
      type: authActions.CHANGE_PASSWORD_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.CHANGE_PASSWORD_ERROR,
      error: error.data,
    });
  }
}

function* requestToken(action) {
  try {
    const response = yield axios({
      url: `/student-portal/auth/request-token`,
      method: 'POST',
      data: action.data,
    });
    yield put({
      type: authActions.REQUEST_TOKEN_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.REQUEST_TOKEN_ERROR,
      error: error.data,
    });
  }
}

function* resetPassword(action) {
  try {
    const response = yield axios({
      url: `/student-portal/auth/reset-password`,
      method: 'PUT',
      data: action.data,
    });
    yield put({
      type: authActions.RESET_PASSWORD_SUCCESS,
      data: response,
    });
  } catch (error) {
    yield put({
      type: authActions.RESET_PASSWORD_ERROR,
      error: error.data,
    });
  }
}

function* watchLoginStudent() {
  yield takeLatest(authActions.LOGIN_STUDENT_REQUEST, loginStudent);
}

function* watchLogout() {
  yield takeLatest(authActions.LOGOUT_REQUEST, logoutUser);
}

function* watchFetchAuthUser() {
  yield takeLatest(authActions.GET_AUTH_USER_REQUEST, fetchAuthUser);
}

function* watchGetStudentProgrammes() {
  yield takeLatest(
    authActions.GET_STUDENT_PROGRAMMES_REQUEST,
    getStudentProgrammes
  );
}

function* watchGetStudentBalance() {
  yield takeLatest(
    authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    getAuthUserBalance
  );
}

function* watchChangePassword() {
  yield takeLatest(authActions.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* watchRequestToken() {
  yield takeLatest(authActions.REQUEST_TOKEN_REQUEST, requestToken);
}

function* watchResetPassword() {
  yield takeLatest(authActions.RESET_PASSWORD_REQUEST, resetPassword);
}

const forkFunctions = [
  fork(watchLoginStudent),
  fork(watchLogout),
  fork(watchFetchAuthUser),
  fork(watchGetStudentProgrammes),
  fork(watchGetStudentBalance),
  fork(watchChangePassword),
  fork(watchRequestToken),
  fork(watchResetPassword),
];

export default forkFunctions;
