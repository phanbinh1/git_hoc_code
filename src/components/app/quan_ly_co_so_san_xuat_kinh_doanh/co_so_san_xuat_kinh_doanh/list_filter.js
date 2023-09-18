import React, { Fragment } from 'react';
import { CommonFilter } from "./../../../common";
import { queryString } from "./../../../../constants/main";
import { CONST_TRANG_THAI_HOAT_DONG, CONST_TINH_TRANG_GIAY_CHUNG_NHAN, CONST_PHE_DUYET } from "./../../../../constants/constants";
import { useHistory, useLocation } from 'react-router';

const ListFilter = () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);


    const getSelectedKeys = () => {
        let result = [];
        qs.hscxl === "1" && result.push("hscxl");
        qs[`${CONST_TRANG_THAI_HOAT_DONG.name}`] && result.push(`${CONST_TRANG_THAI_HOAT_DONG.name}${qs[`${CONST_TRANG_THAI_HOAT_DONG.name}`]}`);
        qs[`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}`] && result.push(`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}${qs[`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}`]}`);
        qs[`${CONST_PHE_DUYET.name}`] && result.push(qs[`${CONST_PHE_DUYET.name}`]);
        result.length === 0 && result.push("ALL");
        return result;
    }

    return <Fragment>
        <CommonFilter
            menus={[
                { label: "Hồ sơ cần xử lý", key: "hscxl", iconCls: "fa-share-square-o" },
                { label: "Tất cả cơ sở", key: "ALL", iconCls: "fa-reply-all", disabled: qs.hscxl === "1" },
                { type: "divider" },
                { isTitle: true, disabled: true, iconCls: "fa-pencil-square-o", label: "Trạng thái hoạt động" },
                ...CONST_TRANG_THAI_HOAT_DONG.options.map(item => ({ key: `${CONST_TRANG_THAI_HOAT_DONG.name}${item.num_key}`, label: item.label, ...item, disabled: qs.hscxl === "1" })),
                { type: "divider" },
                { isTitle: true, disabled: true, iconCls: "fa-file-text-o", label: "Tình trạng giấy chứng nhận" },
                ...CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.map(item => ({ key: `${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}${item.num_key}`, label: item.label, ...item, disabled: qs.hscxl === "1" })),

                { type: "divider" },
                { isTitle: true, disabled: true, iconCls: "fa-pencil-square-o", label: "Trạng thái phê duyệt" },
                ...CONST_PHE_DUYET.coSoOptions.map(item => ({ key: `${CONST_PHE_DUYET.name}${item.num_key}`, label: item.label, ...item, disabled: qs.hscxl === "1" })),
            ]}
            selectedKeys={getSelectedKeys()}
            onSelect={(key, item) => {
                if (key === "ALL") {
                    history.push({ search: queryString.stringify({ ...qs, ...{ trang_thai_hoat_dong: undefined, tinh_trang_gcn: undefined, trang_thai_phe_duyet: 3, hscxl: undefined } }) })
                }
                else if (key === "hscxl") {
                    history.push({ search: queryString.stringify({ ...qs, hscxl: qs.hscxl === "1" ? undefined : 1 }) })
                }
                else {
                    history.push({
                        search: queryString.stringify({
                            ...qs, ...{
                                [`${item.name}`]: qs[`${item.name}`] === item.num_key ? (item.name === CONST_PHE_DUYET.name ? 3 : undefined) : item.num_key
                            }
                        })
                    })
                }
            }}
        />
    </Fragment>
}
export default ListFilter;