import { all } from 'redux-saga/effects';
import app from './app';
import registration from './registration';
import payment from './payment';
import auth from './auth';
import enrollment from './enrollment';
import paymentReference from './payment/paymentReference';
import result from './result';
import scholarship from './scholarship';

const rootSaga = function* root() {
  yield all([
    ...auth,
    ...app,
    ...enrollment,
    ...registration,
    ...paymentReference,
    ...payment,
    ...result,
    ...scholarship    
  ]);
};

export default rootSaga;
