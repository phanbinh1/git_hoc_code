import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import { Resizable } from "react-resizable";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";
import ScrollArea from 'react-perfect-scrollbar'
import eventElementResizeEvent from "element-resize-event";

const MenuLeft = ({ handleChangeMenuStyle, styleMenu, showMenu, miniMenu }) => {
    const [ref, setRef] = useState(null);
    const location = useLocation();
    const menu = useSelector(state => state.core.permission.menu);
    const config = useSelector(state => state.core.config);
    const { menu_left } = config;

    const [openKeys, setOpenKeys] = useState(main.getMenuDefaultOpenKeys());
    const [width, setWidth] = useState(menu_left.width);
    const [startWidth, setStartWidth] = useState(menu_left.width);
    const [lineId] = useState(`line-${main.createID()}`);

    const [keySelected, setKeySelected] = useState("-1");

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

    useEffect(() => {
        let role = getRoleFromMenu(menu, location.pathname);
        if (role === null) {
            role = { id: -1 };
        }
        setKeySelected(`${role.id}`);
    }, [location.pathname, menu])

    useEffect(() => {
        if (miniMenu) {
            setOpenKeys([]);
        }
    }, [])

    const onResizeStart = (e, { size }) => {
        setStartWidth(size.width)
        const line = document.createElement("div");
        line.id = lineId;
        line.style.position = "fixed";
        line.style.top = "50px";
        line.style.bottom = "0px";
        line.style.width = 0;
        line.style.zIndex = 12;
        line.style.borderRight = "1px solid var(--nav-bg-color)";
        line.style.left = `${size.width}px`;
        line.style.transition = "all 0s !important";
        document.body.appendChild(line);
        document.body.classList.add("resizing")
    }

    const onResize = (e, { size }) => {
        const line = document.getElementById(lineId);
        line.style.left = `${width + size.width - startWidth}px`;
        line.style.transition = "all 0s !important";
        setWidth(width => width + size.width - startWidth);
    }

    const onResizeStop = () => {
        const line = document.getElementById(lineId);
        document.body.removeChild(line);
        document.body.classList.remove("resizing")
        if (menu_left.resize) {
            if (!menu_left.autoZoomOut) {
                if (menu_left.mode !== "vertical") {
                    handleChangeMenuStyle({ width });
                }
            }
            else {
                if (menu_left.mode !== "vertical") {
                    if (width > 130) {
                        handleChangeMenuStyle({ width });
                    }
                    else {
                        if (width < menu_left.width) {
                            handleChangeMenuStyle({ mode: "vertical" });
                        }
                        else {
                            handleChangeMenuStyle({ mode: "inline" });
                        }
                    }
                }
            }
        }
    }

    const handleChangeOpenKey = (openKeys) => {
        main.setMenuDefaultOpenKeys(openKeys);
        setOpenKeys(openKeys);
    }

    const renderMenu = (listMenu = [], isFirst = false) => {
        return _.orderBy(listMenu, ['sort'], ['asc'])
            .filter(item => item.type === constants.CONST_ROLE_TYPE_URL && item.menuLeft)
            .map((item) => {
                const hasChildrenMenu = Array.isArray(item.children) && item.children.filter(c => c.type === constants.CONST_ROLE_TYPE_URL && c.menuLeft).length > 0;
                if (menu_left.mode === "vertical" && isFirst) {
                    if (hasChildrenMenu) {
                        return <Menu.SubMenu
                            key={`sub-${item.id}`}
                            className="submenu-first"
                            title={<i className={`${item.icon}`} />}
                            children={[
                                <Menu.ItemGroup
                                    key={item.id}
                                    title={item.name}
                                    children={renderMenu(item.children)}
                                />
                            ]}
                        />
                    }
                    else {
                        return <Menu.SubMenu
                            key={`sub-${item.id}`}
                            className="submenu-first"
                            title={<i className={`${item.icon}`} />}
                            children={[
                                <Menu.Item key={item.id} title={item.name}>
                                    <Link to={item.url}>
                                        <i className={`${item.icon} m-r-10`} />
                                        <span>{item.name}</span>
                                    </Link>
                                </Menu.Item>
                            ]}
                        />
                    }
                }
                else {
                    if (isFirst) {
                        if (hasChildrenMenu) {
                            return <Menu.SubMenu
                                key={item.id}
                                title={
                                    <React.Fragment>
                                        <i className={`${item.icon} m-r-10`} title={item.name} />
                                        <span title={item.name}>{item.name}</span>
                                    </React.Fragment>
                                }
                            >
                                {renderMenu(item.children)}
                            </Menu.SubMenu>
                        }
                        else {
                            return <Menu.Item key={item.id} title={item.name}>
                                <Link to={item.url} >
                                    <i className={`${item.icon} m-r-10`} />
                                    <span>{item.name}</span>
                                </Link>
                            </Menu.Item>
                        }
                    }
                    else {
                        if (hasChildrenMenu) {
                            return <Menu.SubMenu
                                key={item.id}
                                title={
                                    <React.Fragment>
                                        <i
                                            className={`fa fa-angle-${openKeys.findIndex(val => val === `${item.id}`) !== -1 && menu_left.mode !== "vertical" ? "down m-r-6" : "right m-r-10"}`}
                                            title={item.name}
                                        />
                                        <span title={item.name}>{item.name}</span>
                                    </React.Fragment>
                                }
                            >
                                {renderMenu(item.children)}
                            </Menu.SubMenu>
                        }
                        else {
                            return <Menu.Item key={item.id} title={item.name}>
                                <Link to={item.url} >
                                    <i className={`fa fa-angle-right m-r-10`} />
                                    <span>{item.name}</span>
                                </Link>
                            </Menu.Item>
                        }
                    }
                }
            });
    }


    // useEffect(() => {
    //     ref && ref.updateScroll();
    // }, [ref, openKeys])

    useEffect(() => {
        const elm = document.getElementById("sider-bar-menu");
        elm && eventElementResizeEvent(elm, () => {
            ref && ref.updateScroll();
        })
    }, [ref])

    return <React.Fragment>
        <Resizable
            className={`${!menu_left.resize || menu_left.hidden || menu_left.mode === "vertical" ? "menu-none-resize" : ""} menu-resize`}
            width={menu_left.hidden || !showMenu ? 0 : menu_left.mode !== "vertical" ? menu_left.width : 50}
            height={0}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeStop={onResizeStop}
        >
            <Layout.Sider
                width={menu_left.hidden || !showMenu ? 0 : menu_left.mode !== "vertical" && !miniMenu ? menu_left.width : 50}
                className={`sidebar-custom`}
                style={{ ...styleMenu, transition: "width 0s" }}
            >
                <ScrollArea style={{ height: "calc(100% - 30px)" }} ref={ref => setRef(ref)}>
                    <Menu
                        id="sider-bar-menu"
                        style={{
                            width: menu_left.mode !== "vertical" && !miniMenu ? menu_left.width : 50,
                            overflow: "hidden",
                            transition: "width 0s"
                        }}
                        onOpenChange={handleChangeOpenKey}
                        className={`${menu_left.fullText ? "sidebar-menu-full-text" : ""}`}
                        mode={miniMenu ? "vertical" : menu_left.mode}
                        key="menu-left"
                        selectedKeys={[keySelected]}
                        openKeys={openKeys}
                        onClick={e => document.body.getAttribute("_enviroment") === "app" && handleChangeMenuStyle({ hidden: true })}

                    >
                        {renderMenu(menu, true)}
                    </Menu>
                </ScrollArea>
                {
                    !menu_left.hidden && showMenu && !miniMenu && <div
                        style={{
                            position: "fixed",
                            height: 30,
                            lineHeight: "30px",
                            bottom: 0,
                            left: 0,
                            width: menu_left.mode !== "vertical" && !miniMenu ? menu_left.width : 50,
                            background: "rgb(2, 123, 227,.8)",
                            cursor: "pointer",
                            textAlign: "center",
                            color: "#fff",
                            transition: "width 0s"
                        }}
                        onClick={() => {
                            handleChangeMenuStyle({ mode: menu_left.mode === "vertical" ? "inline" : "vertical" });
                        }}
                    >
                        <i className={`fa fa-chevron-${menu_left.mode === "vertical" ? "right" : "left"}`} />
                    </div>
                }
            </Layout.Sider>
        </Resizable>
        <div className="wrapper-faded" onClick={() => handleChangeMenuStyle({ hidden: true })} />
    </React.Fragment >;
}

export default MenuLeft;