import { all } from 'redux-saga/effects';
import app from './app';
import scholarship from './scholarship';
import auth from './auth';
import user from './user';
/*
import registration from './registration';
import payment from './payment';
import enrollment from './enrollment';
import paymentReference from './payment/paymentReference';
import result from './result';
*/
const rootSaga = function* root() {
  yield all([
    ...auth,
    ...app,
    ...scholarship,
    ...user,
    //...enrollment,
    //...registration,
   // ...paymentReference,
   // ...payment,
    //...result,   
  ]);
};

export default rootSaga;
