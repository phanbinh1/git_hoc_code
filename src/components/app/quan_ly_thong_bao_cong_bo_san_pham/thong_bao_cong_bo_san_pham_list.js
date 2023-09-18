import React, { useCallback, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Modal, Tooltip } from 'antd';
import { FieldInput, FieldDate } from "./../../../constants/controll";
import ThongBaoCongBoSanPhamSearch from "./thong_bao_cong_bo_san_pham_search";
import { CommonFilter, CommonPheDuyet, CommonBanHanh, CommonTable, CommonTableAction } from "./../../common";
import moment from 'moment';
import * as actHistoryDownload from "./../../../actions/core/history_download";
import * as actThongBaoCongBoSanPham from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import * as constants from "./../../../constants/constants";
import * as actID from "./../../../constants/action_id";
import * as apiUrl from "./../../../constants/api";
import * as url from "./../../../constants/url";
import * as main from "./../../../constants/main";
import * as validates from "./../../../constants/validate";
import { Link } from 'react-router-dom';
import ThongBaoCongBoSanPhamTrinhPheDuyet from './trinh_phe_duyet';
import { dateTimeFormat } from "./../../../constants/controll";
import LuanChuyenThongBao from './detail/drawer_luan_chuyen_thong_bao';

const ThongBaoCongBoSanPhamList = ({
    pageKey,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleChangeDataSearch,
    handleEdit,
    handleDelete,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    history,
    dataSearch,
    onSelectRow,
    isVisiableSearch
}) => {

    const [visibleBanHanh, setVisibleBanHanh] = useState(false);
    const [visiblePheDuyet, setVisiblePheDuyet] = useState(false);
    const [visibleTrinhPheDuyet, setVisibleTrinhPheDuyet] = useState(false);
    const [visibleLuanChuyen, setVisibleLuanChuyen] = useState(false);
    const [itemActive, setItemActive] = useState(null);

    const account_current = useSelector(state => state.core.account_current);
    const thong_bao_cong_bo_san_pham_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.thong_bao_cong_bo_san_pham.list);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);

    const allowDetail = permission_priviliged.find(item => item.idChucNang === actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_DETAIL);
    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const trinhPheDuyetRequest = (data = {}) => dispatch(actThongBaoCongBoSanPham.trinhPheDuyetRequest(data))
    const banHanhRequest = (data = {}) => dispatch(actThongBaoCongBoSanPham.banHanhRequest(data))

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

    const onChangeDataSort = (key) => {
        let dataSortChange = [];
        let sortMax = Math.max.apply(Math, dataSort.map((val) => { return val.sort; }));
        dataSort.map((item) => {
            if (item.key === key) {
                item.value = !item.value;
                item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
            }
            return dataSortChange.push(item);
        })
        handleGetAllRequest({}, {
            dataSort: main.parseStringDataSort(dataSortChange),
            requestSuccess: () => { handleChangeDataSort(dataSortChange) }
        });
    };

    const columns = () => {
        let soThongBaoSort = "asc",
            tieuDeSort = "asc",
            tuNgaySort = "asc",
            denNgaySort = "asc",
            ngayKyThongBaoSort = "asc",
            loaiCongBoSort = "asc";
        dataSort.map((item) => {
            if (item.key === "soThongBao" && !item.value) { soThongBaoSort = "desc"; }
            if (item.key === "tieuDe" && !item.value) { tieuDeSort = "desc"; }
            if (item.key === "tuNgay" && !item.value) { tuNgaySort = "desc"; }
            if (item.key === "denNgay" && !item.value) { denNgaySort = "desc"; }
            if (item.key === "ngayKyThongBao" && !item.value) { ngayKyThongBaoSort = "desc"; }
            if (item.key === "loaiCongBo" && !item.value) { loaiCongBoSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tieuDe")} >
                    <span> Tiêu đề </span>
                    <i className={`fa fa-sort-amount-${tieuDeSort}`} />
                </div >,
                dataIndex: 'tieuDe',
                width: 216,
                render: (text, item) => {
                    return allowDetail ?
                        <Link to={main.formatUrl({
                            pathname: url.URL_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL,
                            objSearch: { id: item.id }
                        })} key={item.id}>
                            <div>{text}</div>
                        </Link> :
                        text;
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("loaiCongBo")} >
                    <span> Loại công bố </span>
                    <i className={`fa fa-sort-amount-${loaiCongBoSort}`} />
                </div >,
                dataIndex: 'loaiCongBo',
                width: 150,
                render: (_, record) => {
                    switch (record.loaiCongBo) {
                        case constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO:
                            return "Tự công bố";
                        case constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO:
                            return "Bản công bố";
                        default: return null;
                    }
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("tuNgay")} >
                    <span> Từ ngày </span>
                    <i className={`fa fa-sort-amount-${tuNgaySort}`} />
                </div >,
                dataIndex: 'tuNgay',
                width: 140
            },
            {
                title: <div onClick={() => onChangeDataSort("denNgay")} >
                    <span> Đến ngày </span>
                    <i className={`fa fa-sort-amount-${denNgaySort}`} />
                </div >,
                dataIndex: 'denNgay',
                width: 140,
            },
            {
                title: <div onClick={() => onChangeDataSort("trangThaiPheDuyet")} >
                    <span> Trạng thái </span>
                    <i className={`fa fa-sort-amount-${ngayKyThongBaoSort}`} />
                </div >,
                width: 170,
                align: "center",
                render: (text, item) => {
                    const { CONST_PHE_DUYET, CONST_CHUC_VU } = constants;
                    const trangThai = CONST_PHE_DUYET.optionsThongBaoCongBoSanPham.find(o => o.value === item.trangThaiPheDuyet) || { label: "" };
                    const { trangThaiChuyenThongBao } = item;
                    return trangThai ? <Tag color={trangThai.color} key={text}>
                        {trangThai.label.toUpperCase()}
                        {
                            trangThai.value === CONST_PHE_DUYET.CHOPHEDUYET && trangThaiChuyenThongBao &&
                            <Tooltip
                                placement="left"
                                title={<Fragment>Thông báo đang chờ <b>{CONST_CHUC_VU.label[trangThaiChuyenThongBao].toUpperCase()}</b> phê duyệt!</Fragment>}
                            >
                                <i className="fa fa-info-circle m-l-5 c-pointer" />
                            </Tooltip>
                        }
                    </Tag> : null;
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("soThongBao")} >
                    <span> Số thông báo </span>
                    <i className={`fa fa-sort-amount-${soThongBaoSort}`} />
                </div >,
                dataIndex: 'soThongBao',
                width: 180,
            },
            {
                title: <div onClick={() => onChangeDataSort("ngayKyThongBao")} >
                    <span> Ngày ký </span>
                    <i className={`fa fa-sort-amount-${ngayKyThongBaoSort}`} />
                </div >,
                dataIndex: 'ngayKyThongBao',
                width: 140,
            },
            {
                title: "Thao tác",
                dataIndex: "actions",
                className: "display-1-line action-u-d",
                align: "center",
                width: 140,
                fixed: "right",
            }
        ];
    };

    const data = useCallback(() => {
        const { CONST_PHE_DUYET } = constants;
        const { DANGHOANTHIEN } = CONST_PHE_DUYET;
        return thong_bao_cong_bo_san_pham_list.map((item) => {
            return {
                ...item,
                key: item.id,
                actions: renderAction(item),
                disabled: item.trangThaiPheDuyet !== DANGHOANTHIEN,
            }
        });
    }, [thong_bao_cong_bo_san_pham_list]);

    const renderAction = (item) => {
        const { regency } = account_current;
        const { CONST_PHE_DUYET, CONST_CHUC_VU } = constants;
        const { CHUYENVIEN } = CONST_CHUC_VU;
        const { DAPHEDUYET, KHONGPHEDUYET, DANGHOANTHIEN, HUY } = CONST_PHE_DUYET;
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        label: "Luân chuyển thông báo",
                        icon: "fa fa-sliders m-r-10",
                        onClick: () => {
                            setItemActive(item);
                            setVisibleLuanChuyen(true);
                        }
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_EXPORT,
                        onClick: () => onDownload({ data: item })
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_DETAIL,
                        onClick: () => {
                            history.push(main.formatUrl({
                                pathname: url.URL_THONG_BAO_HO_SO_TU_CONG_BO_DETAIL,
                                objSearch: {
                                    id: item.id
                                }
                            }));
                        }
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_DELETE,
                        hidden: item.trangThaiPheDuyet !== DANGHOANTHIEN,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger",
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_UPDATE,
                        hidden: item.trangThaiPheDuyet === DAPHEDUYET || item.trangThaiPheDuyet === KHONGPHEDUYET || item.trangThaiChuyenThongBao !== regency,
                        onClick: () => handleEdit(item.id),
                        type: "success"
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_TRINHPHEDUYET,
                        hidden: item.trangThaiPheDuyet === HUY || item.trangThaiPheDuyet === DAPHEDUYET || item.trangThaiPheDuyet === KHONGPHEDUYET || item.trangThaiChuyenThongBao !== regency || !item.listHoSo || item.listHoSo.length === 0,
                        onClick: () => {
                            setItemActive(item);
                            setVisibleTrinhPheDuyet(true);
                        },
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_HUYTHONGBAO,
                        hidden: item.trangThaiPheDuyet === HUY || item.trangThaiPheDuyet === DAPHEDUYET || item.trangThaiPheDuyet === KHONGPHEDUYET || regency !== CHUYENVIEN || (item.listHoSo && item.listHoSo.length > 0),
                        onClick: () => {
                            Modal.confirm({
                                title: "Xác nhận",
                                content: "Bạn chắc chắn muốn hủy thông báo?",
                                okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                                cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                                okButtonProps: { type: "danger" },
                                onOk: () => {
                                    let lichSuLuanChuyenThongBao = [];
                                    try {
                                        lichSuLuanChuyenThongBao = JSON.parse(item.lichSuLuanChuyen);
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
                                            id: item.id || null,
                                            tieuDe: item.tieuDe
                                        },
                                        hoSos: [],
                                        thoiGian: moment().format(dateTimeFormat)
                                    })
                                    trinhPheDuyetRequest({
                                        data: {
                                            thongBaoCongBo: {
                                                ...item,
                                                lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                                trangThaiPheDuyet: constants.CONST_PHE_DUYET.HUY,
                                            },
                                            msg: "Hủy thông báo thành công"
                                        }
                                    })
                                }
                            })
                        },
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_PHEDUYET,
                        hidden: item.trangThaiPheDuyet !== constants.CONST_PHE_DUYET.CHOPHEDUYET || !item.listHoSo || item.listHoSo.length === 0,
                        onClick: () => {
                            setItemActive(item);
                            setVisiblePheDuyet(true);
                        },
                    },
                    {
                        idChucNang: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_BAN_HANH,
                        hidden: item.trangThaiPheDuyet !== constants.CONST_PHE_DUYET.DAPHEDUYET,
                        onClick: () => {
                            setItemActive(item);
                            setVisibleBanHanh(true);
                        },
                        type: "success"
                    }
                ]} />
        </React.Fragment>
    };

    const onDownload = ({ data = {} }) => {
        if (data && data.id) {
            const item = {
                date: moment().format(dateTimeFormat),
                title: "Thông báo công bố sản phẩm",
                url: apiUrl.API_THONG_BAO_HO_SO_TU_CONG_BO + `/${data.id}/export`,
            }
            createHistoryDownload({
                username: account_current.name,
                process: item
            })
        }
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        const { regency } = account_current;
        const { CONST_CHUC_VU } = constants;
        const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
        let listTrangThaiChuyenThongBao = "";
        switch (regency) {
            case CHUYENVIEN:
                listTrangThaiChuyenThongBao = `${CHUYENVIEN},${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case PHOTRUONGPHONG:
                listTrangThaiChuyenThongBao = `${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case TRUONGPHONG:
                listTrangThaiChuyenThongBao = `${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case TRUONGBAN:
                listTrangThaiChuyenThongBao = `${TRUONGBAN}`;
                break;
            default:
                break;
        }
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        data = { dataSort: main.parseStringDataSort(dataSort), ...data };
        var dataSortStr = "";
        if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
            dataSortStr = data.dataSort;
        }
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = { ...pagination, searchData: main.parseObjectToParams({ ...dataSearch, listTrangThaiChuyenThongBao }), sortData: dataSortStr };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });
    };

    return (
        <React.Fragment>
            <LuanChuyenThongBao
                thongBao={visibleLuanChuyen && itemActive}
                onClose={() => setVisibleLuanChuyen(false)}
            />
            <ThongBaoCongBoSanPhamTrinhPheDuyet
                visible={visibleTrinhPheDuyet}
                onCancel={() => {
                    setVisibleTrinhPheDuyet(false)
                    setItemActive(null);
                }}
                onConfirm={({ tieuDe }) => {
                    const newTrangThai = getNewTrangThai();
                    const { listHoSo } = itemActive;
                    const thongBaoCongBo = itemActive;
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

                    trinhPheDuyetRequest({
                        data: {
                            listHoSoCongBoId: (listHoSo || []).map((item) => {
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
                                ...itemActive,
                                lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao),
                                tieuDe,
                                trangThaiPheDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
                                trangThaiChuyenThongBao: newTrangThai.chucVu
                            },
                            msg: newTrangThai.msg
                        },
                        requestSuccess: () => {
                            setVisibleTrinhPheDuyet(false)
                            setItemActive(null);
                        }
                    })
                }}
                tieuDeDefault={itemActive ? itemActive.tieuDe : null}
                allowUpdateTieuDe={account_current.regency === constants.CONST_CHUC_VU.CHUYENVIEN || account_current.regency === constants.CONST_CHUC_VU.PHOTRUONGPHONG}
            />
            <CommonPheDuyet
                key={itemActive ? itemActive.id : -1}
                visible={visiblePheDuyet}
                onCancel={() => setVisiblePheDuyet(false)}
                onConfirm={() => {
                    const { listHoSo } = itemActive;
                    const thongBaoCongBo = itemActive;
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
                    trinhPheDuyetRequest({
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
                        requestSuccess: () => setVisiblePheDuyet(false)
                    })
                }}
                onNotConfirm={({ lyDo }) => {
                    const { listHoSo } = itemActive;
                    const thongBaoCongBo = itemActive;
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
                    trinhPheDuyetRequest({
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
                        requestSuccess: () => setVisiblePheDuyet(false)
                    })
                }}
            />
            <CommonBanHanh
                key={itemActive ? itemActive.id : -1}
                visible={visibleBanHanh}
                onCancel={() => setVisibleBanHanh(false)}
                onBanHanh={banHanhRequest}
                initialValues={itemActive ? {
                    id: itemActive.id,
                    soThongBao: itemActive.soThongBao,
                    ngayKy: itemActive.ngayKyThongBao,
                    nguoiKy: itemActive.nguoiKyThongBao,
                } : {}}
                fields={[
                    {
                        label: "Số thông báo",
                        placeholder: "Số thông báo",
                        name: "soThongBao",
                        component: FieldInput,
                        checkValid: true,
                        validate: [validates.VALIDATE_TBHSTCB_SOTHONGBAO]
                    },
                    {
                        label: "Người ký",
                        placeholder: "Người ký",
                        name: "nguoiKy",
                        component: FieldInput,
                        checkValid: true,
                        validate: [validates.VALIDATE_TBHSTCB_NGUOIKY]
                    },
                    {
                        label: "Ngày ký",
                        placeholder: "Ngày ký",
                        name: "ngayKy",
                        component: FieldDate,
                        checkValid: true,
                        validate: [validates.VALIDATE_TBHSTCB_NGAYKY]
                    }
                ]}
            />
            <CommonTable
                filter={<FilterDropdown
                    getAllRequest={getAllRequest}
                    dataSearch={dataSearch}
                    dataSort={dataSort}
                    handleChangeDataSearch={handleChangeDataSearch}
                    onSelectRow={onSelectRow}
                />}
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_HO_SO_TU_CONG_BO)}
                search={{
                    show: isVisiableSearch,
                    component: <ThongBaoCongBoSanPhamSearch {...{
                        getAllRequest,
                        handleStartLoadData,
                        handleChangeDataSearch,
                        dataSort,
                        handleEndLoadData,
                        onSelectRow,
                    }}
                    />
                }}
            />
        </React.Fragment >
    );
}

const FilterDropdown = ({ getAllRequest, dataSort, dataSearch, onSelectRow, handleChangeDataSearch }) => {
    const account_current = useSelector(state => state.core.account_current);
    const getSelectedKeys = () => {
        let result = [];
        if (!dataSearch.loaiCongBo && !dataSearch.trangThaiPheDuyet) {
            result.push("ALL");
        }
        else {
            dataSearch.trangThaiPheDuyet && result.push(dataSearch.trangThaiPheDuyet);
            dataSearch.loaiCongBo && result.push(dataSearch.loaiCongBo);
        }
        return result;
    }

    return <CommonFilter
        menus={[
            { label: "Tất cả thông báo", key: "ALL", iconCls: "fa-reply-all" },
            { type: "divider" },
            { isTitle: true, iconCls: "fa-pencil-square-o", label: "Trạng thái phê duyệt" },
            ...constants.CONST_PHE_DUYET.optionsThongBaoCongBoSanPham.map(item => ({ key: item.value, label: item.label })),
            { type: "divider" },
            { isTitle: true, iconCls: "fa-file-text-o", label: "Loại hồ sơ công bố sản phẩm" },
            ...constants.CONST_LOAI_CONG_BO_SAN_PHAM.options.map(item => ({ key: item.value, label: item.label })),
        ]}
        selectedKeys={getSelectedKeys()}
        onSelect={key => {
            let data = {
                sortData: main.parseStringDataSort(dataSort),
                currentPage: 1
            }
            let _dataSearch = { ...dataSearch };
            switch (key) {
                case "ALL":
                    _dataSearch = { ..._dataSearch, trangThaiPheDuyet: undefined, loaiCongBo: undefined }
                    break;
                default:
                    if (constants.CONST_PHE_DUYET.optionsThongBaoCongBoSanPham.find(item => item.value === key)) {
                        _dataSearch = { ..._dataSearch, trangThaiPheDuyet: _dataSearch.trangThaiPheDuyet === key ? undefined : key };
                    }
                    if (constants.CONST_LOAI_CONG_BO_SAN_PHAM.options.find(item => item.value === key)) {
                        _dataSearch = { ..._dataSearch, loaiCongBo: _dataSearch.loaiCongBo === key ? undefined : key };
                    }
                    break;
            }
            const { regency } = account_current;
            const { CONST_CHUC_VU } = constants;
            const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
            let listTrangThaiChuyenThongBao = "";
            switch (regency) {
                case CHUYENVIEN:
                    listTrangThaiChuyenThongBao = `${CHUYENVIEN},${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                    break;
                case PHOTRUONGPHONG:
                    listTrangThaiChuyenThongBao = `${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                    break;
                case TRUONGPHONG:
                    listTrangThaiChuyenThongBao = `${TRUONGPHONG},${TRUONGBAN}`;
                    break;
                case TRUONGBAN:
                    listTrangThaiChuyenThongBao = `${TRUONGBAN}`;
                    break;
                default:
                    break;
            }
            data.searchData = main.parseObjectToParams({ ..._dataSearch, listTrangThaiChuyenThongBao });
            getAllRequest({
                data,
                requestSuccess: () => {
                    handleChangeDataSearch({ ..._dataSearch });
                    onSelectRow();
                },
            });
        }}
    />
}

export default ThongBaoCongBoSanPhamList;