
import React, { useEffect } from 'react';
import LoginFormComponent from "./../../components/core/home/login";
import { Redirect, useLocation } from "react-router-dom";
import * as main from "./../../constants/main";
import { URL_M_HOME } from '../../constants/url';

const Login = () => {
    const cauHinh = localStorage.getItem("login_setup");
    const location = useLocation();
    const qs = main.queryString.parse(location.search);

    useEffect(() => {
        document.title = "CSDL ATTP | Đăng nhập";
    }, []);

    const isMobile = /UnitechApp/i.test(window.navigator.userAgent) || /UnitechAppIos/i.test(window.navigator.userAgent);

    return (
        <React.Fragment>
            {isMobile && qs.mobile_redirect !== "home" && <Redirect to={URL_M_HOME} />}
            { cauHinh !== null && <LoginFormComponent loginDefault={cauHinh} />}
        </React.Fragment>
    );
}

export default Login;