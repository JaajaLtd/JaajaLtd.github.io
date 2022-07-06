import React from 'react';
import PropTypes, { array, object, any } from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Controller } from 'react-hook-form';
import { FormLabel } from 'react-bootstrap';
import { isEmpty } from 'lodash';

const InputSelectField = ({
  name,
  control,
  display,
  label,
  type,
  selectOptions,
  error,
  requiredField,
  ...props
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: '0px 4px',
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: '0px 4px',
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '0px 4px',
    }),
  };

  return (
    <div className={display === 'inline' ? 'row my-2' : 'form-group my-2'}>
      {label && (
        <FormLabel
          htmlFor={name}
          className={`font500 text-muted text-sm ${
            display === 'inline' ? 'col-md-4' : ''
          }`}
          style={{ textAlign: 'left !important' }}
        >
          {label}
          {requiredField && <strong className="text-danger ml-1">*</strong>}
        </FormLabel>
      )}
      <div className={display === 'inline' ? 'col-md-8' : ''}>
        {type !== 'creatable' ? (
          <Controller
            as={Select}
            options={selectOptions}
            name={name}
            isInvalid={error}
            control={control}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              padding: '2px !important',
            })}
            styles={customStyles}
            {...props}
          />
        ) : (
          <Controller
            as={CreatableSelect}
            options={selectOptions}
            name={name}
            control={control}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
            })}
            {...props}
          />
        )}
        {!isEmpty(error) && (
          <div
            className="mt-1 text-sm"
            style={{ color: '#ff3838', fontSize: '12px' }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

InputSelectField.defaultProps = {
  type: 'select',
  label: null,
  error: null,
  autoComplete: 'off',
  isClearable: true,
  isSearchable: true,
  isMulti: false,
  selectOptions: [],
  display: null,
  name: null,
  defaultValue: null,
  className: 'text-md font-weight-semibold',
  requiredField: false,
  selectType: null,
};

InputSelectField.propTypes = {
  type: PropTypes.string,
  control: PropTypes.oneOfType([object]).isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  selectOptions: PropTypes.oneOfType([array]),
  selectType: PropTypes.string,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  display: PropTypes.string,
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.oneOfType([any]),
  className: PropTypes.string,
  requiredField: PropTypes.bool,
};

export default InputSelectField;
