import React from 'react';
import PropTypes, { object, any } from 'prop-types';
import { Form } from 'react-bootstrap';
import { FaCheckSquare } from 'react-icons/fa';
import CourseUnitsTable from './CourseUnitsTable';

const StudyYearCourseUnits = ({
  selectedCourseUnits,
  studyYearCourse,
  setDataAndOpenPopUp,
  setSelectedRowData,
  findCourseUnit,
}) => {
  const conditionalRowStyles = [
    {
      when: (row) =>
        selectedCourseUnits.find(
          (courseUnit) => courseUnit.course_unit_id === row.course_unit_id
        ),
      style: {
        backgroundColor: '#b2bec3',
        fontWeight: 'bold !important',
        color: '#2d3436',
        '&:hover': {
          backgroundColor: '#636e72',
          cursor: 'pointer',
        },
      },
    },
  ];

  const onSelectCourse = (rowData) => {
    if (rowData) {
      setSelectedRowData({
        ...rowData,
        study_year: studyYearCourse.study_year,
      });
    }
  };

  return (
    <>
      <CourseUnitsTable
        courseUnits={studyYearCourse.course_units}
        onRowClicked={(rowData) =>
          setDataAndOpenPopUp({
            ...rowData,
            study_year: studyYearCourse.study_year,
          })
        }
        conditionalRowStyles={conditionalRowStyles}
        compact
        columnsBefore={[
          {
            name: <FaCheckSquare />,
            width: '30px',
            cell(rowData) {
              const { id } = rowData;
              return (
                <Form.Check
                  type="checkbox"
                  defaultChecked={findCourseUnit(rowData)}
                  id={`custom-${id}`}
                  onChange={() => onSelectCourse(rowData)}
                />
              );
            },
          },
        ]}
      />
    </>
  );
};

StudyYearCourseUnits.defaultProps = {
  selectedCourseUnits: [],
  studyYearCourse: {},
};

StudyYearCourseUnits.propTypes = {
  selectedCourseUnits: PropTypes.oneOfType([any]),
  studyYearCourse: PropTypes.oneOfType([object]),
  setDataAndOpenPopUp: PropTypes.func.isRequired,
  setSelectedRowData: PropTypes.func.isRequired,
  findCourseUnit: PropTypes.func.isRequired,
};

export default StudyYearCourseUnits;
