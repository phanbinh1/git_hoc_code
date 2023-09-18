import React, { Fragment, useState } from "react";
import SetupMenu from "./menu";
import SetupTable from "./table";
import SetupNotification from "./notification";
import SetupLayout, { LayoutListItem } from "./layout";
import { Tabs } from "antd";
import { AntIcon } from "../../../antd";

const Title = ({ onBack, children }) => {
    return <Fragment>
        <span className="config-title-back c-pointer" onClick={onBack}>
            <AntIcon type="arrow-left" />
        </span>
        <h1 className="config-title">
            {children}
        </h1>
    </Fragment>
}
const Setup = ({ handleChangeMenuStyle }) => {

    const [tab, setTab] = useState({
        key: "index",
        title: null,
        group_code: "",
        group_name: null,
        onLayoutChange: ({ group_code, group_name }) => setTab(tab => ({ ...tab, group_code, group_name, key: "layout-item" })),
        onChange: ({ key, title }) => setTab(tab => ({ ...tab, key, title })),
        onBack: ({ key = "index" }) => setTab(tab => ({ ...tab, key }))
    })

    return <Fragment>
        <Tabs className="tab-none-title" activeKey={tab.key}>
            <Tabs.TabPane key="index">
                <div className="config-item" onClick={() => tab.onChange({ key: "menu", title: "Menu" })}>
                    <span className="config-item-icon config-item-icon-left m-r-10"><i className="fa fa-tasks" /></span>
                    <span>Menu</span>
                    <i className="fa fa-angle-right config-item-angle-right" />
                </div>
                <div className="config-item" onClick={() => tab.onChange({ key: "table", title: "Dữ liệu" })}>
                    <span className="config-item-icon config-item-icon-left m-r-10"><i className="fa fa-database" /></span>
                    <span>Dữ liệu</span>
                    <i className="fa fa-angle-right config-item-angle-right" />
                </div>
                <div className="config-item" onClick={() => tab.onChange({ key: "notification", title: "Thông báo" })}>
                    <span className="config-item-icon config-item-icon-left m-r-10"><i className="fa fa-bell" /></span>
                    <span>Thông báo</span>
                    <i className="fa fa-angle-right config-item-angle-right" />
                </div>
                <div className="config-item" onClick={() => tab.onChange({ key: "layout", title: "Giao diện" })}>
                    <span className="config-item-icon config-item-icon-left m-r-10"><i className="fa fa-tasks" /></span>
                    <span>Giao diện</span>
                    <i className="fa fa-angle-right config-item-angle-right" />
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="menu">
                <Title onBack={tab.onBack}>Menu</Title>
                <SetupMenu handleChangeMenuStyle={handleChangeMenuStyle} />
            </Tabs.TabPane>
            <Tabs.TabPane key="table">
                <Title onBack={tab.onBack}>Dữ liệu</Title>
                <SetupTable />
            </Tabs.TabPane>
            <Tabs.TabPane key="notification">
                <Title onBack={tab.onBack}>Thông báo</Title>
                <SetupNotification />
            </Tabs.TabPane>
            <Tabs.TabPane key="layout">
                <Title onBack={tab.onBack}>Giao diện</Title>
                <SetupLayout tab={tab} />
            </Tabs.TabPane>
            <Tabs.TabPane key="layout-item">
                <Title onBack={() => tab.onBack({ key: "layout" })}>{tab.group_name}</Title>
                <LayoutListItem tab={tab} />
            </Tabs.TabPane>
        </Tabs>
    </Fragment>
}

export default Setup;