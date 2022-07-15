import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import { DataNotFound } from '../../components/common';

const NextOfKin = ({ authUser }) => {
  return (
    <>
      <Card.Body>
        <DataNotFound
          message={`Hi ${authUser.firstname}, You have No next of Kin Record!`}
        />
      </Card.Body>
    </>
  );
};

NextOfKin.propTypes = {
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default NextOfKin;
