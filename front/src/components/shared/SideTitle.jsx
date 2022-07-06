import { Col, Image, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import DefaultLogo from '../../assets/img/default.png';

const SideTitle = () => {
  const { institutionStructure } = useSelector((state) => state.app);

  return (
    <Row wrap={false} gutter={[0, 0]}>
      <Col flex={2} className="my-auto">
        <Image
          src={`${process.env.REACT_APP_INSTITUTION_LOGO_PATH}/${institutionStructure?.institution_logo}`}
          fallback={DefaultLogo}
          alt="Logo"
          height={45}
          width={45}
          preview={false}
          className="my-auto"
        />
      </Col>
      <Col flex={3} className="text-center my-auto">
        <div className="px-2 text-primary text-md text-uppercase text-center font600">
          {institutionStructure?.institution_name || 'STUDENT PORTAL'}
        </div>
      </Col>
    </Row>
  );
};

export default SideTitle;
