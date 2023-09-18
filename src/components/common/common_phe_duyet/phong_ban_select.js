import React from "react";
import { Select } from "antd";
import { findFirstScrollParent } from "../../../constants/main";
import { useSelector } from "react-redux";

const PhongBanSelect = ({
    value,
    onChange,
    maPhongBanOptions,
    phongBanDisible
}) => {
    const phong_bans = useSelector(state => state.core.account.phong_bans);
    const options = (maPhongBanOptions && Array.isArray(maPhongBanOptions) ? phong_bans.filter(pb => maPhongBanOptions.includes(pb.ma)) : phong_bans);
    return <Select
        disabled={phongBanDisible ? true : false}
        style={{ width: "100%" }}
        placeholder="Phòng ban"
        showSearch
        allowClear
        onChange={value => { onChange && onChange(value) }}
        mode={Array.isArray(options) && options.length > 1 ? "multiple" : "default"}
        value={value || []}
        getPopupContainer={e => findFirstScrollParent(e) || document.body}
    >
        {
            options.map(phongban => <Select.Option value={phongban.ma}>
                {phongban.ten}
            </Select.Option>)
        }
    </Select>
}

export default PhongBanSelect;