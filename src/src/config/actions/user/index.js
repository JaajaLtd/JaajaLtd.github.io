const user = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_ERROR: 'GET_USERS_ERROR',

  SEARCH_USER_REQUEST: 'SEARCH_USER_REQUEST',
  SEARCH_USER_SUCCESS: 'SEARCH_USER_SUCCESS',
  SEARCH_USER_ERROR: 'SEARCH_USER_ERROR',

  getUsers: (data) => ({
    type: user.GET_USERS_REQUEST,
    data,
  }),

  searchScholarship: (searchText) => ({
    type: user.SEARCH_USER_REQUEST,
    searchText,
  }),
};

export default user;
