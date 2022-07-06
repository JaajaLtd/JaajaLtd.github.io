import { isArray } from 'lodash';
import React from 'react';
import PropTypes, { object, any } from 'prop-types';
import { Accordion, Table } from 'react-bootstrap';
import { FaPaperclip } from 'react-icons/fa';
import AccordionHeader from '../../components/common/AccordionHeader';
import InvoiceForm from './InvoiceForm';

const InvoiceCard = ({
  register,
  errors,
  activeKey,
  setActiveKey,
  invoiceCardId,
  invoiceTitle,
  invoice,
  invoiceType,
}) => {
  return (
    <>
      <Accordion.Item
        eventKey={invoiceCardId}
        className="mb-2 border border-muted"
      >
        <AccordionHeader
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          eventKey={invoiceCardId}
        >
          <FaPaperclip className="me-1" />
          {'MY NEW INVOICE'/*invoiceTitle*/}
        </AccordionHeader>
        <Accordion.Body>
          <Table size="sm" responsive striped className="border-0 m-0">
            <thead className="text-xs text-muted">
              <tr>
                <td>INVOICE NUMBER</td>
                <td>TOTAL AMOUNT</td>
                <td>AMOUNT PAID</td>
                <td>AMOUNT DUE</td>
                <td>AMOUNT YOU ARE PAYING</td>
              </tr>
            </thead>
            <tbody>
              {isArray(invoice) ? (
                invoice.map((singleInvoice, index) => (
                  <InvoiceForm
                    key= '123453'//{`${invoiceType}_${singleInvoice.id}`}
                    register={register}
                    errors={errors}
                    invoice={singleInvoice}
                    formKey={`${invoiceType}[${index}]`}
                  />
                ))
              ) : (
                <InvoiceForm
                  register={register}
                  errors={errors}
                  invoice={invoice}
                  formKey={invoiceType}
                />
              )}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

InvoiceCard.defaultProps = {
  invoice: {},
  activeKey: '123',
  invoiceType: 'paymentReference',
  invoiceCardId: 2333432
};

InvoiceCard.propTypes = {
  invoice: PropTypes.oneOfType([object]),
  errors: PropTypes.oneOfType([any]).isRequired,
  invoiceCardId: PropTypes.oneOfType([any]).isRequired,
  activeKey: PropTypes.oneOfType([any]),
  register: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  invoiceType: PropTypes.string.isRequired,
  invoiceTitle: PropTypes.string.isRequired,
};
export default InvoiceCard;
