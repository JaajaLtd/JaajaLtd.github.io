import { useForm } from 'react-hook-form';
import PropTypes, { object } from 'prop-types';
import { InputText } from '../../components/common';

import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import {
  FaGraduationCap,
  FaUserCheck,
  FaUserFriends,
  FaUserGraduate,
  FaUsersCog,
  FaUserSecret,
  FaUserTimes,
  FaUser
} from 'react-icons/fa';
import Avatar from './Avatar';
import { DataSpinner } from '../../components/common';

const ProfileData = ({ authUser }) => {
  const { control } = useForm();
  return (
    <>
      <Card.Body className="bordered">
        <Row>
          <Col md={2}>
            <Card className="text-sm text-muted border-0 p-0">
              <div className="text-center p-3 border-bottom">
                <div className="mx-auto text-center pb-2">
                  <Avatar />
                </div>
                <>
                  <div className="font600 text-uppercase text-primary">Student's Photo</div>
                  <div className="font600 text-uppercase text-xs mt-2">Upload</div>
                </>
              </div>
            </Card>
          </Col>
          <Col md={5}>
            <InputText
              label="First Name"
              defaultValue={authUser.firstname}
              inline
            />
            <InputText
              label="Last Name"
              defaultValue={authUser.lastname}
              inline
            />
            <InputText
              label="Other Name"
              defaultValue={authUser.other_name}
              inline
            />
            <InputText
              label="Gender"
              defaultValue={authUser.gender}
              inline
            />
            <InputText
              label="Date Of Birth"
              defaultValue={authUser.date_of_birth}
              inline
            />
            <InputText
              label="Marital Status"
              defaultValue=""
              inline
            />
            <InputText
              label="Home District"
              defaultValue=""
              inline
            />
          </Col>
          <Col md={5}>
            <InputText
              label="Email"
              defaultValue={authUser.email}
              inline
            />
            <InputText
              label="Telephone Number"
              type="tel"
              control={control}
              name="phone"
              defaultValue="+256"
              inline
            />
            <InputText
              label="Nationality"
              defaultValue={authUser.nationality}
              inline
            />
            <InputText
              label="NIN"
              defaultValue=""
              inline
            />
            <InputText
              label="Passport No."
              defaultValue=""
              inline
            />
            <InputText
              label="Home Address"
              type="textarea"
              defaultValue='THIS IS MY ADDRESS FIELD PLEASE DONT MISUSE IT. AM TRYING TO SEE IF THE DATA IS ENOUGHT LENGTH.'//{authUser.national_id_number}
              rows={3}
              col={3}
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
