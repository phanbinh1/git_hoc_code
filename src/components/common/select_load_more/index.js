import React, { useState, useEffect } from 'react';
import AbortController from "abort-controller"
import { Select, Spin, Empty } from "antd";
import * as api from "./../../../util/api_call";
import * as main from "./../../../constants/main";
import { AntIcon } from '../../antd';

const SelectLoadMore = ({
    pageSize,
    url,
    value,
    valueKey,
    labelKey,
    searchKey,
    searchKeyExtend,
    placeholder,
    selectDefaultValue,
    onChange,
    onLoadMore,
    changeCallback,
    id,
    renderData,
    searchData = {},
    meta: { form },
    getPopupContainer,
    ...props
}) => {
    const [_options, _setOptions] = useState([]);
    const [searchIng, setSearchIng] = useState(true);
    const [_loading, _setLoading] = useState(false);
    const [_currentPage, _setCurrentPage] = useState(1);
    const [_pageSize] = useState(isNaN(pageSize) ? 10 : pageSize);
    const [_handleLoad, _setHandleLoad] = useState(null);
    const [_hasMore, _setHasMore] = useState(true);
    const [_controller, _setController] = useState(new AbortController());
    const [dropdownId] = useState(main.createID());
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        pushOptions(_currentPage, false);
        return () => _controller.abort();
    }, [])

    const loadData = (currentPage = _currentPage, isSearch = false, _q = "") => {
        let data = { ...searchData, currentPage, pageSize: _pageSize }
        data[searchKey] = (searchKeyExtend ? searchKeyExtend + "=" : "") + _q;
        _setController(new AbortController());
        api.get({ url, data, controller: _controller })
            .then(res => {
                setSearchIng(false);
                if (res && res.status) {
                    if (res.pagination) {
                        try { _setHasMore(!(res.pagination.pageSize * res.pagination.currentPage >= res.pagination.total)); }
                        catch (e) { _setHasMore(false); }
                    }
                    else {
                        _setHasMore(true);
                    }
                    let _result = res.result;
                    if (renderData && typeof renderData === "function") {
                        const _data = renderData(res.result);
                        if (_data && Array.isArray(_data)) {
                            _result = _data;
                        }
                    }
                    const result = _result.map((item) => {
                        return {
                            ...item,
                            [valueKey]: item[valueKey],
                            [labelKey]: item[labelKey],
                            value: item[valueKey],
                            label: item[labelKey]
                        }
                    })
                    _setOptions(() => {
                        let _res = result;
                        if (!isSearch) {
                            _res = [..._options, ...result];
                        }
                        if (selectDefaultValue && selectDefaultValue.hasOwnProperty(valueKey)) {
                            let objItem = {};
                            objItem[valueKey] = selectDefaultValue[valueKey];
                            const index = _res.findIndex(item => item[valueKey] === objItem[valueKey]);
                            if (index === -1) {
                                _res = [
                                    {
                                        ...selectDefaultValue,
                                        [valueKey]: selectDefaultValue[valueKey],
                                        [labelKey]: selectDefaultValue[labelKey],
                                        value: selectDefaultValue[valueKey],
                                        label: selectDefaultValue[labelKey],
                                    },
                                    ..._res
                                ];
                            }
                        }
                        typeof onLoadMore === "function" &&
                            onLoadMore({
                                data: main.deduplicate(_res, valueKey),
                                pagination: res.pagination,
                            });
                        return main.deduplicate(_res, valueKey);
                    })
                    _setCurrentPage(currentPage + 1);
                    _setLoading(false);
                }
                else {
                    _setLoading(false);
                }
            })
            .catch(e => {
                setSearchIng(false);
                _setLoading(false);
            })
    }

    const pushOptions = (currentPage, isSearch = false, _q = "") => {
        !_loading && _setLoading(true);
        if (_handleLoad) {
            clearTimeout(_handleLoad);
        }
        _setHandleLoad(setTimeout(() => { loadData(currentPage, isSearch, _q) }, 400))
    };

    const renderOption = () => {
        return _options.map((item, index) => {
            return <Select.Option key={index} value={item.value} {...item}>{item.label}</Select.Option>
        });
    };

    const handleSearch = (q) => {
        setSearchValue(q);
        setSearchIng(true);
        _setCurrentPage(1);
        _setOptions(() => {
            let res = [];
            if (selectDefaultValue && selectDefaultValue.hasOwnProperty(valueKey)) {
                res = [
                    {
                        ...selectDefaultValue,
                        [valueKey]: selectDefaultValue[valueKey],
                        [labelKey]: selectDefaultValue[labelKey],
                        value: selectDefaultValue[valueKey],
                        label: selectDefaultValue[labelKey],
                    }
                ];
            }
            return main.deduplicate(res, valueKey);
        })
        pushOptions(1, true, q);
    };

    const checkValueExits = () => {
        let exitsValue = false;
        _options.map((item) => {
            if (item[valueKey] === value) {
                exitsValue = true;
            }
            return null
        })
        if (!exitsValue) {
            return undefined;
        }
        return value;
    };
    return <Select
        {...props}
        getPopupContainer={getPopupContainer}
        id={id}
        onChange={(value, option) => {
            if (!value) {
                handleSearch("");
            }
            onChange(value, option)
            changeCallback && changeCallback(value, option);
        }}
        value={checkValueExits()}
        placeholder={_loading ? <span><AntIcon type="loading" /> Đang tải...</span> : placeholder}
        showSearch
        notFoundContent={_loading ? <Spin spinning size="small" /> : <Empty description="Không có dữ liệu" />}
        style={{ width: "100%" }}
        optionFilterProp="children"
        filterOption={(input, option) => {
            return `${option.props.children || ""}`.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
        onSearch={handleSearch}
        onInputKeyDown={e => {
            if (_loading) {
                const dropdownOptions = document.querySelector(`#${dropdownId} > div > .ant-select-dropdown-menu`);
                if (dropdownOptions) {
                    if ((
                        e.keyCode === 40
                        && dropdownOptions.lastElementChild
                        && dropdownOptions.lastElementChild.classList.contains("ant-select-dropdown-menu-item-active")
                    )
                        ||
                        (
                            e.keyCode === 38
                            && dropdownOptions.firstElementChild
                            && dropdownOptions.firstElementChild.classList.contains("ant-select-dropdown-menu-item-active")
                        )) {
                        e.preventDefault();
                    }
                }
            }
        }}
        onPopupScroll={e => {
            const scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
            if (scrollBottom <= 50 && _hasMore && !_loading) {
                pushOptions(_currentPage, false, searchValue);
                setSearchIng(false);
            }
        }}
        dropdownClassName={`form-select-load-more-dropdown ${id}`}
    >
        {renderOption()}
        {_hasMore && !searchIng && <Select.Option disabled key="loading" style={{ textAlign: "center", color: "#fff", background: "lightcoral" }}><AntIcon type="loading" /> Đang tải...</Select.Option>}
    </Select>
}

export default SelectLoadMore;