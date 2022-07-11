const authInitialState = {
  auth: {
    isAuthenticated: false,

    loading: false,
    loginData: {},
    loginError: {},
    loggingOut: false,
    changingPassword: false,
    changePasswordSuccess: {},
    changePasswordError: {},
    requestingToken: false,
    requestTokenSuccess: {},
    requestTokenError: {},
    resettingPassword: false,
    resetPasswordSuccess: {},
    resetPasswordError: {},
    logoutData: {},
    logoutError: {},
    authUser: {},
    authUserError: {},
    gettingAuthUser: false,
    fetchUserError: {},
    requesting: false,

    /*currentStudentProgramme: {},
    studentProgrammes: [],
    gettingStudentProgrammes: false,
    studentProgrammeError: {},

    gettingAccountBalance: false,
    accountBalance: 0,
    accountBalanceError: {},*/
  },
};

export default authInitialState;
