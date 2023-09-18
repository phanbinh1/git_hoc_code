import * as api from "./../../util/api_call";
import * as url from "./../../constants/url";
import * as type from './../../constants/type';
import * as apiUrl from './../../constants/api';
import * as main from "./../../constants/main";
import * as message from "./../../constants/message";
import * as actAccountCurrent from "./account_current";
import * as actPermission from "./permission";
import { Modal } from "antd";

export const postLoginRequest = (value, handleLoginFail, handleLoginSuccess) => {
    var { controller } = value;
    var scope = value.remember ? "read" : "ui";
    var data = `scope=${scope}&username=${value.username}&password=${value.password}&grant_type=password`;
    return dispatch => {
        return api.authRequest({
            url: apiUrl.API_LOGIN,
            data,
            controller
        }).then(res => {
            localStorage.setItem("login-case", "false");
            if (res && res.statusCode === 200) {
                handleLoginSuccess(res);
                const uuid = main.createID();
                localStorage.setItem("uuid", uuid);
                dispatch(onLoginSuccess(res));
            }
            else {
                if (res.statusCode === 401 && res.error_description === "CUSTOM_ACCOUNT_BLOCK") {
                    Modal.error({
                        content: "Tài khoản đã bị khoá do đăng nhập sai quá nhiều lần!"
                    })
                }
                else if (parseInt(res.rest_attempt_login, 0) < 2) {
                    Modal.warning({
                        content: `Tài khoản sẽ bị khoá sau ${parseInt(res.rest_attempt_login, 0) + 1} lần đăng nhập sai!`
                    })
                }
                handleLoginFail(res);
                return dispatch({ type: type.TYPE_AUTHENTICATION_ERROR, error: false });
            }
        });
    }
}

export const reloginRequest = (handleSuccess, handleFail) => {
    var auth = main.getAuth();
    var data = `grant_type=refresh_token&refresh_token=${auth.refresh_token}`;
    return dispatch => {
        return api.authRequest({
            url: apiUrl.API_LOGIN,
            data
        }).then(res => {
            localStorage.setItem("login-case", "false");
            if (res) {
                if (handleSuccess instanceof Function) {
                    handleSuccess();
                }
                main.setAuth(res);
            }
            else {
                if (handleFail instanceof Function) {
                    handleFail();
                }
                return dispatch({ type: type.TYPE_AUTHENTICATION_ERROR, error: false });
            }
        });
    }
}

export const loginCase = ({ ticket, loginSuccess, loginFail }) => {
    var service = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${url.URL_LOGIN}`;
    var data = "ticket=" + ticket + "&service=" + service;
    return (dispatch) => {
        return fetch(`${apiUrl.API_LOGIN_CASE}?${data}`, {
            method: 'POST',
            headers: {
                Authorization: 'Basic YnJvd3Nlcjo=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        }).then(function (resp) {
            switch (resp.status) {
                case 200:// thanh cong
                    return resp.json();
                case 401:// khong co quyen
                    return resp.json();
                case 400:// khong co quyen
                    return resp.json();
                default:
                    return false;
            }
        }).then(res => {
            if (res) {
                if (res && res.status === false) {
                    loginFail();
                    localStorage.setItem("login-case", "false");
                }
                else {
                    loginSuccess();
                    localStorage.setItem("login-case", "true");
                    const uuid = main.createID();
                    localStorage.setItem("uuid", uuid);
                    dispatch(onLoginSuccess(res));
                }
            }
            else {
                loginFail();
                localStorage.setItem("login-case", "false");
                return dispatch({ type: type.TYPE_AUTHENTICATION_ERROR, error: false });
            }
        });
    }
}

export const onLoginSuccess = (res) => {
    return dispatch => {
        main.setAuth(res);
        dispatch(actAccountCurrent.getAccountCurrentRequest());
        return dispatch(actPermission.getMenuLeftRequest({
            requestSuccess: () => dispatch({ type: type.TYPE_AUTHENTICATED }
            )
        }));
    }
}


export const logout = () => {
    const isLoginCase = localStorage.getItem("login-case");
    if (isLoginCase && isLoginCase === "true") {
        return dispatch => {
            localStorage.setItem("login-case", "false");
            const service = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${url.URL_LOGIN}`;
            const hrefEGov = "https://dangnhap.danang.gov.vn/cas/login?service=" + service;
            const hrefLogout = "https://dangnhap.danang.gov.vn/cas/logout?service=" + service;
            const iframeLogout = document.createElement("iframe");
            iframeLogout.src = hrefLogout;
            iframeLogout.style.display = "none";
            document.body.appendChild(iframeLogout);
            iframeLogout.addEventListener("load", () => {
                dispatch({ type: type.TYPE_UNAUTHENTICATED });
                document.body.removeChild(iframeLogout);
                window.location = hrefEGov;
            });
        }
    }
    else {
        return dispatch => {
            dispatch({ type: type.TYPE_UNAUTHENTICATED });
        }
    }
}

export const destroyToken = (handleSuccess, handleFail) => {
    return () => {
        return api.destroyToken({
            url: apiUrl.API_DESTROY_TOKEN
        }).then(res => {
            if (res) {
                if (handleSuccess instanceof Function) {
                    handleSuccess();
                }
            }
            else {
                if (handleFail instanceof Function) {
                    handleFail();
                }
            }
        });
    }
}

export const registerRequest = (object = {}) => {
    var { data, requestSuccess, requestError, controller } = main.checkValidObjectRequest(object);
    return dispatch => {
        console.log(data);
        return api.register({
            url: `${apiUrl.API_ACCOUNT}create`,
            data,
            controller
        }).then(res => {
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                requestSuccess(res);
            }
            else {
                res.msg && message.error({ content: res.msg });
                requestError();
            }
        });
    }
}