import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import { DataNotFound } from '../../components/common';

const NextOfKin = ({ authUser }) => {
  return (
    <>
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUserGraduate className="me-1" />
        MY NEXT OF KIN
      </Card.Header>
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
