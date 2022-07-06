const server = {
  SERVER_REQUEST: 'SERVER_REQUEST',
  SERVER_SUCCESS: 'SERVER_SUCCESS',
  SERVER_ERROR: 'SERVER_ERROR',

  serverRequest: () => ({
    type: server.SERVER_REQUEST,
  }),

  serverError: (error) => ({
    type: server.SERVER_ERROR,
    error,
  }),

  serverSuccess: (data) => ({
    type: server.SERVER_SUCCESS,
    data,
  }),
};

export default server;
