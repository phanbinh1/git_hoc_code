import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import RequireExtendTemp from "./extend_temp";
import RequireNotExtendTemp from "./not_extend_temp";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import _ from 'lodash';
import * as actPermission from "./../../../actions/core/permission";
import * as act from "./../../../actions/index";
import * as actAuth from "./../../../actions/core/auth";
import * as main from "./../../../constants/main";
import * as constants from "./../../../constants/constants";
import * as url from "./../../../constants/url";
import * as modal from "./../../../constants/modal";
import * as message from "./../../../constants/message";
import * as actID from "./../../../constants/action_id";
import { Modal, notification } from "antd";

const TempRequireAuth = ({ routes = [] }) => {
    const [key, setKey] = useState(0);
    const routeExtendTemp = routes.filter(route => route.extendTemplate !== false);
    const routeNotExtendTemp = routes.filter(route => route.extendTemplate === false);

    const titlePage = null;

    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);

    useEffect(() => {
        try {
            const hashData = main.queryString.parse(location.hash, "hash");
            if (hashData.qrcodeUrl) {
                if (hashData.redirect === "admin") {
                    history.replace({
                        pathname: url.URL_QR_CODE,
                        search: `url=${hashData.qrcodeUrl}`
                    });
                }
                else {
                    const qrcodeUrl = main.validURL(decodeURIComponent(hashData.qrcodeUrl));
                    if (qrcodeUrl) {
                        window.location = decodeURIComponent(hashData.qrcodeUrl);
                    }
                    else {
                        Modal.info({
                            title: "QRCode",
                            content: decodeURIComponent(hashData.qrcodeUrl),
                            okText: "Đóng",
                            onCancel: () => history.replace({ hash: "" }),
                            onOk: () => history.replace({ hash: "" })
                        })
                    }
                }
            }
        }
        catch (e) { }
    }, [location.hash])

    const [subTitle, setSubTitle] = useState("");
    const [allowAccess, setAllowAccess] = useState(true);

    const auth = useSelector(state => state.core.auth);
    const menu_left = useSelector(state => state.core.permission.menu);
    const request_error = useSelector(state => state.core.request_error);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);

    const dispatch = useDispatch();
    const setAction = (arrAction = [{ key: actID.ACT_BACK, hidden: true }]) => dispatch(act.setAction(arrAction));
    const setPermissionPriviliged = (values) => dispatch(actPermission.setPermissionPriviliged(values));
    const requestError = (error = 401, value = true) => dispatch(act.requestError(error, value));
    const logout = () => dispatch(actAuth.logout());
    const reloginRequest = (handleSuccess, handleFail) => dispatch(actAuth.reloginRequest(handleSuccess, handleFail));

    // callback main
    const mainGetTitleFromMenu = useCallback(main.getTitleFromMenu(menu_left, location.pathname), [menu_left, location.pathname]);
    const mainSetPreviousPageUrlLocalStorage = (previousPageUrl) => main.setPreviousPageUrlLocalStorage(previousPageUrl);
    // Tương tự như componentDidUpdate
    // set lại subTitle
    useEffect(() => {
        let _subTitle = "", _accessAllowed = false;
        if (qs.replace_sub_title === "true") {
            if (qs.sub_title) {
                _subTitle = qs.sub_title;
            }
            else if (qs.action) {
                permission_priviliged.map((item) => {
                    if (item.idChucNang === qs.action) {
                        _subTitle = item.name;
                        _accessAllowed = true;
                    }
                    return null;
                });
                setAllowAccess(_accessAllowed);
            }
        }
        else {
            if (qs.sub_title) {
                _subTitle = qs.sub_title + " - ";
            }
            if (qs.action) {
                permission_priviliged.map((item) => {
                    if (item.idChucNang === qs.action) {
                        _subTitle += item.name;
                        _accessAllowed = true;
                    }
                    return null;
                });
                setAllowAccess(_accessAllowed);
            }
        }
        setSubTitle(_subTitle);
    }, [
        location,
        permission_priviliged,
        qs.sub_title,
        qs.replace_sub_title
    ]);

    useEffect(() => {
        setKey(k => k + 1);
    }, [permission_priviliged])


    useEffect(() => {
        const list = getPriviligeds(menu_left, location.pathname);
        setPermissionPriviliged(list);
        setAction();
    }, [location.pathname, menu_left]);

    useEffect(() => {
        const title = titlePage !== null ? titlePage : mainGetTitleFromMenu;
        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${constants.CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", constants.CONST_TITLE + title);
    }, [titlePage]);

    useEffect(() => {
        if (auth.hasOwnProperty("authenticated") && auth.authenticated && request_error.e_401) {
            const authentication = main.getAuth();
            if (authentication.scope === "read") {
                reloginRequest(() => message.error({ content: "Thao tác lỗi! Vui lòng thử lại", duration: 2 }));
                requestError(401, false);
                requestError(403, false);
                requestError(500, false);
            }
            else {
                const title_401 = "Thông báo";
                const content_401 = <div>Bạn đã hết thời gian truy cập. <br />Vui lòng đăng nhập lại để tiếp tục sử dụng</div>;
                const okText_401 = <span><i className="fa fa-sign-out m-r-10" />Đăng xuất</span>
                const onOk_401 = () => {
                    requestError(401, false);
                    requestError(403, false);
                    requestError(500, false);
                    logout();
                }
                modal.info(title_401, content_401, okText_401, onOk_401);
            }
        }
    }, [request_error.e_401]);

    useEffect(() => {
        if (auth.hasOwnProperty("authenticated") && auth.authenticated && request_error.e_403) {
            const title_403 = "Thông báo";
            const content_403 = <div>Bạn không có quyền thực hiện thao tác này! <br />Vui lòng liên hệ với quản trị viên!</div>;
            const okText_403 = "Đóng";
            const onOk_403 = () => {
                requestError(403, false);
                requestError(500, false);
                // history.push(url.URL_HOME);
            }
            modal.error(title_403, content_403, okText_403, onOk_403);
        }
    }, [request_error.e_403]);

    useEffect(() => {
        if (auth.hasOwnProperty("authenticated") && auth.authenticated && request_error.e_500) {
            message.warning({
                content: "Xử lý lỗi. Vui lòng thử lại.",
                key: "ERROR_500",
                onClose: () => requestError(500, false),
                duration: 3,
                placement: "bottomLeft"
            });
        }
    }, [request_error.e_500]);

    useEffect(() => {
        if (auth.hasOwnProperty("authenticated") && auth.authenticated && request_error.e_404) {
            message.warning({
                content: "Xử lý lỗi. Vui lòng thử lại.",
                key: "ERROR_404",
                onClose: () => requestError(404, false),
                duration: 3,
                placement: "bottomLeft"
            });
        }
    }, [request_error.e_404]);

    useEffect(() => {
        if (!auth.authenticated && location.pathname !== url.URL_LOGIN) {
            const previousPageUrl = location.pathname + location.search;
            mainSetPreviousPageUrlLocalStorage(previousPageUrl);
        }
    }, [auth.authenticated, location.pathname]);

    const getPriviligeds = (list, url, result = [], parentPermission = []) => {
        list.map((item) => {
            var res = [];
            if (url === item.url) {
                _.orderBy(item.children, ['sort'], ['asc']).map((val) => {
                    if (val.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                        res.push(val);
                    }
                    return [...res];
                })
                return result = [...parentPermission, ...res];
            }
            else {
                if (item && item.children && Array.isArray(item.children)) {
                    _.orderBy(item.children, ['sort'], ['asc']).map((val) => {
                        if (val.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                            res.push(val);
                        }
                        return [...res];
                    })
                }
                return result = getPriviligeds(item.children, url, result, [...parentPermission, ...res]);
            }
        });
        return result;
    };

    return <Fragment>
        <Switch>
            {!auth.authenticated && location.pathname !== url.URL_LOGIN ? <Redirect to={{ pathname: url.URL_LOGIN }} /> : (location.pathname === "/" && location.pathname !== url.URL_HOME) && <Redirect to={url.URL_HOME} />}
            <Route path={routeNotExtendTemp.map(item => item.path)}>
                <RequireNotExtendTemp contentKey={key} routes={routeNotExtendTemp} />
            </Route>
            <Route path={routeExtendTemp.map(item => item.path)}>
                <RequireExtendTemp
                    contentKey={key}
                    routes={routeExtendTemp}
                    subTitle={subTitle}
                    allowAccess={allowAccess}
                />
            </Route>
        </Switch>
    </Fragment>
}

export const checkPagePermission = (list, url, result = false) => {
    list.map((item) => {
        if (url === item.url) {
            return result = true;
        }
        else {
            return result = checkPagePermission(item.children, url, result);
        }
    });
    return result;
};

export default TempRequireAuth;