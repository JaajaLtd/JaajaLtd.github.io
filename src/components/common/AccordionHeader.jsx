import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Accordion } from 'react-bootstrap';
//import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const AccordionHeader = ({
  activeKey,
  setActiveKey,
  eventKey,
  children,
  ...props
}) => {
  const handleActiveKeyState = () => {
    if (activeKey === eventKey) {
      setActiveKey(null);
    } else {
      setActiveKey(eventKey);
    }
  };/*
  const handleOnToggleClick = useAccordionButton(eventKey, () => {
    handleActiveKeyState();
  });*/

  return (
    <>
      <Accordion.Header
        className="text-info bg-white"
        {...props}
      >
        <div className="text-sm font600">{children}</div>
      </Accordion.Header>
    </>
  );
};

AccordionHeader.defaultProps = {
  activeKey: 1,
  eventKey: null,
  children: null,
};

AccordionHeader.propTypes = {
  activeKey: PropTypes.oneOfType([any]),
  setActiveKey: PropTypes.func.isRequired,
  eventKey: PropTypes.oneOfType([any]),
  children: PropTypes.oneOfType([any]),
};

export default AccordionHeader;
