import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Button, Menu } from 'antd';
import { CommonFilter } from '../../common';
import moment from 'moment';
import * as constants from "./../../../constants/constants";
import { queryString } from "./../../../constants/main";
import { useHistory, useLocation } from 'react-router';

const FilterDropdown = ({ dataLoading }) => {
    const history = useHistory();
    const location = useLocation();

    const qs = queryString.parse(location.search);

    const account_current = useSelector(state => state.core.account_current);
    const { managementDepartment, regency } = account_current;

    const { CONST_TRANG_THAI_HO_SO, CONST_CHUC_VU, CONST_PHONG_BAN, CONST_HSTCB_TRANG_THAI_XU_LY } = constants;
    const { CHUYENVIEN, TRUONGBAN } = CONST_CHUC_VU;
    const { VANPHONG, NGHIEPVU, LANHDAO } = CONST_PHONG_BAN;

    const nam = qs.nam && !isNaN(qs.nam) ? parseInt(qs.nam, 0) : moment().year();
    const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx);
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            const currentYearElm = document.getElementById(`nam-${nam}`);
            currentYearElm && visible && currentYearElm.scrollIntoView();
        }, 100)
    }, [nam, visible]);

    const getSelectedKeys = () => {
        let result = [];
        qs.get_by && result.push(`get_by${qs.get_by}`);
        qs.isSanPhamOcop && result.push(`isSanPhamOcop${qs.isSanPhamOcop}`);
        qs.trang_thai_xu_ly && result.push(`trang_thai_xu_ly${qs.trang_thai_xu_ly}`);
        qs.trang_thai_ho_so && result.push(`trang_thai_ho_so${qs.trang_thai_ho_so}`);
        result.length === 0 && result.push("ALL");
        return result;
    }

    const hoSoXuLy = () => {
        let result = [], options = [];
        if (
            (managementDepartment === VANPHONG && regency === CHUYENVIEN)
            || managementDepartment === NGHIEPVU
            || (managementDepartment === LANHDAO && regency === TRUONGBAN)
        ) {
            options = [[
                { key: "get_by1", label: "Của tôi", num_key: "1", name: "get_by" },
                { key: "get_by0", label: "Không phải tôi", num_key: "0", name: "get_by" },
            ]]
            result = [
                { type: "divider" },
                { isTitle: true, iconCls: "fa-user", disabled: true, label: "Hồ sơ xử lý" },
                { key: "get_by1", label: "Của tôi", num_key: "1", name: "get_by" },
                { key: "get_by0", label: "Không phải tôi", num_key: "0", name: "get_by" },
            ]
        }
        return {
            options,
            result
        };
    }

    const hoSoSanPham = () => {
        let result = [], options = [];
        options = [[
            { key: "isSanPhamOcop2", label: "Tất cả", num_key: 2, name: "isSanPhamOcop" },
            { key: "isSanPhamOcop0", label: "Không phải sản phẩm OCOP", num_key: "0", name: "isSanPhamOcop" },
            { key: "isSanPhamOcop1", label: "Sản phẩm OCOP", num_key: "1", name: "isSanPhamOcop" },
        ]]
        result = [
            { type: "divider" },
            { isTitle: true, iconCls: "fa-user", disabled: true, label: "Hồ sơ sản phẩm" },
            { key: "isSanPhamOcop2", label: "Tất cả", num_key: 2, name: "isSanPhamOcop" },
            { key: "isSanPhamOcop0", label: "Không phải sản phẩm OCOP", num_key: "0", name: "isSanPhamOcop" },
            { key: "isSanPhamOcop1", label: "Sản phẩm OCOP", num_key: "1", name: "isSanPhamOcop" },
        ]

        return {
            options,
            result
        };
    }

    return <Fragment>
        <CommonFilter
            loading={dataLoading}
            menus={[
                { label: "Tất cả hồ sơ", key: "ALL", iconCls: "fa-reply-all", name: "all" },
                ...hoSoSanPham().result,
                ...hoSoXuLy().result,
                { type: "divider" },
                { type: "divider" },
                { isTitle: true, disabled: true, iconCls: "fa-share-square-o", label: "Trạng thái hồ sơ" },
                ...CONST_TRANG_THAI_HO_SO.tuCongBoOptions.map(item => ({ key: `${item.name}${item.num_key}`, label: item.label, ...item })),
                { type: "divider" },
                { isTitle: true, disabled: true, iconCls: "fa-pencil-square-o", label: "Trạng thái xử lý" },
                ...CONST_HSTCB_TRANG_THAI_XU_LY.options.map(item => ({ key: `${item.name}${item.num_key}`, label: item.label, ...item }))
            ]}
            selectedKeys={getSelectedKeys()}
            onSelect={(key, item) => {
                if (key === "ALL") {
                    history.push({ search: queryString.stringify({ ...qs, ...{ trang_thai_xu_ly: undefined, trang_thai_ho_so: undefined, get_by: undefined, isSanPhamOcop: undefined } }) })
                }
                else {
                    history.push({ search: queryString.stringify({ ...qs, ...{ [`${item.name}`]: qs[`${item.name}`] === item.num_key ? undefined : item.num_key } }) })
                }
            }}
        />
        <Dropdown
            trigger={["click"]}
            className="m-l-5"
            visible={visible}
            onVisibleChange={v => setVisible(v)}
            overlay={<Menu
                selectedKeys={[`${nam}`]}
                onClick={_data => {
                    history.push({ search: queryString.stringify({ ...qs, nam: _data.key, ntn_from: undefined, ntn_to: undefined }) })
                }}>
                {range(nam - 15, nam + 10).reverse().map((n) => <Menu.Item key={`${n}`} value={n} id={`nam-${n}`}>Năm {n}</Menu.Item>)}
            </Menu>}
            overlayStyle={{ maxHeight: "100vh", height: "200px", overflow: "auto" }}
        >
            <Button type="success"><i className="fa fa-calendar m-r-5" />Năm {nam}<i className="fa fa-angle-down m-l-5" /></Button>
        </Dropdown>
    </Fragment >
}

export default FilterDropdown;