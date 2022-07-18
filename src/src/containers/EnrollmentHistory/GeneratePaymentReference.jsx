import { isEmpty, sum, sumBy } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitButton } from '../../components/common';
import { paymentReferenceActions } from '../../config/actions';
import ReferenceModal from '../PaymentReferences/ReferenceModal';
import InvoiceCard from './InvoiceCard';
// import { paymentBanks, paymentModes } from '../PaymentReferences/helper';

const GeneratePaymentReference = ({ enrollment }) => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, watch } = useForm({
    defaultValues: {
      tuition_amount: parseInt(
        enrollment?.functionalInvoice?.invoice_amount,
        10
      ),
      functional_amount: parseInt(
        enrollment?.functionalInvoice?.invoice_amount,
        10
      ),
      other_fees_amount: sumBy(enrollment?.otherFeesInvoice, 'invoice_amount'),
    },
  });
  const [activeKey, setActiveKey] = useState(1);
  const { generatingPaymentReference } = useSelector(
    (state) => state.paymentReference
  );

  const watchValues = watch();
  // const paymentMode = watch('payment_mode', null);

  const totalAmount =
    parseInt(enrollment?.functionalInvoice?.invoice_amount, 10) +
    parseInt(enrollment?.tuitionInvoice?.invoice_amount, 10) +
    sumBy(enrollment?.otherFeesInvoice, 'invoice_amount');

  const [newTotalAmount, setNewTotalAmount] = useState(totalAmount);

  useEffect(() => {
    if (!isEmpty(watchValues)) {
      let newTotal = 0;
      if (watchValues.tuition_fees_amount) {
        newTotal += parseInt(watchValues.tuition_fees_amount, 10);
      }

      if (watchValues.functional_fees_amount) {
        newTotal += parseInt(watchValues.functional_fees_amount, 10);
      }

      if (watchValues.other_fees_amount) {
        newTotal += parseInt(sum(watchValues.other_fees_amount), 10);
      }
      if (newTotal !== newTotalAmount) setNewTotalAmount(newTotal);
    }
  }, [watchValues]);

  const handleFormSubmit = (data) => {
    if (!isEmpty(data)) {
      let payload = data;
      if (data.tuition_fees_amount) {
        payload = {
          ...payload,
          tuition_invoices: [
            {
              tuition_invoice_id: enrollment.tuitionInvoice.id,
              amount: parseInt(data.tuition_fees_amount, 10),
            },
          ],
        };
        delete payload.tuition_fees_amount;
      }
      if (data.functional_fees_amount) {
        payload = {
          ...payload,
          functional_fees_invoices: [
            {
              functional_fees_invoice_id: enrollment.functionalInvoice.id,
              amount: parseInt(data.functional_fees_amount, 10),
            },
          ],
        };
        delete payload.functional_fees_amount;
      }
      if (data.other_fees_amount) {
        payload = {
          ...payload,
          other_fees_invoices: [
            {
              functional_fees_invoice_id: enrollment.otherFeesInvoice.id,
              amount: parseInt(data.other_fees_amount, 10),
            },
          ],
        };
        delete payload.other_fees_amount;
      }
      dispatch(
        paymentReferenceActions.generatePaymentReference(payload, 'bulk')
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Accordion defaultActiveKey="1" activeKey={activeKey}>
          {!isEmpty(enrollment.tuitionInvoice) && (
            <InvoiceCard
              invoiceTitle="Tuition Fees Invoice"
              invoiceCardId={1}
              invoiceType="tuition_fees_amount"
              activeKey={activeKey}
              register={register}
              errors={errors}
              setActiveKey={setActiveKey}
              invoice={enrollment.tuitionInvoice}
            />
          )}
          {!isEmpty(enrollment.tuitionInvoice) && (
            <InvoiceCard
              invoiceTitle="Functional Fees Invoice"
              invoiceCardId={2}
              invoiceType="functional_fees_amount"
              register={register}
              errors={errors}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              invoice={enrollment.functionalInvoice}
            />
          )}
          {!isEmpty(enrollment.otherFeesInvoice) && (
            <InvoiceCard
              invoiceTitle="Other Fees Invoice"
              invoiceCardId={3}
              invoiceType="other_fees_amount"
              register={register}
              errors={errors}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              invoice={enrollment.otherFeesInvoice}
            />
          )}
        </Accordion>
        {parseInt(newTotalAmount, 10) > 0 && (
          <>
            <Card.Header className="rounded-0 border-0 text-sm py-1 mb-2 bg-dark text-white">
              TOTAL AMOUNT TO PAY
              <div className="card-options text-white">{`${newTotalAmount.toLocaleString()} UGX`}</div>
            </Card.Header>

            {/* TODO: To be activated  when Different Payments Modes are allowed
            <SelectInput
              selectOptions={paymentModes}
              name="payment_mode"
              label="PAYMENT MODE"
              register={register({
                required: 'Payment Mode is Required',
              })}
              inline
              error={get(errors, 'payment_mode.message')}
              requiredField
            />
            {!includes(['MOBPMT', 'ONLINE'], paymentMode) && (
              <SelectInput
                selectOptions={paymentBanks}
                name="payment_bank_code"
                label="PAYMENT BANK"
                inline
                register={register({
                  required: 'Payment Bank is Required',
                })}
                error={get(errors, 'payment_bank_code.message')}
              />
            )} */}

            <Row>
              <Col md={12} className="text-right">
                <SubmitButton
                  text="GENERATE REFERENCE NO."
                  size="sm"
                  loading={generatingPaymentReference}
                  loadingText="Generating..."
                  variant="info"
                  className="text-sm mt-2"
                />
              </Col>
            </Row>
          </>
        )}
      </Form>

      <ReferenceModal />
    </>
  );
};

GeneratePaymentReference.defaultProps = {
  enrollment: {},
};

GeneratePaymentReference.propTypes = {
  enrollment: PropTypes.oneOfType([object]),
};

export default GeneratePaymentReference;
