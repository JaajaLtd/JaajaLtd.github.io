import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton = ({
  loading,
  text,
  loadingText,
  iconBefore,
  iconAfter,
  ...props
}) => {
  return (
    <Button
      type="submit"
      disabled={loading}
      variant="primary"
      className="text-sm font600 text-uppercase"
      {...props}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2 text-sm"
          />
          {loadingText}
        </>
      ) : (
        <>
          {iconBefore}
          {text}
          {iconAfter}
        </>
      )}
    </Button>
  );
};

SubmitButton.defaultProps = {
  loading: false,
  text: 'Save',
  loadingText: 'Saving...',
  iconBefore: null,
  iconAfter: null,
};

SubmitButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  loadingText: PropTypes.string,
  iconBefore: PropTypes.oneOfType([object]),
  iconAfter: PropTypes.oneOfType([object]),
};

export default SubmitButton;
