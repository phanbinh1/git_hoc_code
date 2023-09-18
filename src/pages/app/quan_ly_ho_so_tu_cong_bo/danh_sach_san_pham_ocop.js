import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import DanhSachSanPhamOcop from "./../../../components/app/quan_ly_ho_so_tu_cong_bo/danh_sach_san_pham_ocop/index";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import { queryString, getItemSelected } from "./../../../constants/main";
import * as act from "./../../../actions/index";
import * as pageKeys from "./../../../constants/page_key";
import * as actID from "./../../../constants/action_id";
import { CONST_PHONG_BAN, CONST_CHUC_VU, CONST_TRANG_THAI_HO_SO, CONST_HSTCB_TRANG_THAI_XU_LY } from '../../../constants/constants';
import moment from "moment";
import { getTrangThaiChuyenHoSo } from "./method"
const { CHUYENVIEN, TRUONGBAN } = CONST_CHUC_VU;
const { NGHIEPVU, LANHDAO, VANPHONG } = CONST_PHONG_BAN;

const HoSoTuCongBo = ({
    loaiCongBo
}) => {
    const state = useSelector(state => state);
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const dataSortInit = [
        { key: "id", value: false, sort: 4 },
        { key: "tenCoSo", value: true, sort: 3 },
        { key: "diaDiemKinhDoanh", value: true, sort: 1 },
    ]

    const [pageKey] = useState(`PAGE_KEY_DANH_SACH_SAN_PHAM_OCOP`);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);
    const ho_so_tu_cong_bo_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.danh_sach_san_pham_ocop.list);
    const ttchs = getTrangThaiChuyenHoSo(state);
    const getByOptions = { "1": ttchs.me, "0": ttchs.not_me };
    const account_current = useSelector(state => state.core.account_current);
    const { managementDepartment, regency } = account_current;
    const filterGetBy = (managementDepartment === VANPHONG && regency === CHUYENVIEN) || managementDepartment === NGHIEPVU || (managementDepartment === LANHDAO && regency === TRUONGBAN);
    const dispatch = useDispatch();
    const onSelectRow = (keys = [], rows = []) => {
        const newRows = [
            ...rows,
            ...getItemSelected(rows_selected, pageKey).filter(item => !ho_so_tu_cong_bo_list.find(v => v.id === item.id))
        ];
        dispatch(act.selectRow(newRows, pageKey))
    };
    const getAllRequest = (object = {}) => dispatch(actHoSoTuCongBo.getAllSanPhamOcopRequest({ ...object, pageKey }));
    const deleteRequest = (object = {}) => dispatch(actHoSoTuCongBo.deleteSPOcopRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, [loaiCongBo]);

    const handleSearch = () => {
        history.push({
            search: queryString.stringify({
                ...qs,
                action: actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_SEARCH
            })
        });
    };

    const handleImport = () => {
        history.push({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_IMPORT, id: undefined }) });
    };

    const handleList = () => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST, id: undefined })
        });
    };

    const handleBack = handleList;

    const handleDelete = (delteAll = true, id) => {
        const list_ho_so_tu_cong_bo_delete = delteAll ?
            getItemSelected(rows_selected, pageKey).map(item => item.id) :
            [id];
        deleteRequest({
            data: list_ho_so_tu_cong_bo_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    useEffect(() => {
        if (qs.loaded) {
            const tenSanPham = qs.tenSanPham;
            const tenCoSo = qs.tenCoSo;
            const diaDiemKinhDoanh = qs.diaDiemKinhDoanh;
            const daiDienCoSo = qs.daiDienCoSo;
            const soDienThoai = qs.soDienThoai;
            handleStartLoadData();
            let searchData = {};
            searchData = {
                tenSanPham,
                tenCoSo,
                diaDiemKinhDoanh,
                daiDienCoSo,
                soDienThoai
            };

            const data = {
                // sortData: queryString.sortStringify(dataSort),
                currentPage: qs.page || 1,
                pageSize: qs.page_size || 20,
                searchData: queryString.stringify(searchData)
            }
            getAllRequest({
                data,
                requestSuccess: () => {
                    onSelectRow();
                    handleEndLoadData();
                },
                requestError: () => {
                    handleEndLoadData();
                }
            });
        }
    }, [
        loaiCongBo,
        managementDepartment,
        regency,
        dataSort,
        qs.page,
        qs.page_size,
        qs.loaded,
        qs.get_by,
        qs.tenSanPham,
        qs.tenCoSo,
        qs.diaDiemKinhDoanh,
        qs.daiDienCoSo,
        qs.soDienThoai
    ])

    const handleAllRequest = () => {
        const tenSanPham = qs.tenSanPham;
        const tenCoSo = qs.tenCoSo;
        const diaDiemKinhDoanh = qs.diaDiemKinhDoanh;
        const daiDienCoSo = qs.daiDienCoSo;
        const soDienThoai = qs.soDienThoai;
        handleStartLoadData();
        let searchData = {};
        searchData = {
            tenSanPham,
            tenCoSo,
            diaDiemKinhDoanh,
            daiDienCoSo,
            soDienThoai
        };
        let data = {
            // sortData: queryString.sortStringify(dataSort),
            currentPage: qs.page || 1,
            pageSize: qs.page_size || 20,
            searchData: queryString.stringify(searchData)
        }
        getAllRequest({
            data,
            requestSuccess: () => {
                onSelectRow();
                handleEndLoadData();
            },
            requestError: () => {
                handleEndLoadData();
            }
        });
    }

    return <Fragment>
        {(!qs.action || (qs.loaded && !filterGetBy && qs.get_by) || (!qs.loaded && (!qs.get_by || !qs.nam || !qs.trang_thai_xu_ly))) && <Redirect
            to={{
                ...location,
                search: queryString.stringify({
                    ...qs,
                    loaded: true,
                    action: actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST,
                })
            }}
        />}
        <DanhSachSanPhamOcop
            key={loaiCongBo}
            qs={qs}
            loaiCongBo={loaiCongBo}
            pageKey={pageKey}
            dataLoading={dataLoading}
            dataSort={dataSort}
            getAllRequest={getAllRequest}
            onSelectRow={onSelectRow}
            // handleEdit={handleEdit}
            handleBack={handleBack}
            handleDelete={handleDelete}
            // handleCreate={handleCreate}
            handleSearch={handleSearch}
            handleStartLoadData={handleStartLoadData}
            handleEndLoadData={handleEndLoadData}
            handleChangeDataSort={handleChangeDataSort}
            selectedRowKeys={getItemSelected(rows_selected, pageKey).map(item => item.id)}
            handleAllRequest={handleAllRequest}
            handleImport={handleImport}
        />
    </Fragment>
}

export default HoSoTuCongBo;

export * from "./method";