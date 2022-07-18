import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from "./serviceWorker";
import { ToastProvider } from "react-toast-notifications";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";


import configureStore from './src/config/store';
import rootSaga from './src/config/saga';
import httpService from './src/config/services/httpService';
import history from './src/config/services/historyService';
import { SnackBar } from './src/components/shared';
//ReactDOM.render(<App />, document.getElementById("root"));


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
    <CookiesProvider >
      <BrowserRouter >
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </ToastProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();