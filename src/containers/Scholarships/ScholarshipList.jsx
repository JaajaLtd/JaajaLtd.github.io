import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  CustomModal,
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import { scholarshipActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';
import { isEmpty, orderBy, pick, toArray } from 'lodash';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row, Table } from 'react-bootstrap';
import ViewMore from './ViewMore';
import PDFView from './PDFView';
import { render } from 'react-dom';

const ScholarshipList = () => {
  const dispatch = useDispatch();
  const { scholarships, loading, loadError } = useSelector((state) => state.scholarship);
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [scholarshipList, setScholarshipList] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ loadError });
  const [showModel, setShowModal] = useState(false);

  const getScholarshipList = () => {
    setErrorMessage(null);
    dispatch(scholarshipActions.getScholarships(currentStudentProgramme?.id));
  };
  const viewMore = () => {
    console.log("CLicked");
    setShowModal(true);
  }
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
                              <span>{`YEAR - ${semester.academic_year} - ${semester.semester}`}</span>
                            </td>
                          </tr>
                          <tr className="bg-light text-primary font600 text-sm">
                            <td width={30}>CODE</td>
                            <td>Scholarship Name</td>
                            <td width="50px">Level of Study</td>
                            <td width="50px">Institution</td>
                            <td width="50px">Deadline</td>
                            <td width="100px">Country of Study</td>
                            <td width="50px">Status</td>
                            <td width="50px">Action</td>
                          </tr>
                        </thead>
                        <tbody className="text-uppercase">
                          {orderBy(semester?.results, ['scholarshipCode'])?.map(
                            (record) => (
                              <tr
                                key={record.scholarshipId}
                                className={record.remark !== 'NP' ? 'font600' : ''}
                              >
                                <td>{record.scholarshipCode}</td>
                                <td>{record.scholarshipName}</td>
                                <td>{record.levelOfStudy}</td>
                                <td>{record.institutionName}</td>
                                <td>{record.applicationDeadline}</td>
                                <td>{record.countryOfStudy}</td>
                                <td>{record.status}</td>
                                <td><ViewMore loading={loading} onClick={viewMore} /></td>
                              </tr>
                            )
                          )}
                          <tr className="font600 text-uppercase text-sm">
                            <td colSpan={5} className="py-2">
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
                            <td colSpan={9} style={{ height: '24px' }}>
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
      <CustomModal
        title="READ MORE"
        show={showModel}
        size="lg"
      >        <PDFView />
      </CustomModal>
    </div>
  );
};


ScholarshipList.propTypes = {
  scholarshipList: PropTypes.oneOfType([object]).isRequired,
};

export default ScholarshipList;