/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { authActions } from '../actions';
import app from './app';
import server from './app/server';
import auth from './auth';
import setting from './setting';
import scholarship from './scholarship';
import user from './user';
/*
import registration from './registration';
import enrollment from './enrollment';
import result from './result';
import paymentReference from './payment/paymentReference';
import myTransaction from './payment/myTransaction';
import myInvoice from './payment/myInvoice';*/

const appReducer = combineReducers({
  setting,
  auth,
  app,
  server,
  scholarship,
  user,
 // enrollment,
 // paymentReference,
 // myTransaction,
  //myInvoice,
  //result,
});

const rootReducer = (state, actions) => {
  if (actions.type === authActions.LOGOUT_SUCCESS) {
    state = {};
  }
  return appReducer(state, actions);
};

export default rootReducer;
