import React from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { SubmitButton } from '../../components/common';

const ViewMore = ({ ...props }) => {
  return (
    <>
      <SubmitButton
        iconBefore={<FaFilePdf className="me-1 text-sm" />}
        variant="warning"
        text="View More"
        loadingText="Loading..."
        className="text-sm text-uppercase font500 p-1 px-2"
        size="md"
        {...props}
      />
    </>
  );
};

export default ViewMore;
