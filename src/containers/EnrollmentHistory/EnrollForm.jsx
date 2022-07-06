import { get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  DataNotFound,
  ReloadButton,
  SelectInput,
  SubmitButton,
} from '../../components/common';
import { enrollmentActions, appActions } from '../../config/actions';
import { formatMetadata, generalFormatter } from '../../helpers/dataFormatter';
import usePrevious from '../Hooks/usePrevious';

const EnrollForm = ({
  enrollmentEvent,
  currentStudentProgramme,
  reloadEnrollmentEvent,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const { enrolling, enrollError, gettingCurrentEvents } = useSelector(
    (state) => state.enrollment
  );
  const { metadata } = useSelector((state) => state.app);

  const [enrollmentStatusOptions, setEnrollmentOptions] = useState([]);
  const [studyYearOptions, setStudyYearOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ enrollError });

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(appActions.getMetadata());
  }, []);

  useEffect(() => {
    if (
      prevState &&
      !isEmpty(enrollError) &&
      enrollError !== prevState.enrollError
    ) {
      setErrorMessage(enrollError?.server?.message);
    }
  }, [enrollError]);

  useEffect(() => {
    if (!isEmpty(metadata)) {
      setEnrollmentOptions(formatMetadata(metadata, 'ENROLLMENT STATUSES'));
    }
    if (!isEmpty(currentStudentProgramme)) {
      setStudyYearOptions(
        generalFormatter(
          currentStudentProgramme.programme_study_years || [],
          'programme_study_years',
          'id'
        )
      );
    }
  }, [metadata]);

  const onClickEnrollButton = (data) => {
    setErrorMessage(null);
    if (
      !isEmpty(data) &&
      !isEmpty(enrollmentEvent) &&
      !isEmpty(currentStudentProgramme)
    ) {
      data.event_id = enrollmentEvent?.id;
      dispatch(
        enrollmentActions.enrollStudent({
          ...data,
          student_programme_id: currentStudentProgramme.id,
        })
      );
    }
  };

  return (
    <div>
      {isEmpty(enrollmentEvent) ? (
        <>
          <DataNotFound message="There is currently No open Enrollment Event." />
          <div className="text-center">
            <ReloadButton
              loading={gettingCurrentEvents}
              onClick={reloadEnrollmentEvent}
            />
          </div>
        </>
      ) : (
        <Card>
          <Card.Header className="font600 text-muted text-sm py-3">
            ENROLL FOR
            <strong className="mx-1">{`${enrollmentEvent?.semester}, `}</strong>
            {enrollmentEvent?.academic_year}
            {currentStudentProgramme && (
              <div className="card-options">
                <div className="text-xs">
                  {`PROG: ${currentStudentProgramme?.programme_code} - ${currentStudentProgramme?.programme_title}`}
                </div>
              </div>
            )}
          </Card.Header>
          <Form onSubmit={handleSubmit(onClickEnrollButton)}>
            <Card.Body>
              {errorMessage && (
                <AlertMessage
                  message={errorMessage}
                  show
                  className="py-1 text-sm"
                />
              )}
              <Row>
                <Col md={6}>
                  <SelectInput
                    name="study_year_id"
                    register={register({
                      required:
                        'Select the year of study you are enrolling for',
                    })}
                    label="YEAR OF STUDY"
                    inline
                    selectOptions={studyYearOptions}
                    error={get(errors, 'study_year_id.message')}
                  />
                </Col>
                <Col md={6}>
                  <SelectInput
                    name="enrollment_status_id"
                    register={register({
                      required: 'Select enrollment type',
                    })}
                    label="ENROLLING AS?"
                    inline
                    selectOptions={enrollmentStatusOptions}
                    error={get(errors, 'enrollment_status_id.message')}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-right">
              <SubmitButton
                text="Enroll Now"
                loading={enrolling}
                loadingText="Enrolling..."
              />
            </Card.Footer>
          </Form>
        </Card>
      )}
    </div>
  );
};

EnrollForm.propTypes = {
  reloadEnrollmentEvent: PropTypes.func.isRequired,
  currentStudentProgramme: PropTypes.oneOfType([object]).isRequired,
  enrollmentEvent: PropTypes.oneOfType([object]).isRequired,
};

export default EnrollForm;
