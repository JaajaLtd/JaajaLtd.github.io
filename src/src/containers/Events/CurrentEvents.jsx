import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaUserEdit, FaUserGraduate } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataNotFound,
  DataSpinner,
  ReloadButton,
  TabMenu,
} from '../../components/common';
import { enrollmentActions, registrationActions } from '../../config/actions';
import EnrolledStudent from '../EnrollmentHistory/EnrolledStudent';
import EnrollForm from '../EnrollmentHistory/EnrollForm';
import Registration from '../RegistrationHistory/Registration';

const CurrentEvents = () => {
  const dispatch = useDispatch();
  const { currentEvents, gettingCurrentEvents } = useSelector(
    (state) => state.enrollment
  );
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [selectedKey, setSelectedKey] = useState('enrollment');
  const [semesterEvent, setSemesterEvent] = useState({});

  const reloadEnrollmentEvent = () => {
    if (currentStudentProgramme?.id) {
      dispatch(enrollmentActions.getCurrentEvents(currentStudentProgramme.id));
    }
    if (
      isEmpty(currentEvents.studentRegistration) &&
      !isEmpty(currentEvents.registrationEvent)
    ) {
      dispatch(registrationActions.getCourseUnits(currentStudentProgramme.id));
    }
  };

  useEffect(() => {
    if (isEmpty(semesterEvent)) reloadEnrollmentEvent();
  }, []);

  useEffect(() => {
    if (!isEmpty(currentEvents)) {
      const findEvent = currentEvents.find(
        (event) =>
          parseInt(event.programme_id, 10) ===
          parseInt(currentStudentProgramme.id, 10)
      );
      setSemesterEvent(findEvent ? findEvent.event : {});
    }
  }, [currentEvents, currentStudentProgramme]);

  return (
    <Card key={semesterEvent?.id}>
      <TabMenu
        menus={[
          {
            title: 'Enrollemnt',
            icon: <FaUserGraduate className="me-1" />,
            action: 'enrollment',
          },
          {
            title: 'Registration',
            icon: <FaUserEdit className="me-1" />,
            action: 'registration',
            hidden:
              isEmpty(semesterEvent.studentEnrollment) ||
              isEmpty(semesterEvent.registrationEvent),
          },
        ]}
        currentMenu={selectedKey}
        setCurrentMenu={setSelectedKey}
      >
        <div className="card-options">
          <ReloadButton
            loading={gettingCurrentEvents}
            onClick={reloadEnrollmentEvent}
          />
        </div>
      </TabMenu>

      <Card.Body>
        {selectedKey === 'enrollment' && (
          <>
            {gettingCurrentEvents && isEmpty(semesterEvent) ? (
              <DataSpinner />
            ) : (
              <>
                {isEmpty(semesterEvent.enrollmentEvent) ||
                isEmpty(currentStudentProgramme) ? (
                  <DataNotFound
                    message="There is no Enrollment event available"
                    className="text-xl text-uppercase"
                  />
                ) : (
                  <>
                    {!isEmpty(semesterEvent.studentEnrollment) ? (
                      <EnrolledStudent
                        studentEnrollment={
                          semesterEvent.studentEnrollment || {}
                        }
                        event={semesterEvent.enrollmentEvent}
                      />
                    ) : (
                      <EnrollForm
                        enrollmentEvent={semesterEvent.enrollmentEvent}
                        currentStudentProgramme={currentStudentProgramme}
                        reloadEnrollmentEvent={reloadEnrollmentEvent}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {selectedKey === 'registration' && (
          <Registration
            registrationEvent={semesterEvent.registrationEvent}
            registrationHistory={semesterEvent.studentRegistration}
            enrollmentEvent={semesterEvent.enrollmentEvent}
            enrollmentHistory={semesterEvent.studentEnrollment}
            reloadEnrollmentEvent={reloadEnrollmentEvent}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default CurrentEvents;
