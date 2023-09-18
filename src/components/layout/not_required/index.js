import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import NotRequireExtendTemp from "./extend_temp";
import NotRequireNotExtendTemp from "./not_extend_temp";
import { useSelector } from 'react-redux';
import _ from 'lodash';
import * as main from "./../../../constants/main";
import * as constants from "./../../../constants/constants";
import { URL_QR_CODE } from "../../../constants/url";
import { Modal, notification } from "antd";


const TempNotRequireAuth = ({ routes = [] }) => {
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
                        pathname: URL_QR_CODE,
                        search: `url=${hashData.qrcodeUrl}`
                    });
                }
                else {
                    const qrcodeUrl = main.validURL(decodeURIComponent(hashData.qrcodeUrl));
                    if (qrcodeUrl) {
                        history.replace({ hash: "" });
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

    const menu_left = useSelector(state => state.core.permission.menu);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);

    // callback main
    const mainGetTitleFromMenu = main.getTitleFromMenu(menu_left, location.pathname);
    const mainGetQueryVariable = main.queryString.parse(location.search);
    // Tương tự như componentDidUpdate
    // set lại subTitle
    useEffect(() => {
        const _queryVariable = mainGetQueryVariable;
        let _subTitle = "", _accessAllowed = false;
        if (mainGetQueryVariable.replace_sub_title === "true") {
            if (mainGetQueryVariable.sub_title) {
                _subTitle = mainGetQueryVariable.sub_title;
            }
            else if (_queryVariable.hasOwnProperty("action")) {
                permission_priviliged.map((item) => {
                    if (item.idChucNang === _queryVariable.action) {
                        _subTitle = item.name;
                        _accessAllowed = true;
                    }
                    return null;
                });
                setAllowAccess(_accessAllowed);
            }
        }
        else {
            if (mainGetQueryVariable.sub_title) {
                _subTitle = mainGetQueryVariable.sub_title + " - ";
            }
            if (_queryVariable.hasOwnProperty("action")) {
                permission_priviliged.map((item) => {
                    if (item.idChucNang === _queryVariable.action) {
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
        mainGetQueryVariable.sub_title,
        mainGetQueryVariable.replace_sub_title
    ]);

    useEffect(() => {
        const title = titlePage !== null ? titlePage : mainGetTitleFromMenu;
        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${constants.CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", constants.CONST_TITLE + title);
    }, [titlePage]);

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
            <Route path={routeNotExtendTemp.map(item => item.path)}>
                <NotRequireNotExtendTemp routes={routeNotExtendTemp} />
            </Route>
            <Route path={routeExtendTemp.map(item => item.path)}>
                <NotRequireExtendTemp routes={routeExtendTemp} subTitle={subTitle} allowAccess={allowAccess} />
            </Route>
        </Switch>
    </Fragment>
}

export default TempNotRequireAuth;
