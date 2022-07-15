import { isEmpty } from 'lodash';
import { authActions } from '../../actions';
import initialState from '../../initialState';

function auth(state = initialState.auth, actions) {
  switch (actions.type) {
    case authActions.LOGIN_USER_REQUEST:
      return {
        ...state,
        loginError: {},
        loginIn: true,
        authUserError: {},
      };
    case authActions.LOGIN_USER_SUCCESS:{
      return {
        ...state,
        loginData: actions.data,
        loginError: {},
        loginIn: false,
      };
    }
    case authActions.LOGIN_USER_ERROR:
      return {
        ...state,
        loginError: actions.error,
        loginIn: false,
      };
    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        loggingOut: true,
        logoutData: {},
        logoutError: {},
      };
    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        false: true,
        logoutData: actions.data,
      };
    case authActions.LOGOUT_ERROR:
      return {
        ...state,
        loggingOut: false,
        false: true,
        logoutError: actions.error,
      };

    case authActions.GET_AUTH_USER_REQUEST:
      return {
        ...state,
        gettingAuthUser: true,
        authUserError: {},
      };
    case authActions.GET_AUTH_USER_SUCCESS: {
      const authUser = actions.data;
      console.log(actions.data);
      let currentStudentProgramme = {};
      if (!isEmpty(authUser.academic_records)) {
        const findCurrentProgramme = authUser.academic_records.find(
          (programme) => programme.is_current_programme === true
        );
        const programme = findCurrentProgramme || authUser.academic_records[0];
        currentStudentProgramme = programme;
      }

      return {
        ...state,
        gettingAuthUser: false,
        authUser,
        currentStudentProgramme,
      };
    }
    case authActions.GET_AUTH_USER_ERROR:
      return {
        ...state,
        gettingAuthUser: false,
        authUserError: actions.error,
      };

    case authActions.GET_STUDENT_PROGRAMMES_REQUEST:
      return {
        ...state,
        gettingStudentProgrammes: true,
        studentProgrammeError: {},
      };
    case authActions.GET_STUDENT_PROGRAMMES_SUCCESS:
      return {
        ...state,
        gettingStudentProgrammes: false,
        studentProgrammes: actions.data,
      };
    case authActions.GET_STUDENT_PROGRAMMES_ERROR:
      return {
        ...state,
        gettingStudentProgrammes: false,
        studentProgrammeError: actions.error,
      };

    case authActions.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changingPassword: true,
        changePasswordError: {},
      };

    case authActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        changePasswordSuccess: actions.data,
      };

    case authActions.CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changingPassword: false,
        changePasswordError: actions.error,
      };

    case authActions.REQUEST_TOKEN_REQUEST:
      return {
        ...state,
        requestingToken: true,
        requestTokenError: {},
        requestTokenSuccess: {},
      };

    case authActions.REQUEST_TOKEN_SUCCESS:
      return {
        ...state,
        requestingToken: false,
        requestTokenSuccess: actions.data,
      };

    case authActions.REQUEST_TOKEN_ERROR:
      return {
        ...state,
        requestingToken: false,
        requestTokenError: actions.error,
      };

    case authActions.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resettingPassword: true,
        resetPasswordError: {},
        resetPasswordSuccess: {},
      };

    case authActions.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resettingPassword: false,
        resetPasswordSuccess: actions.data,
      };

    case authActions.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resettingPassword: false,
        resetPasswordError: actions.error,
      };

    case authActions.GET_AUTH_USER_ACCOUNT_BALANCE_REQUEST:
      return {
        ...state,
        gettingAccountBalance: true,
        accountBalanceError: {},
      };

    case authActions.GET_AUTH_USER_ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        gettingAccountBalance: false,
        accountBalance: actions.data,
      };
    case authActions.SET_AUTH_USER:
      return {
        ...state,
        authUser: actions.user,
      };

    case authActions.SET_CURRENT_STUDENT_PROGRAMME:
      return {
        ...state,
        currentStudentProgramme: actions.currentStudentProgramme,
      };

    case authActions.REMOVE_AUTH_USER:
      return {
        ...state,
        authUser: {},
      };

    case authActions.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: actions.payload,
      };

    default:
      return state;
  }
}

export default auth;
