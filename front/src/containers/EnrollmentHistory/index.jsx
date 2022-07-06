import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import { enrollmentActions } from '../../config/actions';
import Enrollments from './Enrollments';

const EnrollmentHistory = () => {
  const dispatch = useDispatch();
  const { enrollmentHistories, gettingEnrollmentHistory } = useSelector(
    (state) => state.enrollment
  );
  const { currentStudentProgramme } = useSelector((state) => state.auth);

  const reloadEnrollmentHistory = () => {
    dispatch(
      enrollmentActions.getEnrollmentHistory(currentStudentProgramme?.id)
    );
  };

  useEffect(() => {
    if (isEmpty(enrollmentHistories)) reloadEnrollmentHistory();
  }, []);

  return (
    <>
      <Card.Header className="py-2  text-secondary text-sm mb-2 font600">
        MY ENROLLMENT HISTORY
        {` (${!isEmpty(enrollmentHistories) ? enrollmentHistories.length : 0})`}
        <div className="card-options">
          <ReloadButton
            loading={gettingEnrollmentHistory}
            onClick={reloadEnrollmentHistory}
          />
        </div>
      </Card.Header>
      {gettingEnrollmentHistory && isEmpty(enrollmentHistories) ? (
        <DataSpinner />
      ) : (
        <>
          {isEmpty(enrollmentHistories) ? (
            <>
              <DataNotFound message="You have No Enrollment History." />
              <div className="text-center">
                <ReloadButton
                  loading={gettingEnrollmentHistory}
                  onClick={reloadEnrollmentHistory}
                />
              </div>
            </>
          ) : (
            <Enrollments enrollmentHistories={enrollmentHistories} />
          )}
        </>
      )}
    </>
  );
};

export default EnrollmentHistory;
