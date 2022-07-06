import moment from 'moment';
import PropTypes, { object } from 'prop-types';
import React from 'react';
import DataTable from 'react-data-table-component';
import darkHeader from '../../helpers/dataTableCustomStyle';

const TransactionTables = ({ data }) => {
  const columns = [
    {
      name: 'REF NO.',
      wrap: true,
      width: '150px',
      selector: 'reference_number',
    },
    {
      name: 'Mode Reference',
      wrap: true,
      width: '150px',
      selector: 'mode_reference',
    },
    {
      name: 'Origin',
      wrap: true,
      selector: 'transaction_origin',
    },
    {
      name: 'Amount',
      wrap: true,
      width: '100px',
      selector: 'amount_paid',
    },
    {
      name: 'ALLOCATED',
      wrap: true,
      width: '100px',
      selector: 'allocated_amount',
    },
    {
      name: 'BALANCE',
      wrap: true,
      width: '100px',
      selector: 'unallocated_amount',
    },
    {
      name: 'CURR',
      width: '50px',
      selector: 'currency',
    },
    {
      name: 'BANK',
      selector: 'bank_name',
    },
    {
      name: 'BANK BR.',
      selector: 'bank_branch',
    },
    {
      name: 'PAYMENT DATE',
      cell(row) {
        const { payment_date: paymentDate } = row;
        return <>{moment(paymentDate).format('MM-DD-YYYY')}</>;
      },
    },
  ];
  return (
    <>
      <DataTable
        data={data.payment_transactions}
        columns={columns}
        noHeader
        dense
        striped
        customStyles={darkHeader}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
      />
    </>
  );
};

TransactionTables.defaultProps = {
  data: {},
};

TransactionTables.propTypes = {
  data: PropTypes.oneOfType([object]),
};

export default TransactionTables;
