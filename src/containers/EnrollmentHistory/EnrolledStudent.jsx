import React from 'react';
import PropTypes, { object } from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';
import { AlertMessage } from '../../components/common';
import SingleEnrollment from './SingleEnrollment';

const EnrolledStudent = ({ studentEnrollment, event }) => {
  return (
    <>
      <AlertMessage
        icon={<FaCheckCircle className="me-1" />}
        variant="success"
        className="py-2 font600 text-uppercase text-sm mb-4"
        message={
          <>
            Enrollment for
            <span className="mx-1">
              {`${studentEnrollment?.studyYear?.programme_study_years},`}
            </span>
            {`${event.semester} - ${event.academic_year}`}
          </>
        }
      />
      <SingleEnrollment event={event} enrollment={studentEnrollment} />
    </>
  );
};

EnrolledStudent.defaultProps = {
  studentEnrollment: {},
  event: {},
};

EnrolledStudent.propTypes = {
  studentEnrollment: PropTypes.oneOfType([object]),
  event: PropTypes.oneOfType([object]),
};

export default EnrolledStudent;
