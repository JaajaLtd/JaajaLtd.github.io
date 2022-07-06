import { get, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, InputText, SubmitButton } from '../../components/common';
import { authActions } from '../../config/actions';
import RoutePaths from '../../config/routes/RoutePaths';
import usePrevious from '../Hooks/usePrevious';

const ResetForm = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { requestingToken, resettingPassword } = useSelector(
    (state) => state.auth
  );
  const [resetSuccess, setResetSuccess] = useState(false);
  const {
    resetPasswordError,
    requestTokenError,
    resetPasswordSuccess,
    requestTokenSuccess,
  } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const previousState = usePrevious({
    requestTokenError,
    requestTokenSuccess,
    resetPasswordError,
    resetPasswordSuccess,
  });

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!isEmpty(previousState)) {
      if (
        !isEmpty(requestTokenError) &&
        previousState.requestTokenError !== requestTokenError
      ) {
        setErrorMessage(
          requestTokenError?.error || requestTokenError?.server?.message
        );
      }
      if (
        previousState.requestTokenSuccess !== requestTokenSuccess &&
        requestTokenSuccess?.server
      ) {
        setSuccessMessage(requestTokenSuccess?.server?.message);
        setResetSuccess(true);
      }
    }
  }, [requestTokenError, requestTokenSuccess]);

  useEffect(() => {
    if (!isEmpty(previousState)) {
      if (
        !isEmpty(resetPasswordError) &&
        previousState.resetPasswordError !== resetPasswordError
      ) {
        setErrorMessage(
          resetPasswordError?.error || resetPasswordError.server.message
        );
      }
      if (
        previousState.resetPasswordSuccess !== resetPasswordSuccess &&
        resetPasswordSuccess?.server
      ) {
        setCurrentPage(RoutePaths.login.path);
      }
    }
  }, [resetPasswordError, resetPasswordSuccess]);

  const onSubmit = (data) => {
    setErrorMessage(null);
    if (!isEmpty(data) && resetSuccess) {
      dispatch(authActions.resetPassword(data));
    } else {
      dispatch(authActions.requestToken(data));
    }
  };

  return (
    <Card className="bg-white rounded ">
      <Card.Header className="py-3 border-0 rounded-top">
        <div className="w-100 text-center text-info font600">
          RESET PASSWORD
        </div>
      </Card.Header>
      <Card.Body className="pt-2">
        {(errorMessage || successMessage) && (
          <AlertMessage
            type={errorMessage ? 'danger' : 'success'}
            message={errorMessage || successMessage}
          />
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="username"
            label="STUDENT NO."
            readOnly={resetSuccess}
            register={register({
              required: 'STUDENT NO. required',
            })}
            error={get(errors, 'username.message')}
          />

          {resetSuccess && (
            <>
              <InputText
                name="otp_code"
                label="Reset Token"
                register={register({
                  required: 'Reset Token required',
                })}
                error={get(errors, 'otp_code.message')}
              />

              <InputText
                name="new_password"
                label="New Password"
                type="password"
                register={register({
                  required: 'Reset Token required',
                  minLength: {
                    value: 6,
                    message: 'Minimum password length should 6 characters',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Maximum password length should 16 characters',
                  },
                })}
                error={get(errors, 'reset_token.message')}
              />

              <InputText
                name="confirm_password"
                label="Confirm New Password"
                type="password"
                register={register({
                  required: 'Reset Token required',
                  minLength: {
                    value: 6,
                    message: 'Minimum password length should 6 characters',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Maximum password length should 16 characters',
                  },
                })}
                error={get(errors, 'confirm_password.message')}
              />
            </>
          )}

          <SubmitButton
            className="text-uppercase text-white text-sm mt-3 w-100 mb-2 font600"
            loading={requestingToken || resettingPassword}
            loadingText={
              resetSuccess ? 'Resetting Password...' : 'Requesting...'
            }
            text={resetSuccess ? 'Reset Password' : 'Request Token'}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

ResetForm.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default ResetForm;
