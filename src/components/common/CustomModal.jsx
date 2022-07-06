import PropTypes, { any } from 'prop-types';
import React from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { settingActions } from '../../config/actions';

const CustomModal = ({ title, children, size, ...props }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.setting.showModal);

  const handleClose = () => {
    dispatch(settingActions.setShowModal(false));
  };

  return (
    <>
      <Modal
        size={size}
        show={showModal}
        onHide={handleClose}
        centered
        animation
        {...props}
      >
        <ModalHeader className="py-2 bg-primary border-bottom">
          <ModalTitle className="text-sm font700 text-uppercase my-auto text-white">
            {title}
          </ModalTitle>
          <div className="card-options">
            <Button
              variant="link"
              size="sm"
              onClick={handleClose}
              className="text-danger bg-white text-xs text-uppercase font600"
            >
              <FaTimes />
            </Button>
          </div>
        </ModalHeader>
        {children}
      </Modal>
    </>
  );
};

CustomModal.defaultProps = {
  children: null,
  size: 'md',
};

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([any]),
  size: PropTypes.string,
};

export default CustomModal;
