import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout, Drawer, Tooltip } from 'antd';
import _ from 'lodash';
import * as url from "./../../constants/url";
import * as constants from "./../../constants/constants";
import ChangePasswordForm from "./../core/account_current/change_password";
import Setup from "./../core/account_current/setup";
import DownloadNotification from "./../core/account_current/download_notification";
import Notification from "./../core/account_current/notification";
import NavigationSearch from "./navigation_search";
import NavigationAccount from "./../core/account_current/navigation_account";

const showNotification = true;
const showSearch = true;

const Navigation = ({
    handleChangeMenuStyle,
    hiddenAccountNavigation,
    keySelected,
    hiddenNavigation,
    showMenu
}) => {
    const location = useLocation();

    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [accountDropDownVisible, setAccountDropDownVisible] = useState(false);
    const [changeSettingVisible, setChangeSettingVisible] = useState(false);
    const [notificationDropDownVisible, setNotificationDropDownVisible] = useState(false);

    const loading = useSelector(state => state.core.loading);
    const menu_left = useSelector(state => state.core.permission.menu);
    const config = useSelector(state => state.core.config);
    const authenticated = useSelector(state => state.core.auth.authenticated);

    const renderMenu = (listMenu = [], checkMax = false) => {
        return _.orderBy(listMenu, ['sort'], ['asc']).map((item, index) => {
            if (checkMax && index >= constants.CONST_NAVIGATION_MAX_SHOW) {
                return null;
            }
            else {
                if (item.type === constants.CONST_ROLE_TYPE_URL) {
                    var hasChildrenMenu = false;
                    item.children.map((val) => {
                        if (val.type === constants.CONST_ROLE_TYPE_URL) {
                            hasChildrenMenu = true
                        }
                        return false;
                    })
                    if (hasChildrenMenu) {
                        return <Menu.SubMenu
                            key={item.id}
                            title={<span> <i className={`${item.icon} m-r-10`} /> {item.name} </span>}
                        >
                            {renderMenu(item.children)}
                        </Menu.SubMenu>
                    }
                    else {
                        return <Menu.Item key={item.id}>
                            <Link to={item.url}>
                                <span><i className={`fa fa-angle-right m-r-10`} />{item.name}</span>
                            </Link>
                        </Menu.Item>
                    }
                }
                else {
                    return null;
                }
            }
        });
    }

    const getRoleIsTop = (list, result = []) => {
        list.map((item) => {
            if (item.menuTop) {
                return result.push(item);
            }
            else {
                return getRoleIsTop(item.children, result);
            }
        })
        return result;
    }

    const onShowNotification = () => {
        setAccountDropDownVisible(false);
        setChangePasswordVisible(false);
        setChangeSettingVisible(false);
        setNotificationDropDownVisible(true);
    }

    const onCloseNotification = () => {
        setNotificationDropDownVisible(false);
    }

    const onShowSetting = () => {
        setChangePasswordVisible(false);
        setChangeSettingVisible(true);
        setNotificationDropDownVisible(false);
    }

    const onCloseSetting = () => {
        setChangeSettingVisible(false);
    }

    const onShowAccount = () => {
        setChangePasswordVisible(false);
        setChangeSettingVisible(false);
        setNotificationDropDownVisible(false);
    }

    const onShowChangePassword = () => {
        setChangePasswordVisible(true);
        setChangeSettingVisible(false);
        setNotificationDropDownVisible(false);
    }

    const onCloseChangePassword = () => {
        setChangePasswordVisible(false);
    }

    return (
        <React.Fragment>
            <Drawer
                title="ĐỔI MẬT KHẨU"
                placement="right"
                width={300}
                onClose={onCloseChangePassword}
                visible={changePasswordVisible}
                destroyOnClose
            >
                <ChangePasswordForm onClose={onCloseChangePassword} />
            </Drawer>
            <Drawer
                title="CÀI ĐẶT"
                placement="right"
                width={350}
                onClose={onCloseSetting}
                visible={changeSettingVisible}
                destroyOnClose
            >
                <Setup handleChangeMenuStyle={handleChangeMenuStyle} />
            </Drawer>
            <Layout.Header className={`header-custom ${loading > 0 ? 'loading' : ''}`}>
                <div className="web-title" style={{ paddingLeft: showMenu ? 0 : 15 }}>
                    {showMenu && <i className="fa fa-bars" onClick={() => handleChangeMenuStyle({ hidden: !config.menu_left.hidden })} />}
                    <Link className="web-title-content" to={url.URL_HOME} >
                        {constants.CONST_PAGE_TITLE}
                    </Link>
                </div>
                <NavigationAccount
                    visible={accountDropDownVisible}
                    onShow={onShowAccount}
                    onShowChangePassword={onShowChangePassword}
                    onShowSetting={onShowSetting}
                    hiddenAccountNavigation={hiddenAccountNavigation}
                    setAccountDropDownVisible={setAccountDropDownVisible}
                />
                {
                    authenticated && <Tooltip title="Lịch sử tải">
                        <span className={`nav-action ${location.pathname === url.URL_HISTORY_DOWNLOAD ? "active" : ""}`}>
                            <Link to={url.URL_HISTORY_DOWNLOAD} >
                                <DownloadNotification />
                            </Link>
                        </span>
                    </Tooltip>
                }
                {
                    authenticated && showNotification && <Notification
                        visible={notificationDropDownVisible}
                        onClose={onCloseNotification}
                        onShow={onShowNotification}

                    />
                }
                {showSearch && <NavigationSearch />}
                {
                    document.body.getAttribute("_enviroment") === "app" && <Tooltip title="QR Code">
                        <span className={`nav-action`} onClick={() => {
                            document.getElementById("btn-mb-scan-qrcode").click()
                            const qrcodeValue = document.getElementById("qrcode");
                            qrcodeValue && qrcodeValue.setAttribute("redirect", "admin");
                        }}>
                            <i className="fa fa-qrcode" />
                        </span>
                    </Tooltip>
                }
                {
                    !hiddenNavigation &&
                    <Menu
                        className="navigation-custom"
                        mode="horizontal"
                        key="menu-navigation"
                        selectedKeys={[keySelected]}
                    >
                        {renderMenu(getRoleIsTop(menu_left, []), true)}
                    </Menu>
                }
            </Layout.Header>
        </React.Fragment >
    );
}

export default Navigation;