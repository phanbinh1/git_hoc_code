import React, { useState, useEffect, Fragment } from "react";
import { read } from "./";
import { Dropdown, Skeleton, Tooltip } from "antd";
import { renderToString } from "react-dom/server"

const CommonCurrency = ({
    children,
    unit,
    separate = ".",
    loading,

    dropdown = {
        allow: false,
        trigger: "hover" || "click" || "contextmenu",
        overlay: null,
        className: "",
        overlayClassName: "",
    }
}) => {
    const [result, setResult] = useState(children);
    const [char, setChar] = useState(null);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useEffect(() => {
        let _result = "";

        try {
            const childrenElm = document.createElement("span");
            childrenElm.innerHTML = renderToString(children);
            _result = childrenElm.innerText.replace(/ /g, "");
        }
        catch (e) {
            console.error("Children of <CommonCurrency> must type of string!");
            _result = "";
        }
        setChar(read(_result));
        _result = _result.split(".").join(",").replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separate}`);
        setResult(_result);
    }, [children])
    return <Fragment>
        <Skeleton active loading={loading} className="skeleton-currency" paragraph={false}>
            <Tooltip title={char} visible={tooltipVisible} onVisibleChange={v => setTooltipVisible(v)}>
                {
                    dropdown && dropdown.allow ? <Dropdown
                        overlay={dropdown.overlay}
                        className={dropdown.className}
                        overlayClassName={dropdown.overlayClassName}
                        trigger={[dropdown.trigger]}
                        visible={dropdownVisible}
                        onVisibleChange={v => {
                            setDropdownVisible(v);
                            v && setTooltipVisible(false);
                        }}
                    >
                        <span>{result || 0} {unit ? unit : ""}</span>
                    </Dropdown> :
                        <span>{result || 0} {unit ? unit : ""}</span>
                }

            </Tooltip>
        </Skeleton>
    </Fragment>
}

export default CommonCurrency;