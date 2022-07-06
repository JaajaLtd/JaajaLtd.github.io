import PropTypes, { array } from 'prop-types';
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import AccordionHeader from '../../components/common/AccordionHeader';
import SingleEnrollment from './SingleEnrollment';

const Enrollments = ({ enrollmentHistories }) => {
  const [activeKey, setActiveKey] = useState(1);

  return (
    <Accordion defaultActiveKey="1" activeKey={activeKey}>
      {enrollmentHistories.map((enrollment, index) => (
        <Accordion.Item
          eventKey={index + 1}
          className="mb-2"
          key={enrollment.id}
        >
          <AccordionHeader
            activeKey={activeKey}
            eventKey={index + 1}
            setActiveKey={setActiveKey}
          >
            <FaUserGraduate className="me-2" />
            {` ${enrollment?.studyYear?.programme_study_years}, ${enrollment.event?.semester?.semester?.metadata_value} - ${enrollment.event.academicYear?.academicYear?.metadata_value}`}
          </AccordionHeader>
          <Accordion.Body>
            <SingleEnrollment
              event={
                enrollment.event
                  ? {
                      academic_year:
                        enrollment.event.academicYear?.academicYear
                          ?.metadata_value,
                      semester:
                        enrollment.event?.semester?.semester?.metadata_value,
                    }
                  : {}
              }
              enrollment={enrollment}
            />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

Enrollments.defaultProps = {
  enrollmentHistories: [],
};

Enrollments.propTypes = {
  enrollmentHistories: PropTypes.oneOfType([array]),
};

export default Enrollments;
