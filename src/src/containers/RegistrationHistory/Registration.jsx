import { isEmpty } from 'lodash';
import PropTypes, { any } from 'prop-types';
import React from 'react';
import RegisteredStudent from './RegisteredStudent';
import RegisterStudent from './RegisterStudent';

const Registration = ({
  registrationEvent,
  registrationHistory,
  enrollmentEvent,
  enrollmentHistory,
  reloadEnrollmentEvent,
}) => {
  return (
    <div>
      {!isEmpty(registrationEvent) && !isEmpty(registrationHistory) ? (
        <RegisteredStudent
          studentRegistration={registrationHistory}
          registrationEvent={registrationEvent}
          enrollmentHistory={enrollmentHistory}
          enrollmentEvent={enrollmentEvent}
          registrationHistory={registrationHistory}
        />
      ) : (
        <RegisterStudent
          registrationEvent={registrationEvent}
          enrollmentHistory={enrollmentHistory}
          enrollmentEvent={enrollmentEvent}
          reloadRegistrationEvent={reloadEnrollmentEvent}
        />
      )}
    </div>
  );
};
Registration.propTypes = {
  registrationEvent: PropTypes.oneOfType([any]).isRequired,
  registrationHistory: PropTypes.oneOfType([any]).isRequired,
  enrollmentHistory: PropTypes.oneOfType([any]).isRequired,
  enrollmentEvent: PropTypes.oneOfType([any]).isRequired,
  reloadEnrollmentEvent: PropTypes.func.isRequired,
};
export default Registration;
