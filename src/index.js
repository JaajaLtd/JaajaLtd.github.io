import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './config/store';
import rootSaga from './config/saga';
import httpService from './config/services/httpService';
import history from './config/services/historyService';
import { SnackBar } from './components/shared';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
store.runSaga(rootSaga);
httpService.setupInterceptors(store, history);

ReactDOM.render(
  <ToastProvider
    autoDismiss
    autoDismissTimeout={6000}
    components={{ Toast: SnackBar }}
    placement="top-center"
  >
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </ToastProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();