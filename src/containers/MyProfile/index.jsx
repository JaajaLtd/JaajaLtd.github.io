import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import {
  FaGraduationCap,
  FaUserCheck,
  FaUserFriends,
  FaUserGraduate,
  FaUsersCog,
  FaUserSecret,
  FaUserTimes,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authActions} from '../../config/actions';
import Avatar from './Avatar';
import ProfileData from './ProfileData';
import ChangePassword from './ChangePassword';
import AcademicDetail from './AcademicDetail';
import GuardianDetail from './GuardianDetail';
import NextOfKin from './NextOfKin';
import { DataSpinner } from '../../components/common';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { gettingAuthUser, authUser, currentStudentProgramme } = useSelector(
    (state) => state.auth
  );
//  const { currentEvents } = useSelector((state) => state.enrollment);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentTab, setCurrentTab] = useState('bio-data');

  const reloadAuthUser = () => {
    dispatch(authActions.getAuthUser());
    //dispatch(enrollmentActions.getCurrentEvents(currentStudentProgramme?.id));
  };

  useEffect(() => {
    if (isEmpty(authUser)) reloadAuthUser();
  }, []);

  useEffect(() => {
    /*if (!isEmpty(currentEvents)) {
      setIsRegistered(!isEmpty(currentEvents.studentRegistration));
    }*/
  }, []);

  const tabList = [
    {
      id: 1,
      title: 'Personal Details',
      key: 'bio-data',
      icon: <FaUserGraduate className="me-2" />,
    },
    {
      id: 2,
      title: 'Academic Details',
      key: 'academic-details',
      icon: <FaGraduationCap className="me-2" />,
    },
    {
      id: 3,
      title: 'Guardian Details',
      key: 'guardian-details',
      icon: <FaUsersCog className="me-2" />,
    },
    {
      id: 4,
      title: 'Next of Kin',
      key: 'next-of-kin',
      icon: <FaUserFriends className="me-2" />,
    },
    {
      id: 5,
      title: 'Change Password',
      key: 'change-password',
      icon: <FaUserSecret className="me-2" />,
    },
  ];

  return (
    <>
      <Card>
        <Card.Header className="py-3 text-primary font600 text-sm mb-0">
          ACADEMIC PROFILE
        </Card.Header>
        <Row className="row-deck gx-0 gy-2">
          <Col md={12}>
            <Card className="text-sm text-muted border-0 p-0">
              <ListGroup horizontal variant="flush">
                {tabList.map((tab) => (
                  <ListGroup.Item
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.key)}
                    active={currentTab === tab.key}
                    action
                    className="font600 text-sm text-left"
                  >
                    {tab.icon}
                    {tab.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={12}>
            <Card className="border-start border-top-0 border-bottom-0 border-end-0">
              {currentTab === 'bio-data' && <ProfileData authUser={authUser} />}
              {currentTab === 'next-of-kin' && (
                <NextOfKin authUser={authUser} />
              )}
              {currentTab === 'guardian-details' && (
                <GuardianDetail authUser={authUser} />
              )}
              {currentTab === 'academic-details' && (
                <AcademicDetail authUser={authUser} />
              )}
              {currentTab === 'change-password' && <ChangePassword />}
            </Card>
          </Col>
        </Row>
      </Card>

      <div className="my-2 w-100 text-center text-muted text-xs">
        Last Login
        {` ${moment(new Date()).format(
          'ddd, MMM Do YYYY, h:mm:ss a'
        )}`}
      </div>
    </>
  );
};

export default MyProfile;
