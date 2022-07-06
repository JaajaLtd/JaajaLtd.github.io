import { paymentReferenceActions } from '../../actions';
import initialState from '../../initialState';

function paymentReference(state = initialState.paymentReference, actions) {
  switch (actions.type) {
    case paymentReferenceActions.GETTING_PAYMENT_REFERENCES_REQUEST:
      return {
        ...state,
        getError: {},
        gettingPaymentReferences: true,
      };
    case paymentReferenceActions.GETTING_PAYMENT_REFERENCES_SUCCESS:
      return {
        ...state,
        paymentReferences: actions.data,
        gettingPaymentReferences: false,
      };
    case paymentReferenceActions.GETTING_PAYMENT_REFERENCES_ERROR:
      return {
        ...state,
        getError: actions.error,
        gettingPaymentReferences: false,
      };

    case paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_REQUEST:
      return {
        ...state,
        generateError: {},
        generatingPaymentReference: true,
      };
    case paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_SUCCESS:
      return {
        ...state,
        generateSuccess: actions.data,
        generatingPaymentReference: false,
      };
    case paymentReferenceActions.GENERATE_PAYMENT_REFERENCE_ERROR:
      return {
        ...state,
        generateError: actions.error,
        generatingPaymentReference: false,
      };

    default:
      return state;
  }
}

export default paymentReference;
