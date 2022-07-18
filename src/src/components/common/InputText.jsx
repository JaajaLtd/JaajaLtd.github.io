import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import PropTypes, { any, array } from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FormLabel, Form } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/style.css';
import { Controller } from 'react-hook-form';

const InputText = ({
  label,
  error,
  register,
  name,
  type,
  rows,
  handleChange,
  placeholder,
  className,
  selectOptions,
  selectType,
  selectHandler,
  isMulti,
  isSearchable,
  inline,
  autoComplete,
  defaultValue,
  requiredField,
  ...props
}) => {
  const [startDate, setStartDate] = useState(null);

  const renderSelect = (selector) => {
    return selector === 'creatable' ? (
      <CreatableSelect
        options={selectOptions}
        ref={register}
        name={name}
        placeholder={placeholder}
        isInvalid={!!error}
        isClearable
        isMulti={isMulti}
        isSearchable={isSearchable}
        onChange={selectHandler}
        defaultValue={defaultValue}
        {...props}
      />
    ) : (
      <Select
        options={selectOptions}
        ref={register}
        name={name}
        placeholder={placeholder}
        isInvalid={!!error}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
        })}
        isClearable
        isSearchable={isSearchable}
        isMulti={isMulti}
        onChange={selectHandler}
        defaultValue={defaultValue}
        {...props}
      />
    );
  };

  const setClassName = () => {
    let newClassName = `form-control form-control-sm text-sm font500 w-100 rounded-0 ${className}`;
    if (error)
      newClassName = `form-control form-control-sm text-sm font500 w-100 rounded-0 ${className} is-invalid`;
    return newClassName;
  };

  return (
    <Form.Group className={`${inline ? 'row my-2' : 'form-group mb-2'}`}>
      {label && (
        <FormLabel
          htmlFor={name}
          className={`font500 text-muted text-sm ${
            inline ? 'col-md-4 my-auto' : 'mb-1'
          }`}
          style={{ textAlign: 'left !important' }}
        >
          {label}
          {requiredField && <strong className="text-danger ml-1">*</strong>}
        </FormLabel>
      )}
      <div className={inline ? 'col-md-8' : ''}>
        {type === 'select' && renderSelect(selectType)}
        {type !== 'textarea' &&
          type !== 'select' &&
          type !== 'date' &&
          type !== 'tel' && (
            <Form.Control
              type={type}
              name={name}
              id={name}
              ref={register}
              onChange={handleChange}
              className={setClassName()}
              autoComplete={autoComplete}
              defaultValue={defaultValue}
              placeholder={placeholder}
              {...props}
            />
          )}
        {type === 'textarea' && (
          <Form.Control
            as="textarea"
            name={name}
            rows={3}
            ref={register}
            onChange={handleChange}
            defaultValue={defaultValue}
            className={setClassName()}
            placeholder={placeholder}
            {...props}
          />
        )}
        {type === 'date' && (
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={setClassName()}
            {...props}
          />
        )}
        {type === 'tel' && (
          <Controller
            as={PhoneInput}
            country="ug"
            inputProps={{
              className: setClassName(),
              name,
            }}
            name={name}
            defaultValue={defaultValue}
            enableSearch
            {...props}
          />
        )}
        {!isEmpty(error) && (
          <div
            className={`font500 ${
              type === 'select' || type === 'tel' ? 'mt-1' : 'invalid-feedback'
            }`}
            style={
              type === 'select' || type === 'tel'
                ? { color: '#ff3838', fontSize: '12px' }
                : {}
            }
          >
            {error}
          </div>
        )}
      </div>
    </Form.Group>
  );
};

InputText.defaultProps = {
  type: 'text',
  label: null,
  error: null,
  handleChange: null,
  autoComplete: 'off',
  defaultValue: null,
  placeholder: null,
  className: null,
  isSearchable: true,
  isMulti: false,
  selectHandler: null,
  selectType: null,
  selectOptions: [],
  inline: false,
  register: null,
  name: null,
  rows: 5,
  requiredField: false,
};

InputText.propTypes = {
  type: PropTypes.string,
  register: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([any]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  selectOptions: PropTypes.oneOfType([array]),
  selectType: PropTypes.string,
  selectHandler: PropTypes.func,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  inline: PropTypes.bool,
  autoComplete: PropTypes.string,
  rows: PropTypes.number,
  requiredField: PropTypes.bool,
};

export default InputText;
