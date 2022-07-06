import PropTypes, { any } from 'prop-types';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { AlertMessage } from '../../components/common';
import SingleRegistrationHistory from './SingleRegistrationHistory';

const RegisteredStudent = ({
  enrollmentEvent,
  enrollmentHistory,
  registrationHistory,
}) => {
  const customColumns = [
    {
      name: '#',
      cell(rowData, index) {
        return <>{index + 1}</>;
      },
      width: '30px',
    },
    {
      name: 'STATUS',
      selector: 'courseUnitStatus.metadata_value',
      sortable: true,
      wrap: true,
      maxWidth: '150px',
      style: {
        fontWeight: 'bold !important',
        textTransform: 'uppercase',
      },
    },
    {
      name: 'CODE',
      selector: 'courseUnit.course_unit_code',
      sortable: true,
      width: '80px',
    },
    {
      name: 'COURSE TITLE',
      selector: 'courseUnit.course_unit_name',
      sortable: true,
      wrap: true,
      minWidth: '200px',
    },
    // {
    //   name: 'CATEGORY',
    //   selector: 'courseUnit.courseUnitLevel.metadata_value',
    //   sortable: true,
    //   width: '100px',
    // },
    // {
    //   name: 'STUDY YR',
    //   selector: 'courseUnit.courseUnitYear.metadata_value',
    //   sortable: true,
    //   width: '100px',
    // },
    {
      name: 'C.U',
      selector: 'courseUnit.credit_unit',
      width: '50px',
      sortable: true,
      right: true,
    },
  ];

  return (
    <>
      <AlertMessage
        icon={<FaCheckCircle className="me-1" />}
        variant="success"
        className="font600 py-1 text-uppercase text-xs"
        message={
          <>
            You have been registered for
            <strong className="mx-1">
              {`${enrollmentHistory?.studyYear?.programme_study_years}, `}
            </strong>
            <strong className="me-1">{`${enrollmentEvent?.semester} -`}</strong>
            {enrollmentEvent?.academic_year}
          </>
        }
      />

      <SingleRegistrationHistory
        registrationHistory={registrationHistory}
        columns={customColumns}
      />
    </>
  );
};

RegisteredStudent.propTypes = {
  registrationHistory: PropTypes.oneOfType([any]).isRequired,
  enrollmentHistory: PropTypes.oneOfType([any]).isRequired,
  enrollmentEvent: PropTypes.oneOfType([any]).isRequired,
};

export default RegisteredStudent;
