import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { AlertMessage } from '../../components/common';
import RoutePaths from '../../config/routes/RoutePaths';
import ResetForm from './ResetForm';

function ResetPassword({ setCurrentPage }) {
  return (
    <>
      <AlertMessage
        type="primary"
        message="To reset your password, Enter your STUDENT NO. and if it matches, a password reset token will be sent to your email and phone."
        className="text-sm p-3 font500 rounded"
      />
      <ResetForm setCurrentPage={setCurrentPage} />
      <div className="mt-3 mb-2 font600 text-center text-sm">
        Have an account?
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setCurrentPage(RoutePaths.login.path)}
        >
          Sign in Here
        </Button>
      </div>
    </>
  );
}

ResetPassword.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default ResetPassword;
