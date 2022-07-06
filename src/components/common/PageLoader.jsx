import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const PageLoader = ({ message }) => (
  <div className="vh-100 text-center bg-light d-flex m-0 p-4">
    <div className="align-middle my-auto mx-auto">
      <Spinner variant="primary" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <div className="font500 text-uppercase text-sm text-primary mt-3">
        {message}
      </div>
    </div>
  </div>
);

PageLoader.defaultProps = {
  message: 'Please wait...',
};

PageLoader.propTypes = {
  message: PropTypes.string,
};

export default PageLoader;
