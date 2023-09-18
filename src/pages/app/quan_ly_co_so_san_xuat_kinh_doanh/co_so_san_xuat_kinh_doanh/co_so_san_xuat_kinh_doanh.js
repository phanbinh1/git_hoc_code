import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from "react-router";
import CoSoSanXuatKinhDoanhComponent from "./../../../../components/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import { getItemSelected, queryString } from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";
import { CONST_TRANG_THAI_HOAT_DONG, CONST_TINH_TRANG_GIAY_CHUNG_NHAN, CONST_PHE_DUYET } from "./../../../../constants/constants";
import { getCauHinh } from '../../../../util/api_call';
import { dateTimeFormat } from '../../../../constants/controll';
import * as apiUrl from "./../../../../constants/api";

const CoSoSanXuatKinhDoanh = () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const dataSortInit = [
        { key: "ngayCapChungNhanAttp", value: false, sort: 13 },
        { key: "soChungNhanAttp", value: true, sort: 12 },
        { key: "tenDangKyKinhDoanh", value: true, sort: 11 },
        { key: "chuCoSo", value: false, sort: 10 },
        { key: "tenCoSo", value: true, sort: 9 },
        { key: "diaDiemKinhDoanh", value: true, sort: 8 },
        { key: "ngayHetHanChungNhanAttp", value: true, sort: 3 },
    ]

    const [pageKey] = useState(pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSort, setDataSort] = useState(dataSortInit);
    const [quanHuyenQuanLys, setQuanHuyenQuanLys] = useState(undefined);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const getAllRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.getAllRequest({ ...object, pageKey }));
    const deleteRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.deleteRequest(object));

    useEffect(() => {
        onSelectRow([]);
        const getCauHinhPhongBanQuanLyCoSoTheoDiaBan = async () => {
            const res = await getCauHinh({ ma: "cau_hinh_phong_ban_quan_ly_co_so_theo_dia_ban" })
            let phongBans = [];
            if (res && res.status && res.result && res.result.giaTri) {
                try {
                    const result = JSON.parse(res.result.giaTri || "");
                    phongBans = result && Array.isArray(result.phongBans) ? result.phongBans : [];
                }
                catch (e) {
                    phongBans = [];
                }
            }
            const phongBan = phongBans.find(item => item.ma === account_current.managementDepartment);
            setQuanHuyenQuanLys(phongBan && Array.isArray(phongBan.quanHuyenQuanLys) ? phongBan.quanHuyenQuanLys : []);
        }
        getCauHinhPhongBanQuanLyCoSoTheoDiaBan();
    }, [account_current]);

    const handleSearch = () => {
        history.push({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH }) })
    };

    const handleBaoCao = () => {
        history.push({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT }) })
    };

    const handleReport = () => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_REPORT })
        })
    };

    const handleCreate = () => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CREATE })
        })
    };

    const handleEdit = (id) => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_UPDATE, id })
        })
    };

    const handleDetail = (id) => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DETAIL, id })
        })
    };

    const handleList = () => {
        history.push({
            search: queryString.stringify({ ...qs, id: undefined, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST })
        })
    };

    const handleTCBEdit = (id) => {
        history.push({
            search: queryString.stringify({ ...qs, action: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_TCB_UPDATE, id })
        })
    };

    // const onDownloadDanhGiaHangSao = (data) => {
    //     const item = {
    //         date: moment().format(dateTimeFormat),
    //         title: "Đánh giá hạng sao",
    //         url: main.convertObjectToQueryVariable(apiUrl.API_BAOCAOCOSOHANGSAO_EXPORT, data)
    //     }
    //     createHistoryDownload({
    //         username: account_current.name,
    //         process: item
    //     })
    // };

    const handleBack = handleList;

    const handleDelete = (delteAll = true, id) => {
        const list_co_so_san_xuat_delete = delteAll ?
            getItemSelected(rows_selected, pageKey) :
            [id];
        deleteRequest({
            data: list_co_so_san_xuat_delete,
            requestSuccess: handleDeleteSuccess
        });
    };

    const handleDeleteSuccess = () => onSelectRow([]);
    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    useEffect(() => {
        if (qs.loaded && Array.isArray(quanHuyenQuanLys)) {

            const { managementDepartment, regency } = account_current;

            const trangThaiCoSo = qs.trang_thai_hoat_dong && CONST_TRANG_THAI_HOAT_DONG.options.findIndex(item => item.num_key === qs.trang_thai_hoat_dong) >= 0 ? CONST_TRANG_THAI_HOAT_DONG.options.find(item => item.num_key === qs.trang_thai_hoat_dong).value : undefined;
            const trangThaiGcnAttp = qs.tinh_trang_gcn && CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.findIndex(item => item.num_key === qs.tinh_trang_gcn) >= 0 ? CONST_TINH_TRANG_GIAY_CHUNG_NHAN.options.find(item => item.num_key === qs.tinh_trang_gcn).selectValue : undefined;
            const soGiayPhepDkkd = qs.sgp_dkkd && decodeURIComponent(qs.sgp_dkkd);
            const soChungNhanAttp = qs.scn_attp && decodeURIComponent(qs.scn_attp);
            const tenCoSo = qs.ten_co_so && decodeURIComponent(qs.ten_co_so);
            const loaiHinhCoSoId = qs.loai_hinh_co_so_id;
            const linhVucId = qs.linh_vuc_id;
            const maQuanHuyen = qs.ma_quan_huyen;
            const maXaPhuong = qs.ma_xa_phuong;
            const diaDiemKinhDoanh = qs.dia_diem_kinh_doanh && decodeURIComponent(qs.dia_diem_kinh_doanh);
            const listMaQuanHuyen = quanHuyenQuanLys.findIndex(item => item.ma === maQuanHuyen) >= 0 ? maQuanHuyen : quanHuyenQuanLys.map(item => item.ma).join(",");
            const trangThaiPheDuyet = qs.trang_thai_phe_duyet && CONST_PHE_DUYET.options.findIndex(item => item.num_key === qs.trang_thai_phe_duyet) >= 0 ? CONST_PHE_DUYET.options.find(item => item.num_key === qs.trang_thai_phe_duyet).value : CONST_PHE_DUYET.DAPHEDUYET;
            const isXepHangSao = qs.isXepHangSao ? qs.isXepHangSao === "true" ? qs.isXepHangSao : undefined : undefined;

            const showHoSoCanXuLy = qs.hscxl === "1";
            handleStartLoadData();
            let searchData = showHoSoCanXuLy ? {
                trangThaiPheDuyet: CONST_PHE_DUYET.CHOPHEDUYET,
                trangThaiChuyenHoSos: `${regency},${managementDepartment},1`
            } : {
                trangThaiCoSo,
                trangThaiGcnAttp,
                soGiayPhepDkkd,
                soChungNhanAttp,
                tenCoSo,
                loaiHinhCoSoId,
                linhVucId,
                listMaQuanHuyen,
                maXaPhuong,
                diaDiemKinhDoanh,
                trangThaiPheDuyet,
                isXepHangSao
            };
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
        quanHuyenQuanLys,
        qs.loaded,
        qs.page,
        qs.page_size,
        qs.sgp_dkkd,
        qs.scn_attp,
        qs.ten_co_so,
        qs.loai_hinh_co_so_id,
        qs.linh_vuc_id,
        qs.trang_thai_hoat_dong,
        qs.tinh_trang_gcn,
        qs.ma_quan_huyen,
        qs.ma_xa_phuong,
        qs.dia_diem_kinh_doanh,
        qs.trang_thai_phe_duyet,
        qs.hscxl,
        account_current,
        dataSort,
        qs.isXepHangSao
    ]);

    return <Fragment>
        {
            (!qs.action || (!qs.loaded && !qs[`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}`] && !qs[`${CONST_TRANG_THAI_HOAT_DONG.name}`])) &&
            <Redirect
                to={{
                    ...location,
                    search: queryString.stringify({
                        ...qs,
                        loaded: true,
                        action: qs.action || actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST,
                        [`${CONST_PHE_DUYET.name}`]: qs[`${CONST_PHE_DUYET.name}`] || CONST_PHE_DUYET.DAPHEDUYET_NUM_KEY,
                        [`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}`]: qs[`${CONST_TINH_TRANG_GIAY_CHUNG_NHAN.name}`] || CONST_TINH_TRANG_GIAY_CHUNG_NHAN.CONHAN_NUM_KEY,
                        [`${CONST_TRANG_THAI_HOAT_DONG.name}`]: qs[`${CONST_TRANG_THAI_HOAT_DONG.name}`] || CONST_TRANG_THAI_HOAT_DONG.DANGHOATDONG_NUM_KEY,
                    })
                }}
            />
        }
        <CoSoSanXuatKinhDoanhComponent
            dataLoading={dataLoading}
            dataSort={dataSort}
            handleBack={handleBack}
            handleChangeDataSort={handleChangeDataSort}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
            handleDetail={handleDetail}
            handleEdit={handleEdit}
            handleReport={handleReport}
            handleSearch={handleSearch}
            handleTCBEdit={handleTCBEdit}
            onSelectRow={onSelectRow}
            pageKey={pageKey}
            quanHuyenQuanLys={quanHuyenQuanLys}
            handleBaoCao={handleBaoCao}
        />
    </Fragment>
}

export default CoSoSanXuatKinhDoanh;