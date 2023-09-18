
import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import ColumnDropdown from './column_dropdown';

const ColumnTitle = ({
    col,
    pageKey,
    sumData,
    getValueMax,
    getValueMin,
    setColumns,
    expanded
}) => {
    let res = <div className="c-pointer" key={col.colKey}>{col.title}</div>;
    if (col.description) {
        const titleTooltip = <Fragment>
            {
                col.description.sum && <div>
                    {col.description.sum.label ? col.description.sum.label : "Tổng"} : {sumData(col.dataIndex, col.description.sum.type ? col.description.sum.type : "number")} {col.description.sum.labelExtend ? col.description.sum.labelExtend : ""}
                </div>
            }
            {
                col.description.max && <div>
                    {col.description.max.label ? col.description.max.label : "Lớn nhất"} : {getValueMax(col.dataIndex, col.description.max.type ? col.description.max.type : "number")}
                </div>
            }
            {
                col.description.min && <div>
                    {col.description.min.label ? col.description.min.label : "Bé nhất"} : {getValueMin(col.dataIndex, col.description.min.type ? col.description.min.type : "number")}
                </div>
            }
        </Fragment>
        res = <Tooltip title={titleTooltip} className="c-pointer" getPopupContainer={() => document.getElementById("wrapper-content") || document.body} key={col.colKey}>
            {col.title}
        </Tooltip>
    }

    const _setColumns = (columns = [], colKey, format = {}) => {
        return columns.map(item => {
            if (item.colKey === colKey) {
                item._format = format;
            }
            return {
                ...item,
                children: Array.isArray(item.children) ? _setColumns(item.children, colKey, format) : undefined
            }
        })
    }

    return <ColumnDropdown
        col={col}
        pageKey={pageKey}
        setColumns={setColumns}
        expanded={expanded}
    >
        {res}
    </ColumnDropdown>;
};

export default ColumnTitle;