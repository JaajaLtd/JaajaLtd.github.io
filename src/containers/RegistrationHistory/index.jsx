import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DataNotFound, ReloadButton } from '../../components/common';
import AccordionHeader from '../../components/common/AccordionHeader';
import { registrationActions } from '../../config/actions';
import SingleRegistrationHistory from './SingleRegistrationHistory';

const RegistrationHistory = () => {
  const dispatch = useDispatch();
  const { registrationHistories, gettingRegistrationHistory } = useSelector(
    (state) => state.registration
  );
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [activeKey, setActiveKey] = useState(1);

  const reloadRegistrationHistory = () => {
    dispatch(
      registrationActions.getRegistrationHistory(currentStudentProgramme?.id)
    );
  };

  useEffect(() => {
    if (isEmpty(registrationHistories)) reloadRegistrationHistory();
  }, []);

  return (
    <>
      <Card.Header className="py-2  text-secondary text-sm mb-2 font600">
        MY REGISTRATION HISTORY
        <div className="card-options">
          <ReloadButton
            loading={gettingRegistrationHistory}
            onClick={reloadRegistrationHistory}
          />
        </div>
      </Card.Header>
      {isEmpty(registrationHistories) ? (
        <>
          <DataNotFound message="You have No Registration History." />
          <div className="text-center">
            <ReloadButton
              loading={gettingRegistrationHistory}
              onClick={reloadRegistrationHistory}
            />
          </div>
        </>
      ) : (
        <>
          <Accordion defaultActiveKey="1" activeKey={activeKey}>
            {registrationHistories.map((registrationHistory, index) => (
              <Accordion.Item
                eventKey={index + 1}
                className="mb-2"
                key={registrationHistory.event_id}
              >
                <AccordionHeader
                  activeKey={activeKey}
                  eventKey={index + 1}
                  setActiveKey={setActiveKey}
                  className={
                    registrationHistory.is_active === false
                      ? 'text-danger font600'
                      : 'font600'
                  }
                >
                  <FaUserEdit className="me-2" />
                  {`REGISTRATION FOR ${registrationHistory?.registration_study_year}, ${registrationHistory.event_semester} - ${registrationHistory.academic_year}`}
                  {registrationHistory.is_active === false && (
                    <div className="badge badge-danger text-uppercase p-1 mx-1">
                      De-registered
                    </div>
                  )}
                </AccordionHeader>
                <Accordion.Body>
                  <div
                    className={
                      registrationHistory.is_active === false
                        ? 'text-danger'
                        : ''
                    }
                  >
                    <SingleRegistrationHistory
                      registrationHistory={registrationHistory}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default RegistrationHistory;
