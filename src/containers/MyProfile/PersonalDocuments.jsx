import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaTimes, FaUserGraduate } from 'react-icons/fa';
import { DataNotFound, InputText } from '../../components/common';
import { Button, Upload } from 'antd';

const PersonalDocument = ({ authUser }) => {

    const handleOnChange = (data) => {
        console.log(data)
    }
    const fileList = [
        {
            uid: 'tys1',
            name: 'Admission Letter.png',
            status: 'done'
        },
        {
            uid: 'frdgt',
            name: 'Passport.png',
            status: 'done'
        },
        {
            uid: '7684439',
            name: 'National Id.png',
            status: 'done'
        },
        {
            uid: '768734t5',
            name: 'Offer Letter.pdf',
            status: 'done'
         }
    ];
    return (
        <Card>
            <Card.Header className="py-3 text-primary font600 text-sm text-success mb-0">
                UPLOAD DOCUMENTS RELEVANT TO YOUR APPLICATION PROCESS.
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md={6}>
                        <InputText
                            type="file"
                            label="National ID"
                            name="national-id"
                            inline
                            accept="image/*,.pdf"
                        />
                        <InputText
                            type="file"
                            label="Passport Bio Page"
                            name="passport-bio-page"
                            inline
                            accept="image/*,.pdf"
                        />
                        <InputText
                            type="file"
                            label="Scholarship Offer Letter"
                            name="scholarship-offer-letter"
                            inline
                            accept="image/*,.pdf"
                        />
                        <InputText
                            type="file"
                            label="Application Letter"
                            name="application-letter"
                            inline
                            accept="image/*,.pdf"
                        />
                        <InputText
                            type="file"
                            label="Institution Admission Letter"
                            name="admission-letter"
                            inline
                            accept="image/*,.pdf"
                        />
                        <InputText
                            type="file"
                            label="Award Letter"
                            name="award-letter"
                            inline
                            accept="image/*,.pdf"
                        />
                    </Col>
                    <Col md={6}>
                        {!isEmpty(fileList) ? (
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                maxCount={1}
                                defaultFileList={[...fileList]}
                                onChange={handleOnChange}
                                showDownloadIcon={true}
                                downloadIcon='Download'
                                showRemoveIcon={true}
                                removeIcon={<FaTimes onClick={e => console.log(e, 'custom removeIcon event')} />}

                            >
                            </Upload>
                        ) : (
                            <DataNotFound message="You have No Documents Uploaded Yet." />
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

PersonalDocument.propTypes = {
    authUser: PropTypes.oneOfType([object]).isRequired,
};

export default PersonalDocument;
