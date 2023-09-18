import React, { Fragment, useEffect, useState } from "react";
import { createID } from "../../../../constants/main";
import { isChecked, onCheck } from "./../fnc";
import { Checkbox } from "antd";
import { sortableHandle, sortableElement } from 'react-sortable-hoc';
import { renderToString } from "react-dom/server";
import ColumnDropdown from "../column_title/column_dropdown";

const DragHandle = sortableHandle(props => {
    return <div {...props} />;
});

const Item = sortableElement(({
    item,
    isParent,
    level = 0,
    children,
    pageKey,
    setColumns,
    onShowChange
}) => {
    const [id] = useState(createID());
    useEffect(() => {
        const title = document.createElement("div");
        title.innerHTML = renderToString(item.title);
        const elm = document.getElementById(id);
        if (elm) { elm.innerText = `${title.innerText}`; }
    }, [item, id]);

    return <Fragment>
        <DragHandle>
            {
                isParent ?
                    <ColumnDropdown
                        pageKey={pageKey}
                        setColumns={setColumns}
                        col={item}
                    >
                        <li className="ant-dropdown-menu-item" key={item.colKey} style={{ paddingLeft: 12 + level * 20 }}>
                            <Checkbox
                                className="m-r-5"
                                indeterminate={isChecked(item) === -1}
                                checked={isChecked(item) === 1}
                                onChange={e => onCheck(item, e.target.checked, onShowChange)}
                            >
                                <span id={id} style={{ display: "inline-block" }} />
                            </Checkbox>
                        </li>
                    </ColumnDropdown> :
                    <ColumnDropdown
                        pageKey={pageKey}
                        setColumns={setColumns}
                        col={item}
                    >
                        <li className="ant-dropdown-menu-item" key={item.colKey} style={{ paddingLeft: 12 + level * 20 }}>
                            <Checkbox
                                className="m-r-5"
                                checked={isChecked(item)}
                                onChange={e => onCheck(item, e.target.checked, onShowChange)}
                            >
                                <span id={id} style={{ display: "inline-block" }} />
                            </Checkbox>
                        </li>
                    </ColumnDropdown>
            }
            {children}
        </DragHandle>
    </Fragment>
})

export default Item;