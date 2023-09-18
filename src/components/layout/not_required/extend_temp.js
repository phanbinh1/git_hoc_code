import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import * as constants from "./../../../constants/constants";
import * as act from "./../../../actions";

import { Layout, PageHeader } from "antd";
import Navigation from "./../navigation";
import Menu from "./../menu";
import MenuRight from "./../menu_right";
import { getTitleFromMenu, queryString as _queryString } from "./../../../constants/main"
import { CommonAction } from "../../common";

const ExtendTemp = ({
    routes = [],
    showMenu = true,
    miniMenu = false
}) => {
    const location = useLocation();
    const history = useHistory()

    const menu_left = useSelector(state => state.core.permission.menu);
    const config = useSelector(state => state.core.config);
    const auth = useSelector(state => state.core.auth);

    const [keySelected, setKeySelected] = useState("-1");
    const [hiddenTitle, setHiddenTitle] = useState(false);

    const dispatch = useDispatch();
    const handleChangeLayout = (value = {}) => {
        dispatch(act.handleChangeLayout(value));
    }

    useEffect(() => {
        let role = getRoleFromMenu(menu_left, location.pathname);
        if (role === null) {
            role = { id: -1 };
        }
        setKeySelected(`${role.id}`);
    }, [])

    const getRoleFromMenu = (list, url, result = null) => {
        list.map((item) => {
            if (url === item.url) {
                return result = item;
            }
            else {
                return result = getRoleFromMenu(item.children, url, result);
            }
        });
        return result;
    }

    const setClassModeBody = (className = "") => {
        var bodyCls = document.body.classList;
        // inline - vertical - horizontal
        className === "inline" ? bodyCls.add(`menu-mode-inline`) : bodyCls.remove(`menu-mode-inline`)
        className === "vertical" ? bodyCls.add(`menu-mode-vertical`) : bodyCls.remove(`menu-mode-vertical`)
        className === "horizontal" ? bodyCls.add(`menu-mode-horizontal`) : bodyCls.remove(`menu-mode-horizontal`)
    }

    const handleChangeMenuStyle = (menuStyle = {}) => {
        menuStyle.hidden ?
            document.body.classList.remove("show-menu") :
            document.body.classList.add("show-menu");
        menuStyle.mode && document.body.classList.add(`menu-mode-${menuStyle.mode}`);
        setClassModeBody(menuStyle.mode);
        handleChangeLayout({ key: constants.CONST_LAYOUT_KEY_MENU_LEFT, value: menuStyle });
    }

    const styleContainer = {
        paddingLeft: showMenu && !config.menu_left.hidden && config.menu_left.fixed ? config.menu_left.mode !== "vertical" && !miniMenu ? config.menu_left.width : 50 : 0,
    }

    const styleMenu = config.menu_left.fixed ? {
        position: "fixed",
        height: "calc(100vh - 50px)",
        zIndex: 6,
        left: 0,
        top: "50px",
    } : {}

    const queryString = _queryString.parse(location.search);

    useEffect(() => {
        setHiddenTitle(routes.findIndex(route => route.path === location.pathname && route.isHiddenTitle) > -1);
    }, [location.pathname])


    return <Fragment>
        <Layout>
            <Navigation
                hiddenNavigation={true}
                keySelected={keySelected}
                handleChangeMenuStyle={handleChangeMenuStyle}
                showMenu={!auth.authenticated ? false : showMenu}
                hiddenAccountNavigation={false}
            />
            <Layout className="container-wrapper" style={styleContainer}>
                {
                    auth.authenticated &&
                    <Menu
                        showMenu={!auth.authenticated ? false : showMenu}
                        miniMenu={miniMenu}
                        handleChangeMenuStyle={handleChangeMenuStyle}
                        key="menu-left"
                        keySelected={keySelected}
                        styleMenu={{ ...styleMenu, boxShadow: "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)" }}

                    />
                }
                <Layout className="content-wrapper">
                    <Layout.Content>
                        <Layout className={`content-wrapper`}>
                            {!hiddenTitle && <div className="content-title">
                                <PageHeader
                                    onBack={() => history.goBack()}
                                    title={getTitleFromMenu(menu_left, location.pathname)}
                                    subTitle={queryString.sub_title}
                                    extra={
                                        <CommonAction />
                                    }
                                />
                            </div>}
                            <Layout.Content>
                                <div className={`content-body ${hiddenTitle ? "none-title" : ""}`} id="wrapper-content">
                                    <Switch>
                                        {
                                            routes.map(route => <Route
                                                path={route.path}
                                                component={route.main}
                                            />)
                                        }
                                    </Switch>
                                </div>
                            </Layout.Content>
                        </Layout>
                    </Layout.Content>
                </Layout>
                <MenuRight />
            </Layout>
        </Layout>
    </Fragment>
}

export default ExtendTemp;