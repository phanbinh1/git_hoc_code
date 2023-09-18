import React from "react";
import { useSelector } from "react-redux";
import { Layout } from 'antd';
import ScrollArea from "react-perfect-scrollbar";

const MenuRight = () => {
    const config = useSelector(state => state.core.config);
    const { menu_right } = config;

    return (
        <React.Fragment>
            <Layout.Sider
                width={menu_right.hidden ? 0 : menu_right.width}
                className="menu-right"
            >
                <ScrollArea 
                    style={{ height: "calc(100vh - 50px)" }}
                >
                    <div style={{ width: menu_right.width, paddingTop: 10, paddingBottom: 10 }}>
                        {React.isValidElement(menu_right.content) && menu_right.content}
                    </div>
                </ScrollArea>
            </Layout.Sider>
        </React.Fragment >
    );
}

export default MenuRight;