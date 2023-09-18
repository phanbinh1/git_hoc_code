import React, { Fragment, useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import * as constants from "./../../../constants/constants";
import * as act from "./../../../actions";
import { Layout } from "antd";
import Navigation from "./../navigation";
// import Menu from "./../menu";
import MenuRight from "./../menu_right";
import { getTitleFromMenu, listenerAttributeChange, queryString } from "./../../../constants/main"
import { CommonSynchronized } from "../../common";
import { checkPagePermission } from "./";
import PageError403 from "../../../pages/core/error_403";
import PageError404 from "../../../pages/core/error_404";
import Loading from 'react-loading-bar'
import { Header } from "../../common/common_action";
import ScrollArea from "react-perfect-scrollbar";
import SLoading from "./loading";
import Menu from "./../menu";

const ExtendTemp = ({
    routes = [],
    showMenu = true,
    miniMenu = false,
    subTitle,
    allowAccess,
}) => {
    const location = useLocation();
    const history = useHistory()

    const isMobile = document.body.getAttribute("_enviroment") === "app";

    const menu_left = useSelector(state => state.core.permission.menu);
    const config = useSelector(state => state.core.config);
    const auth = useSelector(state => state.core.auth);

    const [loading, setLoading] = useState(0);
    const [titlePage, setTitlePage] = useState(null);
    const [page403, setPage403] = useState(false);
    const [page404, setPage404] = useState(false);
    const [keySelected, setKeySelected] = useState("-1");
    const [hiddenTitle, setHiddenTitle] = useState(false);

    const dispatch = useDispatch();
    const handleChangeLayout = (value = {}) => {
        dispatch(act.handleChangeLayout(value));
    }

    const qs = queryString.parse(location.search);


    const setClassModeBody = (className = "") => {
        var bodyCls = document.body.classList;
        // inline - vertical - horizontal
        className === "inline" ? bodyCls.add(`menu-mode-inline`) : bodyCls.remove(`menu-mode-inline`)
        className === "vertical" ? bodyCls.add(`menu-mode-vertical`) : bodyCls.remove(`menu-mode-vertical`)
        className === "horizontal" ? bodyCls.add(`menu-mode-horizontal`) : bodyCls.remove(`menu-mode-horizontal`)
    }

    useEffect(() => {
        config.menu_left.hidden ?
            document.body.classList.remove("show-menu") :
            document.body.classList.add("show-menu");
    }, [config.menu_left.hidden])

    useEffect(() => {
        config.menu_left.mode && document.body.classList.add(`menu-mode-${config.menu_left.mode}`);
        setClassModeBody(config.menu_left.mode);
    }, [config.menu_left.mode])

    useEffect(() => {
        let _page404 = false, _page403 = false;
        const currentRoute = routes.find(route => route.path === location.pathname);
        if (!currentRoute) {
            _page404 = true;
        }
        else {
            if ((currentRoute.isCheckPermission !== false && !checkPagePermission(menu_left, location.pathname)) || (qs.action && !allowAccess)) {
                _page403 = true;
            }
            setTitlePage(currentRoute.titlePage || getTitleFromMenu(menu_left, location.pathname))
            setHiddenTitle(routes.findIndex(route => route.path === '' || (route.path === location.pathname && route.isHiddenTitle)) > -1);
        }
        setPage403(_page403)
        setPage404(_page404);
    }, [menu_left, location, routes, allowAccess])

    useEffect(() => {
        const title = `${titlePage} ${subTitle ? `| ${subTitle}` : ``}`;
        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${constants.CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", constants.CONST_TITLE + title);
    }, [titlePage, page403, page404, subTitle]);

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


    const handleChangeMenuStyle = (menuStyle = {}) => {
        handleChangeLayout({ key: constants.CONST_LAYOUT_KEY_MENU_LEFT, value: menuStyle });
    }

    const styleContainer = {
        position: "fixed",
        top: 0,
        bototm: 0,
        left: 0,
        right: 0,
        transition: "width 0s",
        isMobile: isMobile,
        paddingLeft: isMobile ? 0 : (showMenu && !config.menu_left.hidden && config.menu_left.fixed ? (config.menu_left.mode !== "vertical" && !miniMenu ? config.menu_left.width : 50) : 0),
    }

    const styleMenu = config.menu_left.fixed || isMobile ?
        {
            position: "fixed",
            height: "calc(100vh - 50px)",
            zIndex: isMobile ? 11 : 6,
            left: 0,
            top: "50px",
            transition: "width 0s",
            boderRight: 0,
            isMobile: isMobile
        } :
        {
            transition: "width 0s"
        }

    useEffect(() => {
        listenerAttributeChange(document.body, (attributes) => {
            const loadingAttr = attributes["_loading"] || { value: "0" };
            if (loadingAttr.value !== "0") {
                document.body.classList.add("loading");
                setLoading(parseInt(loadingAttr.value, 0))
            }
            else {
                setLoading(parseInt(loadingAttr.value, 0))
                document.body.classList.remove("loading");
            }
        }, { attributeFilter: ["_loading"] });
    }, [])

    return <Fragment>
        <Layout className="abcdef">
            <CommonSynchronized />
            <Loading show={loading > 0} color="red" />
            <Navigation
                hiddenNavigation={true}
                keySelected={keySelected}
                handleChangeMenuStyle={handleChangeMenuStyle}
                showMenu={!auth.authenticated ? false : showMenu}
                hiddenAccountNavigation={false}
            />
            <Layout className="container-wrapper" style={styleContainer}>
                <Menu
                    showMenu={!auth.authenticated ? false : showMenu}
                    miniMenu={miniMenu}
                    handleChangeMenuStyle={handleChangeMenuStyle}
                    key="menu-left"
                    keySelected={keySelected}
                    styleMenu={{ ...styleMenu }}
                />
                <Layout className="content-wrapper" style={{ transition: "width 0s" }} >
                    <Layout.Content style={{ transition: "width 0s" }} >
                        <Layout style={{ transition: "width 0s" }} id="container-content">
                            <Suspense fallback={<SLoading />}>
                                <Header
                                    hiddenTitle={hiddenTitle}
                                    page403={page403}
                                    page404={page404}
                                    history={history}
                                    loading={loading}
                                    subTitle={subTitle}
                                    titlePage={titlePage}
                                />
                                <Layout.Content style={{ transition: "width 0s" }}>
                                    <div className={`content-body ${hiddenTitle || page404 || page403 ? "none-title" : ""}`} id="wrapper-content">
                                        {/* <ScrollArea style={{ height: "100%", zIndex: 1 }}> */}
                                        {
                                            page404 ? <PageError404 /> : page403 ? <PageError403 /> :
                                                <Switch>
                                                    {routes.map((route, i) => <Route path={route.path} component={route.main} key={`route-${i}`} />)}
                                                </Switch>
                                        }
                                        {/* </ScrollArea> */}
                                    </div>
                                </Layout.Content>
                            </Suspense>
                        </Layout>
                    </Layout.Content>
                </Layout>
                <MenuRight />
            </Layout>
        </Layout>
    </Fragment>
}

export default ExtendTemp;