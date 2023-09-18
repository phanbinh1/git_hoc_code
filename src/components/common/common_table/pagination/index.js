import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from "antd";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";

const CommonPagination = ({
    paginationKey,
    onChange,
    firstLoad = true,
    countLabelExtend,
    placement,
    countItem,
    filter
}) => {
    const [pagination, setPagination] = useState(constants.CONST_PAGINATION);
    const paginations = useSelector(state => state.core.paginations);

    useEffect(() => {
        const _pagination = getPaginationLocalStorage();
        if (onChange && typeof onChange === "function" && firstLoad) {
            onChange(_pagination);
        }
    }, []);

    useEffect(() => {
        const _pagination = getPaginationProps();
        setPagination({ ...constants.CONST_PAGINATION, ..._pagination });
    }, [paginations])

    const getPaginationLocalStorage = () => {
        const _paginations = main.getArrayPaginationLocalStorage();
        const _paginationKey = paginationKey ? paginationKey : constants.CONST_PAGINATION_KEY_DEFAULT;
        const index = _paginations.findIndex(item => item.key === _paginationKey)
        const _pagination = index !== -1 ? (_paginations[index].pagination ? _paginations[index].pagination : constants.CONST_PAGINATION) : constants.CONST_PAGINATION;
        return _pagination;
    }

    const getPaginationProps = () => {
        const _paginationKey = paginationKey ? paginationKey : constants.CONST_PAGINATION_KEY_DEFAULT;
        const index = paginations.findIndex(item => item.key === _paginationKey);
        const _pagination = index !== -1 ? (paginations[index].pagination ? paginations[index].pagination : constants.CONST_PAGINATION) : constants.CONST_PAGINATION;
        return _pagination;
    }

    const handleChange = (currentPage, pageSize) => {
        let _pagination = getPaginationLocalStorage();
        currentPage = currentPage > 0 ? currentPage : 1;
        _pagination = { ..._pagination, pageSize, currentPage };
        if (onChange && typeof onChange === "function") {
            onChange(_pagination);
        }
    };

    const onShowSizeChange = (currentPage, pageSize) => {
        let _pagination = getPaginationLocalStorage();
        currentPage = currentPage > 0 ? currentPage : 1;
        _pagination = { ..._pagination, pageSize, currentPage };
        if (onChange && typeof onChange === "function") {
            onChange(_pagination);
        }
    };

    const itemRender = (page, type, originalElement) => {
        return originalElement;
    }

    return (
        <React.Fragment>
            <div className={`pagination-wrapper pagination-wrapper-${placement} `}>
                <div className="pagination-filter">
                    {filter}
                </div>
                <Pagination
                    current={pagination.currentPage}
                    total={pagination.total && !isNaN(pagination.total) ? pagination.total : 0}
                    pageSize={pagination.pageSize}
                    showSizeChanger
                    showLessItems={true}
                    pageSizeOptions={constants.CONST_PAGE_SIZE_OPTIONS}
                    className="common-pagination"
                    onChange={handleChange}
                    onShowSizeChange={onShowSizeChange}
                    showTotal={(total, range) => {
                        var from = range[0];
                        var to = range[1];
                        if (to - from + 1 > countItem) {
                            to = from - 1 + countItem;
                        }
                        return <span>Hiển thị {from}-{to >= from ? to : from} / <b>{total}{countLabelExtend}</b></span>
                    }}
                    itemRender={itemRender}
                />
            </div>
        </React.Fragment>
    );
}

export default CommonPagination;