import { isEmpty } from 'lodash';
import moment from 'moment';
import PropTypes, { object, array } from 'prop-types';
import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import { InputText } from '../../components/common';
import CourseUnitsTable from './CourseUnitsTable';

const SingleRegistrationHistory = ({ registrationHistory, columns }) => {
  const customColumns = [
    {
      name: '#',
      cell(rowData, index) {
        return <>{index + 1}</>;
      },
      width: '30px',
    },
    {
      name: 'STATUS',
      selector: 'course_unit_status',
      sortable: true,
      wrap: true,
      maxWidth: '150px',
      style: {
        fontWeight: 'bold !important',
        textTransform: 'uppercase',
      },
    },
    {
      name: 'CODE',
      selector: 'course_unit_code',
      sortable: true,
      width: '80px',
    },
    {
      name: 'COURSE TITLE',
      selector: 'course_unit_name',
      sortable: true,
      wrap: true,
      minWidth: '200px',
    },
    {
      name: 'CATEGORY',
      selector: 'category',
      sortable: true,
      width: '100px',
    },
    {
      name: 'STUDY YR',
      selector: 'study_year',
      sortable: true,
      width: '100px',
    },
    {
      name: 'C.U',
      selector: 'credit_units',
      width: '50px',
      sortable: true,
      right: true,
    },
  ];

  return (
    <>
      <Row>
        <Col md={4}>
          <InputText
            label="REGISTRATION TYPE"
            defaultValue={
              registrationHistory?.registrationType?.metadata_value ||
              registrationHistory.registration_type
            }
            disabled
          />
        </Col>
        <Col md={4}>
          <InputText
            label="REGISTERED BY"
            defaultValue={
              registrationHistory.registered_by === 'STUDENT'
                ? 'SELF'
                : registrationHistory.registered_by
            }
            disabled
          />
        </Col>
        <Col md={4}>
          <InputText
            label="DATE OF REG."
            defaultValue={moment(registrationHistory?.created_at).format(
              'ddd, MMM Do YYYY, h:mm:ss a'
            )}
            disabled
          />
        </Col>
      </Row>

      <Card className="mt-2">
        <Card.Header className="py-2 text-info font600 text-xs">
          COURSE/MODULES REGISTERED
          {registrationHistory.is_active === true && (
            <div className="card-options">
              <Button size="sm" variant="info" className="text-xs">
                <FaPrint className="me-2" />
                DOWNLOAD PROOF OF REGISTRATION
              </Button>
            </div>
          )}
        </Card.Header>
        <Card.Body className="p-0">
          <CourseUnitsTable
            courseUnits={
              registrationHistory?.course_units ||
              registrationHistory.courseUnits
            }
            keyField="course_unit_id"
            customColumns={!isEmpty(columns) ? columns : customColumns}
          />
        </Card.Body>
      </Card>
    </>
  );
};

SingleRegistrationHistory.defaultProps = {
  registrationHistory: {},
  columns: [],
};

SingleRegistrationHistory.propTypes = {
  registrationHistory: PropTypes.oneOfType([object]),
  columns: PropTypes.oneOfType([array]),
};

export default SingleRegistrationHistory;
