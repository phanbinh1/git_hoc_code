import React, { Fragment, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";
import * as url from "./../../constants/url";

const ForgotPassword = () => {
    const [email, setEmail] = useState(null);

    return <Fragment>
        <div className="login-wrapper">
            <div className="login-form">
                <div className="login-title">
                    QUÊN MẬT KHẨU
                        </div>
                <Form className="login-body">
                    <Form.Item>
                        <Input
                            prefix={<i className="fa fa-user-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            allowClear
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item style={{ width: "50%", display: "inline-block", padding: "0 5px" }}>
                            <Link to={url.URL_LOGIN}>
                                <i className="fa fa-sign-in m-r-5" />Đăng nhập
                            </Link>
                        </Form.Item>
                        <Form.Item style={{ width: "50%", display: "inline-block", padding: "0 5px" }}>
                            <Button
                                block
                                disabled={!email}
                                type="success"
                            >
                                <i className="fa fa-check-circle m-r-10 m-l-10" />
                                <span>Xác nhận</span>
                            </Button>
                        </Form.Item>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </Fragment >
}


export default ForgotPassword;
