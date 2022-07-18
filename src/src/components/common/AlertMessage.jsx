import isEmpty from 'lodash';
import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ message, type, icon, extras, ...props }) => {
  return (
    <>
      <Alert variant={type} {...props}>
        {icon}
        {message}
        {!isEmpty(extras) && extras}
      </Alert>
    </>
  );
};

AlertMessage.defaultProps = {
  type: 'danger',
  message: null,
  icon: null,
  show: true,
  extras: null,
};

AlertMessage.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.oneOfType([any]),
  type: PropTypes.string,
  icon: PropTypes.oneOfType([any]),
  extras: PropTypes.oneOfType([any]),
};

export default AlertMessage;
