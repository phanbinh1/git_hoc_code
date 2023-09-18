import React, { useState } from "react";
import arrayMove from 'array-move';
import _ from "lodash";
import { SortableContainer } from "./";
import Item from "./item";
import { isCheckedAll, onCheckAll } from "./../fnc";
import { Checkbox } from "antd";
import ScrollArea from "react-perfect-scrollbar";

const Overlay = ({
    columns = [],
    columnsShow = [],
    onSortChange,
    onShowChange,
    setColumns,
    pageKey,
    setMouseEnter
}) => {
    const [sorts, setSorts] = useState({});

    const getChild = (columns = [], level = 0) => {
        let sort = 0;
        const result = columns.map((item, i) => {
            sort++;
            const display = true;// item.dataIndex !== "stt" && item.dataIndex !== "actions";
            if (Array.isArray(item.children)) {
                return {
                    display,
                    item,
                    colKey: item.colKey,
                    isParent: true,
                    level,
                    onShowChange,
                    columnsShow,
                    sort: sorts[item.colKey] || sort,
                    _children: getChild(item.children, level + 1)
                };
            }
            else {
                return {
                    display,
                    item,
                    colKey: item.colKey,
                    level,
                    onShowChange,
                    columnsShow,
                    sort: sorts[item.colKey] || sort
                };
            }
        });
        return _.orderBy(result, ["sort"], ["asc"]);
    }

    return <ul className="ant-dropdown-menu menu-column-view ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
        <li className="ant-dropdown-menu-item">
            <Checkbox
                style={{ display: "inline-block" }}
                checked={isCheckedAll(columns)}
                indeterminate={isCheckedAll(columns) === -1}
                onChange={e => onCheckAll(columns, e.target.checked, onShowChange)}
            >
                Hiển thị tất cả
                        </Checkbox>
        </li>
        <li className="ant-dropdown-menu-item-divider"></li>
        <div
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
        >
            <ScrollArea
                style={{ height: "100%", maxHeight: 200 }}
            >
                <ContainerColumnMove
                    pageKey={pageKey}
                    setColumns={setColumns}
                    list={getChild(columns)}
                    onSort={({ newIndex, oldIndex, list }) => {
                        if (newIndex !== oldIndex) {
                            const _oldIndex = list.findIndex(item => item.sort === oldIndex);
                            const _newIndex = list.findIndex(item => item.sort === newIndex);
                            const newData = arrayMove(list, _oldIndex, _newIndex).filter(el => !!el);
                            setSorts(sorts => {
                                let _sorts = { ...sorts };
                                newData.map((item, i) => { _sorts[item.colKey] = i + 1; return _sorts; });
                                onSortChange && onSortChange(_sorts);
                                return _sorts;
                            });
                        }
                    }}
                />
            </ScrollArea>
        </div>
    </ul>
}

const ContainerColumnMove = ({ list, onSort, pageKey, setColumns }) => {
    return <SortableContainer
        lockAxis="y"
        useDragHandle
        disableAutoscroll
        helperClass="column-view-dragging"
        onSortStart={() => document.body.classList.add("dragging")}
        onSortEnd={({ newIndex, oldIndex }) => {
            onSort({ newIndex, oldIndex, list })
            document.body.classList.remove("dragging");
        }}
        children={list.filter(item => item.display).map((data, i) => {
            if (Array.isArray(data._children)) {
                return <Item
                    {...data}
                    pageKey={pageKey}
                    setColumns={setColumns}
                    index={data.sort}
                    key={data.colKey}
                    children={<ContainerColumnMove
                        list={data._children}
                        onSort={onSort}
                    />}
                />
            }
            else {
                return <Item
                    {...data}
                    pageKey={pageKey}
                    setColumns={setColumns}
                    index={data.sort}
                    key={data.colKey}
                />
            }

        })}
    />
}

export default Overlay;