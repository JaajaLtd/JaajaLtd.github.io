import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Table } from 'react-bootstrap';
import { isEmpty, merge, sumBy } from 'lodash';

const SinglePaymentReference = ({ paymentReference }) => {
  const allInvoices = merge(
    paymentReference.functionalFeesInvoice,
    paymentReference.tuitionInvoice,
    paymentReference.otherFeesInvoices
  );
  return (
    <div>
      <Table
        size="sm"
        striped
        bordered
        responsive
        className="mb-0 text-uppercase text-xs"
      >
        {!isEmpty(allInvoices) && (
          <thead className="bg-light text-white">
            <tr>
              <th>INVOICE CATEGORY</th>
              <th>Amount TO PAY</th>
            </tr>
          </thead>
        )}
        <tbody className="text-muted">
          {!isEmpty(paymentReference.functionalFeesInvoice) && (
            <tr key={`functionalFeesInvoice-${paymentReference?.ura_prn}`}>
              <td>Functional Fees</td>
              <td>
                {`${sumBy(
                  paymentReference.functionalFeesInvoice,
                  'amount'
                ).toLocaleString()} UGX`}
              </td>
            </tr>
          )}
          {!isEmpty(paymentReference.tuitionInvoice) && (
            <tr key={`tuitionInvoice-${paymentReference?.ura_prn}`}>
              <td>Tuition Fees</td>
              <td>
                {`${sumBy(
                  paymentReference.tuitionInvoice,
                  'amount'
                ).toLocaleString()} UGX`}
              </td>
            </tr>
          )}
          {!isEmpty(paymentReference.otherFeesInvoices) && (
            <tr key={`otherFeesInvoices-${paymentReference?.ura_prn}`}>
              <td>Other Fees</td>
              <td>
                {`${sumBy(
                  paymentReference.otherFeesInvoices,
                  'amount'
                ).toLocaleString()} UGX`}
              </td>
            </tr>
          )}
          <tr className="text-success font600">
            <td className="">Total Amount to Pay</td>
            <td>{`${paymentReference?.amount?.toLocaleString()} UGX`}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

SinglePaymentReference.defaultProps = {
  paymentReference: {},
};

SinglePaymentReference.propTypes = {
  paymentReference: PropTypes.oneOfType([object]),
};

export default SinglePaymentReference;
