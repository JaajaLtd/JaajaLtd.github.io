import { isEmpty } from 'lodash';
import PropTypes, { object } from 'prop-types';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { DataNotFound, InputText, SubmitButton, AlertMessage, SelectInput } from '../../components/common';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { removeEmptyOrNullObject } from '../../helpers/dataFormatter';
import React, { useEffect, useState } from 'react';

const AdvertForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const loginIn = useSelector((state) => state.auth.loginIn);
    const [error, setError] = useState(null);
    const onSubmit = (formData) => {
        setError(null);
        console.log(formData);
        if (!isEmpty(formData)) {
            //dispatch(authActions.loginUser(removeEmptyOrNullObject(data)));
        }
    };
    return (

        <Row className="row-deck justify-content-center w-100 overflow-hidden">
            <Col md={8}>
                <Card>
                    <Card.Header className="text-primary font600 py-3 text-sm">
                        <FaUser className="p-2" />
                        NEW SCHOLARSHIP ADVERT
                    </Card.Header>
                    <Card.Body className="bg-white">
                        <Row>
                            {!isEmpty(error) && (
                                <AlertMessage message={error} className="p-1 px-3 text-sm rounded-sm" />
                            )}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Col md={12}>
                                    <InputText
                                        label="Country Name"
                                        name="countryName"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Country field is required',
                                        })}
                                        error={get(errors, 'countryName.message')}
                                    />
                                    <InputText
                                        type="number"
                                        label="Number Of Scholarships"
                                        name="number_of_scholarships"
                                        inline
                                        requiredField
                                        defaultValue={1}
                                        minvalue={1}
                                        register={register({
                                            required: 'No. of Scholarship field is required',
                                        })}
                                        error={get(errors, 'number_of_scholarships.message')}
                                    />
                                    <InputText
                                        label="Academic Year"
                                        name="accademic_year"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Academic Year field is required',
                                        })}
                                        error={get(errors, 'accademic_year.message')}
                                    />
                                    <InputText
                                        label="Advert Link"
                                        name="advert"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Advert Link field is required',
                                        })}
                                        error={get(errors, 'advert.message')}
                                    />
                                    <InputText
                                        type="date"
                                        label="Date of Shortlisting"
                                        name="short_listing_date"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Short List Date is required',
                                        })}
                                        error={get(errors, 'short_listing_date.message')}
                                    />
                                    <InputText
                                        type="date"
                                        label="Interview Date"
                                        name="interview_date"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Interview Date field is required',
                                        })}
                                        error={get(errors, 'interview_date.message')}
                                    />
                                    <InputText
                                        type="date"
                                        label="Departure Date"
                                        name="departure_date"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Departure Date field is required',
                                        })}
                                        error={get(errors, 'departure_date.message')}
                                    />
                                    <InputText
                                        label="Current Study Year"
                                        name="student_current_year"
                                        inline
                                        requiredField
                                        register={register({
                                            required: 'Student Current Year, is required',
                                        })}
                                        error={get(errors, 'student_current_year.message')}
                                    />
                                </Col>
                                <Col md={3}>
                                    <SubmitButton
                                        className="text-uppercase text-white text-sm mt-3 w-100 mb-2 font600"
                                        text="Create"
                                        loading={loginIn}
                                        iconBefore={<FaSignInAlt className="me-1" />}
                                        loadingText="Signing in..."
                                    />
                                </Col>
                            </Form>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

AdvertForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AdvertForm;
