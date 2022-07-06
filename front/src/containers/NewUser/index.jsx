import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { DataNotFound, InputText } from '../../components/common';

const NewUser = () => {
  return (
    <Card >
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUser className="p-2" />
        CREATE ACCOUNT
      </Card.Header>
      <Card.Body className="bg-white">
        <Row>
          <Col md={6}>
            <InputText
              label="First Name"
              name="firstName"
              inline
            />
            <InputText
              label="Last Name"
              name="lastName"
              inline
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
            />
            <InputText
              label="Phone"
              name="phone"
              inline
            />
            <InputText
              label="Email"
              name="email"
              inline
            />
            <InputText
              label="Password"
              name="password"
              inline
            />
            <InputText
              label="Confirm Password"
              name="confirmPassword"
              inline
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

NewUser.propTypes = {
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default NewUser;
