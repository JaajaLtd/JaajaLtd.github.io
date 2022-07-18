import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Card, Button } from 'react-bootstrap';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, DataSpinner } from '../../components/common';
import { appActions } from '../../config/actions';
import ProgrammeTab from './ProgrammeTab';

const Header = () => {
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(true);//remove this later
  /*const { gettingCurrentSemester, currentEvents } = useSelector(
    (state) => state.enrollment
  );
  const { currentStudentProgramme, accountBalance } = useSelector(
    (state) => state.auth
  );
  const { currentSemester } = useSelector((state) => state.app);

  const reloadCurrentSemester = () => {
    dispatch(appActions.getCurrentSemester());
    if (!isEmpty(currentStudentProgramme))
      dispatch(enrollmentActions.getCurrentEvents(currentStudentProgramme?.id));
  };
*/
  useEffect(() => {
   /* if (isEmpty(currentSemester)) {
      reloadCurrentSemester();
    }*/
  }, []);
/*
  useEffect(() => {
    if (!isEmpty(currentEvents)) {
      setIsRegistered(!isEmpty(currentEvents.studentRegistration));
    }
  }, [currentEvents]);*/

  const buttonOptions = [
    {
      id: 1,
      title: 'Current Yr',
      value: '2017/2018',//changed
      color: 'info',
    },
    {
      id: 2,
      title: 'Current Sem',
      value: 'Semester One',//cnhaged
      color: 'info',
    },
    {
      id: 3,
      title: 'Reg. Status',
      value: isRegistered ? 'REGISTERED' : 'NOT REGISTERED',
      color: isRegistered ? 'success' : 'danger',
      icon: isRegistered ? (
        <FaUserCheck className="me-1" />
      ) : (
        <FaUserTimes className="me-1" />
      ),
    },
  ];
  return (
    <>
      <ProgrammeTab />
      <Card className="border-top border-bottom border-start-0 border-end-0">
        <Card.Header className="py-2 px-3 border-0 mb-0">
        </Card.Header>
      </Card>
    </>
  );
};

export default Header;
