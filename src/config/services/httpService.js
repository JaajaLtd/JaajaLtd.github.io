import axios from 'axios';
import { isEmpty } from 'lodash';
import { get } from 'react-hook-form';
import { authActions, serverActions } from '../actions';
import { getAccessToken, clearToken } from './storageService';

const path = new RegExp(`/login$`);

const httpService = {
  setupInterceptors: (store) => {
    const { dispatch } = store;

    axios.interceptors.request.use(
      async (config) => {
        const token = await getAccessToken();
        const localConfig = config;
        if (!localConfig.thirdParty) {
          if (token) {
            if (!localConfig.headers) {
              localConfig.headers = {};
            }
            if (token && !path.test(config.url)) {
              localConfig.headers.Authorization = `Bearer ${token}`;
            }
          }
          if (!localConfig.headers['Content-type']) {
            localConfig.headers['Content-type'] = 'application/json';
          }
          localConfig.headers.Accept = 'application/json';
          localConfig.timeout = 60000;
          localConfig.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3123';
        }
        dispatch(serverActions.serverRequest());
        return localConfig;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => {
        const data = get(response, 'data', {});
        const config = get(response, 'config', {});
        if (config && config.method !== 'get' && !config.hideMessage) {
          if (data) {
            dispatch(serverActions.serverSuccess(data));
          }
        }
        // Return entire response if response type blob
        if (config && config.responseType === 'blob') return response;
        return data;
      },
      (error) => {
        const codeError = get(error, 'code', '');
        let errorResponse = get(error, 'response', {});

        if (!isEmpty(errorResponse)) {
          if (errorResponse.status === 401) {
            clearToken();
            dispatch(authActions.setIsAuthenticated(false));
            dispatch(authActions.setAuthUser(null));
            errorResponse = {
              data: { server: { message: 'Session Expired!' } },
            };
          } else if (errorResponse.status === 404) {
            errorResponse = {
              data: {
                server: {
                  message:
                    errorResponse.data?.message || errorResponse.statusText,
                },
              },
            };
          }
        } else if (codeError === 'ECONNABORTED') {
          errorResponse = {
            data: {
              server: {
                message: 'Sorry... Connection time out, Please try again!',
              },
            },
          };
        } else {
          errorResponse = {
            data: {
              server: {
                message:
                  'Connection Failed, Please check your Internet connection and try again.',
              },
            },
          };
        }
        dispatch(serverActions.serverError(errorResponse));
        return Promise.reject(errorResponse);
      }
    );
  },
};

export default httpService;
