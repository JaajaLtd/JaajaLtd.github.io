import moment from 'moment';
import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import GeneratePaymentReference from './GeneratePaymentReference';

const SingleEnrollment = ({ event, enrollment }) => {
  return (
    <>
      <Row className="row-deck text-muted">
        <Col md={4} className="mb-3">
          <Card body className="py-1 bg-light">
            <p className="text-sm">
              <span className="font600 text-uppercase me-1">
                Academic Year:
              </span>
              {event.academic_year}
            </p>
            <p className="text-sm mb-0">
              <span className="font600 text-uppercase me-1">SEMESTER:</span>
              {event.semester}
              <span className="font600 text-uppercase mx-1">STUDY YEAR:</span>
              {enrollment.studyYear?.programme_study_years}
            </p>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card body className="py-1 bg-light">
            <p className="text-sm">
              <span className="font600 text-uppercase me-1">ENROLLED AS:</span>
              {enrollment.enrollmentStatus?.metadata_value}
            </p>
            <p className="text-sm mb-0">
              <span className="font600 text-uppercase me-1">ENROLLED BY:</span>
              {enrollment.enrolled_by === 'STUDENT'
                ? 'SELF'
                : enrollment.enrolled_by}
            </p>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card body className="py-1 bg-light">
            <p className="text-sm">
              <span className="font600 text-uppercase me-1">
                Enrollment Token:
              </span>
              {enrollment.enrollment_token}
            </p>
            <p className="text-sm mb-0">
              <span className="font600 text-uppercase me-1">Enrolled on:</span>
              {moment(enrollment.created_at).format(
                'ddd, MMM Do YYYY, h:mm:ss a'
              )}
            </p>
          </Card>
        </Col>
      </Row>
      <div className="mb-3">
        <GeneratePaymentReference enrollment={enrollment} />
      </div>
    </>
  );
};

SingleEnrollment.defaultProps = {
  enrollment: {},
  event: {},
};

SingleEnrollment.propTypes = {
  enrollment: PropTypes.oneOfType([object]),
  event: PropTypes.oneOfType([object]),
};

export default SingleEnrollment;
