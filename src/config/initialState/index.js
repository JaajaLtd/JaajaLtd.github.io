import app from './app';
import setting from './setting';
import scholarship from './scholarship';
import auth from './auth';
import user from './user';
/*
import enrollment from './enrollment';
import paymentReference from './paymentReference';
import payment from './payment';
import result from './result';*/

const initialStates = {
  ...app,
  ...setting,
  ...auth,
  ...scholarship,
  ...user,
  //...enrollment,
  //...paymentReference,
  //...payment,
  //...result,
};

export default initialStates;
