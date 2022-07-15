import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertMessage,
  DataNotFound,
  DataSpinner,
  ReloadButton,
} from '../../components/common';
import { scholarshipActions, userActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';
import { isEmpty, orderBy, toArray } from 'lodash';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row, Table } from 'react-bootstrap';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, loadError } = useSelector((state) => state.user);
  const { currentStudentProgramme } = useSelector((state) => state.auth);
  const [scholarshipList, setScholarshipList] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const prevState = usePrevious({ loadError });
  const [showModel, setShowModal] = useState(false);

  const getUserList = () => {
    setErrorMessage(null);
    dispatch(scholarshipActions.getScholarships(currentStudentProgramme?.id));
  };
  useEffect(() => {
    if (users) {
      console.log(users)
      const findResult = users.find(
        (user) =>
          user.data
      );
      if (findResult) setScholarshipList(findResult);
      else getUserList();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(users)) {
      //console.log(users)
      const findResult = users.find(
        (scholarship) =>
          scholarship?.data
      );
      if (findResult) setScholarshipList(findResult);
      else {
        setScholarshipList({});
        setErrorMessage(null);
      }
    }
  }, [users, loading]);

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
          <div className="font600 text-uppercase text-sm">REGISTERED USERS</div>
          <div className="card-options">
            <ReloadButton loading={loading} onClick={getUserList} />
          </div>
        </Card.Header>
        <Card.Body>
          {errorMessage && <AlertMessage message={errorMessage} />}
          {loading && isEmpty(scholarshipList) ? (
            <DataSpinner />
          ) : (
            <>
              {isEmpty(scholarshipList) ? (
                <DataNotFound message="No Registered Users yet. Check Later" />
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
                          <tr className="bg-dark text-white font600 text-sm">
                            <td width={30}>User Id</td>
                            <td>First Name</td>
                            <td width="50px">Last Name</td>
                            <td width="50px">Other Name</td>
                            <td width="50px">User Type</td>
                            <td width="100px">Email</td>
                            <td width="50px">Phone</td>
                            <td width="50px">Status</td>
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
                                <td>Status</td>
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
    </div>
  );
};


UserList.propTypes = {
  scholarshipList: PropTypes.oneOfType([object]).isRequired,
};

export default UserList;