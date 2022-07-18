import React from 'react';
import { Card } from 'react-bootstrap';
import { FaLaptopCode } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ComingSoon = () => {
  const { selectedMenu } = useSelector((state) => state.setting);
  return (
    <Card className="d-flex h-100 border-top">
      <Card.Body className="my-auto mx-auto text-center text-primary py-4">
        <FaLaptopCode className="d-block display-1 mb-3 mx-auto" />
        <div className="text-md text-info font600 text-uppercase">
          {`${selectedMenu.title || 'FEATURE'} UNDER CONSTRUCTION...`}
        </div>
      </Card.Body>
    </Card>
  );
};

ComingSoon.propTypes = {};

export default ComingSoon;
