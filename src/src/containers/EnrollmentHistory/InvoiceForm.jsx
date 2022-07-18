import { get } from 'lodash';
import React from 'react';
import PropTypes, { object, any } from 'prop-types';
import { InputText } from '../../components/common';

const InvoiceForm = ({ invoice, register, errors, formKey }) => {
  return (
    <>
      <tr>
        <td>
          <InputText
            name={`invoice_number_${formKey}`}
            disabled
            defaultValue={invoice.invoice_number}
          />
        </td>
        <td>
          <InputText
            name={`invoice_amount_${formKey}`}
            disabled
            defaultValue={invoice.invoice_amount}
          />
        </td>
        <td>
          <InputText
            name={`amount_paid${formKey}`}
            disabled
            defaultValue={invoice.amount_paid}
          />
        </td>
        <td>
          <InputText
            name={`amount_due${formKey}`}
            disabled
            defaultValue={invoice.invoice_amount - invoice.amount_paid}
          />
        </td>
        <td>
          <InputText
            name={formKey}
            type="number"
            min={0}
            max={1000000000}
            register={register({
              required: 'Amount Field is required',
              min: { value: 0, message: 'Minimum amount should be 0' },
              max: {
                value: 1000000000,
                message: 'Maximum amount should be 1,000,000,000',
              },
            })}
            disabled={invoice.amount_paid >= invoice.invoice_amount}
            className="text-info"
            defaultValue={invoice.invoice_amount - invoice.amount_paid}
            error={get(errors, `${formKey}.message`)}
          />
        </td>
      </tr>
    </>
  );
};

InvoiceForm.defaultProps = {
  invoice: {},
};

InvoiceForm.propTypes = {
  invoice: PropTypes.oneOfType([object]),
  errors: PropTypes.oneOfType([any]).isRequired,
  formKey: PropTypes.oneOfType([any]).isRequired,
  register: PropTypes.func.isRequired,
};

export default InvoiceForm;
