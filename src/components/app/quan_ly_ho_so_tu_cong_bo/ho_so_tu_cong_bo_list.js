import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Rate } from 'antd';
import HoSoTuCongBoSearch from "./ho_so_tu_cong_bo_search";
import { CommonTable, CommonTableAction, CommonPheDuyet, CommonTrinhPheDuyet } from '../../common';
import moment from 'moment';
import * as actHistoryDownload from "./../../../actions/core/history_download";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as constants from "./../../../constants/constants";
import * as actID from "./../../../constants/action_id";
import * as apiUrl from "./../../../constants/api";
import * as url from "./../../../constants/url";
import * as main from "./../../../constants/main";
import { dateTimeFormat } from "./../../../constants/controll";
import { Link, useHistory, useLocation } from 'react-router-dom';
import DrawerLuanChuyen from "./../quan_ly_thong_bao_cong_bo_san_pham/detail/drawer_luan_chuyen";
import { createNotifi, NOTIFI_CODE_HSTCB_TPD, NOTIFI_CODE_HSTCB_DPD, NOTIFI_CODE_HSTCB_CXL } from '../../core/account_current/notification';
import { convertHoSo, getAllowAction } from "./../../../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo"
import FilterDropdown from "./list_filter";
const { CONST_PHE_DUYET, CONST_PHONG_BAN } = constants;
const { NGHIEPVU } = CONST_PHONG_BAN;
const { CHOPHEDUYET, DAPHEDUYET } = CONST_PHE_DUYET;

const HoSoTuCongBoList = ({
    pageKey,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleEdit,
    handleDelete,
    onSelectRow,
    loaiCongBo,
    hideRowFake,
    hideActions,
    scrollY,
    fixed = true,
    selectedRowKeys = undefined,
    onSelect,
    onSelectAll,
    filter = true,
    search = true,
    rowClassName
}) => {
    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);
    const fresh = (qs.fresh && typeof qs.fresh === "string" && !isNaN(qs.fresh)) ? parseInt(qs.fresh, 0) : 0;
    const state = useSelector(state => state);
    const ho_so_tu_cong_bo_list = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.ho_so_tu_cong_bo.list.filter(item => item.loaiCongBo === loaiCongBo));

    const account_current = useSelector(state => state.core.account_current);
    const [luanChuyen, setLuanChuyen] = useState({
        visible: false,
        item: null,
        onCancel: () => setLuanChuyen(lc => ({ ...lc, visible: false }))
    })
    const [trinhPheDuyet, setTrinhPheDuyet] = useState({
        visible: false,
        item: null,
        onCancel: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: false }))
    })
    const [chuyenXuLy, setChuyenXuLy] = useState({
        visible: false,
        item: null,
        onCancel: () => setChuyenXuLy(cxl => ({ ...cxl, visible: false }))
    })
    const [pheDuyet, setPheDuyet] = useState({
        visible: false,
        item: null,
        onCancel: () => setPheDuyet(pd => ({ ...pd, visible: false }))
    })

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const updateRequest = (obj) => dispatch(actHoSoTuCongBo.updateRequest(obj));

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
    };

    const columns = () => {
        let tenCoSoSort = "asc",
            diaDiemKinhDoanhSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên công ty </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div >,
                dataIndex: 'tenCoSo',
                width: 200,
            },
            {
                title: "Tên sản phẩm",
                width: 300,
                render: (_, item) => {
                    return <Link
                        to={loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ?
                            `${url.URL_HO_SO_TU_CONG_BO_DETAIL}?id=${item.id}` :
                            `${url.URL_HO_SO_BAN_CONG_BO_DETAIL}?id=${item.id}`}
                    >
                        {item.danhSachSanPhamCongBo.map(sp => <div> - {sp.tenSanPham}</div>)}
                    </Link>
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div >,
                width: 326,
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
                dataIndex: 'ngayTiepNhan',
                width: 140,
                align: "center"
            },
            {
                title: "Trạng thái",
                width: 130,
                align: "center",
                _format: { fixed: "right" },
                render: (_, record) => {
                    const trangThai = constants.CONST_TRANG_THAI_HO_SO.render(record.trangThaiHoSo);
                    return trangThai ? <Tag color={trangThai.color} key={record.trangThaiHoSo}>
                        {trangThai.label.toUpperCase()}
                    </Tag> : null;
                }
            },
            {
                title: "Trạng thái xử lý",
                width: 180,
                align: "center",
                _format: { fixed: "right" },
                render: (_, record) => {
                    const { CONST_HSTCB_TRANG_THAI_XU_LY, CONST_PHONG_BAN } = constants;
                    const trangThai = CONST_HSTCB_TRANG_THAI_XU_LY.render(record.trangThaiXuLy, account_current.managementDepartment === CONST_PHONG_BAN.LANHDAO)
                    return <Tag color={trangThai.color} key={trangThai.value}>
                        {trangThai.label}
                    </Tag>
                }
            },
            {
                title: "Sản phẩm OCOP",
                width: 140,
                render: (_, item) => {
                    return item.danhSachSanPhamCongBo.map(sp => sp.isSanPhamOcop == 1 && <div><Tag color="blue">OCOP</Tag></div>)
                },
                align: "center"
            },
            {
                title: "Xếp hạng sao",
                width: 140,
                render: (_, item) => {
                    return item.danhSachSanPhamCongBo.map(sp => sp.sepHangSao && <div><Rate disabled defaultValue={sp.sepHangSao} /></div>)
                },
                align: "center"
            },
            {
                ...(!hideActions ?
                    {
                        title: 'Thao tác',
                        dataIndex: 'actions',
                        className: "display-1-line action-u-d",
                        align: "center",
                        width: 140,
                        fixed: "right"
                    } : { width: 0 })
            }
        ];
    };

    const data = () => {
        let result = [];
        ho_so_tu_cong_bo_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item),
            })
        });
        return result;
    }

    const renderAction = (item) => {
        const allow = getAllowAction(item)(state);
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_EXPORT_GIAY_BIEN_NHAN,
                        onClick: () => { onDownloadGiayBienNhan({ data: item }) },
                        hidden: !allow.allowDownloadGBN
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger",
                        hidden: !allow.allowDelete,
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
                        type: "success",
                        hidden: !allow.allowUpdate,
                    },
                    {
                        label: "Chi tiết",
                        icon: "fa fa-eye",
                        onClick: () => {
                            history.push(loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO ?
                                `${url.URL_HO_SO_TU_CONG_BO_DETAIL}?id=${item.id}` :
                                `${url.URL_HO_SO_BAN_CONG_BO_DETAIL}?id=${item.id}`)
                        }
                    },
                    {
                        label: "Luân chuyển",
                        icon: "fa fa-sliders",
                        onClick: () => {
                            setLuanChuyen(lc => ({ ...lc, visible: true, item }));
                        }
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_TRINH_PHE_DUYET,
                        onClick: () => {
                            setTrinhPheDuyet(tpd => ({ ...tpd, item, visible: true }))
                        },
                        hidden: !allow.allowTrinhPheDuyet
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CHUYEN_XU_LY,
                        onClick: () => {
                            setChuyenXuLy(cxl => ({ ...cxl, item, visible: true }));
                        },
                        hidden: !allow.allowChuyenXuLy
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_PHE_DUYET,
                        onClick: () => {
                            setPheDuyet(pd => ({ ...pd, item, visible: true }));
                        },
                        hidden: !allow.allowPheDuyet
                    },
                ]} />
        </React.Fragment>
    };

    const onDownloadGiayBienNhan = ({ data = {} }) => {
        if (data && data.id) {
            const item = {
                date: moment(new Date().toISOString()).format(`${dateTimeFormat}`),
                title: "Giấy biên nhận hồ sơ tự công bố",
                url: apiUrl.API_HO_SO_TU_CONG_BO + `/${data.id}/export/giaybiennhan`,
            }
            createHistoryDownload({
                username: account_current.name,
                process: item
            })
        }
    }

    return <Fragment>
        {/* Luân chuyển */}
        <DrawerLuanChuyen
            visible={luanChuyen.visible}
            hoSo={luanChuyen.item}
            key={luanChuyen.item ? luanChuyen.item.id : "lc-not-id"}
            onClose={luanChuyen.onCancel}
        />
        {/* Chuyển xử lý */}
        <CommonTrinhPheDuyet
            key={chuyenXuLy.item ? chuyenXuLy.item.id : "cxl-not-id"}
            title="Chuyển xử lý"
            content="Bạn chắc chắn muốn chuyển xử lý?"
            visible={chuyenXuLy.visible}
            onCancel={chuyenXuLy.onCancel}
            maPhongBans={chuyenXuLy.item && [convertHoSo(chuyenXuLy.item, "CXL")(state).hoSo.trangThaiChuyenHS.phongBan]}
            chucVus={chuyenXuLy.item && [convertHoSo(chuyenXuLy.item, "CXL")(state).hoSo.trangThaiChuyenHS.chucVu]}
            onOk={({ accountSelected }) => {
                const { hoSo, msgSuccess, msgError } = convertHoSo(chuyenXuLy.item, "CXL", null, accountSelected)(state);
                updateRequest({
                    data: {
                        entity: hoSo,
                        listAttachFileId: [],
                        msgSuccess,
                        msgError
                    },
                    requestSuccess: () => {
                        // CREATE_NOTIFICATION
                        createNotifi({
                            maThongBao: NOTIFI_CODE_HSTCB_CXL,
                            chucVus: [hoSo.trangThaiChuyenHS.chucVu],
                            phongBans: [hoSo.trangThaiChuyenHS.phongBan],
                            nguoiNhans: accountSelected ? [accountSelected] : undefined,
                            noiDungChiTiet: {
                                id: hoSo.id,
                                tenCoSo: hoSo.tenCoSo,
                            }
                        })
                        chuyenXuLy.onCancel();
                    }
                })
            }}
        />
        {/* Trình phê duyệt */}
        <CommonTrinhPheDuyet
            key={trinhPheDuyet.item ? trinhPheDuyet.item.id : "tpd-not-id"}
            title="Trình phê duyệt"
            content="Bạn chắc chắn muốn trình phê duyệt?"
            visible={trinhPheDuyet.visible}
            onCancel={trinhPheDuyet.onCancel}
            maPhongBans={trinhPheDuyet.item && [convertHoSo(trinhPheDuyet.item, CHOPHEDUYET)(state).hoSo.trangThaiChuyenHS.phongBan]}
            chucVus={trinhPheDuyet.item && [convertHoSo(trinhPheDuyet.item, CHOPHEDUYET)(state).hoSo.trangThaiChuyenHS.chucVu]}
            onOk={({ accountSelected }) => {
                const { hoSo, msgSuccess, msgError } = convertHoSo(trinhPheDuyet.item, CHOPHEDUYET, null, accountSelected)(state);
                updateRequest({
                    data: {
                        entity: hoSo,
                        listAttachFileId: [],
                        msgSuccess,
                        msgError
                    },
                    requestSuccess: () => {
                        // CREATE_NOTIFICATION
                        createNotifi({
                            maThongBao: NOTIFI_CODE_HSTCB_TPD,
                            chucVus: [hoSo.trangThaiChuyenHS.chucVu],
                            phongBans: [hoSo.trangThaiChuyenHS.phongBan],
                            nguoiNhans: accountSelected ? [accountSelected] : undefined,
                            noiDungChiTiet: {
                                id: hoSo.id,
                                tenCoSo: hoSo.tenCoSo,
                            }
                        })
                        trinhPheDuyet.onCancel();
                    }
                })
            }}
        />

        {/* Phê duyệt */}
        <CommonPheDuyet
            key={pheDuyet.item ? pheDuyet.item.id : "pd-not-id"}
            content={<Fragment>
                Sau khi Xác nhận. Sẽ hoàn tất việc xử lý hồ sơ.<br />
                Tất cả các hồ sơ tự công bố sẽ được hiển thị trên website
            </Fragment>}
            visible={pheDuyet.visible}
            onCancel={pheDuyet.onCancel}
            showConfirm={false}
            showNotConfirm={false}
            showOk
            onOk={() => {
                const { hoSo, msgSuccess, msgError } = convertHoSo(pheDuyet.item, DAPHEDUYET)(state);
                updateRequest({
                    data: { entity: hoSo, listAttachFileId: [], msgSuccess, msgError },
                    requestSuccess: () => {
                        // CREATE_NOTIFICATION
                        createNotifi({
                            maThongBao: NOTIFI_CODE_HSTCB_DPD,
                            phongBans: [NGHIEPVU],
                            noiDungChiTiet: {
                                id: hoSo.id,
                                tenCoSo: hoSo.tenCoSo,
                            }
                        })
                        pheDuyet.onCancel();
                        history.replace({
                            ...location,
                            search: main.queryString.stringify({ ...qs, fresh: fresh + 1 })
                        })
                    }
                })
            }}
        />
        <CommonTable
            firstLoad={false}
            rowClassName={rowClassName}
            filter={filter ? <FilterDropdown dataLoading={dataLoading} /> : undefined}
            selectedRowKeys={selectedRowKeys}
            columns={columns()}
            dataSource={data()}
            loading={dataLoading}
            bordered={true}
            onChange={({ currentPage, pageSize }) => history.push({ search: main.queryString.stringify({ ...qs, page: currentPage, page_size: pageSize }) })}
            pageKey={pageKey}
            onSelectRow={onSelectRow}
            controllerKey={main.encode(apiUrl.API_HO_SO_TU_CONG_BO)}
            hasRowFake={!hideRowFake}
            scrollY={scrollY}
            indexFixed={fixed}
            rowSelectionFixed={fixed}
            onSelect={onSelect}
            onSelectAll={onSelectAll}
            search={search ? {
                show: qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH,
                component: <HoSoTuCongBoSearch loaiCongBo={loaiCongBo} />
            } : undefined}
        />
    </Fragment>
}

export default HoSoTuCongBoList;