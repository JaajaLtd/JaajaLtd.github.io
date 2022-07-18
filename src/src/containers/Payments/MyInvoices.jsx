import { isEmpty, sum, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaMinus, FaPaperclip, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import { paymentActions } from '../../config/actions';
import Invoice from './Invoice';

const MyInvoices = () => {
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.myInvoice);
  const [invoiceGrandTotalAmount, setInvoiceGrandTotalAmount] = useState(0);
  const [invoiceGrandAmountPaid, seInvoiceGrandAmountPaid] = useState(0);
  const [invoiceGrandAmountDue, seInvoiceGrandAmountDue] = useState(0);

  const getInvoices = () => {
    dispatch(paymentActions.getMyInvoices());
  };

  useEffect(() => {
    if (isEmpty(invoices)) getInvoices();
  }, []);

  useEffect(() => {
    if (!isEmpty(invoices)) {
      let invoiceAmounts = 0;
      let invoiceAmountsDue = 0;
      let invoiceAmountsPaid = 0;

      invoices.forEach((invoice) => {
        const tuitionAmounts = sumBy(
          invoice.tuition_invoices,
          'invoice_amount'
        );
        const tuitionDue = sumBy(invoice.tuition_invoices, 'amount_due');
        const tuitionPaid = sumBy(invoice.tuition_invoices, 'amount_paid');
        const functionalAmounts = sumBy(
          invoice.functional_fees_invoices,
          'invoice_amount'
        );
        const functionalDue = sumBy(
          invoice.functional_fees_invoices,
          'amount_due'
        );
        const functionalPaid = sumBy(
          invoice.functional_fees_invoices,
          'amount_paid'
        );
        const otherAmounts = sumBy(
          invoice.other_fees_invoices,
          'invoice_amount'
        );
        const otherFeesDue = sumBy(invoice.other_fees_invoices, 'amount_due');
        const otherFeesPaid = sumBy(invoice.other_fees_invoices, 'amount_paid');
        const manualAmounts = sumBy(invoice.manual_invoices, 'invoice_amount');
        const manualsDue = sumBy(invoice.manual_invoices, 'amount_due');
        const manualsPaid = sumBy(invoice.manual_invoices, 'amount_paid');

        invoiceAmounts += sum([
          tuitionAmounts,
          functionalAmounts,
          otherAmounts,
          manualAmounts,
        ]);
        invoiceAmountsDue += sum([
          tuitionDue,
          functionalDue,
          otherFeesDue,
          manualsDue,
        ]);
        invoiceAmountsPaid += sum([
          tuitionPaid,
          functionalPaid,
          otherFeesPaid,
          manualsPaid,
        ]);
      });
      setInvoiceGrandTotalAmount(invoiceAmounts);
      seInvoiceGrandAmountDue(invoiceAmountsDue);
      seInvoiceGrandAmountPaid(invoiceAmountsPaid);
    }
  }, [invoices]);

  return (
    <>
      <Row className="text-center text-muted">
        <Col md={3} className="mb-2">
          <Card>
            <Card.Body>
              <Card.Text className="text-xs font600 mb-2">
                TOTAL INVOICE AMOUNT
              </Card.Text>
              <span className="text-info font600 mx-1">
                {`${invoiceGrandTotalAmount.toLocaleString()} UGX`}
              </span>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-2">
          <Card>
            <Card.Body>
              <Card.Text className="text-xs font600 mb-2">
                TOTAL INVOICE AMOUNT PAID
              </Card.Text>
              <span className="text-success font600 mx-1">
                {`${invoiceGrandAmountPaid.toLocaleString()} UGX`}
              </span>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-2">
          <Card>
            <Card.Body>
              <Card.Text className="text-xs font600 mb-2">
                TOTAL INVOICE AMOUNT DUE
              </Card.Text>
              <span className="text-danger font600 mx-1">
                {`${invoiceGrandAmountDue.toLocaleString()} UGX`}
              </span>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-2">
          <Card>
            <Card.Body>
              <Card.Text className="text-xs font600 mb-2">
                PERCENTAGE COMPLETION
              </Card.Text>
              <span
                className={`mx-1 font600 ${
                  (invoiceGrandAmountPaid / invoiceGrandTotalAmount) * 100 > 70
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                {`${
                  invoiceGrandTotalAmount !== 0
                    ? parseInt(
                        invoiceGrandAmountPaid / invoiceGrandTotalAmount,
                        10
                      ) * 100
                    : 0
                } %`}
              </span>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="border mt-2">
        <Card.Header className="py-2  text-secondary text-sm font600">
          MY INVOICES/BILLS
          <div className="card-options">
            <ReloadButton loading={loading} onClick={() => getInvoices()} />
          </div>
        </Card.Header>
        <DataTable
          data={invoices}
          noHeader
          noTableHead
          progressPending={loading && isEmpty(invoices)}
          progressComponent={<DataSpinner />}
          expandableRows
          columns={[
            {
              name: 'ACADEMIC YEAR',
              wrap: true,
              cell(transaction) {
                const {
                  semester,
                  academic_year: academicYear,
                  programme_study_years: studyYear,
                } = transaction;
                return (
                  <>
                    <span className="font600 text-info">
                      <FaPaperclip className="me-1" />
                      {`${studyYear} - ${semester} - ${academicYear}`}
                    </span>
                  </>
                );
              },
            },
          ]}
          noDataComponent={
            <DataNotFound message="YOU HAVE NO INVOICE HISTORY" />
          }
          expandableRowsComponent={<Invoice />}
          expandableRowExpanded={(row, index) => index === 1}
          expandOnRowClicked
          striped
          expandableIcon={{
            expanded: <FaMinus className="text-info" />,
            collapsed: <FaPlus className="text-info" />,
          }}
        />
      </div>
    </>
  );
};

export default MyInvoices;
