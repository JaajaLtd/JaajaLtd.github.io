import { serverActions } from '../../actions';
import initialState from '../../initialState';

const server = (state = initialState.server, actions) => {
  switch (actions.type) {
    case serverActions.SERVER_REQUEST:
      return {
        successMessage: {},
        errorMessage: {},
      };

    case serverActions.SERVER_ERROR:
      return {
        successMessage: {},
        errorMessage: actions.error.data,
      };

    case serverActions.SERVER_SUCCESS:
      return {
        successMessage: actions.data,
        errorMessage: {},
      };

    default:
      return state;
  }
};

export default server;
