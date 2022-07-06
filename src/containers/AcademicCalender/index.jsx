import React from 'react';
import { Card } from 'react-bootstrap';
import { DataNotFound } from '../../components/common';

const AcademicCalendar = () => {
  return (
    <Card className="bg-light">
      <Card.Header className="py-3 font600">ACADEMIC CALENDAR</Card.Header>
      <Card.Body>
        <DataNotFound message="There is currently no running Academic Calendar" />
      </Card.Body>
    </Card>
  );
};

export default AcademicCalendar;
