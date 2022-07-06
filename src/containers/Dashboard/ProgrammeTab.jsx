import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput } from '../../components/common';
import { authActions } from '../../config/actions';
import { formatProgrammes } from '../../helpers/dataFormatter';

const ProgrammeTab = () => {
  const dispatch = useDispatch();
  const { authUser, currentStudentProgramme } = useSelector(
    (state) => state.auth
  );
  const [programmeOptions, setProgrammeOption] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(
    currentStudentProgramme.id
  );

  useEffect(() => {
    dispatch(authActions.getStudentProgrammes());
  }, []);

  const setCurrentStudentProgramme = (programme) => {
    dispatch(authActions.setCurrentStudentProgramme(programme, 'programme_id'));
  };

  useEffect(() => {
    if (authUser) {
      setProgrammeOption(formatProgrammes(authUser.academic_records || []));
      if (!isEmpty(authUser.academic_records)) {
        const findCurrentProgramme = authUser.academic_records.find(
          (programme) => programme.is_current_programme === true
        );
        const programme = findCurrentProgramme || authUser.academic_records[0];
        setCurrentStudentProgramme(programme);
        setSelectedProgramme(programme.programme_id);
      }
    }
  }, [authUser]);

  const handleChangeProgramme = (e) => {
    const { value } = e.target;
    if (value && !isEmpty(authUser.academic_records)) {
      setSelectedProgramme(value);
      const findProgramme = authUser.academic_records.find(
        (programme) =>
          parseInt(programme.programme_id, 10) === parseInt(value, 10)
      );
      if (findProgramme) setCurrentStudentProgramme(findProgramme);
    }
  };

  return (
    <>
      <Card.Header className="py-2 px-3 border-0 bg-light">
        {programmeOptions.length > 1 ? (
          <>
            <SelectInput
              type="select"
              selectOptions={programmeOptions}
              onChange={handleChangeProgramme}
              value={selectedProgramme}
              name="current_programme"
              label="PROGRAMME:"
              inline
            />
          </>
        ) : (
          <div className="text-sm font500 my-auto">
            <span className="text-primary me-1">PROGRAMME:</span>
            {`(${currentStudentProgramme.programme_code}) - ${currentStudentProgramme.programme_title}`}
          </div>
        )}
      </Card.Header>
    </>
  );
};

export default ProgrammeTab;
