import { isEmpty } from 'lodash';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { PageLoader } from './components/common';
import { appActions } from './config/actions';
import RoutePaths from './config/routes/RoutePaths';
import Dashboard from './containers/Dashboard';
import PageNotFound from './containers/Errors/PageNotFound';
import usePrevious from './containers/Hooks/usePrevious';
import './custom.scss';

function App() {
  const dispatch = useDispatch();
  const { addToast, removeAllToasts } = useToasts();
  const { serverSuccess, serverError } = useSelector((state) => state.server);
  const { metadata, institutionStructure } = useSelector((state) => state.app);
  const prevState = usePrevious({ serverSuccess, serverError });

  useEffect(() => {
    if (isEmpty(institutionStructure)) {
      dispatch(appActions.getInstitutionStructure());
    }
    if (isEmpty(metadata)) {
      dispatch(appActions.getMetadata());
    }
  }, []); 

  useEffect(() => {
    if (!isEmpty(prevState)) {
      if (!isEmpty(serverError) && serverError !== prevState.serverError) {
        removeAllToasts();
        addToast(serverError?.server?.message, {
          autoDismiss: true,
          appearance: 'error',
          autoDismissTimeout: 6000,
        });
      }
      if (
        !isEmpty(serverSuccess) &&
        serverSuccess !== prevState.serverSuccess
      ) {
        addToast(serverSuccess?.server?.message, {
          autoDismiss: true,
          appearance: 'success',
        });
      }
    }
  }, [serverError, serverSuccess]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Router>
        <Switch>
          <Route exact path={RoutePaths.dashboard.path} component={Dashboard} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;