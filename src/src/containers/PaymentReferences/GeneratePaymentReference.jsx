import { get, isEmpty, sum, sumBy } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  InputText,
  ReloadButton,
  SubmitButton,
} from '../../components/common';
import { paymentActions, paymentReferenceActions } from '../../config/actions';
import { getInvoiceAmount } from './helper';
import UnPaidInvoices from './UnPaidInvoices';

const GeneratePaymentReference = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const [invoiceType, setInvoiceType] = useState('future-payments');
  const [totalInvoiceDue, setTotalInvoiceDue] = useState(0);
  const [allUnPaidInvoices, setAllUnPaidInvoices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { invoices, loading } = useSelector((state) => state.myInvoice);
  const { generatingPaymentReference } = useSelector(
    (state) => state.paymentReference
  );

  // const paymentMode = watch('payment_mode', null);

  const getInvoices = () => dispatch(paymentActions.getMyInvoices());

  useEffect(() => {
    if (isEmpty(invoices)) getInvoices();
  }, []);

  useEffect(() => {
    if (!isEmpty(invoices)) {
      let invoiceAmountsDue = 0;
      let unPaidInvoices = [];

      invoices.forEach((invoice) => {
        const tuitionDue = sumBy(invoice.tuition_invoices, 'amount_due');
        const functionalDue = sumBy(
          invoice.functional_fees_invoices,
          'amount_due'
        );
        const otherFeesDue = sumBy(invoice.other_fees_invoices, 'amount_due');
        const manualsDue = sumBy(invoice.manual_invoices, 'amount_due');
        invoiceAmountsDue += sum([
          tuitionDue,
          functionalDue,
          otherFeesDue,
          manualsDue,
        ]);

        const unPaidTuition = invoice?.tuition_invoices?.filter(
          (unpaidInvoice) => unpaidInvoice.amount_due > 0
        );
        const unPaidFunctional = invoice?.functional_fees_invoices?.filter(
          (unpaidInvoice) => unpaidInvoice.amount_due > 0
        );
        const unPaidManual = invoice?.manual_invoices?.filter(
          (unpaidInvoice) => unpaidInvoice.amount_due > 0
        );
        const unPaidOther = invoice?.other_fees_invoices?.filter(
          (unpaidInvoice) => unpaidInvoice.amount_due > 0
        );
        unPaidInvoices = [
          ...unPaidInvoices,
          ...unPaidTuition,
          ...unPaidFunctional,
          ...unPaidManual,
          ...unPaidOther,
        ];
      });
      setTotalInvoiceDue(invoiceAmountsDue);
      setAllUnPaidInvoices(unPaidInvoices);
      setSelectedRows(
        unPaidInvoices.map((unpaidInvoice) => {
          return {
            id: unpaidInvoice?.id,
            invoice_number: unpaidInvoice.invoice_number,
            amount: unpaidInvoice.amount_due,
          };
        })
      );
    }
  }, [invoices]);

  const handleFormSubmit = (data) => {
    if (!isEmpty(data)) {
      let payload = data;
      let url = 'future';
      if (invoiceType === 'all-unpaid-invoices') url = 'all';
      else if (invoiceType === 'select-unpaid-invoices') {
        url = 'bulk';
        payload = {
          ...payload,
          tuition_invoices: getInvoiceAmount(
            selectedRows,
            'T',
            'tuition_invoice_id'
          ),
          functional_fees_invoices: getInvoiceAmount(
            selectedRows,
            'F',
            'functional_fees_invoice_id'
          ),
          other_fees_invoices: getInvoiceAmount(
            selectedRows,
            'O',
            'functional_fees_invoice_id'
          ),
          manual_invoices: getInvoiceAmount(
            selectedRows,
            'M',
            'manual_invoice_id'
          ),
        };
      }
      dispatch(paymentReferenceActions.generatePaymentReference(payload, url));
    }
  };

  const invoiceTypes = [
    {
      title: '1. FOR FEES DEPOSIT TO MY ACCOUNT',
      url: 'future-payments',
      hidden: false,
    },
    {
      title: '2. FOR ALL PENDING INVOICES',
      url: 'all-unpaid-invoices',
      hidden: isEmpty(allUnPaidInvoices),
    },
    {
      title: '3. FOR SPECIFIC INVOICES',
      url: 'select-unpaid-invoices',
      hidden: isEmpty(allUnPaidInvoices),
    },
  ];

  return (
    <>
      {isEmpty(allUnPaidInvoices) && (
        <AlertMessage
          message="You Have No Unpaid Invoices"
          icon={<FaExclamationCircle className="me-1" />}
          className="font600 text-sm p-2"
          type="info"
          extras={
            <ReloadButton
              loading={loading}
              onClick={getInvoices}
              variant="link"
              text="Reload"
              size="sm"
            />
          }
        />
      )}
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row className="row-deck mb-4 g-0">
          <Col md={5}>
            <Card body>
              <Card.Subtitle className="mb-4 font600 text-center text-sm">
                SELECT PAYMENT REFERENCE TYPE
              </Card.Subtitle>

              {invoiceTypes.map((invoice) => (
                <Fragment key={invoice.url}>
                  {invoice.hidden === false && (
                    <Card
                      body
                      onClick={() => setInvoiceType(invoice.url)}
                      className={`mb-2 p-2 text-center rounded font600 ${
                        invoiceType === invoice.url
                          ? 'bg-primary text-white'
                          : 'bg-light text-primary'
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      {invoice.title}
                    </Card>
                  )}
                </Fragment>
              ))}
            </Card>
          </Col>
          <Col md={7}>
            <Card body className="bg-light">
              <Card.Subtitle className="mb-4 font600 text-primary text-center text-sm">
                <span className="me-1">GENERATE REFERENCE FOR</span>
                {(invoiceType === 'future-payments' &&
                  'FEES DEPOSIT TO YOUR ACCOUNT') ||
                  (invoiceType === 'all-unpaid-invoices' &&
                    'ALL UNPAID INVOICES')}
              </Card.Subtitle>
              {invoiceType === 'all-unpaid-invoices' && (
                <>
                  <UnPaidInvoices
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    invoices={allUnPaidInvoices}
                  />
                  <Card.Header className="rounded-0 border-0 text-sm py-1 my-3 bg-dark text-white">
                    TOTAL AMOUNT TO PAY
                    <div className="card-options text-white">
                      {`${totalInvoiceDue.toLocaleString()} UGX`}
                    </div>
                  </Card.Header>
                </>
              )}

              {invoiceType === 'select-unpaid-invoices' && (
                <>
                  <UnPaidInvoices
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    invoices={allUnPaidInvoices}
                    editAmount
                  />
                  <Card.Header className="rounded-0 border-0 text-sm py-1 my-3 bg-dark text-white">
                    TOTAL AMOUNT TO PAY
                    <div className="card-options text-white">
                      {`${sumBy(selectedRows, 'amount').toLocaleString()} UGX`}
                    </div>
                  </Card.Header>
                </>
              )}

              {invoiceType === 'future-payments' && (
                <InputText
                  name="amount"
                  label="AMOUNT TO DEPOSIT"
                  register={register({
                    required: 'Enter the amount to Deposit E.g 1,000,000',
                    min: {
                      value: 500,
                      message: 'Minimum amount should be 500 UGX',
                    },
                    max: {
                      value: 100000000,
                      message: 'Minimum amount should be 100,000,000 UGX',
                    },
                  })}
                  type="number"
                  min="500"
                  max="100000000"
                  error={get(errors, 'amount.message')}
                  requiredField
                />
              )}

              <div className="mt-3 text-end">
                <SubmitButton
                  text="GENERATE REFERENCE"
                  size="md"
                  loading={generatingPaymentReference}
                  loadingText="Generating..."
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GeneratePaymentReference;
