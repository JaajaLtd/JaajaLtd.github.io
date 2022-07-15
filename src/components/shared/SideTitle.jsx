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
          src={process.env.PUBLIC_URL + "/assets/img/default.png"}
          fallback={DefaultLogo}
          alt="Logo"
          height={45}
          width={90}
          preview={false}
          className="my-auto"
        />
      </Col>
      <Col flex={3} className="text-center my-auto">
        <div className="px-2 text-primary text-md text-uppercase text-center font600">
          {'M.O.E.S - HESMIS PORTAL'}
        </div>
      </Col>
    </Row>
  );
};

export default SideTitle;
