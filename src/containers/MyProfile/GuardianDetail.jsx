import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes, { object } from 'prop-types';
import { FaUserGraduate } from 'react-icons/fa';
import { InputText } from '../../components/common';

const GuardianDetail = ({ authUser }) => {
  const { control } = useForm();
  return (
    <>
      <Card.Body>
        <Row>
          <Col md={6}>
            <InputText
              label="Full Name"
              defaultValue={authUser.guardian_name}
              inline
            />
            <InputText
              label="Email"
              defaultValue={authUser.guardian_email}
              inline
            />
            <InputText
              label="Telephone Number"
              type="tel"
              control={control}
              name="guardian_phone"
              defaultValue={authUser.guardian_phone}
              inline
            />
          </Col>
          <Col md={6}>
            <InputText
              label="Relationship"
              defaultValue={authUser.guardian_relationship}
              inline
            />
            <InputText
              label="Address"
              defaultValue={authUser.guardian_address}
              inline
            />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

GuardianDetail.propTypes = {
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default GuardianDetail;
