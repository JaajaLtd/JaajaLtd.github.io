import React from 'react';
import PropTypes, { array } from 'prop-types';
import { Table, InputNumber } from 'antd';
import { uniqBy } from 'lodash';

const UnPaidInvoices = ({
  invoices,
  setSelectedRows,
  selectedRows,
  editAmount,
}) => {
  const updateCellQuantity = (amount, row) => {
    setSelectedRows(
      uniqBy(
        [
          {
            id: row.id,
            invoice_number: row.invoice_number,
            amount: parseInt(amount, 10),
          },
          ...selectedRows,
        ],
        'invoice_number'
      )
    );
  };
  const columns = [
    {
      title: 'Code',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'invoice_number',
    },
    {
      title: 'Amount',
      dataIndex: 'invoice_amount',
      key: 'invoice_amount',
      ellipsis: true,
      render(text, row) {
        return <>{`${parseInt(text, 10).toLocaleString()} ${row.currency}`}</>;
      },
    },
    {
      title: 'Paid',
      dataIndex: 'amount_paid',
      key: 'amount_paid',
      render(text, row) {
        return <>{`${parseInt(text, 10).toLocaleString()} ${row.currency}`}</>;
      },
    },
    {
      title: 'Amount Due',
      dataIndex: 'amount_due',
      key: 'amount_due',
      width: '150px',
      render(text, row) {
        return <>{`${parseInt(text, 10).toLocaleString()} ${row.currency}`}</>;
      },
    },
  ];

  if (editAmount)
    columns.push({
      title: 'Amount To Pay',
      key: 'amount_due',
      editable: true,
      width: '150px',
      render(text, record) {
        return (
          <InputNumber
            min={1}
            max={record.amount_due}
            defaultValue={record.amount_due}
            onChange={(quantity) => updateCellQuantity(quantity, record)}
            key={selectedRows.find(
              (row) => row.invoice_number === record.invoice_number
            )}
          />
        );
      },
    });

  return (
    <div>
      <Table
        dataSource={invoices}
        columns={columns}
        size="small"
        pagination={false}
        bordered
        rowKey="invoice_number"
        tableLayout="auto"
        className="border-0 text-sm"
        scroll={{
          y: '65vh',
        }}
      />
    </div>
  );
};

UnPaidInvoices.defaultProps = {
  invoices: [],
  selectedRows: [],
  editAmount: false,
};

UnPaidInvoices.propTypes = {
  invoices: PropTypes.oneOfType([array]),
  selectedRows: PropTypes.oneOfType([array]),
  setSelectedRows: PropTypes.func.isRequired,
  editAmount: PropTypes.bool,
};

export default UnPaidInvoices;
