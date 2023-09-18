import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import * as actAccount from "./../../../../actions/core/account"
import * as main from "./../../../../constants/main";
import { CommonPagination } from "../../../common";
import Search from "./search";
import Table from "./table";
import ActionBar from "./action";
import { AntIcon } from "../../../antd";

const List = ({
    selected,
    setSelected,
    accountSelected = [],
    searchKey,
    rowKey,
    maxItemSelect,
    setVisiblePopover,
    timeout,
    changeTimeout,
    onOk,
    phongBans
}) => {
    const pageKey = "PAGE_KEY_ACCOUNT_POPUP_SEARCH";
    const dispatch = useDispatch();
    const getAccounts = (object = {}) => dispatch(actAccount.getAllRequest({ ...object, pageKey }));
    const account_list = useSelector(state => state.core.account.list);
    const [pagination, setPagination] = useState(main.getParamPagination(pageKey));
    const [fullName, setFullName] = useState(searchKey);
    const [email, setEmail] = useState("");
    const [phongBan, setPhongBan] = useState(phongBans && Array.isArray(phongBans) ? phongBans : []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelected(accountSelected && Array.isArray(accountSelected) ? accountSelected : []);
    }, []);

    const onChange = (pagination) => {
        setLoading(true);
        getAccounts({
            data: {
                ...pagination,
                ...(fullName && fullName.trim() !== "" ? { fullNameSearch: fullName } : {}),
                ...(email && email.trim() !== "" ? { emailSearch: email } : {}),
                ...(phongBan && phongBan.length > 0 ? { department: phongBan } : {}),
            },
            requestSuccess: () => {
                setPagination(pagination);
                setLoading(false);
            },
            requestError: () => setLoading(false)
        });
    }

    return <Fragment>
        <Search
            getAccounts={getAccounts}
            pagination={pagination}
            setPagination={setPagination}

            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phongBan={phongBan}
            setPhongBan={setPhongBan}

            loading={loading}
            setLoading={setLoading}

            selected={selected}
            onUnselect={() => setSelected([])}

            phongBans={phongBans}
        />
        <ActionBar
            accountSelected={accountSelected}
            rowKey={rowKey}
            selected={selected}
            onSelect={() => onOk(selected)}
            onUnselect={() => setSelected([])}
        />
        <Spin spinning={loading} indicator={<AntIcon type="loading" className="tbl-loading-icon" />}>
            <Table
                changeTimeout={changeTimeout}
                maxItemSelect={maxItemSelect}
                pagination={pagination}
                rowKey={rowKey}
                selected={selected}
                setSelected={setSelected}
                setVisiblePopover={setVisiblePopover}
                timeout={timeout}
                dataSource={account_list}
            />
            <CommonPagination
                firstLoad={false}
                onChange={onChange}
                paginationKey={pageKey}
                countItem={account_list.length}
            />
        </Spin>
    </Fragment>
}

export default List;