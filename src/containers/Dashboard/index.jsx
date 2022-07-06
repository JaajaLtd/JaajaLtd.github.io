import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../../components/shared';
import MainLayout from '../../components/shared/MainLayout';
import { authActions } from '../../config/actions';
import { getAccessToken } from '../../config/services/storageService';
import ErrorBoundary from '../Errors/ErrorBoundary';
import AuthUserLoader from './AuthUserLoader';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { authUser, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedMenu } = useSelector((state) => state.setting);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isEmpty(accessToken)) dispatch(authActions.setIsAuthenticated(true));
  }, [accessToken, selectedMenu]);

  return (
    <ErrorBoundary>
      {isAuthenticated === true ? (
        <>{isEmpty(authUser) ? <AuthUserLoader /> : <MainLayout />}</>
      ) : (
        <AuthLayout />
      )}
    </ErrorBoundary>
  );
};

export default Dashboard;
