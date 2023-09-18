import React, { useState } from 'react';
import { Button, Dropdown } from "antd";
import { findFirstScrollParent } from '../../../constants/main';
import FilterOverlay from "./overlay";

const CommonFilter = ({
    selectedKeys = [],
    onSelect,
    menus = [],
    loading,
    getPopupContainer,
    children
}) => {
    const [visible, setVisible] = useState(false);
    const [mouseEnter, setMouseEnter] = useState(false);
    return <Dropdown
        visible={visible}
        onVisibleChange={(visible) => {
            !mouseEnter && setVisible(visible)
        }}
        overlayClassName="dropdown-filter"
        trigger={["click"]}
        overlay={<FilterOverlay
            setMouseEnter={setMouseEnter}
            onSelect={onSelect}
            menus={menus}
            selectedKeys={selectedKeys}
            loading={loading}
        />}
        getPopupContainer={e => (typeof getPopupContainer === "function" ? getPopupContainer(e) : findFirstScrollParent(e)) || document.body}
    >
        {
            children ?
                children :
                <Button className="m-l-5">
                    <i className="fa fa-sliders m-r-10" />Lọc<i className="fa fa-angle-down m-l-10" />
                </Button>
        }
    </Dropdown>
}

export default CommonFilter;