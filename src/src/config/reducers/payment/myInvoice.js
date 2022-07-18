import { paymentActions } from '../../actions';
import initialState from '../../initialState';

function myInvoice(state = initialState.myInvoice, actions) {
  switch (actions.type) {
    case paymentActions.GET_MY_INVOICES_REQUEST:
      return {
        ...state.myInvoice,
        loadError: {},
        loading: true,
      };
    case paymentActions.GET_MY_INVOICES_SUCCESS:
      return {
        ...state.myInvoice,
        invoices: actions.data,
        loading: false,
      };
    case paymentActions.GET_MY_INVOICES_ERROR:
      return {
        ...state.myInvoice,
        loadError: actions.error,
        loading: false,
      };

    default:
      return state;
  }
}

export default myInvoice;
