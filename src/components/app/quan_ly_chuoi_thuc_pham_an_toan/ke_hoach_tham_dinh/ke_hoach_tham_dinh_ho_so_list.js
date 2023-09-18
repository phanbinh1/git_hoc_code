import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from "antd";
import { CommonTable, CommonTableAction } from "./../../../common";
import ThongTinHoSoThamDinhCTP from "./tham_dinh";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as type from "./../../../../constants/type";
import * as actBienBanThamDinhCTP from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/bien_ban_tham_dinh";
import * as actKeHoachThamDinhCTP from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";

const KeHoachThamDinhHoSoList = (props) => {
    const {
        pageKey,
        dataLoading,
        handleChangeDataSort,
        getAllHoSoThamDinhRequest,
        handleEndLoadData,
        handleStartLoadData,
        onSelectRow
    } = props;

    const [visibleThamDinh, setVisibleThamDinh] = useState(false);
    const [itemThamDinh, setItemThamDinh] = useState({});
    const [dsBienBan, setDSBienBan] = useState([]);
    const ke_hoach_tham_dinh = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ke_hoach_tham_dinh.item);
    const hoSoThamDinhList = ke_hoach_tham_dinh.ho_so_tham_dinh_list || [];

    const dataSort = [
        { key: "id", value: false, sort: 8 },
        { key: "tenDangKyKinhDoanh", value: true, sort: 7 },
        { key: "tenCoSo", value: true, sort: 6 },
        { key: "diaDiemKinhDoanh", value: true, sort: 5 },
        { key: "diaChiTruSo", value: true, sort: 4 },
        { key: "soGiayPhepDkkd", value: true, sort: 3 },
        { key: "ngayCapGiayPhepDkkd", value: true, sort: 2 },
        { key: "ngayTiepNhan", value: true, sort: 1 }
    ]

    const dispatch = useDispatch();
    const getBienBanByIdHoSo = (object) => dispatch(actBienBanThamDinhCTP.getListByIdHoSo(object));
    const updateListCoSo = object => dispatch(actKeHoachThamDinhCTP.updateListCoSo(object));

    useEffect(() => {
        onSelectRow([], `${pageKey}_HO_SO`);
    }, [])

    const onDeleteHoSo = ({ arrDel = [] }) => {
        let _hoSoThamDinhList = hoSoThamDinhList;
        if (Array.isArray(arrDel)) {
            arrDel.map(idDel => _hoSoThamDinhList.splice(_hoSoThamDinhList.findIndex(item => item.id === idDel), 1));
            updateListCoSo({
                data: {
                    idKeHoach: ke_hoach_tham_dinh.id,
                    hoSoCapGiayChungNhanIds: _hoSoThamDinhList.map(item => item.id)
                },
                requestSuccess: () => {
                    onSelectRow([], `${pageKey}_HO_SO`);
                    dispatch({
                        type: type.TYPE_KE_HOACH_THAM_DINH_HS_CTP_HO_SO_LIST,
                        value: _hoSoThamDinhList
                    })
                }
            })
        }
    };

    const checkAllow = () => {
        return {
            thamDinh: ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DAPHEDUYET,
            updateList: ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.DANGHOANTHIEN || ke_hoach_tham_dinh.trangThaiPheDuyet === constants.CONST_PHE_DUYET.CHOPHEDUYET,
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
    }
    const columns = () => {
        let tenDangKyKinhDoanhSort = "asc",
            tenCoSoSort = "asc",
            diaDiemKinhDoanhSort = "asc",
            ngayTiepNhanSort = "asc";
        dataSort.map((item) => {
            if (item.key === "tenDangKyKinhDoanh" && !item.value) { tenDangKyKinhDoanhSort = "desc"; }
            if (item.key === "tenCoSo" && !item.value) { tenCoSoSort = "desc"; }
            if (item.key === "diaDiemKinhDoanh" && !item.value) { diaDiemKinhDoanhSort = "desc"; }
            if (item.key === "ngayTiepNhan" && !item.value) { ngayTiepNhanSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: <div onClick={() => onChangeDataSort("tenCoSo")} >
                    <span> Tên cơ sở được cấp giấy phép </span>
                    <i className={`fa fa-sort-amount-${tenCoSoSort}`} />
                </div>,
                dataIndex: 'tenCoSo',
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("tenDangKyKinhDoanh")} >
                    <span> Tên doanh nghiệp </span>
                    <i className={`fa fa-sort-amount-${tenDangKyKinhDoanhSort}`} />
                </div>,
                dataIndex: 'tenDangKyKinhDoanh',
                width: 200,
            },
            {
                title: <span> Số điện thoại </span>,
                dataIndex: 'soDienThoai',
                width: 120
            },
            {
                title: "Loại sản phẩm được xác nhận",
                dataIndex: 'nhomChuoiThucPham.tenNhom',
                width: 250,
                render: (_, item) => {
                    if (item.nhomChuoiThucPham && item.nhomChuoiThucPham.tenNhom && item.nhomChuoiThucPham.sanPham) {
                        return `${item.nhomChuoiThucPham.sanPham} (${item.nhomChuoiThucPham.tenNhom})`;
                    }
                    else {
                        return null;
                    }
                }
            },
            {
                title: <div onClick={() => onChangeDataSort("diaDiemKinhDoanh")} >
                    <span> Địa điểm kinh doanh </span>
                    <i className={`fa fa-sort-amount-${diaDiemKinhDoanhSort}`} />
                </div>,
                dataIndex: 'diaChi',
                width: 200
            },
            {
                title: <span> Số điện thoại </span>,
                dataIndex: 'soDienThoai',
                width: 120
            },
            // {
            //     title: <div onClick={() => onChangeDataSort("soGiayPhepDkkd")} >
            //         <span> Giấy phép ĐKKD </span>
            //         <i className={`fa fa-sort-amount-${soGiayPhepDkkdSort}`} />
            //     </div>,
            //     dataIndex: 'soGiayPhepDkkd',
            //     width: 170
            // },
            // {
            //     title: <div onClick={() => onChangeDataSort("ngayCapGiayPhepDkkd")} >
            //         <span> Ngày cấp </span>
            //         <i className={`fa fa-sort-amount-${ngayCapGiayPhepDkkdSort}`} />
            //     </div>,
            //     dataIndex: 'ngayCapGiayPhepDkkd',
            //     width: 120,
            //     align: "center"
            // },
            {
                title: <div onClick={() => onChangeDataSort("ngayTiepNhan")} >
                    <span> Ngày tiếp nhận </span>
                    <i className={`fa fa-sort-amount-${ngayTiepNhanSort}`} />
                </div>,
                dataIndex: 'ngayTiepNhan',
                width: 150,
                align: "center"
            },
            {
                title: <span> Ghi chú </span>,
                dataIndex: 'ghiChu',
                width: 150
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right"
            }
        ];
    }

    const data = () => {
        let result = [];
        hoSoThamDinhList.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                diaChi: renderDiaChi(item),
                actions: renderAction(item)
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

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                mode="inline"
                actions={[
                    {
                        idChucNang: false,
                        label: "Xóa",
                        icon: "fa fa-trash",
                        hidden: !checkAllow().updateList,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => onDeleteHoSo({
                            arrDel: [item.id]
                        }),
                        type: "danger"
                    },
                    {
                        idChucNang: false,
                        label: "Thẩm định",
                        icon: "fa fa-pencil-square-o",
                        hidden: !checkAllow().thamDinh,
                        onClick: () => {
                            getBienBanByIdHoSo({
                                data: {
                                    idHoSo: item.id
                                },
                                requestSuccess: (res) => {
                                    setItemThamDinh(item)
                                    setDSBienBan(res.result);
                                    setVisibleThamDinh(true);
                                }
                            })
                        }
                    }
                ]}
            />
        </React.Fragment>
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        let requestError = handleEndLoadData;

        let dataSearch = {};
        if (ke_hoach_tham_dinh.id) {
            dataSearch.idKeHoachThamDinh = ke_hoach_tham_dinh.id;
        }

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
        var value = { ...pagination, searchData: main.parseObjectToParams(dataSearch), sortData: dataSortStr };
        getAllHoSoThamDinhRequest({
            data: value,
            requestSuccess,
            requestError
        });
    }

    return (
        <React.Fragment>
            <Drawer
                title="Thẩm định hồ sơ"
                visible={visibleThamDinh}
                onClose={() => {
                    setVisibleThamDinh(false);
                }}
                width={1000}
                destroyOnClose
            >
                <ThongTinHoSoThamDinhCTP
                    hoSo={itemThamDinh}
                    danhSachBienBan={dsBienBan}
                />
            </Drawer>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                isPagination={false}
                pageKey={`${pageKey}_HO_SO`}
                onSelectRow={(rows) => onSelectRow(rows, `${pageKey}_HO_SO`)}
                hasSelectRow={false}
                expanded={false}
                controllerKey={main.encode(apiUrl.API_KE_HOACH_THAM_DINH_CTP_HO_SO_CTP_DS(ke_hoach_tham_dinh.id))}
            />
        </React.Fragment>
    );
}

export default KeHoachThamDinhHoSoList;