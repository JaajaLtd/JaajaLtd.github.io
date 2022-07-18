import { isEmpty, sumBy } from 'lodash';
import PropTypes, { any } from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import darkHeader from '../../helpers/dataTableCustomStyle';

const Invoice = ({ data }) => {
  const [affectedInvoices, setAffectedInvoices] = useState(0);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let average = 0;
    if (!isEmpty(data.tuition_invoices)) average += 1;
    if (!isEmpty(data.functional_fees_invoices)) average += 1;
    if (!isEmpty(data.manual_invoices)) average += 1;
    if (!isEmpty(data.other_fees_invoices)) average += 1;
    setAffectedInvoices(average);

    if (!isEmpty(data)) {
      const invoiceData = [
        ...data.tuition_invoices?.map((invoice) => ({
          ...invoice,
          invoice_group: 'Tuition Invoice',
        })),
        ...data.functional_fees_invoices?.map((invoice) => ({
          ...invoice,
          invoice_group: 'Functional Fees Invoice',
        })),
        ...data.manual_invoices?.map((invoice) => ({
          ...invoice,
          invoice_group: 'Manual Invoice',
        })),
        ...data.other_fees_invoices?.map((invoice) => ({
          ...invoice,
          invoice_group: 'Other Fees Invoice',
        })),
      ];
      setInvoices(invoiceData);
    }
  }, [data]);

  const invoiceGrandTotalAmount =
    sumBy(data.tuition_invoices, 'invoice_amount') +
    sumBy(data.functional_fees_invoices, 'invoice_amount') +
    sumBy(data.manual_invoices, 'invoice_amount') +
    sumBy(data.other_fees_invoices, 'invoice_amount');

  const invoiceGrandAmountDue =
    sumBy(data.tuition_invoices, 'amount_due') +
    sumBy(data.functional_fees_invoices, 'amount_due') +
    sumBy(data.manual_invoices, 'amount_due') +
    sumBy(data.other_fees_invoices, 'amount_due');

  const invoiceGrandAmountPaid =
    sumBy(data.tuition_invoices, 'amount_paid') +
    sumBy(data.functional_fees_invoices, 'amount_paid') +
    sumBy(data.manual_invoices, 'amount_paid') +
    sumBy(data.other_fees_invoices, 'amount_paid');

  const invoiceGrandPercentage =
    sumBy(data.tuition_invoices, 'percentage_completion') +
    sumBy(data.functional_fees_invoices, 'percentage_completion') +
    sumBy(data.manual_invoices, 'percentage_completion') +
    sumBy(data.other_fees_invoices, 'percentage_completion');

  const columns = useMemo(
    () => [
      {
        name: '#',
        width: '50px',
        cell(row, index) {
          return <>{index + 1}</>;
        },
      },
      {
        name: 'Invoice No.',
        selector: 'invoice_number',
      },
      {
        name: 'Category',
        selector: 'invoice_group',
      },
      {
        name: 'Inv. Amount',
        width: '100px',
        wrap: true,
        cell(row) {
          const { invoice_amount: invoiceAmount } = row;
          return <>{parseInt(invoiceAmount, 10).toLocaleString()}</>;
        },
      },
      {
        name: 'Paid',
        width: '120px',
        wrap: true,
        cell(row) {
          const { amount_paid: amountPaid } = row;
          return <>{parseInt(amountPaid, 10).toLocaleString()}</>;
        },
      },
      {
        name: 'Due',
        width: '120px',
        wrap: true,
        cell(row) {
          const { amount_due: amountDue } = row;
          return <>{parseInt(amountDue, 10).toLocaleString()}</>;
        },
      },
      {
        name: 'CURR',
        selector: 'currency',
      },
      {
        name: 'Narration',
        selector: 'description',
      },
      {
        name: 'Type',
        selector: 'invoice_type',
      },
      {
        name: 'Status',
        selector: 'invoice_status',
      },
      {
        name: 'Completion',
        selector: 'percentage_completion',
      },
    ],
    []
  );

  return (
    <div className="border-bottom">
      <DataTable
        data={invoices}
        columns={columns}
        dense
        customStyles={darkHeader}
        keyField="invoice_number"
        noHeader
        striped
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />

      <div className="px-4 py-2">
        <Row>
          <Col md={3} className="my-1">
            <Card.Header className="border bg-light rounded p-2">
              <Card.Text className="text-xs font600">
                TOTAL AMOUNT:
                <span className="text-info mx-1">
                  {invoiceGrandTotalAmount.toLocaleString()}
                </span>
              </Card.Text>
            </Card.Header>
          </Col>
          <Col md={3} className="my-1">
            <Card.Header className="border bg-light rounded p-2">
              <Card.Text className="text-xs font600">
                TOTAL AMOUNT PAID:
                <span className="text-success mx-1">
                  {invoiceGrandAmountPaid.toLocaleString()}
                </span>
              </Card.Text>
            </Card.Header>
          </Col>
          <Col md={3} className="my-1">
            <Card.Header className="border bg-light rounded p-2">
              <Card.Text className="text-xs font600">
                TOTAL AMOUNT DUE:
                <span className="text-danger mx-1">
                  {invoiceGrandAmountDue.toLocaleString()}
                </span>
              </Card.Text>
            </Card.Header>
          </Col>
          <Col md={3} className="my-1">
            <Card.Header className="border bg-light rounded p-2">
              <Card.Text className="text-xs font600">
                COMPLETION:
                <span
                  className={
                    invoiceGrandPercentage > 70
                      ? 'mx-1 text-success'
                      : 'mx-1 text-danger'
                  }
                >
                  {`${
                    parseInt(invoiceGrandPercentage, 10) / affectedInvoices
                  } %`}
                </span>
              </Card.Text>
            </Card.Header>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Invoice.defaultProps = {
  data: {},
};

Invoice.propTypes = {
  data: PropTypes.oneOfType([any]),
};

export default Invoice;
