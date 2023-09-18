import React, { Fragment, useState, lazy, Suspense } from "react";
import { Dropdown } from "antd";
import { findFirstScrollParent } from "../../../../constants/main";
import { isCheckedAll, onCheckAll } from "./../fnc";
const Overlay = lazy(() => import("./overlay"));

const ColumnView = ({
    columns = [],
    onSortChange,
    onShowChange,
    setColumns,
    pageKey,
}) => {
    const [visible, setVisible] = useState(false);
    const [mouseEnter, setMouseEnter] = useState(false);
    return <Fragment>
        <Dropdown.Button
            icon={<i className="fa fa-ellipsis-h" />}
            getPopupContainer={e => findFirstScrollParent(e) || document.body}
            trigger={["click"]}
            overlay={<Suspense fallback={<button className="btn-skeleton w-100 h-30 ant-btn" ><span /></button>}>
                <Overlay
                    onShowChange={onShowChange}
                    columns={columns}
                    onSortChange={onSortChange}
                    setColumns={setColumns}
                    pageKey={pageKey}
                    setMouseEnter={setMouseEnter}
                />
            </Suspense>}
            visible={visible}
            onVisibleChange={v => !mouseEnter && setVisible(v)}
            onClick={() => onCheckAll(columns, !isCheckedAll(columns), onShowChange)}
            className="m-l-5"
        >
            <i className={`fa fa-eye${isCheckedAll(columns) === 0 ? "-slash" : ""}`} />
        </Dropdown.Button>
    </Fragment>
}

export default ColumnView;