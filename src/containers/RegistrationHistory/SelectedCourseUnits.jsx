import { isEmpty } from 'lodash';
import PropTypes, { array } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaMinusCircle, FaTrash } from 'react-icons/fa';
import { DataNotFound } from '../../components/common';
import CourseUnitsTable from './CourseUnitsTable';

const SelectedCourseUnits = ({
  selectedCourseUnits,
  setSelectedCourseUnits,
  setDataAndOpenPopUp,
}) => {
  const findCourseUnit = (rowData) =>
    selectedCourseUnits.find(
      (courseUnit) => courseUnit.course_unit_id === rowData.course_unit_id
    );

  const removeSelectedRowData = (data) => {
    const courseExists = findCourseUnit(data);
    if (courseExists) {
      setSelectedCourseUnits(
        selectedCourseUnits.filter(
          (courseUnit) =>
            courseUnit.course_unit_id !== courseExists.course_unit_id
        )
      );
    }
  };

  return (
    <>
      {isEmpty(selectedCourseUnits) ? (
        <Card>
          <DataNotFound message="SELECT COURSES/MODULES TO REGISTER" />
        </Card>
      ) : (
        <Card>
          <Card.Header className="py-2 text-xs font600 text-info">
            COURSES/MODULES TO BE REGISTERED
            <div className="card-options">
              <Button
                size="sm"
                variant="danger"
                onClick={() => setSelectedCourseUnits([])}
                className="text-xs text-uppercase"
              >
                <FaTrash className="me-1" />
                Clear
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <CourseUnitsTable
              courseUnits={selectedCourseUnits}
              onRowClicked={setDataAndOpenPopUp}
              columnsBefore={[
                {
                  name: '#',
                  cell(rowData, index) {
                    return <>{index + 1}</>;
                  },
                  width: '30px',
                },
                {
                  name: 'ACTION',
                  width: '100px',
                  cell(rowData) {
                    return (
                      <>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removeSelectedRowData(rowData)}
                          className="text-xs p-1"
                        >
                          <FaMinusCircle className="me-1" />
                          Remove
                        </Button>
                      </>
                    );
                  },
                },
                {
                  name: 'STATUS',
                  selector: 'registrationStatus.label',
                  width: '100px',
                  wrap: true,
                },
              ]}
              columnsAfter={[
                {
                  name: 'STUDY YR',
                  selector: 'study_year',
                  width: '100px',
                },
              ]}
            />
          </Card.Body>
        </Card>
      )}
    </>
  );
};

SelectedCourseUnits.defaultProps = {
  selectedCourseUnits: [],
};

SelectedCourseUnits.propTypes = {
  selectedCourseUnits: PropTypes.oneOfType([array]),
  setSelectedCourseUnits: PropTypes.func.isRequired,
  setDataAndOpenPopUp: PropTypes.func.isRequired,
};

export default SelectedCourseUnits;
