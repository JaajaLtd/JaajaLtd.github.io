import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaIdCard, FaList, FaReplyAll, FaUserGraduate, FaUserPlus } from 'react-icons/fa';
import AdvertForm from '../Scholarships/AdvertForm';
import ScholarshipList from '../Scholarships/ScholarshipList';

const DashboardMain = () => {
  const [currentTab, setCurrentTab] = useState('service-dashboard');
  const serviceList = [
    {
      id: 1,
      icon: <FaIdCard className="display-4 mb-2" />,
      title: 'Total Scholarships',
      value: 23,
      action: 'total-scholarships',
    },
    {
      id: 2,
      icon: <FaUserGraduate className="display-4 mb-2" />,
      title: 'Number of Applicants',
      value: 23,
      action: 'number-of-applicants',
    },
    {
      id: 3,
      icon: <FaList className="display-4 mb-2" />,
      title: 'Number of Beneficiaries',
      value: 23,
      action: 'number-of-beneficiaries',
    },
    {
      id: 3,
      icon: <FaList className="display-4 mb-2" />,
      title: 'Ongoing Scholarships',
      value: 23,
      action: 'ongoing-scholarships',
    },
  ];

  return (
    <>
      {(currentTab === 'number-of-beneficiaries' && (
        <ScholarshipList setCurrentTab={setCurrentTab} />
      )) ||
        (currentTab === 'ongoing-scholarships' && (
          <AdvertForm setCurrentTab={setCurrentTab} />
        )) || (
          <Row className="row-deck justify-content-center w-100 overflow-hidden row-cols-md-4">
            {serviceList.map((service) => (
              <Col md={3} key={service.id}>
                <Card
                  body
                  className="text-center border rounded mb-2 text-primary service-card"
                  onClick={() => setCurrentTab(service.action)}
                >
                  {service.icon}
                  <div className="font600 text-sm text-uppercase">
                    {service.title} {service.value}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
    </>
  );
};

export default DashboardMain;
