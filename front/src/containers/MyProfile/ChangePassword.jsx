import { get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaUserLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, InputText, SubmitButton } from '../../components/common';
import { authActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm();
  const changingPassword = useSelector((state) => state.auth.changingPassword);
  const changePasswordError = useSelector(
    (state) => state.auth.changePasswordError
  );
  const changePasswordSuccess = useSelector(
    (state) => state.auth.changePasswordSuccess
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const previousState = usePrevious({
    changePasswordError,
    changePasswordSuccess,
  });

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!isEmpty(previousState)) {
      if (
        previousState.changePasswordError !== changePasswordError &&
        changePasswordError?.server
      ) {
        setErrorMessage(changePasswordError.server.message);
      }
      if (
        previousState.changePasswordSuccess !== changePasswordSuccess &&
        changePasswordSuccess?.server
      ) {
        setSuccessMessage(changePasswordSuccess.server.message);
        reset();
      }
    }
  }, [changePasswordError, changePasswordSuccess]);

  const onChangePasswordFormSubmit = (data) => {
    if (!isEmpty(data)) {
      dispatch(authActions.changePassword(data));
    }
  };
  return (
    <>
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUserLock className="me-1" />
        CHANGE PASSWORD
      </Card.Header>
      <Card.Body>
        {(errorMessage || successMessage) && (
          <AlertMessage
            type={errorMessage ? 'danger' : 'success'}
            message={errorMessage || successMessage}
          />
        )}
        <Form onSubmit={handleSubmit(onChangePasswordFormSubmit)}>
          <InputText
            label="Old Password"
            type="password"
            name="old_password"
            inline
            register={register({
              required: 'Your old password is Required',
            })}
            error={get(errors, 'old_password.message')}
          />
          <InputText
            label="New Password"
            type="password"
            name="new_password"
            inline
            register={register({
              required: 'Your New password is Required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters',
              },
              maxLength: {
                value: 16,
                message: 'Password should be less than 16 characters',
              },
            })}
            error={get(errors, 'new_password.message')}
          />
          <InputText
            label="Confirm New Password"
            type="password"
            name="confirm_new_password"
            inline
            register={register({
              required: 'Confirm your New password.',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters',
              },
              maxLength: {
                value: 16,
                message: 'Password should be less than 16 characters',
              },
            })}
            error={get(errors, 'confirm_new_password.message')}
          />

          <SubmitButton
            size="sm"
            loading={changingPassword}
            text="Change Password"
            loadingText="Updating Password..."
            className="float-right font600 text-uppercase"
          />
        </Form>
      </Card.Body>
    </>
  );
};

export default ChangePassword;
