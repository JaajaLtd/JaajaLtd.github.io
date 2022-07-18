import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTwo from '../../components/HeaderTwo';
import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import FooterTwo from '../../components/FooterTwo';
import { Styles } from './styles/account.js';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import usePrevious from '../../src/containers/Hooks/usePrevious';
import { authActions } from '../../src/config/actions';
import RoutePaths from '../../src/config/routes/RoutePaths';
import { removeEmptyOrNullObject } from '../../src/helpers/dataFormatter';
import { isEmpty, get } from 'lodash';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
    const { register, handleSubmit, errors } = useForm();
    const loginIn = useSelector((state) => state.auth.loginIn);
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [cookies, setCookie] = useCookies();
    const { loginError, loginData, isAuthenticated } = useSelector(
        (state) => state.auth
    );
    const previousState = usePrevious({ loginError, loginData });
    const accessToken = cookies.auth_access;

    useEffect(() => {
        if (!isEmpty(accessToken?.token) && isAuthenticated === true) {
            dispatch(authActions.setIsAuthenticated(true));
        }
    }, []);

    useEffect(() => {
        if (
            !isEmpty(previousState) &&
            !isEmpty(loginData) &&
            previousState.loginData !== loginData
        ) {
            if (loginData.server?.status === true) {
                setCookie('auth_access', loginData.access_token, {
                    path: '/dashboard',
                    sameSite: true,
                });
                dispatch(authActions.setIsAuthenticated(true));
            }
        }
    }, [loginData]);

    useEffect(() => {
        if (
            !isEmpty(previousState) &&
            !isEmpty(loginError) &&
            previousState.loginError !== loginError
        ) {
            const message =
                loginError.error?.message ||
                loginError.error ||
                loginError.server.message;
            setError(message);

            if (message === 'Please change your default password before login in.') {
                setTimeout(() => {
                    //  setCurrentPage(RoutePaths.resetPassword.path);
                }, 2000);
            }
        }
    }, [loginError]);

    const onSubmit = (data) => {
        console.log(data)
        setError(null);
        if (!isEmpty(data)) {
            dispatch(authActions.loginUser(removeEmptyOrNullObject(data)));
        }
    };

    return (
        <Styles>
            {/* Main Wrapper */}
            <div className="main-wrapper login-page">

                {/* Header 2 */}
                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Log In" />

                {/* Login Area */}
                <section className="login-area">
                    <Container>
                        <Row>
                            <Col md="12">
                                <div className="login-box">
                                    <div className="login-title text-center">
                                        <h3>Log In</h3>
                                    </div>
                                    <form id="form_login" className="form" onSubmit={handleSubmit(onSubmit)}>
                                        <p className="form-control my-4">
                                            <label htmlFor="login_user">User Name</label>
                                            <input
                                                type="text"
                                                placeholder="Email"
                                                name="email"
                                                id="login_user"
                                                {...register("email",{
                                                    required: 'Email field is required',
                                                })}
                                            />
                                            <span className="login_input-msg"></span>
                                        </p>
                                        <p className="form-control my-4">
                                            <label htmlFor="login_password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="*******"
                                                id="login_password"
                                                {...register("password",{
                                                    required: 'Password is required',
                                                })}
                                            />
                                            <span className="login_input-msg"></span>
                                        </p>
                                        <button className="my-4"                                        >Log In</button>
                                        <div className="save-forget-password d-flex justify-content-between">
                                            <div className="save-passowrd">
                                                <label htmlFor="save_password"><input type="checkbox" id="save_password" className="check-box" />Save Password</label>
                                            </div>
                                            <div className="forget-password">
                                                <Link to={process.env.PUBLIC_URL + "/"}>Forget Password?</Link>
                                            </div>
                                        </div>
                                        <div className="not_account-btn text-center my-2">
                                            <p>Haven't Any Account Yet? <Link to={process.env.PUBLIC_URL + "/registration"}>Click Here</Link></p>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Footer 2 */}
                <FooterTwo />

            </div>
        </Styles>
    )
}

export default Login