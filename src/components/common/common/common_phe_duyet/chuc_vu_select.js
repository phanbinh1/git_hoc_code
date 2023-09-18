import React from "react";
import { Select } from "antd";
import { deduplicate, findFirstScrollParent } from "../../../constants/main";
import { CONST_CHUC_VU } from "../../../constants/constants";

const ChucVuSelect = ({
    onChange,
    value,
    phongBans
}) => {
    let options = [];
    if (phongBans && Array.isArray(phongBans)) {
        phongBans.map(ph => {
            if (CONST_CHUC_VU[`options${ph}`]) {
                options = [...CONST_CHUC_VU[`options${ph}`], ...options]
            }
            return options;
        })
    }
    return <Select
        style={{ width: "100%" }}
        placeholder="Chức vụ"
        showSearch
        allowClear
        onChange={value => { onChange && onChange(value) }}
        mode="multiple"
        value={value || []}
        getPopupContainer={e => findFirstScrollParent(e) || document.body}
        disabled={!phongBans || phongBans.length === 0}
    >
        {deduplicate(options, "value").map(cv => <Select.Option value={cv.value}>{cv.label}</Select.Option>)}
    </Select>
}

export default ChucVuSelect;