import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaIdCard, FaList, FaReplyAll, FaUserGraduate, FaUserPlus } from 'react-icons/fa';
import ChangeOfProgramme from './ChangeOfProgramme';
import ScholarshipList from './ScholarshipList';

const Scholarships = () => {
  const [currentTab, setCurrentTab] = useState('service-dashboard');
  const serviceList = [
    {
      id: 1,
      icon: <FaIdCard className="display-4 mb-2" />,
      title: 'APPLY FOR ID',
      action: 'apply-for-id',
    },
    {
      id: 2,
      icon: <FaUserGraduate className="display-4 mb-2" />,
      title: 'View All Scholarships',
      action: 'list-all-scholarships',
    },
    {
      id: 3,
      icon: <FaList className="display-4 mb-2" />,
      title: 'Enter New Scholarship Record',
      action: 'change-of-programme',
    },
  ];

  return (
    <>
      {(currentTab === 'list-all-scholarships' && (
        <ScholarshipList setCurrentTab={setCurrentTab} />
      )) ||
        (currentTab === 'change-of-programme' && (
          <ChangeOfProgramme setCurrentTab={setCurrentTab} />
        )) || (
          <Row className="row-deck justify-content-center w-100 overflow-hidden">
            {serviceList.map((service) => (
              <Col md={3} key={service.id}>
                <Card
                  body
                  className="text-center border rounded mb-2 text-primary service-card"
                  onClick={() => setCurrentTab(service.action)}
                >
                  {service.icon}
                  <div className="font600 text-sm text-uppercase">
                    {service.title}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
    </>
  );
};

export default Scholarships;
