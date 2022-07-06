import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaUserGraduate } from 'react-icons/fa';
import { DataNotFound, InputText } from '../../components/common';

const AcademicDetail = ({ authUser }) => {
  return (
    <>
      <Card.Header className="text-primary font600 py-3 text-sm">
        <FaUserGraduate className="me-1" />
        MY ACADEMIC DETAILS
      </Card.Header>
      <Card.Body>
        {!isEmpty(authUser?.academic_records) ? (
          <>
            {authUser.academic_records.map((academicRecord) => (
              <div key={academicRecord.id}>
                <Card.Header className="py-2 bg-light border text-xs m-0 mb-2 text-sm font500">
                  {`${academicRecord.programme_code} - ${academicRecord.programme_title}`}
                  {academicRecord.is_current_programme === true && (
                    <span className="bg-success ms-1 text-xs py-1 px-2 text-white text-uppercase">
                      Current Programme
                    </span>
                  )}
                </Card.Header>
                <Row>
                  <Col md={6}>
                    <InputText
                      label="Campus"
                      defaultValue={academicRecord.campus}
                      disabled
                      name="campus"
                      inline
                    />
                    <InputText
                      label="Programme Version"
                      defaultValue={academicRecord.version_title}
                      disabled
                      name="version_title"
                      inline
                    />
                    <InputText
                      label="Intake"
                      defaultValue={academicRecord.intake}
                      disabled
                      name="intake"
                      inline
                    />
                    <InputText
                      label="Entry Academic Yr."
                      defaultValue={academicRecord.entry_academic_year}
                      disabled
                      name="entry_academic_year"
                      inline
                    />
                    <InputText
                      label="Entry Study Yr."
                      defaultValue={academicRecord.entry_study_year}
                      disabled
                      name="entry_study_year"
                      inline
                    />
                    <InputText
                      label="Current Study"
                      defaultValue={academicRecord.current_study_year}
                      disabled
                      name="current_study_year"
                      inline
                    />
                    <InputText
                      label="Programme Type"
                      defaultValue={academicRecord.programme_type}
                      disabled
                      name="programme_type"
                      inline
                    />
                    <InputText
                      label="Sponsorship"
                      defaultValue={academicRecord.sponsorship}
                      disabled
                      inline
                    />
                    <InputText
                      label="Academic Status"
                      name="student_academic_status"
                      defaultValue={academicRecord.student_academic_status}
                      disabled
                      inline
                    />
                  </Col>
                  <Col md={6}>
                    <InputText
                      label="Billing Category"
                      defaultValue={academicRecord.billing_category}
                      disabled
                      inline
                    />
                    <InputText
                      label="Marital Status"
                      defaultValue={academicRecord.marital_status}
                      disabled
                      inline
                    />
                    <InputText
                      label="Residence Status"
                      defaultValue={academicRecord.residence_status}
                      disabled
                      inline
                    />
                    <InputText
                      label="Hall of Attachment"
                      defaultValue={academicRecord.hall_of_attachment}
                      disabled
                      inline
                    />
                    <InputText
                      label="Hall of Residence"
                      defaultValue={academicRecord.hall_of_residence || 'N/A'}
                      disabled
                      inline
                    />
                    <InputText
                      label="Fees Waiver"
                      defaultValue={academicRecord.fees_waiver || 'N/A'}
                      disabled
                      inline
                    />
                    <InputText
                      label="Has Completed?"
                      defaultValue={
                        academicRecord.has_completed === true ? 'YES' : 'NO'
                      }
                      disabled
                      inline
                    />
                    <InputText
                      label="On Loan Scheme?"
                      defaultValue={
                        academicRecord.is_on_loan_scheme === true ? 'YES' : 'NO'
                      }
                      disabled
                      inline
                    />
                    <InputText
                      label="Affiliated?"
                      defaultValue={
                        academicRecord.is_affiliated === true ? 'YES' : 'NO'
                      }
                      disabled
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
