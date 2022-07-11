import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage } from '../../components/common';
import { authActions } from '../../config/actions';
import RoutePaths from '../../config/routes/RoutePaths';
import { removeEmptyOrNullObject } from '../../helpers/dataFormatter';
import usePrevious from '../Hooks/usePrevious';
import LoginForm from './LoginForm';

const Login = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies();
  const { loginError, loginData, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const previousState = usePrevious({ loginError, loginData });
  const accessToken = cookies.auth_access;

  useEffect(() => {
    if (!isEmpty(accessToken?.token) && isAuthenticated === true) {
      dispatch(authActions.setIsAuthenticated(true));
    }
  }, []);

  useEffect(() => {
    if (
      !isEmpty(previousState) &&
      !isEmpty(loginData) &&
      previousState.loginData !== loginData
    ) {
      if (loginData.server?.status === true) {
        setCookie('auth_access', loginData.access_token, {
          path: '/',
          sameSite: true,
        });
        dispatch(authActions.setIsAuthenticated(true));
      }
    }
  }, [loginData]);

  useEffect(() => {
    if (
      !isEmpty(previousState) &&
      !isEmpty(loginError) &&
      previousState.loginError !== loginError
    ) {
      const message =
        loginError.error?.message ||
        loginError.error ||
        loginError.server.message;
      setError(message);

      if (message === 'Please change your default password before login in.') {
        setTimeout(() => {
          setCurrentPage(RoutePaths.resetPassword.path);
        }, 2000);
      }
    }
  }, [loginError]);

  const onSubmit = (data) => {
    setError(null);
    if (!isEmpty(data)) {
      dispatch(authActions.loginUser(removeEmptyOrNullObject(data)));
    }
  };

  return (
    <>
      {!isEmpty(error) && (
        <AlertMessage message={error} className="p-1 px-3 text-sm rounded-sm" />
      )}
      <LoginForm onSubmit={onSubmit} />
      <div className="mt-3 mb-2 text-center text-sm font600">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setCurrentPage(RoutePaths.resetPassword.path)}
        >
          Reset My Password
        </Button>
      </div>
    </>
  );
};

Login.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Login;
