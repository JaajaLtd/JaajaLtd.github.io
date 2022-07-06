import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes, { object } from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { InputText } from '../../components/common';

const ProfileData = ({ authUser }) => {
  const { control } = useForm();
  return (
    <>
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUser className="me-1" />
        MY PROFILE DETAILS
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <InputText
              label="First Name"
              defaultValue={authUser.firstname}
              disabled
              inline
            />
            <InputText
              label="Last Name"
              defaultValue={authUser.lastname}
              disabled
              inline
            />
            <InputText
              label="Other Name"
              defaultValue={authUser.other_name}
              disabled
              inline
            />
            <InputText
              label="Email"
              defaultValue={authUser.email}
              disabled
              inline
            />
            <InputText
              label="Telephone Number"
              type="tel"
              control={control}
              name="phone"
              defaultValue={authUser.phone}
              disabled
              inline
            />
          </Col>
          <Col md={6}>
            <InputText
              label="Gender"
              defaultValue={authUser.gender}
              disabled
              inline
            />
            <InputText
              label="Date Of Birth"
              defaultValue={authUser.date_of_birth}
              disabled
              inline
            />
            <InputText
              label="Nationality"
              defaultValue={authUser.nationality}
              disabled
              inline
            />
            <InputText
              label="Address"
              type="textarea"
              defaultValue= 'THIS IS MY ADDRESS FIELD PLEASE DONT MISUSE IT. AM TRYING TO SEE IF THE DATA IS ENOUGHT LENGTH.'//{authUser.national_id_number}
              rows={3}
              inline
            />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

ProfileData.propTypes = {
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default ProfileData;
