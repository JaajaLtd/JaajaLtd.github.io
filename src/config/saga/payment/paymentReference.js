import { takeLatest, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  authActions,
  paymentActions,
  paymentReferenceActions,
} from '../../actions';

function* getPaymentReferences(actions) {
  try {
    const response = yield axios({
      url: '/student-portal/payment-references/history',
      method: 'GET',
      params: actions.data,
    });
    yield put({
      type: paymentReferenceActions.GETTING_PAYMENT_REFERENCES_SUCCESS,
      data: response.paymentReferences,
    });
    yield put({
      type: authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST,
    });
    yield put({
      type: paymentActions.GET_MY_TRANSACTIONS_REQUEST,
    });
  } catch (error) {
    yield put({
      type: paymentReferenceActions.GETTING_PAYMENT_REFERENCES_ERROR,
      error: error.data,
    });
  }
}

function* generatePaymentReference(actions) {
  let url = '/student-portal/payment-references';
  if (actions.referenceType === 'bulk')
    url = '/student-portal/payment-references/select-unpaid-invoices';
  else if (actions.referenceType === 'future')
    url = '/student-portal/payment-references/future-payments';
  else if (actions.referenceType === 'all')
    url = '/student-portal/payment-references/all-unpaid-invoices';

  try {
    const response = yield axios({
      url,
      method: 'POST',
      data: actions.data,
    });
    yield put({
      type: paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_SUCCESS,
      data: response.data,
    });
    yield put({
      type: paymentReferenceActions.GETTING_PAYMENT_REFERENCES_REQUEST,
    });
  } catch (error) {
    yield put({
      type: paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_ERROR,
      error: error.data,
    });
  }
}

function* watchGetPaymentReferences() {
  yield takeLatest(
    paymentReferenceActions.GETTING_PAYMENT_REFERENCES_REQUEST,
    getPaymentReferences
  );
}

function* watchGeneratePaymentReference() {
  yield takeLatest(
    paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_REQUEST,
    generatePaymentReference
  );
}

const forkFunctions = [
  fork(watchGetPaymentReferences),
  fork(watchGeneratePaymentReference),
];

export default forkFunctions;
