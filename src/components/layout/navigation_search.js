import React, { useState, Fragment, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, Input, AutoComplete } from 'antd';
import * as url from "./../../constants/url";
import { useHistory, useLocation } from "react-router";
import { TYPE_CONFIG_HISTORY_SEARCH, TYPE_CONFIG_HISTORY_SEARCH_REOMVE, TYPE_CONFIG_HISTORY_SEARCH_REOMVE_ALL } from "../../constants/type";
import { queryString } from "../../constants/main";
import { AntIcon } from "../antd";

let clear = false;
let btnCtrl = false;
const NavigationSearch = () => {
    const inputRef = useRef();
    const wrapperInputRef = useRef();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const qs = queryString.parse(location.search);

    const [search, setSearch] = useState(null);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const menu = useSelector(state => state.core.permission.menu);
    const config = useSelector(state => state.core.config);
    const allowShow = menu.findIndex(item => item.url === url.URL_SEARCH) !== -1;

    const onSearch = (_search = search) => {
        setVisible(visible => {
            if (visible) {
                dispatch({
                    type: TYPE_CONFIG_HISTORY_SEARCH,
                    payload: _search
                })
                history.push({ pathname: url.URL_SEARCH, search: `q=${encodeURIComponent(_search)}` });
                inputRef.current && inputRef.current.blur();
            }
            else {
                inputRef.current && inputRef.current.focus();
            }
            return !visible;
        })
    }

    const inputKeyDown = e => {
        if (e.keyCode === 27) {
            setSearch(null);
            e.target.blur();
        }
        else if (e.keyCode === 13 && (!open || (config.history ? config.history.search || [] : []).filter(val => search === null || search === "" || `${val}`.toUpperCase().indexOf(`${search || ""}`.toUpperCase()) >= 0).length === 0)) {
            onSearch();
        }
    }

    const inputBlur = e => {
        setVisible(false)
        setOpen(false)
        wrapperInputRef && wrapperInputRef.current && wrapperInputRef.current.classList.remove("active");
    }

    const inputFocus = e => {
        setVisible(true);
        setOpen(true)
        wrapperInputRef && wrapperInputRef.current && wrapperInputRef.current.classList.add("active");
    }

    useEffect(() => {
        const onKeyDown = e => {
            if (e.keyCode === 17) {
                btnCtrl = true;
            }
            if (e.keyCode === 70 && btnCtrl) {
                inputFocus();
                inputRef.current && inputRef.current.focus();
                e.preventDefault();
            }
        }
        const onKeyUp = e => {
            if (e.keyCode === 17) {
                btnCtrl = false;
            }
        }
        allowShow && window.addEventListener("keydown", onKeyDown)
        allowShow && window.addEventListener("keyup", onKeyUp)
        return () => {
            allowShow && window.removeEventListener("keydown", onKeyDown);
            allowShow && window.removeEventListener("keyup", onKeyUp);
        }
    }, [inputRef, allowShow]);

    useEffect(() => {
        if (location.pathname === url.URL_SEARCH) {
            setSearch(qs.q);
            dispatch({
                type: TYPE_CONFIG_HISTORY_SEARCH,
                payload: qs.q
            })
        }
    }, [qs.q, location.pathname]);

    return allowShow ?
        <Fragment>
            <Tooltip title="Tìm kiếm">
                <span className={`nav-action nav-action-search ${visible ? "active" : ""}`} onClick={onSearch} >
                    <i className="fa fa-search" />
                </span>
            </Tooltip>
            <span className={`nav-action nav-action-search-input-wrapper`} ref={wrapperInputRef} >
                <AutoComplete
                    defaultActiveFirstOption={false}
                    className="nav-action-search-input"
                    ref={inputRef}
                    dataSource={
                        (config.history ? (config.history.search || []) : [])
                            .filter(val => search === null || search === "" || `${val}`.toUpperCase().indexOf(`${search || ""}`.toUpperCase()) >= 0)
                            .map((item, i) => {
                                return <AutoComplete.Option
                                    key={i}
                                    value={item}
                                    style={{ position: "relative", }}
                                >
                                    <div style={{ position: "relative", width: "calc(100% - 20px)", wordWrap: "break-word" }}>{item}</div>
                                    <Tooltip title="Xoá">
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "5px",
                                                right: "5px",
                                                width: "20px",
                                                textAlign: "center"
                                            }}
                                            onClick={() => {
                                                clear = true;
                                                dispatch({ type: TYPE_CONFIG_HISTORY_SEARCH_REOMVE, payload: item })
                                            }}
                                        >
                                            <AntIcon type="close" />
                                        </span>
                                    </Tooltip>
                                </AutoComplete.Option>
                            })
                    }
                    value={search}
                    onChange={value => { !clear && setSearch(value) }}
                    open={open}
                    onDropdownVisibleChange={open => { !clear && setOpen(open) }}
                    defaultOpen
                    optionLabelProp="value"
                    dropdownClassName="nav-search-autocomplete-dropdown"
                    onSelect={value => {
                        !clear && onSearch(value);
                        clear = false;
                    }}
                    dropdownMatchSelectWidth={false}
                    dropdownMenuStyle={{ width: 200 }}
                    allowClear
                    dropdownRender={(menu) => {
                        return <div onMouseEnter={() => { clear = true; }} onMouseLeave={() => { clear = false; }}>
                            <div style={{
                                padding: "5px 12px",
                                borderBottom: "1px solid #ccc",
                                textAlign: "right"
                            }}>
                                <span onClick={() => {
                                    clear = true;
                                    alert(123);
                                    dispatch({ type: TYPE_CONFIG_HISTORY_SEARCH_REOMVE_ALL })
                                }} className="link">Xoá tất cả</span>
                            </div>
                            {menu}
                        </div>
                    }}
                >
                    <Input
                        placeholder="Tìm kiếm..."
                        onKeyDown={inputKeyDown}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                    />
                </AutoComplete>
            </span>
        </Fragment > :
        null;
}

export default NavigationSearch;