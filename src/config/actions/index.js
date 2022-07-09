import app from './app';
import auth from './auth';
import setting from './setting';
import result from './result'
import registration from './registration'
import payment from './payment'
import enrollment from './enrollment'
import paymentReference from './payment/paymentReference'
import server from './app/server'
import scholarship from './scholarship';

const authActions = {
  ...auth
}
const settingActions = {
  ...setting
}
const resultActions = {
  ...result
}
const registrationActions = {
  ...registration
}
const paymentActions = {
  ...payment
}
const enrollmentActions = {
  ...enrollment
}
const appActions = {
  ...app
};
const paymentReferenceActions = {
  ...paymentReference
}
const serverActions = {
  ...server
}

//Scholarship stuff
const scholarshipActions = {
  ...scholarship
}

export { appActions, paymentActions, resultActions, settingActions, serverActions, paymentReferenceActions,  registrationActions, enrollmentActions, authActions, scholarshipActions };

export default appActions;