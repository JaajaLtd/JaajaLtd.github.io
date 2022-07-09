/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { authActions } from '../actions';
import myTransaction from './payment/myTransaction';
import myInvoice from './payment/myInvoice';
import app from './app';
import server from './app/server';
import auth from './auth';
import setting from './setting';
import enrollment from './enrollment';
import registration from './registration';
import result from './result';
import paymentReference from './payment/paymentReference';
import scholarship from './scholarship';

const appReducer = combineReducers({
  setting,
  auth,
  app,
  server,
  enrollment,
  registration,
  paymentReference,
  myTransaction,
  myInvoice,
  result,
  scholarship,
});

const rootReducer = (state, actions) => {
  if (actions.type === authActions.LOGOUT_SUCCESS) {
    state = {};
  }
  return appReducer(state, actions);
};

export default rootReducer;
