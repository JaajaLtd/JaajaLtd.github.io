import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { InputText, SubmitButton } from '../../components/common';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const loginIn = useSelector((state) => state.auth.loginIn);

  return (
    <Card className="bg-white rounded ">
      <Card.Header className="py-3 border-0 rounded-top">
        <div className="w-100 text-center text-md text-info font600">LOGIN</div>
      </Card.Header>
      <Card.Body className="pt-2">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="username"
            label="Username"
            requiredField
            register={register({
              required: 'Username field is required',
            })}
            error={get(errors, 'username.message')}
          />

          <InputText
            type="password"
            name="password"
            label="Password"
            requiredField
            register={register({
              required: 'Password is required',
            })}
            error={get(errors, 'password.message')}
          />

          <SubmitButton
            className="text-uppercase text-white text-sm mt-3 w-100 mb-2 font600"
            text="Login"
            loading={loginIn}
            iconBefore={<FaSignInAlt className="me-1" />}
            loadingText="Signing in..."
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
