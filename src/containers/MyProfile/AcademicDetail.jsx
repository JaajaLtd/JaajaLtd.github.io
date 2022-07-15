import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import { DataNotFound, InputText } from '../../components/common';

const AcademicDetail = ({ authUser }) => {
  return (
    <>
      <Card.Body>
        {!isEmpty(authUser?.academic_records) ? (
          <>
            {authUser.academic_records.map((academicRecord) => (
              <div key={academicRecord.id}>
                <Row>
                  <Col md={6}>
                    <InputText
                      label="Institution / University Name"
                      defaultValue=""
                      name="institution_name"
                      inline
                    />
                    <InputText
                      type="textarea"
                      label="Institution Location"
                      defaultValue=""
                      name="institution_location"
                      inline
                    />
                    <InputText
                      label="Course Name"
                      defaultValue=""
                      name="course_name"
                      inline
                    />
                    <InputText
                      label="Course Level"
                      defaultValue=""
                      placeholder="e.g., Masters, PhD, etc"
                      name="course_level"
                      inline
                    />
                    <InputText
                      label="Entry Academic Yr."
                      defaultValue={academicRecord.entry_academic_year}
                      name="entry_academic_year"
                      inline
                    />
                    <InputText
                      label="Entry Study Yr."
                      defaultValue={academicRecord.entry_study_year}
                      name="entry_study_year"
                      inline
                    />
                    <InputText
                      label="Current Study"
                      defaultValue={academicRecord.current_study_year}
                      name="current_study_year"
                      inline
                    />
                    <InputText
                      label="Course Duration"
                      defaultValue=""
                      placeholder="e.g., 2 Years"
                      inline
                    />
                    <InputText
                      label="Date of Completion"
                      name="completion_date"
                      defaultValue=""
                      placeholder="e.g., June 2024"
                      inline
                    />
                  </Col>
                  <Col md={6}>
                    <InputText
                      label="Academic Status"
                      name="student_academic_status"
                      defaultValue={academicRecord.student_academic_status}
                      inline
                    />
                    <InputText
                      label="Sponsor"
                      defaultValue=""
                      placeholder="e.g., MIT"
                      inline
                    />
                    <InputText
                      type="textarea"
                      label="Residence Status"
                      defaultValue=""
                      inline
                    />
                    <InputText
                      label="Has Completed?"
                      defaultValue={
                        academicRecord.has_completed === true ? 'YES' : 'NO'
                      }
                      inline
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          <DataNotFound message="You have No Academic Records!" />
        )}
      </Card.Body>
    </>
  );
};

AcademicDetail.propTypes = {
  authUser: PropTypes.oneOfType([object]).isRequired,
};

export default AcademicDetail;
