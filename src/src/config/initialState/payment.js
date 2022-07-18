const payment = {
  myInvoice: {
    loading: false,
    invoices: [],
    loadError: {},
  },
  myTransaction: {
    loading: false,
    transactions: [],
    loadError: {},

    searchingPayment: false,
    searchPaymentError: {},
    searchPayment: {},
  },
};

export default payment;
