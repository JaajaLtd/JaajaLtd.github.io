import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { FaReply } from 'react-icons/fa';

const Refund = ({ setCurrentTab }) => {
  return (
    <Card>
      <Card.Header className="py-2">
        <div className="text-uppercase font600 text-primary">
          APPLY FOR REFUND
        </div>
        <div className="card-options">
          <Button
            size="sm"
            onClick={() => setCurrentTab('service-dashboard')}
            className="text-sm font600 text-uppercase"
            variant="warning"
          >
            <FaReply className="me-1" />
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <div>APPLY HERE</div>
      </Card.Body>
    </Card>
  );
};

Refund.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};

export default Refund;
