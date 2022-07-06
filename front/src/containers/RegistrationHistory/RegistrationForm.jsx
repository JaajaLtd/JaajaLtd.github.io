import { isEmpty } from 'lodash';
import PropTypes, { array } from 'prop-types';
import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitButton } from '../../components/common';
import { settingActions } from '../../config/actions';
import RegistrationStatusPopUp from './RegistrationStatusPopUp';
import SelectedCourseUnits from './SelectedCourseUnits';
import StudyYearCourseUnits from './StudyYearCourseUnits';

const RegistrationForm = ({
  registrationStatusOptions,
  courseUnitsByStudyYear,
  selectedCourseUnits,
  setSelectedCourseUnits,
  registeringStudent,
  onClickRegisterButton,
}) => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(null);
  const showModal = useSelector((state) => state.setting.showModal);

  const findCourseUnit = (row) =>
    selectedCourseUnits.find(
      (courseUnit) => courseUnit.course_unit_id === row.course_unit_id
    );

  const setDataAndOpenPopUp = (data) => {
    setRowData(data);
    dispatch(settingActions.setShowModal(true));
  };

  const setSelectedRowData = (data) => {
    const courseExists = findCourseUnit(data);
    if (courseExists) {
      setSelectedCourseUnits(
        selectedCourseUnits.filter(
          (courseUnit) =>
            courseUnit.course_unit_id !== courseExists.course_unit_id
        )
      );
    } else {
      setDataAndOpenPopUp(data);
    }
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Card className="rounded-0 border-bottom border-right-0 border-left-0 border-top-0">
            <Card.Body className="p-0">
              {courseUnitsByStudyYear.map((studyYearCourse) => (
                <Card
                  className="border-left border-right border-top-0 border-bottom-0"
                  key={studyYearCourse.study_year}
                >
                  <Card.Header className="py-1 text-xs border-top bg-white font600 text-info">
                    {`${studyYearCourse.study_year} - ${studyYearCourse.semester}`}
                  </Card.Header>
                  <Card.Body className="p-0">
                    <StudyYearCourseUnits
                      studyYearCourse={studyYearCourse}
                      findCourseUnit={findCourseUnit}
                      setDataAndOpenPopUp={setDataAndOpenPopUp}
                      setSelectedRowData={setSelectedRowData}
                      selectedCourseUnits={selectedCourseUnits}
                    />
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <SelectedCourseUnits
            setSelectedCourseUnits={setSelectedCourseUnits}
            selectedCourseUnits={selectedCourseUnits}
            setDataAndOpenPopUp={setDataAndOpenPopUp}
          />
          {!isEmpty(selectedCourseUnits) && (
            <div className="my-4 text-right">
              <SubmitButton
                text="Register Now"
                loading={registeringStudent}
                onClick={onClickRegisterButton}
                loadingText="Registering..."
              />
            </div>
          )}
        </Col>
      </Row>
      {showModal && !isEmpty(rowData) && (
        <RegistrationStatusPopUp
          setSelectedRow={setSelectedCourseUnits}
          selectedCourseUnits={selectedCourseUnits}
          rowData={rowData}
          registrationStatusOptions={registrationStatusOptions}
        />
      )}
    </>
  );
};

RegistrationForm.defaultProps = {
  registrationStatusOptions: [],
  courseUnitsByStudyYear: [],
  selectedCourseUnits: [],
  registeringStudent: [],
};

RegistrationForm.propTypes = {
  registrationStatusOptions: PropTypes.oneOfType([array]),
  courseUnitsByStudyYear: PropTypes.oneOfType([array]),
  selectedCourseUnits: PropTypes.oneOfType([array]),
  setSelectedCourseUnits: PropTypes.func.isRequired,
  registeringStudent: PropTypes.oneOfType([array]),
  onClickRegisterButton: PropTypes.func.isRequired,
};

export default RegistrationForm;
