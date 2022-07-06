import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import SubmitButton from './SubmitButton';

const ReloadButton = ({ ...props }) => {
  return (
    <>
      <SubmitButton
        iconBefore={<FaSyncAlt className="me-1 text-sm" />}
        variant="warning"
        text="RELOAD"
        loadingText="Loading..."
        className="text-sm text-uppercase font500 p-1 px-2"
        size="md"
        {...props}
      />
    </>
  );
};

export default ReloadButton;
