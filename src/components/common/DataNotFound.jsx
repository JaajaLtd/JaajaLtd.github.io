import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Empty } from 'antd';

const DataNotFound = ({ message, children, ...props }) => {
  return (
    <div className="p-4 text-danger font600 text-uppercase">
      <Empty description={message} className="text-sm" {...props} />
      {children}
    </div>
  );
};
DataNotFound.defaultProps = {
  children: null,
  message: 'Data Not Found',
};

DataNotFound.propTypes = {
  message: PropTypes.string,
  children: PropTypes.oneOf([any]),
};

export default DataNotFound;
