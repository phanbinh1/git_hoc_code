import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Descriptions, Table, Button, Tag, Popover, Badge, Modal, Skeleton, Dropdown, Menu, Tooltip } from "antd";
import { ModalHoSo } from "./../../../../components/app/quan_ly_thong_bao_cong_bo_san_pham/list_ho_so";
import * as actThongBaoCongBoSanPham from "./../../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import * as constants from "./../../../../constants/constants";
import * as actID from "./../../../../constants/action_id";
import * as url from "./../../../../constants/url";
import * as act from "./../../../../actions/index";
import { CommonPheDuyet, CommonFieldset } from '../../../../components/common';
import { Link } from 'react-router-dom';
import ThongBaoCongBoSanPhamTrinhPheDuyet from '../../../../components/app/quan_ly_thong_bao_cong_bo_san_pham/trinh_phe_duyet';
import ModalYeuCauBoSungHoSo from "./modal_yeu_cau_bo_sung";
import LuanChuyen from './drawer_luan_chuyen';
import { dateTimeFormat } from "./../../../../constants/controll";
import moment from "moment";
import LuanChuyenThongBao from './drawer_luan_chuyen_thong_bao';

const ThongBaoCongBoSanPhamDetail = ({
    queryVariable
}) => {
    const dispatch = useDispatch();
    const getOneRequest = (object) => dispatch(actThongBaoCongBoSanPham.getOneRequest(object));
    const updateRequest = (object) => dispatch(actThongBaoCongBoSanPham.updateRequest(object));
    const trinhPheDuyetThongBaoRequest = (data = {}) => dispatch(actThongBaoCongBoSanPham.trinhPheDuyetRequest(data))
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const [showLuanChuyen, setShowLuanChuyen] = useState(false);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const account_current = useSelector(state => state.core.account_current);
    const item = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.thong_bao_cong_bo_san_pham.item)

    const [yeuCauBoSungHoSoState, setYeuCauBoSungHoSoState] = useState(null)
    const [rowSelecteds, setRowSelecteds] = useState([]);
    const [visiblePheDuyetThongBao, setVisiblePheDuyetThongBao] = useState(false);
    const [visibleTrinhPheDuyetThongBao, setVisibleTrinhPheDuyetThongBao] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [hoSoLuanChuyen, setHoSoLuanChuyen] = useState(null);

    const getAllowAction = () => {
        let allowUpdateHS = false, allowPheDuyet = false, allowPheDuyetThongBao = false, allowTrinhPheDuyet = false, allowHuyThongBao = false;
        const { regency } = account_current;
        const { CONST_PHE_DUYET, CONST_CHUC_VU } = constants
        const { DAPHEDUYET, KHONGPHEDUYET, HUY } = CONST_PHE_DUYET;
        const { CHUYENVIEN } = CONST_CHUC_VU
        if (item) {
            const { thongBaoCongBo } = item
            allowUpdateHS = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL.ACT_UPDATE_HS)
                && regency === thongBaoCongBo.trangThaiChuyenThongBao
                && (!thongBaoCongBo || (thongBaoCongBo && thongBaoCongBo.trangThaiPheDuyet !== DAPHEDUYET
                    && thongBaoCongBo.trangThaiPheDuyet !== KHONGPHEDUYET
                    && thongBaoCongBo.trangThaiPheDuyet !== HUY));

            allowPheDuyet = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL.ACT_PHEDUYET_HS)
                && regency === thongBaoCongBo.trangThaiChuyenThongBao
                && (!thongBaoCongBo || (thongBaoCongBo && thongBaoCongBo.trangThaiPheDuyet !== DAPHEDUYET &&
                    thongBaoCongBo.trangThaiPheDuyet !== KHONGPHEDUYET
                    && thongBaoCongBo.trangThaiPheDuyet !== HUY));
        }
        allowPheDuyetThongBao = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL.ACT_PHEDUYET);
        allowTrinhPheDuyet = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL.ACT_TRINHPHEDUYET) && (item && item.listHoSo && item.listHoSo.length > 0) && !(!item || !item.thongBaoCongBo || item.thongBaoCongBo.trangThaiChuyenThongBao !== account_current.regency);
        allowHuyThongBao = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL.ACT_HUYTHONGBAO) && account_current.regency === CHUYENVIEN && (!item || !item.listHoSo || item.listHoSo.length === 0);
        return { allowUpdateHS, allowPheDuyet, allowPheDuyetThongBao, allowTrinhPheDuyet, allowHuyThongBao }
    }

    useEffect(() => {
        if (queryVariable.id) {
            getOneRequest({
                data: { id: queryVariable.id },
                requestSuccess: (res) => {
                    if (res.status && res.result) {
                        setError(false);
                    }
                    setLoading(false);
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
        else {
            setLoading(false);
        }
    }, [queryVariable]);

    useEffect(() => {
        setAction([
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_THONGBAOCONGBO, hidden: true },
            {
                key: actID.ACT_BACK,
                text: "Luân chuyển thông báo",
                handleClick: () => setShowLuanChuyen(true),
                iconClass: "fa fa-sliders m-r-10",
                hidden: item.thongBaoCongBo ? false : true
            },
        ]);
    }, [item]);

    const getNewTrangThai = () => {
        const { regency } = account_current;
        const { CONST_CHUC_VU } = constants;
        const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
        switch (regency) {
            case CHUYENVIEN:
                return {
                    msg: "Đã trình Phó trưởng phòng phê duyệt!",
                    chucVu: PHOTRUONGPHONG
                };
            case PHOTRUONGPHONG:
                return {
                    msg: "Đã trình Trưởng phòng phê duyệt!",
                    chucVu: TRUONGPHONG
                };
            case TRUONGPHONG:
                return {
                    msg: "Đã trình Trưởng ban phê duyệt!",
                    chucVu: TRUONGBAN
                };
            default:
                return {
                    chucVu: CHUYENVIEN
                };
        }
    }

    const renderTrangThaiPheDuyet = (item) => {
        const { CONST_PHE_DUYET, CONST_CHUC_VU } = constants;
        const { CHOPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET;
        const trangThai = CONST_PHE_DUYET.optionsThongBaoCongBoSanPham.find(o => o.value === item.trangThaiPheDuyet) || { label: "" };
        const { trangThaiChuyenThongBao } = item;
        return trangThai ? <Tag color={trangThai.color}>
            {trangThai.label.toUpperCase()}
            {
                trangThai.value === CHOPHEDUYET && trangThaiChuyenThongBao &&
                <Tooltip
                    placement="left"
                    title={<Fragment>Thông báo đang chờ <b>{CONST_CHUC_VU.label[trangThaiChuyenThongBao].toUpperCase()}</b> phê duyệt!</Fragment>}
                >
                    <i className="fa fa-info-circle m-l-5 c-pointer" />
                </Tooltip>
            }
            {
                trangThai.value === KHONGPHEDUYET &&
                <Popover
                    title="Lý do không phê duyệt"
                    content={item.lyDoKhongPheDuyet}
                    trigger={"click"}
                    overlayClassName="popover-warning"
                >
                    <Badge status="processing" color="red" className="m-l-10 c-pointer" />
                </Popover>
            }
        </Tag> : null;
    }

    const renderLoaiCongBo = (item) => {
        const loaiCongBo = constants.CONST_LOAI_CONG_BO_SAN_PHAM.options.find(v => v.value === item.thongBaoCongBo.loaiCongBo);
        if (loaiCongBo) {
            return loaiCongBo.label;
        }
        else {
            return item.thongBaoCongBo.loaiCongBo;
        }
    }

    return (
        <React.Fragment>
            <div className="col-md-12" style={{ height: "100%", padding: "20px" }}>
                <LuanChuyenThongBao
                    thongBao={showLuanChuyen && item && item.thongBaoCongBo}
                    onClose={() => setShowLuanChuyen(false)}
                />
                <ModalHoSo
                    visibleModal={visibleModal}
                    setVisibleModal={setVisibleModal}
                    loaiCongBo={item.thongBaoCongBo && item.thongBaoCongBo.loaiCongBo}
                    hoSoSelected={item.listHoSo}
                    onSave={(listHoSo) => {
                        const { thongBaoCongBo } = item;
                        updateRequest({
                            data: {
                                thongBaoCongBo,
                                listHoSoCongBo: (listHoSo || []).map(item => {
                                    let lichSuLuanChuyen = [];
                                    try {
                                        lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                                        if (!Array.isArray(lichSuLuanChuyen)) {
                                            lichSuLuanChuyen = [];
                                        }
                                    }
                                    catch (e) {
                                        lichSuLuanChuyen = [];
                                    }
                                    const luanChuyenGanNhat = lichSuLuanChuyen[0];
                                    if (luanChuyenGanNhat && luanChuyenGanNhat.maXuLy === constants.CONST_LUAN_CHUYEN.NEW) {
                                        lichSuLuanChuyen[0] = {
                                            maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                                            nguoiXyLy: account_current.fullName,
                                            phongBan: account_current.managementDepartment,
                                            chucVu: account_current.regency,
                                            username: account_current.name,
                                            lyDo: null,
                                            thongBaoCongBoSanPham: {
                                                id: thongBaoCongBo.id || null,
                                                tieuDe: thongBaoCongBo.tieuDe
                                            },
                                            thoiGian: moment().format(dateTimeFormat)
                                        }
                                    }
                                    else {
                                        lichSuLuanChuyen.unshift({
                                            maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                                            nguoiXyLy: account_current.fullName,
                                            phongBan: account_current.managementDepartment,
                                            chucVu: account_current.regency,
                                            username: account_current.name,
                                            lyDo: null,
                                            thongBaoCongBoSanPham: {
                                                id: thongBaoCongBo.id || null,
                                                tieuDe: thongBaoCongBo.tieuDe
                                            },
                                            thoiGian: moment().format(dateTimeFormat)
                                        })
                                    }
                                    return {
                                        id: item.id,
                                        lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                                    }
                                })
                            }
                        })
                    }}
                    idThongBao={item.thongBaoCongBo && item.thongBaoCongBo.id ? item.thongBaoCongBo.id : null}
                />
                {
                    loading ?
                        <Fragment>
                            <Skeleton
                                active
                                loading={loading}
                                paragraph={{
                                    rows: 5,
                                    width: ["80%", "100%", "70%", "50%", "90%"]
                                }}
                            />
                        </Fragment> :
                        (error || !item.thongBaoCongBo ? <Alert
                            message="Không thể tìm thấy hồ sơ!"
                            type="error"
                            showIcon
                        /> :
                            <Fragment>
                                <LuanChuyen
                                    hoSo={hoSoLuanChuyen}
                                    onClose={() => setHoSoLuanChuyen(null)}
                                />
                                <ModalYeuCauBoSungHoSo
                                    setRowSelecteds={setRowSelecteds}
                                    onCancel={() => {
                                        setYeuCauBoSungHoSoState({})
                                    }}
                                    {...yeuCauBoSungHoSoState}
                                />
                                <ThongBaoCongBoSanPhamTrinhPheDuyet
                                    visible={visibleTrinhPheDuyetThongBao}
                                    onCancel={() => {
                                        setVisibleTrinhPheDuyetThongBao(false)
                                    }}
                                    onConfirm={({ tieuDe }) => {
                                        const newTrangThai = getNewTrangThai();
                                        const { thongBaoCongBo, listHoSo } = item;
                                        let lichSuLuanChuyenThongBao = [];
                                        try {
                                            lichSuLuanChuyenThongBao = JSON.parse(thongBaoCongBo.lichSuLuanChuyen);
                                            if (!Array.isArray(lichSuLuanChuyenThongBao)) {
                                                lichSuLuanChuyenThongBao = [];
                                            }
                                        }
                                        catch (e) {
                                            lichSuLuanChuyenThongBao = [];
                                        }
                                        lichSuLuanChuyenThongBao.unshift({
                                            maXuLy: constants.CONST_LUAN_CHUYEN.NEXT,
                                            nguoiXyLy: account_current.fullName,
                                            username: account_current.name,
                                            lyDo: null,
                                            thongBaoCongBoSanPham: {
                                                id: thongBaoCongBo.id || null,
                                                tieuDe: thongBaoCongBo.tieuDe
                                            },
                                            hoSos: (listHoSo || []).map(item => ({
                                                id: item.id,
                                                loaiCongBo: item.loaiCongBo,
                                                tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                                                diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                                                danhSachSanPhamCongBo: (item.danhSachSanPhamCongBo || [])
                                            })),
                                            thoiGian: moment().format(dateTimeFormat)
                                        })
                                        trinhPheDuyetThongBaoRequest({
                                            data: {
                                                listHoSoCongBo: (listHoSo || []).map((item) => {
                                                    let lichSuLuanChuyen = [];
                                                    try {
                                                        lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                                                        if (!Array.isArray(lichSuLuanChuyen)) {
                                                            lichSuLuanChuyen = [];
                                                        }
                                                    }
                                                    catch (e) {
                                                        lichSuLuanChuyen = [];
                                                    }
                                                    lichSuLuanChuyen.unshift({
                                                        maXuLy: constants.CONST_LUAN_CHUYEN.NEXT,
                                                        nguoiXyLy: account_current.fullName,
                                                        username: account_current.name,
                                                        lyDo: null,
                                                        thongBaoCongBoSanPham: {
                                                            id: thongBaoCongBo.id,
                                                            tieuDe
                                                        },
                                                        thoiGian: moment().format(dateTimeFormat)
                                                    })
                                                    return {
                                                        id: item.id,
                                                        lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                                                    }
                                                }),
                                                thongBaoCongBo: {
                                                    ...thongBaoCongBo,
                                                    lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                                    tieuDe,
                                                    trangThaiPheDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
                                                    trangThaiChuyenThongBao: newTrangThai.chucVu
                                                },
                                                msg: newTrangThai.msg
                                            },
                                            requestSuccess: () => {
                                                setVisibleTrinhPheDuyetThongBao(false)
                                            }
                                        })
                                    }}
                                    tieuDeDefault={item.thongBaoCongBo ? item.thongBaoCongBo.tieuDe : null}
                                    allowUpdateTieuDe={account_current.regency === constants.CONST_CHUC_VU.CHUYENVIEN || account_current.regency === constants.CONST_CHUC_VU.PHOTRUONGPHONG}
                                />
                                <CommonPheDuyet
                                    visible={visiblePheDuyetThongBao}
                                    onCancel={() => setVisiblePheDuyetThongBao(false)}
                                    onConfirm={() => {
                                        const { thongBaoCongBo, listHoSo } = item;
                                        let lichSuLuanChuyenThongBao = [];
                                        try {
                                            lichSuLuanChuyenThongBao = JSON.parse(thongBaoCongBo.lichSuLuanChuyen);
                                            if (!Array.isArray(lichSuLuanChuyenThongBao)) {
                                                lichSuLuanChuyenThongBao = [];
                                            }
                                        }
                                        catch (e) {
                                            lichSuLuanChuyenThongBao = [];
                                        }
                                        lichSuLuanChuyenThongBao.unshift({
                                            maXuLy: constants.CONST_LUAN_CHUYEN.APPROVAL,
                                            nguoiXyLy: account_current.fullName,
                                            username: account_current.name,
                                            lyDo: null,
                                            thongBaoCongBoSanPham: {
                                                id: thongBaoCongBo.id || null,
                                                tieuDe: thongBaoCongBo.tieuDe
                                            },
                                            hoSos: (listHoSo || []).map(item => ({
                                                id: item.id,
                                                loaiCongBo: item.loaiCongBo,
                                                tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                                                diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                                                danhSachSanPhamCongBo: (item.danhSachSanPhamCongBo || [])
                                            })),
                                            thoiGian: moment().format(dateTimeFormat)
                                        })
                                        trinhPheDuyetThongBaoRequest({
                                            data: {
                                                listHoSoCongBo: (listHoSo || []).map((item) => {
                                                    let lichSuLuanChuyen = [];
                                                    try {
                                                        lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                                                        if (!Array.isArray(lichSuLuanChuyen)) {
                                                            lichSuLuanChuyen = [];
                                                        }
                                                    }
                                                    catch (e) {
                                                        lichSuLuanChuyen = [];
                                                    }
                                                    lichSuLuanChuyen.unshift({
                                                        maXuLy: constants.CONST_LUAN_CHUYEN.APPROVAL,
                                                        nguoiXyLy: account_current.fullName,
                                                        username: account_current.name,
                                                        lyDo: null,
                                                        thongBaoCongBoSanPham: {
                                                            id: thongBaoCongBo.id,
                                                            tieuDe: thongBaoCongBo.tieuDe
                                                        },
                                                        thoiGian: moment().format(dateTimeFormat)
                                                    })
                                                    return {
                                                        id: item.id,
                                                        lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                                                    }
                                                }),
                                                thongBaoCongBo: {
                                                    ...thongBaoCongBo,
                                                    lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                                    trangThaiPheDuyet: constants.CONST_PHE_DUYET.DAPHEDUYET,
                                                },
                                                msg: "Phê duyệt thành công!"
                                            },
                                            requestSuccess: (res) => {
                                                setVisiblePheDuyetThongBao(false)
                                            }
                                        })
                                    }}
                                    onNotConfirm={({ lyDo }) => {
                                        const { thongBaoCongBo, listHoSo } = item;
                                        let lichSuLuanChuyenThongBao = [];
                                        try {
                                            lichSuLuanChuyenThongBao = JSON.parse(thongBaoCongBo.lichSuLuanChuyen);
                                            if (!Array.isArray(lichSuLuanChuyenThongBao)) {
                                                lichSuLuanChuyenThongBao = [];
                                            }
                                        }
                                        catch (e) {
                                            lichSuLuanChuyenThongBao = [];
                                        }
                                        lichSuLuanChuyenThongBao.unshift({
                                            maXuLy: constants.CONST_LUAN_CHUYEN.NOT_APPROVAL,
                                            nguoiXyLy: account_current.fullName,
                                            username: account_current.name,
                                            lyDo: null,
                                            thongBaoCongBoSanPham: {
                                                id: thongBaoCongBo.id || null,
                                                tieuDe: thongBaoCongBo.tieuDe
                                            },
                                            hoSos: (listHoSo || []).map(item => ({
                                                id: item.id,
                                                loaiCongBo: item.loaiCongBo,
                                                tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                                                diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                                                danhSachSanPhamCongBo: (item.danhSachSanPhamCongBo || [])
                                            })),
                                            thoiGian: moment().format(dateTimeFormat)
                                        })
                                        trinhPheDuyetThongBaoRequest({
                                            data: {
                                                listHoSoCongBo: (listHoSo || []).map((item) => {
                                                    let lichSuLuanChuyen = [];
                                                    try {
                                                        lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                                                        if (!Array.isArray(lichSuLuanChuyen)) {
                                                            lichSuLuanChuyen = [];
                                                        }
                                                    }
                                                    catch (e) {
                                                        lichSuLuanChuyen = [];
                                                    }
                                                    lichSuLuanChuyen.unshift({
                                                        maXuLy: constants.CONST_LUAN_CHUYEN.NOT_APPROVAL,
                                                        nguoiXyLy: account_current.fullName,
                                                        username: account_current.name,
                                                        lyDo: lyDo,
                                                        thongBaoCongBoSanPham: {
                                                            id: thongBaoCongBo.id,
                                                            tieuDe: thongBaoCongBo.tieuDe
                                                        },
                                                        thoiGian: moment().format(dateTimeFormat)
                                                    })
                                                    return {
                                                        id: item.id,
                                                        lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                                                    }
                                                }),
                                                thongBaoCongBo: {
                                                    ...thongBaoCongBo,
                                                    lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                                    trangThaiPheDuyet: constants.CONST_PHE_DUYET.KHONGPHEDUYET,
                                                    lyDoKhongPheDuyet: lyDo
                                                },
                                                msg: "Phê duyệt thất bại!"
                                            },
                                            requestSuccess: (res) => {
                                                setVisiblePheDuyetThongBao(false)
                                            }
                                        })
                                    }}
                                />
                                <Skeleton active loading={loading}>
                                    <CommonFieldset title={<Fragment><i className="fa fa-info-circle m-r-10" />Thông tin hồ sơ</Fragment>}>
                                        <Descriptions size="small" column={4} className="m-b-10">
                                            <Descriptions.Item label="Tiêu đề" span={2}>{item.thongBaoCongBo.tieuDe}</Descriptions.Item>
                                            <Descriptions.Item label="Trạng thái" span={2}>{renderTrangThaiPheDuyet(item.thongBaoCongBo)}</Descriptions.Item>

                                            <Descriptions.Item label="Loại công bố" span={2}>{renderLoaiCongBo(item)}</Descriptions.Item>
                                            <Descriptions.Item label="Từ ngày" >{item.thongBaoCongBo.tuNgay}</Descriptions.Item>
                                            <Descriptions.Item label="Đến ngày" >{item.thongBaoCongBo.denNgay}</Descriptions.Item>

                                            <Descriptions.Item label="Số thông báo" span={2}>{item.thongBaoCongBo.soThongBao}</Descriptions.Item>
                                            <Descriptions.Item label="Người ký">{item.thongBaoCongBo.nguoiKyThongBao}</Descriptions.Item>
                                            <Descriptions.Item label="Ngày ký">{item.thongBaoCongBo.ngayKyThongBao}</Descriptions.Item>
                                        </Descriptions>
                                    </CommonFieldset>
                                </Skeleton>
                                <Skeleton active loading={loading}>
                                    <CommonFieldset title={<Fragment><i className="fa fa-file-text-o m-r-10" />Danh sách hồ sơ công bố</Fragment>}>
                                        {(getAllowAction().allowUpdateHS || getAllowAction().allowPheDuyet || getAllowAction().allowHuyThongBao) && <CommonFieldset className="m-b-10 t-right">
                                            {
                                                getAllowAction().allowPheDuyetThongBao &&
                                                <Button
                                                    type="primary"
                                                    disabled={!(item
                                                        && item.thongBaoCongBo
                                                        && item.thongBaoCongBo.trangThaiPheDuyet === constants.CONST_PHE_DUYET.CHOPHEDUYET
                                                    ) || !item.listHoSo || item.listHoSo.length === 0}
                                                    onClick={() => setVisiblePheDuyetThongBao(true)}
                                                    className="m-l-10"
                                                >
                                                    <i className="fa fa-pencil m-r-10" />Phê duyệt thông báo
                                                            </Button>
                                            }
                                            {
                                                getAllowAction().allowTrinhPheDuyet &&
                                                <Button
                                                    onClick={() => {
                                                        setVisibleTrinhPheDuyetThongBao(true)
                                                    }}
                                                    className="m-l-10"
                                                    disabled={!(item && item.thongBaoCongBo && (item.thongBaoCongBo.trangThaiPheDuyet === constants.CONST_PHE_DUYET.CHOPHEDUYET || item.thongBaoCongBo.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DANGHOANTHIEN))}
                                                >
                                                    <i className="fa fa-share-square-o m-r-10" />Trình phê duyệt
                                                            </Button>
                                            }
                                            {
                                                getAllowAction().allowHuyThongBao &&
                                                <Button
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            style: { top: 50 },
                                                            title: "Xác nhận",
                                                            content: "Bạn chắc chắn muốn hủy thông báo này?",
                                                            okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                                                            okButtonProps: { type: "danger" },
                                                            cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                                            onOk: () => {
                                                                const { thongBaoCongBo } = item;
                                                                let lichSuLuanChuyenThongBao = [];
                                                                try {
                                                                    lichSuLuanChuyenThongBao = JSON.parse(thongBaoCongBo.lichSuLuanChuyen);
                                                                    if (!Array.isArray(lichSuLuanChuyenThongBao)) {
                                                                        lichSuLuanChuyenThongBao = [];
                                                                    }
                                                                }
                                                                catch (e) {
                                                                    lichSuLuanChuyenThongBao = [];
                                                                }
                                                                lichSuLuanChuyenThongBao.unshift({
                                                                    maXuLy: constants.CONST_LUAN_CHUYEN.DESTROY,
                                                                    nguoiXyLy: account_current.fullName,
                                                                    username: account_current.name,
                                                                    lyDo: null,
                                                                    thongBaoCongBoSanPham: {
                                                                        id: thongBaoCongBo.id || null,
                                                                        tieuDe: thongBaoCongBo.tieuDe
                                                                    },
                                                                    hoSos: [],
                                                                    thoiGian: moment().format(dateTimeFormat)
                                                                })
                                                                trinhPheDuyetThongBaoRequest({
                                                                    data: {
                                                                        thongBaoCongBo: {
                                                                            ...thongBaoCongBo,
                                                                            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                                                            trangThaiPheDuyet: constants.CONST_PHE_DUYET.HUY,
                                                                        },
                                                                        msg: "Đã hủy thông báo thành công!"
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }}
                                                    className="m-l-10"
                                                    type="danger"
                                                    disabled={!(item && item.thongBaoCongBo && (item.thongBaoCongBo.trangThaiPheDuyet === constants.CONST_PHE_DUYET.CHOPHEDUYET || item.thongBaoCongBo.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DANGHOANTHIEN))}
                                                >
                                                    <i className="fa fa-times m-r-10" />Hủy thông báo
                                                            </Button>
                                            }
                                            {
                                                getAllowAction().allowUpdateHS &&
                                                <Fragment>
                                                    <Button type="primary" onClick={() => setVisibleModal(true)} className="m-l-10">
                                                        <i className="fa fa-pencil m-r-10" />Thay đổi
                                                                </Button>
                                                    <Button
                                                        type="danger"
                                                        disabled={rowSelecteds.length === 0}
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                style: { top: 50 },
                                                                title: "Xác nhận",
                                                                content: "Bạn chắc chắn muốn xóa?",
                                                                onOk: () => {
                                                                    updateRequest({
                                                                        data: {
                                                                            thongBaoCongBo: item.thongBaoCongBo,
                                                                            listHoSoCongBo: item.listHoSo.filter(hs => rowSelecteds.findIndex(r => r.id === hs.id) === -1).map(val => val.id)
                                                                        },
                                                                        requestSuccess: () => {
                                                                            setRowSelecteds([]);
                                                                        }
                                                                    })
                                                                },
                                                                okText: <Fragment><i className="fa fa-check m-r-10" />Đồng ý</Fragment>,
                                                                cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                                                okType: "danger"
                                                            })
                                                        }}
                                                        className="m-l-10"
                                                    >
                                                        <i className="fa fa-trash m-r-10" />Xóa {rowSelecteds.length > 0 ? ` (${rowSelecteds.length})` : ""}
                                                    </Button>
                                                </Fragment>
                                            }
                                            {
                                                getAllowAction().allowPheDuyet &&
                                                <Fragment>
                                                    <Button
                                                        onClick={() => {
                                                            const { thongBaoCongBo, listHoSo } = item;
                                                            setYeuCauBoSungHoSoState({ visible: true, thongBaoCongBo, listHoSoCongBo: (rowSelecteds.length > 0 ? rowSelecteds : (listHoSo || [])) });
                                                        }}
                                                        className="m-l-10"
                                                        disabled={rowSelecteds.length === 0 && item.listHoSo.length === 0}
                                                        type="danger"
                                                    >
                                                        <i className="fa fa-reply m-r-10" />
                                                        {
                                                            rowSelecteds.length === 0 ?
                                                                "Yêu cầu bổ sung tất cả hồ sơ" :
                                                                `Yêu cầu bổ sung hồ sơ ${rowSelecteds.length > 0 ? ` (${rowSelecteds.length})` : ""}`
                                                        }

                                                    </Button>
                                                </Fragment>
                                            }
                                        </CommonFieldset>}
                                        <Table
                                            style={{ marginBottom: 20 }}
                                            rowSelection={getAllowAction().allowPheDuyet || getAllowAction().allowUpdateHS ? {
                                                columnWidth: 40,
                                                selectedRowKeys: rowSelecteds.map(item => item.id),
                                                fixed: "left",
                                                onChange: (keys, rows) => {
                                                    setRowSelecteds(rows);
                                                }
                                            } : undefined}
                                            pagination={{
                                                size: "defalut",
                                                showSizeChanger: true,
                                                pageSizeOptions: constants.CONST_PAGE_SIZE_OPTIONS,
                                            }}
                                            bordered
                                            size="small"
                                            rowKey="id"
                                            scroll={{ x: 900, y: "calc(100vh - 200px)" }}
                                            columns={[
                                                {
                                                    title: "STT",
                                                    width: 60,
                                                    align: "center",
                                                    dataIndex: "stt",
                                                    fixed: "left"
                                                },
                                                {
                                                    title: "Tên sản phẩm",
                                                    render: (_, item) => {
                                                        const { loaiCongBo } = item;
                                                        return <Link
                                                            to={loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ?
                                                                `${url.URL_HO_SO_TU_CONG_BO_DETAIL}?id=${item.id}` :
                                                                `${url.URL_HO_SO_BAN_CONG_BO_DETAIL}?id=${item.id}`}
                                                        >
                                                            {item.danhSachSanPhamCongBo.map((sp, i) => <div key={i}> - {sp.tenSanPham}</div>)}
                                                        </Link>
                                                    }
                                                },
                                                {
                                                    title: "Tên công ty",
                                                    dataIndex: "tenDangKyKinhDoanh"
                                                },
                                                {
                                                    title: "Địa điểm kinh doanh",
                                                    width: 300,
                                                    render: (_, item) => {
                                                        return `${item.diaDiemKinhDoanh} 
                                                ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
                                                ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
                                                ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
                                                `;
                                                    }
                                                },
                                                {
                                                    title: "Ngày tiếp nhận",
                                                    dataIndex: "ngayTiepNhan",
                                                    width: 120
                                                },
                                                {
                                                    width: 130,
                                                    align: "center",
                                                    fixed: "right",
                                                    render: (_, record) => {
                                                        return <Dropdown
                                                            trigger={["click"]}
                                                            overlay={<Menu>
                                                                <Menu.Item onClick={() => setHoSoLuanChuyen(record)}>
                                                                    <i className="fa fa-sliders m-r-10" />Luân chuyển hồ sơ
                                                            </Menu.Item>
                                                                {
                                                                    getAllowAction().allowUpdateHS && <Menu.Item
                                                                        onClick={() => {
                                                                            const { thongBaoCongBo } = item;
                                                                            Modal.confirm({
                                                                                style: { top: 50 },
                                                                                title: "Xác nhận",
                                                                                content: "Bạn chắc chắn muốn xóa?",
                                                                                onOk: () => {
                                                                                    updateRequest({
                                                                                        data: {
                                                                                            thongBaoCongBo,
                                                                                            listHoSoCongBo: item.listHoSo.filter(hs => hs.id !== record.id)
                                                                                        },
                                                                                        requestSuccess: () => {
                                                                                            setRowSelecteds(rows => rows.filter(r => r.id !== record.id))
                                                                                        }
                                                                                    })
                                                                                },
                                                                                okText: <Fragment><i className="fa fa-check m-r-10" />Đồng ý</Fragment>,
                                                                                cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                                                                okType: "danger"
                                                                            })
                                                                        }}>
                                                                        <i className="fa fa-trash m-r-10" />Xóa
                                                                </Menu.Item>
                                                                }
                                                                {
                                                                    getAllowAction().allowPheDuyet && <Menu.Item
                                                                        onClick={() => {
                                                                            const { thongBaoCongBo } = item;
                                                                            setYeuCauBoSungHoSoState({ visible: true, thongBaoCongBo, listHoSoCongBo: [record] });
                                                                        }}>
                                                                        <i className="fa fa-reply m-r-10" />Yêu cầu bổ sung hồ sơ
                                                                </Menu.Item>
                                                                }
                                                            </Menu>}
                                                        >
                                                            <Button size="small">
                                                                <i className="fa fa-cogs m-r-10" />Thao tác<i classNmae="m-l-10 fa fa-angle-down" />
                                                            </Button>
                                                        </Dropdown>
                                                    }
                                                }
                                            ]}
                                            dataSource={item.listHoSo.map((item, i) => ({ ...item, stt: i + 1 }))}
                                        />
                                    </CommonFieldset>
                                </Skeleton>
                            </Fragment>
                        )
                }
            </div>
        </React.Fragment>
    );
}

export default ThongBaoCongBoSanPhamDetail;