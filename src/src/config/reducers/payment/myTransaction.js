import { paymentActions } from '../../actions';
import initialState from '../../initialState';

function myTransaction(state = initialState.myTransaction, actions) {
  switch (actions.type) {
    case paymentActions.GET_MY_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loadError: {},
        loading: true,
      };
    case paymentActions.GET_MY_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: actions.data || [],
        loading: false,
      };
    case paymentActions.GET_MY_TRANSACTIONS_ERROR:
      return {
        ...state,
        loadError: actions.error,
        loading: false,
      };

    case paymentActions.SEARCH_PAYMENT_REQUEST:
      return {
        ...state,
        searchPaymentError: {},
        searchingPayment: true,
      };
    case paymentActions.SEARCH_PAYMENT_SUCCESS:
      return {
        ...state,
        searchPayment: actions.data,
        searchingPayment: false,
      };
    case paymentActions.SEARCH_PAYMENT_ERROR:
      return {
        ...state,
        searchPaymentError: actions.error,
        searchingPayment: false,
      };

    default:
      return state;
  }
}

export default myTransaction;
