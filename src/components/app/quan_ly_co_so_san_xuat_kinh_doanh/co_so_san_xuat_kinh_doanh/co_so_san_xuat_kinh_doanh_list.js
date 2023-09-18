import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoSoSanXuatKinhDoanhSearch from "./co_so_san_xuat_kinh_doanh_search";
import { CommonTable, CommonTableAction, CommonTrinhPheDuyet, CommonTrinhPheDuyet as CommonChuyenXuLy, CommonPheDuyet } from "./../../../common";
import Detail from "./co_so_san_xuat_kinh_doanh_detail";
import moment from 'moment';
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as message from "./../../../../constants/message";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import { dateFormat } from "./../../../../constants/controll";
import { useHistory, useLocation } from 'react-router';
import ListFilter from "./list_filter";
import { CONST_LUAN_CHUYEN, CONST_PHE_DUYET, CONST_PHONG_BAN, CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO } from '../../../../constants/constants';
import { allow, convertCoSo } from '../../../../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/method';
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import DrawerLuanChuyen from './drawer_luan_chuyen';

const CoSoSanXuatKinhDoanhList = ({
    pageKey,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleEdit,
    handleDetail,
    handleTCBEdit,
    handleDelete,
    onSelectRow,
    quanHuyenQuanLys
}) => {
    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);

    const isMobile = document.body.getAttribute("_enviroment") === "app";
    const co_so_san_xuat_kinh_doanh_list = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.co_so_san_xuat_kinh_doanh.list);
    const account_current = useSelector(state => state.core.account_current);
    const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));
    const state = useSelector(state => state);

    const [chuyenXuLy, setChuyenXuLy] = useState({
        visible: false,
        data: null,
        onCancel: () => setChuyenXuLy(cxl => ({ ...cxl, visible: false, data: null })),
        onShow: (data) => setChuyenXuLy(cxl => ({ ...cxl, visible: true, data })),
    })

    const [trinhPheDuyet, setTrinhPheDuyet] = useState({
        visible: false,
        data: null,
        onCancel: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: false, data: null })),
        onShow: (data) => setTrinhPheDuyet(tpd => ({ ...tpd, visible: true, data })),
    })

    const [pheDuyet, setPheDuyet] = useState({
        visible: false,
        data: null,
        onCancel: () => setPheDuyet(pd => ({ ...pd, visible: false, data: null })),
        onShow: (data) => setPheDuyet(pd => ({ ...pd, visible: true, data })),
    })

    const [luanChuyen, setLuanChuyen] = useState({
        visible: false,
        data: null,
        onCancel: () => setLuanChuyen(lc => ({ ...lc, visible: false, data: null })),
        onShow: (data) => setLuanChuyen(lc => ({ ...lc, visible: true, data })),
    })

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const updateRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.updateRequest(object));

    const onDownload = (item) => {
        if (item.soChungNhanAttp) {
            const _item = {
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
                title: "Giấy chứng nhận cơ sở đủ điều kiện vệ sinh an toàn thực phẩm",
                url: apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH_EXPORT_GCNATTP(item.id)
            }
            createHistoryDownload({
                username: account_current.name,
                process: _item
            })
        }
        else {
            message.error({ content: "Hồ sơ chưa cấp giấy chứng nhận nên không thể tải", key: "CAN_NOT_DOWNLOAD" });
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
        handleChangeDataSort(dataSortChange);
    }
    const columns = () => {
        let tenCoSoSort = "asc",
            diaDiemKinhDoanhSort = "asc",
            soChungNhanAttpSort = "asc",
            ngayCapChungNhanAttpSort = "asc",
            ngayHetHanChungNhanAttpSort = "asc",
            chuCoSoSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            if (item.key === "soChungNhanAttp" && !item.value) { soChungNhanAttpSort = "desc"; }
            if (item.key === "ngayCapChungNhanAttp" && !item.value) { ngayCapChungNhanAttpSort = "desc"; }
            if (item.key === "ngayHetHanChungNhanAttp" && !item.value) { ngayHetHanChungNhanAttpSort = "desc"; }
            if (item.key === "chuCoSo" && !item.value) { chuCoSoSort = "desc"; }
            return item;
        })
        return [
            {
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên cơ sở </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div >,
                render: (text, record) => {
                    if (permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DETAIL) !== -1) {
                        return <div onClick={(e) => {
                            e.preventDefault();
                            handleDetail(record.id);
                        }}
                            style={{
                                cursor: "pointer",
                                color: "#1e88e5",
                            }}
                        >
                            {record.tenCoSo}
                        </div>
                    }
                    else {
                        return record.tenCoSo;
                    }
                },
                dataIndex: '_tenCoSo',
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("chuCoSo")} >
                    <span> Tên chủ cơ sở </span>
                    <i className={`fa fa-sort-amount-${chuCoSoSort}`} />
                </div >,
                dataIndex: 'chuCoSo',
                width: 200
            },
            {
                title: "Loại hình cơ sở",
                width: 200,
                render: (_, item) => {
                    return item.danhSachLoaiHinhCoSo ? item.danhSachLoaiHinhCoSo.map((val) => {
                        return <div> - {val.ten}</div>;
                    }) : null;
                }
            },
            {
                title: "Giấy Chứng nhận ATTP",
                children: [
                    {
                        title: <div onClick={() => onChangeDataSort("soChungNhanAttp")} >
                            <span> Số CN ATTP </span>
                            <i className={`fa fa-sort-amount-${soChungNhanAttpSort}`} />
                        </div >,
                        dataIndex: 'soChungNhanAttp',
                        width: 120,
                    },
                    {
                        title: <div onClick={() => onChangeDataSort("ngayCapChungNhanAttp")} >
                            <span> Ngày cấp </span>
                            <i className={`fa fa-sort-amount-${ngayCapChungNhanAttpSort}`} />
                        </div >,
                        dataIndex: 'ngayCapChungNhanAttp',
                        width: 100,
                        align: "center"
                    },
                    {
                        title: <div onClick={() => onChangeDataSort("ngayHetHanChungNhanAttp")} >
                            <span> Ngày hết hạn </span>
                            <i className={`fa fa-sort-amount-${ngayHetHanChungNhanAttpSort}`} />
                        </div >,
                        dataIndex: 'ngayHetHanChungNhanAttp',
                        width: 140,
                        align: "center"
                    },
                ]
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div >,
                dataIndex: 'diaChi',
                width: 200
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: isMobile ? "" : "right"
            }
        ];
    }
    const data = () => {
        let result = [];
        co_so_san_xuat_kinh_doanh_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                loaiHinhCoSo: renderLoaiHinhCoSo(item.danhSachLoaiHinhCoSo),
                diaChi: renderDiaChi(item),
                actions: renderAction(item),
                expanded: <Detail handleTCBEdit={handleTCBEdit} item={item} />
            })
        });
        return result;
    }

    const renderDiaChi = (item) => {
        return `${item.diaDiemKinhDoanh} 
        ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
        ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
        ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
        `.toString().replace(/-|,/, "");
    }

    const renderLoaiHinhCoSo = (dsLoaiHinhCoSo) => {
        let tenLoaiHinhCoSo = "";
        dsLoaiHinhCoSo.forEach(item => {
            tenLoaiHinhCoSo += ", " + item.ten;
        });
        return tenLoaiHinhCoSo.toString().replace(/, /, "");
    }

    const renderAction = (co_so_san_xuat_kinh_doanh) => {
        const _allow = allow(co_so_san_xuat_kinh_doanh)(state);
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        label: "Luân chuyển",
                        icon: "fa fa-sliders",
                        onClick: () => luanChuyen.onShow(co_so_san_xuat_kinh_doanh)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, co_so_san_xuat_kinh_doanh.id),
                        hidden: !_allow.allowDelete,
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_UPDATE,
                        hidden: !_allow.allowEdit,
                        onClick: () => handleEdit(co_so_san_xuat_kinh_doanh.id)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DETAIL,
                        onClick: () => handleDetail(co_so_san_xuat_kinh_doanh.id)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DOWNLOAD_GCN,
                        onClick: () => onDownload(co_so_san_xuat_kinh_doanh)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CHUYENXULY,
                        hidden: !_allow.allowChuyenXuLy,
                        onClick: () => chuyenXuLy.onShow(co_so_san_xuat_kinh_doanh)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_TRINHPHEDUYET,
                        hidden: !_allow.allowTrinhPheDuyet,
                        onClick: () => trinhPheDuyet.onShow(co_so_san_xuat_kinh_doanh)
                    },
                    {
                        idChucNang: actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_PHEDUYET,
                        hidden: !_allow.allowPheDuyet,
                        onClick: () => pheDuyet.onShow(co_so_san_xuat_kinh_doanh)
                    }
                ]}
            />
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <DrawerLuanChuyen
                visible={luanChuyen.visible}
                coSo={luanChuyen.data}
                onClose={luanChuyen.onCancel}
            />
            {/* Chuyển xử lý */}
            <CommonChuyenXuLy
                visible={chuyenXuLy.visible}
                maPhongBans={[CONST_PHONG_BAN.NGHIEPVU]}
                title="Chuyển xử lý"
                content="Bạn chắc chắn muốn chuyển xử lý?"
                onOk={({ name, maPhongBan, chucVu }) => {
                    const data = {
                        ...chuyenXuLy.data,
                        trangThaiChuyenHoSo: {
                            ...(chuyenXuLy.data.trangThaiChuyenHoSo || {}),
                            entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.COSOSXKD,
                            entityId: chuyenXuLy.data.id,
                            nguoiXuLy: name,
                            chucVu,
                            phongBan: maPhongBan,
                            nguoiChuyen: account_current.name,
                        }
                    }
                    updateRequest({
                        data: convertCoSo(data, CONST_LUAN_CHUYEN.TRANSFER_HANDLING)(state),
                        requestSuccess: chuyenXuLy.onCancel
                    });
                }}
                maPhongBanOptions={[CONST_PHONG_BAN.NGHIEPVU]}
                onCancel={chuyenXuLy.onCancel}
            />
            {/* Trình phê duyệt */}
            <CommonTrinhPheDuyet
                visible={trinhPheDuyet.visible}
                onOk={({ name, maPhongBan, chucVu }) => {
                    const data = {
                        ...trinhPheDuyet.data,
                        trangThaiChuyenHoSo: {
                            ...(trinhPheDuyet.data.trangThaiChuyenHoSo || {}),
                            entityType: CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.COSOSXKD,
                            entityId: trinhPheDuyet.data.id,
                            nguoiXuLy: name,
                            chucVu,
                            phongBan: maPhongBan,
                            nguoiChuyen: account_current.name,
                        }
                    }
                    updateRequest({
                        data: convertCoSo(data, CONST_LUAN_CHUYEN.NEXT)(state),
                        requestSuccess: trinhPheDuyet.onCancel
                    });
                }}
                onCancel={trinhPheDuyet.onCancel}
            />
            {/* Phê duyệt */}
            <CommonPheDuyet
                visible={pheDuyet.visible}
                onCancel={pheDuyet.onCancel}
                onConfirm={() => {
                    const data = {
                        ...pheDuyet.data,
                        trangThaiPheDuyet: CONST_PHE_DUYET.DAPHEDUYET
                    }
                    updateRequest({
                        data: convertCoSo(data, CONST_LUAN_CHUYEN.APPROVAL)(state),
                        requestSuccess: pheDuyet.onCancel
                    });
                }}
                onNotConfirm={(lyDo) => {
                    const data = {
                        ...pheDuyet.data,
                        trangThaiPheDuyet: CONST_PHE_DUYET.KHONGPHEDUYET
                    }
                    updateRequest({
                        data: convertCoSo(data, CONST_LUAN_CHUYEN.NOT_APPROVAL, lyDo)(state),
                        requestSuccess: pheDuyet.onCancel
                    });
                }}
            />


            <CommonTable
                firstLoad={false}
                filter={<ListFilter />}
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={({ currentPage, pageSize }) => history.push({ search: main.queryString.stringify({ ...qs, page: currentPage, page_size: pageSize }) })}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_CO_SO_SAN_XUAT_KINH_DOANH)}
                search={{
                    show: qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH || qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT,
                    component: <CoSoSanXuatKinhDoanhSearch quanHuyenQuanLys={quanHuyenQuanLys} />,
                    title: qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT ? "Báo cáo" : "Tìm kiếm",
                    icon: qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT ? "fa fa-download" : "fa fa-search",

                }}
            />
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhList;