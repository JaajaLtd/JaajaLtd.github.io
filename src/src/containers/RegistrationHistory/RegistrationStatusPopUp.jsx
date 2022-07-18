import { get, isEmpty } from 'lodash';
import PropTypes, { object, array } from 'prop-types';
import React from 'react';
import { Form, ModalBody, ModalFooter, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  CustomModal,
  SelectInput,
  SubmitButton,
} from '../../components/common';
import { settingActions } from '../../config/actions';

const RegistrationStatusPopUp = ({
  rowData,
  setSelectedRow,
  registrationStatusOptions,
  selectedCourseUnits,
}) => {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = (data) => {
    if (!isEmpty(data)) {
      const newObjectKey = {
        ...rowData,
        registrationStatus: registrationStatusOptions.find(
          (status) => status.value === data.registration_status
        ),
      };
      const findCourseUnit = selectedCourseUnits.find(
        (courseUnit) => courseUnit.course_unit_id === rowData.course_unit_id
      );
      if (!findCourseUnit) {
        setSelectedRow([...selectedCourseUnits, newObjectKey]);
      } else {
        const changeValue = selectedCourseUnits.map((courseUnit) => {
          if (courseUnit.course_unit_id === findCourseUnit.course_unit_id) {
            return {
              ...courseUnit,
              registrationStatus: registrationStatusOptions.find(
                (status) => status.value === data.registration_status
              ),
            };
          }
          return courseUnit;
        });
        setSelectedRow(changeValue);
      }
      dispatch(dispatch(settingActions.setShowModal(false)));
    }
  };
  return (
    <div>
      <CustomModal
        backdrop="static"
        keyboard={false}
        title="SELECT REGISTRATION STATUS"
      >
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <ModalBody>
            <Table size="sm" bordered responsive className="text-sm">
              <thead className="text-xs bg-light">
                <tr>
                  <th>CODE</th>
                  <th>COURSE TITLE</th>
                  <th>CU</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{rowData.course_unit_code}</td>
                  <td>{rowData.course_unit_name}</td>
                  <td>{rowData.credit_unit}</td>
                </tr>
              </tbody>
            </Table>

            <SelectInput
              register={register({
                required: 'Select Registration Status',
              })}
              name="registration_status"
              selectOptions={registrationStatusOptions}
              label="Registration Status"
              error={get(errors, 'registration_status.message')}
            />
          </ModalBody>
          <ModalFooter className="py-2 bg-light">
            <SubmitButton text="ADD COURSE" />
          </ModalFooter>
        </Form>
      </CustomModal>
    </div>
  );
};

RegistrationStatusPopUp.defaultProps = {
  registrationStatusOptions: [],
  selectedCourseUnits: [],
};

RegistrationStatusPopUp.propTypes = {
  rowData: PropTypes.oneOfType([object]).isRequired,
  setSelectedRow: PropTypes.func.isRequired,
  registrationStatusOptions: PropTypes.oneOfType([array]),
  selectedCourseUnits: PropTypes.oneOfType([array]),
};

export default RegistrationStatusPopUp;
