import { Image } from 'antd';
import { isEmpty, orderBy, pick, toArray } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React, { Fragment } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import DefaultAvatar from '../../assets/img/avatar.png';

const MyResult = ({ result }) => {
  return (
    <div>
      <Row className="row-deck mb-2 gx-0 gy-2">
        <Col md={2}>
          <Card body className="text-center border-0 my-auto">
            <Image
              height={100}
              width={100}
              src={`${process.env.REACT_APP_STUDENTS_PHOTO_URL}/${result.avatar}`}
              fallback={DefaultAvatar}
              className="rounded"
              preview={false}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="border-0">
            <Row className="row-deck g-0">
              <Col md={6}>
                <Table
                  size="sm"
                  borderless
                  width="100%"
                  className="text-sm text-uppercase overflow-auto font500 table-sm m-0 w-100"
                  responsive
                >
                  <tbody>
                    <tr>
                      <td>Full Name:</td>
                      <td className="font600">
                        {`${result.firstname || ''} ${result.lastname || ''} ${
                          result.other_name || ''
                        } `}
                      </td>
                    </tr>
                    <tr>
                      <td>Student No.:</td>
                      <td className="font600">
                        {`${result.student_number || ''}`}
                      </td>
                    </tr>
                    <tr>
                      <td>Reg. No.:</td>
                      <td className="font600">
                        {`${result.registration_number || ''}`}
                      </td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td className="font600">{`${result.gender || ''}`}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth:</td>
                      <td className="font600">
                        {`${result.date_of_birth || ''}`}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table
                  size="sm"
                  borderless
                  className="text-sm border-0 text-uppercase font500 table-sm m-0"
                  responsive
                >
                  <tbody>
                    <tr>
                      <td>Faculty:</td>
                      <td className="font600">
                        {`${result.faculty_title || ''}`}
                      </td>
                    </tr>
                    <tr>
                      <td>Department:</td>
                      <td className="font600">{result.department_title}</td>
                    </tr>
                    <tr>
                      <td>Programme:</td>
                      <td className="font600">
                        {`(${result.programme_code}) ${result.programme_title}`}
                      </td>
                    </tr>
                    <tr>
                      <td>Study Type:</td>
                      <td className="font600">
                        {`${result.programme_type || ''}`}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={2}>
          <Card body className="text-center border-0 b-0 my-auto">
            <QRCode
              size={90}
              value={JSON.stringify(
                pick(result, [
                  'student_number',
                  'programme_title',
                  'registration_number',
                ])
              )}
            />
          </Card>
        </Col>
      </Row>

      <hr />

      <Table
        size="sm"
        cellPadding={5}
        bordered
        responsive
        striped
        className="text-sm font500 border table-sm"
      >
        {result.semesters?.map((semester) => (
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
  );
};

MyResult.propTypes = {
  result: PropTypes.oneOfType([object]).isRequired,
};

export default MyResult;
