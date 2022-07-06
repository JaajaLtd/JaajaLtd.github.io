import React from 'react';
import PropTypes, { any } from 'prop-types';
import { DefaultToast } from 'react-toast-notifications';

const SnackBar = ({ children, ...props }) => {
  return <DefaultToast {...props}>{children}</DefaultToast>;
};

SnackBar.propTypes = {
  children: PropTypes.oneOfType([any]).isRequired,
};

export default SnackBar;
