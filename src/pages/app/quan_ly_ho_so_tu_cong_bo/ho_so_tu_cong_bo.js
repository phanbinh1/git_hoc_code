import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import HoSoTuCongBoComponent from "./../../../components/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
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

    const [pageKey] = useState(`${pageKeys.PAGE_KEY_HO_SO_TU_CONG_BO}_${loaiCongBo}`);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSort, setDataSort] = useState(dataSortInit);

    const rows_selected = useSelector(state => state.core.rows_selected);
    const ho_so_tu_cong_bo_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.ho_so_tu_cong_bo.list.filter(item => item.loaiCongBo === loaiCongBo));
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
    const getAllRequest = (object = {}) => dispatch(actHoSoTuCongBo.getAllRequest({ ...object, pageKey }));
    const deleteRequest = (object = {}) => dispatch(actHoSoTuCongBo.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
    }, [loaiCongBo]);

    const handleSearch = () => {
        history.push({
            search: queryString.stringify({
                ...qs,
                action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH
            })
        });
    };

    const handleCreate = () => {
        history.push({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE, id: undefined }) });
    };

    const handleImport = () => {
        history.push({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_IMPORT, id: undefined }) });
    };

    const handleEdit = (id) => {
        history.push({ search: queryString.stringify({ ...qs, id, action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_UPDATE }) });
    };

    const handleList = () => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST, id: undefined })
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
            const nam = qs.nam || moment().year();
            const trangThaiChuyenHoSos = getByOptions[`${qs.get_by && (qs.get_by === "1" || qs.get_by === "0") ? qs.get_by : undefined}`];
            const trangThaiXuLy = qs.trang_thai_xu_ly && CONST_HSTCB_TRANG_THAI_XU_LY.options.findIndex(item => item.num_key === qs.trang_thai_xu_ly) >= 0 ? CONST_HSTCB_TRANG_THAI_XU_LY.options.find(item => item.num_key === qs.trang_thai_xu_ly).value : undefined;
            const listTrangThaiHoSo = qs.trang_thai_ho_so && CONST_TRANG_THAI_HO_SO.tuCongBoOptions.findIndex(item => item.num_key === qs.trang_thai_ho_so) >= 0 ? CONST_TRANG_THAI_HO_SO.tuCongBoOptions.find(item => item.num_key === qs.trang_thai_ho_so).value : undefined;
            const tuNgayTiepNhan = qs.ntn_from ? qs.ntn_from : `01/01/${nam}`;
            const denNgayTiepNhan = qs.ntn_to ? qs.ntn_to : `31/12/${nam}`;
            const soGiayBienNhanTuCongBo = qs.so_gbn && decodeURIComponent(qs.so_gbn);
            const tenCoSo = qs.ten_co_so && decodeURIComponent(qs.ten_co_so);
            const tenSanPham = qs.ten_san_pham && decodeURIComponent(qs.ten_san_pham);
            const thoiDiemTuCongBoTuNgay = qs.tcb_from;
            const thoiDiemTuCongBoDenNgay = qs.tcb_to;
            const soThongBao = qs.so_thong_bao && decodeURIComponent(qs.so_thong_bao);
            const ngayThongBao = qs.ngay_thong_bao;
            const maQuanHuyen = qs.ma_quan_huyen;
            const maXaPhuong = qs.ma_xa_phuong;
            const diaDiemKinhDoanh = qs.dia_chi && decodeURIComponent(qs.dia_chi);
            const isSanPhamOcop = qs.isSanPhamOcop || 2;
            handleStartLoadData();
            let searchData = {};
            if (qs.isSanPhamOcop == 2 || qs.isSanPhamOcop == undefined) {
                searchData = {
                    loaiCongBo,
                    listTrangThaiHoSo,
                    trangThaiXuLy,
                    trangThaiChuyenHoSos,
                    tuNgayTiepNhan,
                    denNgayTiepNhan,
                    soGiayBienNhanTuCongBo,
                    tenCoSo,
                    tenSanPham,
                    thoiDiemTuCongBoTuNgay,
                    thoiDiemTuCongBoDenNgay,
                    soThongBao,
                    ngayThongBao,
                    maQuanHuyen,
                    maXaPhuong,
                    diaDiemKinhDoanh,
                    lichSuCongBo: 1,
                };
            } else {
                searchData = {
                    loaiCongBo,
                    listTrangThaiHoSo,
                    trangThaiXuLy,
                    trangThaiChuyenHoSos,
                    tuNgayTiepNhan,
                    denNgayTiepNhan,
                    soGiayBienNhanTuCongBo,
                    tenCoSo,
                    tenSanPham,
                    thoiDiemTuCongBoTuNgay,
                    thoiDiemTuCongBoDenNgay,
                    soThongBao,
                    ngayThongBao,
                    maQuanHuyen,
                    maXaPhuong,
                    diaDiemKinhDoanh,
                    lichSuCongBo: 1,
                    isSanPhamOcop
                };
            }
            const data = {
                sortData: queryString.sortStringify(dataSort),
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
        qs.trang_thai_xu_ly,
        qs.trang_thai_ho_so,
        qs.nam,
        qs.so_gbn,
        qs.ten_co_so,
        qs.ten_san_pham,
        qs.tcb_from,
        qs.tcb_to,
        qs.ntn_from,
        qs.ntn_to,
        qs.so_thong_bao,
        qs.ngay_thong_bao,
        qs.ma_quan_huyen,
        qs.ma_xa_phuong,
        qs.dia_chi,
        qs.isSanPhamOcop,
        qs.fresh
    ])

    const handleAllRequest = () => {
        let data = {
            sortData: queryString.sortStringify(dataSort),
            currentPage: qs.page || 1,
            pageSize: qs.page_size || 20,
            // searchData: queryString.stringify(searchData)
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
                    nam: qs.nam || moment().year(),
                    get_by: filterGetBy ? (qs.get_by || 1) : undefined,
                    trang_thai_xu_ly: qs.trang_thai_xu_ly || 1,
                    action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST,
                    isSanPhamOcop: 2
                })
            }}
        />}
        <HoSoTuCongBoComponent
            key={loaiCongBo}
            qs={qs}
            loaiCongBo={loaiCongBo}
            pageKey={pageKey}
            dataLoading={dataLoading}
            dataSort={dataSort}
            getAllRequest={getAllRequest}
            onSelectRow={onSelectRow}
            handleEdit={handleEdit}
            handleBack={handleBack}
            handleDelete={handleDelete}
            handleCreate={handleCreate}
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