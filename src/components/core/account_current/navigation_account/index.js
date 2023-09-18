import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu, Avatar, Dropdown, Badge, Tooltip } from 'antd';
import * as actAuth from "./../../../../actions/core/auth";
import { setPreviousPageUrlLocalStorage, Base64 } from "./../../../../constants/main";
import * as url from "./../../../../constants/url";
import * as actAccountCurrent from "./../../../../actions/core/account_current";
import { showVersion } from "./version";
import version from "./../../../../constants/version";

const NavigationAccount = ({
    hiddenAccountNavigation,
    visible,
    onShowChangePassword,
    onShowSetting,
    setAccountDropDownVisible
}) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const updateConfigRequest = (value = {}) => dispatch(actAccountCurrent.updateConfigRequest(value));
    const account_current = useSelector(state => state.core.account_current);
    const auth = useSelector(state => state.core.auth);
    const authenticated = useSelector(state => state.core.auth.authenticated);
    const config = useSelector(state => state.core.config);

    useEffect(() => {
        if (config.auth && auth.authenticated && account_current.config !== Base64.encode(JSON.stringify(config))) {
            updateConfigRequest({
                data: { ...account_current, config: Base64.encode(JSON.stringify(config)) }
            })
        }
    }, [config, account_current, auth.authenticated])

    const handleLogout = () => {
        const previousPageUrl = location.pathname + location.search;
        setPreviousPageUrlLocalStorage(previousPageUrl);
        dispatch(actAuth.logout());
    }

    const renderAccountMenu = () => {
        let keys = [];
        location.pathname === url.URL_ACCOUNT_PROFILE && keys.push("account-profile");
        location.pathname === url.URL_THONG_TIN_NGHI_PHEP && keys.push("account-nghi-phep");
        return <Menu
            selectedKeys={keys}
            className="account-menu"
            onClick={() => setAccountDropDownVisible(false)}
        >
            <Menu.Item>
                <p style={{ textAlign: "center" }}>
                    <Avatar src={account_current.avatar} className="navigation-avatar" size={50}>
                        {(account_current.hasOwnProperty("fullName") && account_current.fullName.length > 0) ? account_current.fullName.substring(0, 1) : "A"}
                    </Avatar>
                </p>
                <div style={{ textAlign: "center" }}>
                    <Link to={url.URL_ACCOUNT_PROFILE}>
                        <b>{account_current.fullName}</b>
                    </Link>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="account-profile">
                <Link to={url.URL_ACCOUNT_PROFILE}>
                    <i className="fa fa-info-circle m-r-10" />Thông tin cá nhân {account_current.complete < 100 && <Badge dot />}
                </Link>
            </Menu.Item>
            <Menu.Item key="account-nghi-phep">
                <Link to={url.URL_THONG_TIN_NGHI_PHEP}>
                    <i className="fa fa-calendar m-r-10" />Nghỉ phép cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item key="account-change-password" onClick={onShowChangePassword}>
                <i className="fa fa-key m-r-10" />Đổi mật khẩu
            </Menu.Item>
            <Menu.Item key="account-change-setting" onClick={onShowSetting}>
                <i className="fa fa-cogs m-r-10" />Cài đặt
            </Menu.Item>
            <Menu.Divider key="menu-divider-2" />
            <Menu.Item key="version" style={{ fontStyle: "italic" }} onClick={() => { setAccountDropDownVisible(false); showVersion(); }}>
                <div style={{ position: "relative", paddingRight: 20 }}>
                    <small><i className="fa fa-code-fork m-r-10" />Phiên bản @{version.current.version}</small>
                    <Tooltip title="Thông tin phiên bản" placement="left">
                        <i
                            className="fa fa-info-circle c-pointer icon-success"
                            style={{ position: "absolute", right: 0, top: 5 }}
                        />
                    </Tooltip>
                </div>
            </Menu.Item>
            <Menu.Divider key="menu-divider-3" />
            <Menu.Item key="account-sign-out" onClick={handleLogout}>
                <i className="fa fa-sign-out m-r-10" />Đăng xuất
            </Menu.Item>
        </Menu>;
    }

    return (
        <React.Fragment>
            {
                !hiddenAccountNavigation &&
                <React.Fragment>
                    {
                        authenticated ?
                            <Dropdown
                                overlay={renderAccountMenu()}
                                trigger={["click"]}
                                visible={visible}
                                onVisibleChange={_visible => setAccountDropDownVisible(_visible)}
                                className={`nav-action nav-account ${visible ? "active" : ""}`}
                                overlayStyle={{ minWidth: 200 }}
                            >
                                <Tooltip title="Tài khoản" ><span><i className="fa fa-user" /></span></Tooltip>
                            </Dropdown> :
                            <Tooltip title="Đăng nhập" >
                                <span className="nav-action nav-account">
                                    <Link to={url.URL_LOGIN} className="">
                                        <i className="fa fa-sign-in" />
                                    </Link>
                                </span>
                            </Tooltip>
                    }
                </React.Fragment>
            }
        </React.Fragment >
    );
}

export default NavigationAccount;