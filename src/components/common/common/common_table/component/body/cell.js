import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as message from "./../../../../../constants/message";
import { Dropdown, Menu } from "antd";


const Cell = ({
    rowIndex,
    allowCoppy,
    children,
    className,
    onClick,
    tblId,
    cell,
    colSpan,
    rowSpan,
    colKey,
    cellDropdown = true,
    col,
    ...props
}) => {
    const [text, setText] = useState(null);

    useEffect(() => {
        try {
            const chilElm = document.createElement("span");
            chilElm.innerHTML = renderToString(children);
            setText(chilElm.innerText);
        }
        catch (e) { }
    }, [children])

    const onMouseEnter = () => {
        if (colKey) {
            const tdCols = document.querySelectorAll(`td[col-key="${colKey}"]`);
            tdCols.forEach(item => item.classList.add("hoving"));
        }
    }
    const onMouseLeave = () => {
        if (colKey) {
            const tdCols = document.querySelectorAll(`td[col-key="${colKey}"]`);
            tdCols.forEach(item => item.classList.remove("hoving"));
        }
    }

    const child = () => {
        return allowCoppy && text && typeof text === "string" && text.trim() !== "" ?
            <CopyToClipboard text={text} onCopy={() => message.success({ content: "Đã lưu vào bộ nhớ tạm!", duration: 2, notifi: false })}>
                <td
                    {...props}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    children={children}
                    className={`${className || ""}`.split("  ").join(" ").trim()}
                    onClick={onClick}
                    tbl-id={tblId}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                    col-key={colKey}
                >
                    {children}
                </td>
            </CopyToClipboard> :
            <td
                {...props}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                children={children}
                className={`${className || ""}`.split("  ").join(" ").trim()}
                onClick={onClick}
                tbl-id={tblId}
                colSpan={colSpan}
                rowSpan={rowSpan}
                col-key={colKey}
            />
    }
    return cellDropdown ? <Dropdown
        trigger={["contextMenu"]}
        overlay={<Menu>
            <Menu.Item disabled={!(text && typeof text === "string" && text.trim() !== "")} style={{ padding: 0 }}>
                <CopyToClipboard text={text} onCopy={() => message.success({ content: "Đã lưu vào bộ nhớ tạm!", duration: 2, notifi: false })}>
                    <div style={{ padding: "5px 12px" }}><i className="fa fa-clone m-r-5" />Sao chép</div>
                </CopyToClipboard>
            </Menu.Item>
        </Menu>}
    >
        {child()}
    </Dropdown> : child()

}

export default Cell;