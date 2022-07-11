import app from './app';
import auth from './auth';
import setting from './setting';
import server from './app/server'
import scholarship from './scholarship';
import user from './user';
/*import result from './result'
import payment from './payment'
import registration from './registration'
import enrollment from './enrollment'
import paymentReference from './payment/paymentReference'
*/
const authActions = {
  ...auth
}
const settingActions = {
  ...setting
}
const appActions = {
  ...app
};
const serverActions = {
  ...server
}
//Scholarship stuff
const scholarshipActions = {
  ...scholarship
}
const userActions = {
  ...user
}
/*const resultActions = {
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
const paymentReferenceActions = {
  ...paymentReference
}
*/

//export { appActions, paymentActions, resultActions, settingActions, serverActions, paymentReferenceActions,  registrationActions, enrollmentActions, authActions, scholarshipActions };
export { appActions, settingActions, serverActions, authActions,scholarshipActions,userActions};

export default appActions;