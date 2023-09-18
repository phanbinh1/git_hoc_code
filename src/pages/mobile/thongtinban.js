import { Tabs } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { categoryId, getListHoatDongBan } from "./web-api";
import List from "./thongtinban.list";
export default () => {
    const [activeKey, setActiveKey] = useState(`${categoryId.hoatDongBan}`)

    return <Fragment>
        <Tabs activeKey={activeKey} onChange={key => setActiveKey(key)} destroyInactiveTabPane>
            <Tabs.TabPane key={`${categoryId.hoatDongBan}`} tab="Hoạt động ban">
                <List categoryId={categoryId.hoatDongBan} />
            </Tabs.TabPane>
            <Tabs.TabPane key={`${categoryId.hoatDongCuaDiaPhuong}`} tab="Hoạt động địa phương">
                <List categoryId={categoryId.hoatDongCuaDiaPhuong} />
            </Tabs.TabPane>
            <Tabs.TabPane key={`${categoryId.thongTinCungCapChoBaoChi}`} tab="Thông tin cung cấp báo chí">
                <List categoryId={categoryId.thongTinCungCapChoBaoChi} />
            </Tabs.TabPane>
        </Tabs>
    </Fragment>
}