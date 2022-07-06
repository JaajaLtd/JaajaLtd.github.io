import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import  AlertMessage from '../../components/common/AlertMessage';
import ReloadButton  from '../../components/common/ReloadButton';
import { appActions, authActions } from '../../config/actions';
import {
  clearToken,
  getAccessToken,
} from '../../config/services/storageService';
import usePrevious from '../Hooks/usePrevious';

const AuthUserLoader = () => {
  const dispatch = useDispatch();
  const { authUser, authUserError, isAuthenticated, gettingAuthUser } =
    useSelector((state) => state.auth);
  const { institutionStructure, gettingInstitutionStructure } = useSelector(
    (state) => state.app
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ authUserError });
  const accessToken = getAccessToken();

  useEffect(() => {
    if (isEmpty(institutionStructure)) {
      dispatch(appActions.getInstitutionStructure());
    }
    if (
      isEmpty(authUser) &&
      !isEmpty(accessToken) &&
      isAuthenticated === true
    ) {
      dispatch(authActions.getAuthUser());
    }
  }, []);

  const logoutCurrentUser = () => {
    clearToken();
    dispatch(authActions.setIsAuthenticated(false));
  };

  useEffect(() => {
    setErrorMessage(null);
    if (isEmpty(accessToken)) {
      logoutCurrentUser();
    } else if (
      !isEmpty(prevState) &&
      !isEmpty(authUserError) &&
      prevState.authUserError !== authUserError
    ) {
      setErrorMessage(
        authUserError?.error?.message || authUserError?.server?.message
      );
    }
  }, [authUserError, accessToken]);

  return (
    <div className="vh-100 text-center bg-light d-flex m-0 p-4">
      <Container className="align-middle my-auto mx-auto">
        <UserOutlined className="display-2 text-primary" />

        {(gettingAuthUser || gettingInstitutionStructure) && (
          <div className="text-center text-sm my-1 text-uppercase text-primary font500">
            <LoadingOutlined />
            <div className="font600 d-inline ms-2">Loading Your Profile...</div>
          </div>
        )}

        {errorMessage && (
          <div className="text-center">
            <div className="font600 text-uppercase text-sm text-info my-3">
              Oops... We are Unable to Load your Profile
            </div>
            <AlertMessage
              message={errorMessage}
              className="text-sm font500 py-1"
            />

            <ReloadButton
              loading={gettingAuthUser}
              text="Reload Profile"
              size="sm"
              className="d-inline me-2 py-1 text-sm font600 text-capitalize"
              onClick={() => dispatch(authActions.getAuthUser())}
            />

            <Button
              className="d-inline py-1 text-sm font600 text-capitalize"
              variant="danger"
              size="sm"
              onClick={logoutCurrentUser}
            >
              <FaSignInAlt className="me-1" />
              Log Out
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AuthUserLoader;
