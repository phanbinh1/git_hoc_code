import { Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
import { columnDropdownOverlay } from '../../column_title';
import * as main from "./../../../../../constants/main";

const getAllColKeys = (col, result = []) => {
    if (col) {
        if (Array.isArray(col.children)) {
            col.children.map(_col => {
                result = [...result, ...getAllColKeys(_col)]
                return result;
            });
        }
        else {
            result = [...result, col.colKey];
        }
    }
    return result;
}

let timeout = null;
let click = false;
const Cell = ({
    allowResize,
    children,
    className,
    col,
    onResize,
    rowSpan,
    colSpan,
    style,
    tblId,
    width,
    headerHeight = 0,
    highlightOnHover,
    setColumns,
    pageKey,
    expanded,
    ...props
}) => {

    const [startWidth, setStartWidth] = useState(0);
    const [lineId] = useState(`line-${main.createID()}`);
    const [columnWidth, setColumnWidth] = useState(width);
    const [_width, _setWidth] = useState(0);
    const [id] = useState(main.createID());
    const _className = `c-pointer ${className || ""}`.split("  ").join(" ").trim()

    useEffect(() => {
        const thElm = document.getElementById(id);
        if (!width && col && thElm) {
            setColumnWidth(thElm.clientWidth);
        }
    }, [])

    const onResizeDoubleClick = () => {
        if (col && col.colKey) {
            let maxWidth = 0;
            const elms = document.querySelectorAll(`[col-key="${col.colKey}"]`);
            elms.forEach(item => {
                const _elm = document.createElement("span");
                _elm.innerHTML = item.innerHTML;
                _elm.style.display = "inline-block";
                _elm.style.padding = "0 13px";
                if (item.tagName === "TH") {
                    _elm.style.textTransform = "uppercase";
                }
                document.body.appendChild(_elm)
                maxWidth = _elm.clientWidth > maxWidth ? _elm.clientWidth : maxWidth;
                document.body.removeChild(_elm);
            })
            document.body.removeAttribute("tbl-resizing");
            document.body.classList.remove("resizing");
            onResize(null, { size: { width: maxWidth } });
        }
    }

    const onResizeStart = (e, { size }) => {
        timeout && clearTimeout(timeout);
        if (click) {
            onResizeDoubleClick();
            click = false;
        }
        else {
            click = true;
            timeout = setTimeout(() => { click = false; }, 200);

            setStartWidth(size.width);
            const line = document.createElement("div");
            const thElm = document.getElementById(id);
            _setWidth(size.width);
            line.id = lineId;
            line.style.position = "absolute";
            line.style.top = "0px";
            line.style.bottom = "0px";
            line.style.width = 0;
            line.style.zIndex = 12;
            line.style.cursor = "col-resize";
            line.style.borderRight = "1px solid white";
            line.style.right = `1px`;
            thElm && thElm.appendChild(line);
            document.body.classList.add("resizing")
            document.body.setAttribute("tbl-resizing", "1");
        }
    }

    const _onResize = (e, { size }) => {
        const line = document.getElementById(lineId);
        line && _setWidth(width => {
            line.style.right = `${2 * startWidth - 1 - _width - size.width}px`;
            return width + size.width - startWidth
        });
    }

    const onResizeStop = (e) => {
        const line = document.getElementById(lineId);
        const thElm = document.getElementById(id);
        thElm && line && thElm.removeChild(line);
        document.body.classList.remove("resizing")
        onResize(e, { size: { width: _width } });
        document.body.removeAttribute("tbl-resizing");
    }

    const onMouseEnter = () => {
        const allColKeys = getAllColKeys(col);
        allColKeys.map(colKey => {
            const tdCols = document.querySelectorAll(`td[col-key="${colKey}"]`);
            return tdCols.forEach(item => item.classList.add("hoving"));
        })
    }
    const onMouseLeave = () => {
        const allColKeys = getAllColKeys(col);
        allColKeys.map(colKey => {
            const tdCols = document.querySelectorAll(`td[col-key="${colKey}"]`);
            return tdCols.forEach(item => item.classList.remove("hoving"));
        })
    }

    if (!width || !allowResize || !col) {
        return <HeaderDropdown
            {...props}
            className={_className}
            rowSpan={rowSpan}
            colSpan={colSpan}
            style={style}
            tblId={tblId}
            id={id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            setColumns={setColumns}
            pageKey={pageKey}
            expanded={expanded}
            col={col}
            children={children}
        />
    }

    return <Resizable
        width={columnWidth}
        height={0}
        onResizeStart={onResizeStart}
        onResize={_onResize}
        onResizeStop={onResizeStop}
        draggableOpts={{ enableUserSelectHack: false }}
    >
        <HeaderDropdown
            {...props}
            className={_className}
            rowSpan={rowSpan}
            colSpan={colSpan}
            style={style}
            tblId={tblId}
            width={columnWidth}
            id={id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            setColumns={setColumns}
            pageKey={pageKey}
            expanded={expanded}
            children={children}
            col={col}
        />
    </Resizable >;
};

const HeaderDropdown = ({
    allowResize,
    children,
    className,
    col,
    onResize,
    rowSpan,
    colSpan,
    style,
    tblId,
    width,
    headerHeight = 0,
    highlightOnHover,
    onMouseEnter,
    onMouseLeave,
    id,
    pageKey,
    setColumns,
    expanded,
    ...props
}) => {
    if (!col) {
        return <th
            {...props}
            col-key={col && col.colKey ? col.colKey : ""}
            className={className}
            rowSpan={rowSpan}
            colSpan={colSpan}
            style={style}
            tbl-id={tblId}
            width={width}
            id={id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span />
            {children}
        </th>
    }
    return <Dropdown
        trigger={["contextMenu"]}
        overlay={columnDropdownOverlay({
            col,
            expanded,
            pageKey,
            setColumns
        })}
    >
        <th
            {...props}
            col-key={col && col.colKey ? col.colKey : ""}
            className={className}
            rowSpan={rowSpan}
            colSpan={colSpan}
            style={style}
            tbl-id={tblId}
            width={width}
            id={id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span />
            {children}
        </th>
    </Dropdown>
}

export default Cell;