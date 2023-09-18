import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AbortController from "abort-controller"
import { Form, Input, Button, Checkbox, Spin, Modal } from 'antd';
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import * as actAuth from "./../../../actions/core/auth";
import * as url from "./../../../constants/url";
import * as constants from "./../../../constants/constants";
import * as message from "./../../../constants/message";
import * as main from "./../../../constants/main";
import { cauHinhOptions } from "./../../../App";
import version from "./../../../constants/version";

const LoginForm = ({ form, loginDefault }) => {
    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);
    const [loginBy, setLoginBy] = useState(loginDefault);
    const [isLoading, setIsLoading] = useState(true);
    const [showCancelBtn, setShowCancelBtn] = useState(true);
    const [controller, setController] = useState(new AbortController());
    const [previousPageUrl] = useState(main.getPreviousPageUrlLocalStorage());
    const [hrefEGov] = useState(`https://dangnhap.danang.gov.vn/cas/login?service=${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${url.URL_LOGIN}`);
    const dispatch = useDispatch();
    const postLoginRequest = (value, handleLoginFail, handleLoginSuccess) => dispatch(actAuth.postLoginRequest(value, handleLoginFail, handleLoginSuccess));
    const loginCase = ({ ticket, loginFail, loginSuccess }) => dispatch(actAuth.loginCase({ ticket, loginFail, loginSuccess }));

    const auth = useSelector(state => state.core.auth);
    const account_current = useSelector(state => state.core.account_current);
    useEffect(() => {
        if (loginBy === cauHinhOptions.BY_ACCOUNT) {
            setIsLoading(false);
        }
        else if (qs.ticket) {
            setIsLoading(true);
            setShowCancelBtn(false);
            loginCase({
                ticket: qs.ticket,
                loginFail: handleLoginEgovFail,
                loginSuccess: handleLoginSuccess,
            });
        }
        else if (loginBy === cauHinhOptions.BY_ALL) {
            setIsLoading(false);
        }
        else if (loginBy === cauHinhOptions.BY_EGOV) {
            window.location.href = hrefEGov;
        }
    }, [qs.ticket, hrefEGov])

    const { getFieldDecorator } = form;

    const handleLoginFail = () => {
        message.error({ content: "Đăng nhập không thành công!" });
        document.title = constants.CONST_TITLE + "Đăng nhập | Lỗi!!!";
        document.body.setAttribute("_title", constants.CONST_TITLE + "Đăng nhập | Lỗi!!!");
        setIsLoading(false);
    }

    const handleLoginEgovFail = () => {
        document.title = constants.CONST_TITLE + "Đăng nhập | Lỗi!!!";
        document.body.setAttribute("_title", constants.CONST_TITLE + "Đăng nhập | Lỗi!!!");
        Modal.confirm({
            title: "Đăng nhập thất bại!",
            content: <Fragment>
                Không thể liên kết tài khoản từ egov đến hệ thống. <br />
                Vui lòng chọn <b>Thử lại</b> hoặc <b>Đăng nhập bằng tài khoản hệ thống</b>
            </Fragment>,
            okText: <Fragment>Thử lại</Fragment>,
            cancelText: <Fragment>Đăng nhập bằng tài khoản hệ thống</Fragment>,
            onOk: () => {
                window.location = hrefEGov;
            },
            onCancel: () => {
                setIsLoading(false);
                localStorage.setItem("login-case", "false");
                const hrefLogout = "https://dangnhap.danang.gov.vn/cas/logout";
                const iframeLogout = document.createElement("iframe");
                iframeLogout.src = hrefLogout;
                iframeLogout.style.display = "none";
                document.body.appendChild(iframeLogout);
                iframeLogout.addEventListener("load", () => {
                    document.body.removeChild(iframeLogout);
                });
                localStorage.setItem("login_setup", "BY_ALL");
                setLoginBy("BY_ALL");
                history.push(url.URL_LOGIN);
            }
        })
    }

    const handleLoginSuccess = (res) => {
        message.success({ content: "Đăng nhập thành công!", duration: 1 });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        setShowCancelBtn(true);
        const controller = new AbortController();
        setController(controller);
        form.validateFields((err, values) => {
            if (!err) { postLoginRequest({ ...values, controller }, handleLoginFail, handleLoginSuccess); }
            else { setIsLoading(false); }
        });
    };

    const cancelLogin = () => controller.abort();
    const isMobile = document.body.getAttribute("_enviroment") === "app";
    return (
        <React.Fragment>
            {
                auth.authenticated &&
                <Redirect
                    to={previousPageUrl.substr(0, 13) === url.URL_QR_CODE || isMobile ?
                        previousPageUrl :
                        account_current && account_current.managementDepartment === constants.CONST_PHONG_BAN.LANHDAO ?
                            url.URL_DASHHBOARD :
                            url.URL_HOME}
                />
            }
            <div className="login-wrapper">
                {
                    loginBy !== cauHinhOptions.BY_EGOV &&
                    <div className="login-form">
                        <div className="login-title" style={{ background: isLoading ? "rgb(35, 76, 100,.4)" : "rgb(35, 76, 100,.9)" }}>
                            ĐĂNG NHẬP
                            <small style={{ fontWeight: "normal", fontSize: "10px" }}>
                                @_{version.current.version}
                            </small>
                        </div>
                        <Spin
                            size="large"
                            spinning={isLoading}
                            tip={<div style={{ margin: "auto", marginTop: "10px" }}>
                                {showCancelBtn && <Button size="small" onClick={cancelLogin}>
                                    <i className="fa fa-times m-r-10" />Hủy
                                </Button>
                                }
                            </div>}
                        >
                            <Form onSubmit={handleSubmit} className="login-body">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }],
                                    })(
                                        <Input
                                            disabled={isLoading}
                                            prefix={<i className="fa fa-user-o" type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Tên đăng nhập"
                                            allowClear
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
                                    })(
                                        <Input.Password
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                            prefix={<i className="fa fa-lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Mật khẩu"
                                            allowClear
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: '50%' }}>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox disabled={isLoading} className="checkbox-success">
                                                Ghi nhớ đăng nhập
                                        </Checkbox>
                                        )}
                                    </Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: '50%', textAlign: "right" }}>
                                        <Link to={url.URL_FORGOT_PASSWORD}>Quên mật khẩu</Link>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" block loading={isLoading} type="primary">
                                        <i className="fa fa-sign-in m-r-10 m-l-10" />
                                        <span>Đăng nhập</span>
                                    </Button>
                                    {
                                        loginBy === cauHinhOptions.BY_ALL &&
                                        < Button type="dashed" block loading={isLoading} onClick={() => { window.location.href = hrefEGov }} >
                                            <i className="fa fa-sign-in m-r-10 m-l-10" />
                                            <span>Đăng nhập bằng eGov Đà Nẵng</span>
                                        </Button>
                                    }
                                </Form.Item>
                                {isMobile && <Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: '50%' }}>
                                        {/* <a href="/privacy-policy.html">Chính sách/Policy</a> */}
                                        <Link to={url.URL_POLICY} >
                                            Chính sách/Policy
                                            </Link>
                                    </Form.Item>
                                    <Form.Item style={{ display: 'inline-block', width: '50%' }}>
                                        <Button type="success" block href={url.URL_REGISTER}>
                                            <Link to={url.URL_REGISTER} style={{ color: "#fff" }}>
                                                Đăng ký
                                            </Link>
                                        </Button>
                                    </Form.Item>
                                </Form.Item>}
                            </Form>
                        </Spin>
                    </div>
                }
            </div>
        </React.Fragment >
    );
}

export default Form.create({ name: 'FORM_LOGIN' })(LoginForm);
