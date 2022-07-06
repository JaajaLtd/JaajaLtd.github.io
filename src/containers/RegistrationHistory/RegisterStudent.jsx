import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes, { any } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import {
  authActions,
  appActions,
  registrationActions,
} from '../../config/actions';
import { formatMetadata } from '../../helpers/dataFormatter';
import RegistrationForm from './RegistrationForm';
import usePrevious from '../Hooks/usePrevious';

const RegisterStudent = ({
  registrationEvent,
  enrollmentEvent,
  enrollmentHistory,
  reloadRegistrationEvent,
}) => {
  const dispatch = useDispatch();
  const { authUser, currentStudentProgramme } = useSelector(
    (state) => state.auth
  );
  const { metadata } = useSelector((state) => state.app);
  const {
    courseUnitsByStudyYear,
    gettingCourseUnits,
    registeringStudent,
    gettingCurrentEvents,
    registrationError,
    registrationSuccess,
  } = useSelector((state) => state.registration);
  const [registrationStatusOptions, setRegistrationStatusOptions] = useState(
    []
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [registrationType, setRegistrationType] = useState(null);
  const [selectedCourseUnits, setSelectedCourseUnits] = useState([]);
  const prevState = usePrevious({ registrationError, registrationSuccess });

  useEffect(() => {
    if (isEmpty(metadata)) dispatch(appActions.getMetadata());
    if (isEmpty(authUser)) dispatch(authActions.getAuthUser());
    if (isEmpty(courseUnitsByStudyYear))
      dispatch(registrationActions.getCourseUnits(currentStudentProgramme?.id));
  }, []);

  useEffect(() => {
    if (!isEmpty(metadata)) {
      setRegistrationStatusOptions(
        formatMetadata(metadata, 'REGISTRATION STATUSES')
      );
      const registrationTypes = formatMetadata(metadata, 'REGISTRATION TYPES');
      const findFullRegistration = registrationTypes.find((type) =>
        type.label.includes('FULL')
      );
      setRegistrationType(findFullRegistration);
    }
  }, [metadata]);

  useEffect(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
    if (!isEmpty(prevState)) {
      if (
        !isEmpty(registrationError) &&
        prevState.registrationError !== registrationError
      ) {
        setErrorMessage(
          registrationError?.error || registrationError.server.message
        );
      }

      if (
        !isEmpty(registrationSuccess) &&
        prevState.registrationSuccess !== registrationSuccess
      ) {
        setSuccessMessage(registrationSuccess?.server?.message);
      }
    }
  }, [registrationError, registrationSuccess]);

  const onClickRegisterButton = () => {
    if (!isEmpty(registrationEvent)) {
      const dataToSend = {
        event_id: registrationEvent?.id,
        enrollment_id: enrollmentHistory?.id,
        registration_type_id: registrationType ? registrationType.value : null,
        course_units: selectedCourseUnits.map((courseUnit) => ({
          course_unit_id: courseUnit.course_unit_id,
          course_unit_status_id: courseUnit.registrationStatus?.value,
        })),
      };
      dispatch(registrationActions.registerStudent(dataToSend));
    }
  };

  return (
    <div>
      {isEmpty(registrationEvent) ? (
        <>
          <DataNotFound message="There is currently No open Registration Event." />
          <div className="text-center">
            <ReloadButton
              loading={gettingCurrentEvents}
              onClick={reloadRegistrationEvent}
            />
          </div>
        </>
      ) : (
        <Card body className="border-0 p-0">
          {errorMessage && <AlertMessage message={errorMessage} />}
          {successMessage && (
            <AlertMessage type="success" message={successMessage} />
          )}
          <Card.Header className="rounded-0 font600 text-danger text-xs mb-3 border">
            REGISTER COURSES FOR
            <strong className="mx-1 font600">
              {enrollmentHistory?.studyYear?.programme_study_years}
            </strong>
            <strong className="me-1 font600">
              {`${enrollmentEvent?.semester} -`}
            </strong>
            {enrollmentEvent?.academic_year}
            {currentStudentProgramme && (
              <div className="card-options">
                <div className="text-info">
                  PROG:
                  {` ${currentStudentProgramme?.programme_title}`}
                </div>
              </div>
            )}
          </Card.Header>
          {gettingCourseUnits && isEmpty(courseUnitsByStudyYear) ? (
            <DataSpinner />
          ) : (
            <RegistrationForm
              registrationStatusOptions={registrationStatusOptions}
              courseUnitsByStudyYear={courseUnitsByStudyYear}
              selectedCourseUnits={selectedCourseUnits}
              setSelectedCourseUnits={setSelectedCourseUnits}
              onClickRegisterButton={onClickRegisterButton}
              registeringStudent={registeringStudent}
            />
          )}
        </Card>
      )}
    </div>
  );
};

RegisterStudent.propTypes = {
  reloadRegistrationEvent: PropTypes.func.isRequired,
  registrationEvent: PropTypes.oneOfType([any]).isRequired,
  enrollmentHistory: PropTypes.oneOfType([any]).isRequired,
  enrollmentEvent: PropTypes.oneOfType([any]).isRequired,
};

export default RegisterStudent;
