import React, { useEffect, useState,Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import {scholarshipActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';
import { isEmpty, orderBy, pick, toArray } from 'lodash';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row, Table } from 'react-bootstrap';

const ScholarshipList = () => {
  const dispatch = useDispatch();
  const { scholarships, loading, loadError } = useSelector((state) => state.scholarship);
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [scholarshipList, setScholarshipList] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ loadError });

  const getScholarshipList = () => {
    setErrorMessage(null);
    dispatch(scholarshipActions.getScholarships(currentStudentProgramme?.id));
  };

  useEffect(() => {
    if (scholarships) {
      const findResult = scholarships.find(
        (scholarship) =>
          scholarship.data
      );
      if (findResult) setScholarshipList(findResult);
      else getScholarshipList();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(scholarships)) {
      //console.log(scholarships)
      const findResult = scholarships.find(
        (scholarship) =>
          scholarship?.data
      );
      if (findResult) setScholarshipList(findResult);
      else {
        setScholarshipList({});
        setErrorMessage(null);
      }
    }
  }, [scholarships, loading]);

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(loadError) &&
      loadError !== prevState.loadError
    ) {
      setErrorMessage(loadError?.error?.message || loadError?.server?.message);
    }
  }, [loadError]);

  return (
    <div>
      <Card>
        <Card.Header className="py-2">
          <div className="font600 text-uppercase text-sm">List of Available Scholarships</div>
          <div className="card-options">
            <ReloadButton loading={loading} onClick={getScholarshipList} />
          </div>
        </Card.Header>
        <Card.Body>
          {errorMessage && <AlertMessage message={errorMessage} />}
          {loading && isEmpty(scholarshipList) ? (
            <DataSpinner />
          ) : (
            <>
              {isEmpty(scholarshipList) ? (
                <DataNotFound message="You have No Results" />
              ) : (
                
                <div>          
                <Table
                  size="sm"
                  cellPadding={5}
                  bordered
                  responsive
                  striped
                  className="text-sm font500 border table-sm"
                >
                  {scholarshipList.data?.map((semester) => (
                    <Fragment
                      key={`${semester.programme_study_year}-${semester.semester}-${semester.academic_year}`}
                    >
                      <thead>
                        <tr className="bg-dark p-2 text-white font600 text-left">
                          <td colSpan={8} className="py-2">
                            <span>{`${semester.programme_study_year} - ${semester.academic_year} - ${semester.semester}`}</span>
                          </td>
                        </tr>
                        <tr className="bg-light text-primary font600 text-sm">
                          <td width={30}>CODE</td>
                          <td>TITLE</td>
                          <td width="50px">MARK</td>
                          <td width="50px">CUs</td>
                          <td width="50px">GRADE</td>
                          <td width="100px">GD POINT</td>
                          <td width="50px">REMARK</td>
                        </tr>
                      </thead>
                      <tbody className="text-uppercase">
                        {orderBy(semester?.results, ['course_unit_code'])?.map(
                          (semesterCourse) => (
                            <tr
                              key={semesterCourse.id}
                              className={semesterCourse.remark !== 'NP' ? 'font600' : ''}
                            >
                              <td>{semesterCourse.course_unit_code}</td>
                              <td>{semesterCourse.course_unit_name}</td>
                              <td>{semesterCourse.final_mark}</td>
                              <td>{semesterCourse.credit_unit}</td>
                              <td>{semesterCourse.grading_letter}</td>
                              <td>{semesterCourse.grading_point}</td>
                              <td>{semesterCourse.interpretation}</td>
                            </tr>
                          )
                        )}
                        <tr className="font600 text-uppercase text-sm">
                          <td colSpan={4} className="py-2">
                            {`Semester REMARK: ${semester.remark}`}
                            {!isEmpty(semester?.retake_courses) && (
                              <span className="text-danger ms-2">
                                {toArray(semester?.retake_courses).join(', ')}
                              </span>
                            )}
                          </td>
                          <td colSpan={2} className="py-2">
                            GPA:
                            <span className="mx-1">{semester?.current_gpa}</span>
                          </td>
                          <td colSpan={2} className="py-2">
                            CGPA:
                            <span className="mx-1">{semester?.cgpa}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={8} style={{ height: '24px' }}>
                            <span />
                          </td>
                        </tr>
                      </tbody>
                    </Fragment>
                  ))}
                </Table>
              </div>
                
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};


ScholarshipList.propTypes = {
  scholarshipList: PropTypes.oneOfType([object]).isRequired,
};

export default ScholarshipList;