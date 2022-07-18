import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  authActions,
  paymentActions,
  paymentReferenceActions,
} from '../../actions';

function* getMyInvoices(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/invoices',
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: paymentActions.GET_MY_INVOICES_SUCCESS,
      data: response.data,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
  } catch (error) {
    yield put({
      type: paymentActions.GET_MY_INVOICES_ERROR,
      error: error.data,
    });
  }
}

function* getMyTransactions(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/payment-transactions/history',
      method: 'GET',
      params: actions.data,
    });
    delete response.server;
    yield put({
      type: paymentActions.GET_MY_TRANSACTIONS_SUCCESS,
      data: response,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
  } catch (error) {
    yield put({
      type: paymentActions.GET_MY_TRANSACTIONS_ERROR,
      error: error.data,
    });
  }
}

function* searchPayment(actions) {
  try {
    const response = yield axios({
      url: `/student-portal/payment-references/search-prn/${actions.prn}`,
      method: 'GET',
    });
    yield put({
      type: paymentActions.SEARCH_PAYMENT_SUCCESS,
      data: response.data,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
    yield put({
      type: paymentReferenceActions.GETTING_PAYMENT_REFERENCES_REQUEST,
    });
  } catch (error) {
    yield put({
      type: paymentActions.SEARCH_PAYMENT_ERROR,
      error: error.data,
    });
  }
}

function* watchGetMyInvoices() {
  yield takeLatest(paymentActions.GET_MY_INVOICES_REQUEST, getMyInvoices);
}

function* watchGetMyTransactions() {
  yield takeLatest(
    paymentActions.GET_MY_TRANSACTIONS_REQUEST,
    getMyTransactions
  );
}

function* watchGetSearchReference() {
  yield takeLatest(paymentActions.SEARCH_PAYMENT_REQUEST, searchPayment);
}

const forkFunctions = [
  fork(watchGetMyInvoices),
  fork(watchGetMyTransactions),
  fork(watchGetSearchReference),
];

export default forkFunctions;
