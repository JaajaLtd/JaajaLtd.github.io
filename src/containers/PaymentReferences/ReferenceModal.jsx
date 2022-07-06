import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalFooter } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, CustomModal } from '../../components/common';
import { settingActions } from '../../config/actions';
import usePrevious from '../Hooks/usePrevious';

const ReferenceModal = ({ switchTab }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [generatedReference, setGeneratedReference] = useState({});
  const { generateSuccess, generateError } = useSelector(
    (state) => state.paymentReference
  );
  const showModal = useSelector((state) => state.setting.showModal);
  const prevState = usePrevious({ generateSuccess, generateError });

  useEffect(() => {
    if (
      !isEmpty(prevState) &&
      !isEmpty(generateSuccess) &&
      generateSuccess !== prevState.generateSuccess
    ) {
      setGeneratedReference(generateSuccess);
      dispatch(settingActions.setShowModal(true));
      if (switchTab) switchTab();
    }
    if (
      !isEmpty(prevState) &&
      !isEmpty(generateError) &&
      generateError !== prevState.generateError
    ) {
      setErrorMessage(
        generateError?.error?.message || generateError?.server?.message
      );
    }
  }, [generateSuccess, generateError]);

  return (
    <>
      {errorMessage && <AlertMessage message={errorMessage} />}
      {!isEmpty(generatedReference) && showModal && (
        <CustomModal
          backdrop="static"
          keyboard={false}
          title="PAYMENT REFERENCE GENERATED SUCCESSFULLY"
        >
          <ModalBody className="text-center">
            <div className="text-md font600er">
              <FaCheckCircle className="text-success me-1" />
              PAYMENT REFERENCE NO.:
              <span className="text-sm font600 text-success mx-1">
                {generatedReference.ura_prn}
              </span>
            </div>

            <div className="text-sm font600er">
              TOTAL AMOUNT TO PAY:
              <span className="text-sm font600 text-success mx-1">
                {`${parseInt(
                  generatedReference.amount,
                  10
                ).toLocaleString()} UGX`}
              </span>
            </div>

            <div className="text-xs font600er mt-2">
              DATE OF EXPIRY:
              <span className="text-xs font600 text-danger mx-2">
                {generatedReference.expiry_date}
              </span>
            </div>

            <AlertMessage
              message="Copy this reference number and go to your nearest Bank to make your payments."
              variant="info"
              className="text-center font600 p-1 my-2 text-sm"
            />
          </ModalBody>
          <ModalFooter className="py-2 bg-light border-top">
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch(settingActions.setShowModal(false))}
              className="text-uppercase"
            >
              Close
            </Button>
          </ModalFooter>
        </CustomModal>
      )}
    </>
  );
};

ReferenceModal.defaultProps = {
  switchTab: null,
};

ReferenceModal.propTypes = {
  switchTab: PropTypes.func,
};

export default ReferenceModal;
