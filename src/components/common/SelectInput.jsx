import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes, { any, array, object } from 'prop-types';
import { isEmpty } from 'lodash';

function SelectInput({
  label,
  name,
  register,
  selectOptions,
  className,
  defaultValue,
  error,
  placeholder,
  inline,
  requiredField,
  ...props
}) {
  const getClassName = () => {
    let newClassName = `form-control form-control-sm text-sm w-100 ${className}`;
    if (error)
      newClassName = `form-control form-control-sm text-sm w-100 ${className} is-invalid`;
    return newClassName;
  };

  return (
    <Form.Group className={`my-2 ${inline ? 'row' : 'form-group'}`}>
      {label && (
        <Form.Label
          htmlFor={name}
          className={`font500 text-muted text-uppercase text-xs ${
            inline ? 'col-md-4' : ''
          }`}
          style={{ textAlign: 'left !important' }}
        >
          {label}
          {requiredField && <strong className="text-danger ml-1">*</strong>}
        </Form.Label>
      )}

      <div className={inline ? 'col-md-8' : ''}>
        <Form.Select
          name={name}
          className={getClassName()}
          ref={register}
          defaultValue={defaultValue}
          {...props}
        >
          <option value="">{placeholder}</option>
          {selectOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        {!isEmpty(error) && (
          <div className="font500 invalid-feedback">{error}</div>
        )}
      </div>
    </Form.Group>
  );
}

SelectInput.defaultProps = {
  selectOptions: [],
  placeholder: '----',
  defaultValue: null,
  label: null,
  register: null,
  className: null,
  name: null,
  error: null,
  inline: false,
  requiredField: null,
};

SelectInput.propTypes = {
  defaultValue: PropTypes.oneOfType([object, any]),
  selectOptions: PropTypes.oneOfType([array]),
  label: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  requiredField: PropTypes.bool,
};

export default SelectInput;
