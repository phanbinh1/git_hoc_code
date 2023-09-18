import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { deduplicate, findFirstScrollParent } from "../../../constants/main";
import { useSelector } from "react-redux";

const AccountSelect = ({
    maPhongBans = [],
    chucVus = [],
    onChange,
    mode = "default",
    value
}) => {
    const accounts = useSelector(state => state.core.account.profiles);
    const [search, setSearch] = useState(null);

    const _accounts = deduplicate(accounts, "id")
        .filter(account =>
            (maPhongBans.length > 0 ? maPhongBans.findIndex(ma => ma === account.managementDepartment) >= 0 : true)
            && (chucVus.length > 0 ? chucVus.findIndex(cv => cv === account.regency) >= 0 : true)
            && (search ? (account.fullName.toLowerCase().indexOf(search.toLowerCase()) >= 0 || search.toLowerCase().indexOf(account.fullName.toLowerCase()) >= 0) : true)
        );
    useEffect(() => {
        if (_accounts.length === 1) {
            onChange(_accounts[0].name, _accounts[0].managementDepartment, _accounts[0].regency);
        }
    }, [_accounts.length]);
    return <Select
        style={{ width: "100%" }}
        placeholder="Chọn cán bộ xử lý (nếu có)"
        onSearch={search => setSearch(search)}
        showSearch
        allowClear
        onChange={(value, option) => {
            const managementDepartment = option && option.props && option.props.managementDepartment;
            const regency = option && option.props && option.props.regency;
            onChange && onChange(value, managementDepartment, regency)
        }}
        mode={mode}
        getPopupContainer={e => findFirstScrollParent(e) || document.body}
        value={mode === "multiple" ? (value || []) : (value || undefined)}
    >
        {_accounts.map(account => <Select.Option value={account.name} {...account}>{account.fullName}</Select.Option>)}
    </Select>
}

export default AccountSelect;