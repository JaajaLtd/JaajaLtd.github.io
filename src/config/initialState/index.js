import app from './app';
import setting from './setting';
import enrollment from './enrollment';
import auth from './auth';
import paymentReference from './paymentReference';
import registration from './registration';
import payment from './payment';
import result from './result';
import scholarship from './scholarship';

const initialStates = {
  ...app,
  ...setting,
  ...enrollment,
  ...auth,
  ...paymentReference,
  ...registration,
  ...payment,
  ...result,
  ...scholarship
};

export default initialStates;
