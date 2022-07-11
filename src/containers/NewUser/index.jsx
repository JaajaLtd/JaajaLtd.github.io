import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { DataNotFound, InputText, SubmitButton, AlertMessage } from '../../components/common';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { removeEmptyOrNullObject } from '../../helpers/dataFormatter';
import React, { useEffect, useState } from 'react';

const NewUser = () => {
  const { register, handleSubmit, errors } = useForm();
  const loginIn = useSelector((state) => state.auth.loginIn);
  const [error, setError] = useState(null);
  const onSubmit = (formData) => {
    setError(null);
    console.log(formData);
    if (!isEmpty(formData)) {
      //dispatch(authActions.loginUser(removeEmptyOrNullObject(data)));
    }
  };
  return (
    <Card >
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUser className="p-2" />
        CREATE ACCOUNT
      </Card.Header>
      <Card.Body className="bg-white">
        <Row>
          {!isEmpty(error) && (
            <AlertMessage message={error} className="p-1 px-3 text-sm rounded-sm" />
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Col md={6}>
              <InputText
                label="First Name"
                name="firstName"
                inline
                requiredField
                register={register({
                  required: 'First Name field is required',
                })}
                error={get(errors, 'firstName.message')}
              />
              <InputText
                label="Last Name"
                name="lastName"
                inline
                requiredField
                register={register({
                  required: 'Last Name field is required',
                })}
                error={get(errors, 'lastName.message')}
              />
              <InputText
                label="Other Names"
                name="otherNames"
                inline
              />
              <InputText
                label="Country"
                name="country"
                inline
                requiredField
                register={register({
                  required: 'Email field is required',
                })}
                error={get(errors, 'email.message')}
              />
              <InputText
                label="Phone"
                name="phone"
                inline
                requiredField
                register={register({
                  required: 'Email field is required',
                })}
                error={get(errors, 'email.message')}
              />
              <InputText
                label="Email"
                name="email"
                inline
                requiredField
                register={register({
                  required: 'Email field is required',
                })}
                error={get(errors, 'email.message')}
              />
              <InputText
                type="password"
                label="Password"
                name="password"
                inline
                requiredField
                register={register({
                  required: 'Password field is required',
                })}
                error={get(errors, 'password.message')}
              />
              <InputText
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                inline
                requiredField
                register={register({
                  required: 'Confirm Password field is required',
                })}
                error={get(errors, 'confirmPassword.message')}
              />
            </Col>
            <Col md={3}>
              <SubmitButton
                className="text-uppercase text-white text-sm mt-3 w-100 mb-2 font600"
                text="Create"
                loading={loginIn}
                iconBefore={<FaSignInAlt className="me-1" />}
                loadingText="Signing in..."
              />
            </Col>
          </Form>
        </Row>
      </Card.Body>
    </Card>
  );
};

NewUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default NewUser;
