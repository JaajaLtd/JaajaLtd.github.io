import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaIdCard, FaList, FaReplyAll, FaUserGraduate, FaUserPlus } from 'react-icons/fa';
import AdvertForm from './AdvertForm';
import ChangeOfProgramme from './ChangeOfProgramme';
import ScholarshipList from './ScholarshipList';

const Scholarships = () => {
  const [currentTab, setCurrentTab] = useState('service-dashboard');
  const serviceList = [
    {
      id: 1,
      icon: <FaIdCard className="display-4 mb-2" />,
      title: 'View Applicants',
      action: 'view-applicants',
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
      title: 'Create Scholarship Advert',
      action: 'scholarship-advert-form',
    },
  ];

  return (
    <>
      {(currentTab === 'list-all-scholarships' && (
        <ScholarshipList setCurrentTab={setCurrentTab} />
      )) ||
        (currentTab === 'scholarship-advert-form' && (
          <AdvertForm setCurrentTab={setCurrentTab} />
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
