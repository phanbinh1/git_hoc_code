
import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { columnDropdownOverlay } from './';

const ColumnDropdown = ({
    col,
    pageKey,
    setColumns,
    children,
    expanded
}) => {
    const [visible, setVisible] = useState(false);

    return <Dropdown
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        key={col.colKey}
        overlayStyle={{ zIndex: 9999 }}
        trigger={["contextMenu"]}
        getPopupContainer={() => document.getElementById("wrapper-content") || document.body}
        overlay={columnDropdownOverlay({
            col,
            expanded,
            pageKey,
            setColumns
        })}
    >
        {children}
    </Dropdown >
};

export default ColumnDropdown;