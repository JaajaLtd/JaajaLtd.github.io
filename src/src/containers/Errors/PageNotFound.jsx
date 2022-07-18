import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSearchMinus, FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import RoutePaths from '../../config/routes/RoutePaths';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      <div className="mx-auto my-auto p-4 text-center">
        <FaSearchMinus className="text-danger mx-auto h1 d-block mb-3" />
        <div className="font600 text-danger h-3">RESOURCE NOT FOUND</div>

        <Button
          className="mt-4 font-weight-light"
          size="sm"
          variant="primary"
          onClick={() => history.replace(RoutePaths.dashboard.path)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
