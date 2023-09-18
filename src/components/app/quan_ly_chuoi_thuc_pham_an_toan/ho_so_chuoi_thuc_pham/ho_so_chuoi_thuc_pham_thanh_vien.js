import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, untouch, getFormValues } from "redux-form";
import { Table, Button, Tooltip } from "antd";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as field from "./../../../../constants/controll";
import * as validate from "./../../../../constants/validate";
import * as formName from "./../../../../constants/form_name";
import * as main from "./../../../../constants/main";
import * as actCoSo from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import CoSoSanXuatKinhDoanhPopupSearch from "./../../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_popup_search";

const ThanhViens = ({
    data,
    onAdd,
    onDelete,
    onSelectCoSo
}) => {
    const location = useLocation();
    const [searchText, setSearchText] = useState("");
    const [_visibleCoSo, _setVisibleCoSo] = useState(false);
    const [_indexActive, _setIndexActive] = useState(-1);
    const [_rowSelected, _setRowSelected] = useState([]);
    const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));

    const allowSelect = permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_THANH_VIEN_CTP_SELECT_FROM_APP) !== -1;
    const form = useSelector(state => getFormValues(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM)(state));
    const danhSachCoSoThamGiaChuoi = form && form.danhSachCoSoThamGiaChuoi && Array.isArray(form.danhSachCoSoThamGiaChuoi) ? form.danhSachCoSoThamGiaChuoi : [];

    const dispatch = useDispatch();
    const unTouchField = fields => dispatch(untouch(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM, fields))
    const getCoSo = (obj) => dispatch(actCoSo.getAllRequest(obj))

    const rowSelection = () => {
        return {
            align: "center",
            fixed: 'left',
            columnWidth: 30,
            selectedRowKeys: _rowSelected,
            onChange: (selectedRows) => {
                _setRowSelected(selectedRows);
            },
        }
    };

    const refreshRow = (index) => {
        if (onSelectCoSo && typeof onSelectCoSo === "function") {
            onSelectCoSo(index, {
                id: null,
                coSoId: null,
                tenCoSo: null,
                tenDangKyKinhDoanh: null,
                loaiHinhThamGia: null,
                sanPham: null,
                diaChiTruSo: null,
                diaDiemKinhDoanh: null,
                soGiayPhepDkkd: null,
                ngayCapGiayPhepDkkd: null,
                soChungNhanAttp: null,
                ngayCapChungNhanAttp: null,
                ngayHetHanChungNhanAttp: null,
                ghiChu: null,
                confirmDuplicateCode: true
            });
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].coSoId`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].tenCoSo`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].tenDangKyKinhDoanh`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].loaiHinhThamGia`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].sanPham`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].diaChiTruSo`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].diaDiemKinhDoanh`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].soGiayPhepDkkd`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].ngayCapGiayPhepDkkd`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].soChungNhanAttp`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].ngayCapChungNhanAttp`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].ngayHetHanChungNhanAttp`);
            unTouchField(`danhSachCoSoThamGiaChuoi[${index}].ghiChu`);
        }
    }

    const checktenCoSo = (tenCoSo, index) => {
        if (tenCoSo !== "") {
            const count = data.filter(item => tenCoSo && item.tenCoSo && item.tenCoSo === tenCoSo).length;
            if (count === 0 || count === 1) {
                getCoSo({
                    data: { searchData: `tenCoSo=${tenCoSo}` },
                    isPagination: false,
                    requestSuccess: (res) => {
                        if (res && res.status && res.result.length === 1) {
                            const CoSo = res.result[0];
                            onSelectCoSo(index, {
                                coSoId: CoSo.id,
                                tenCoSo: CoSo.tenCoSo,
                                tenDangKyKinhDoanh: CoSo.tenDangKyKinhDoanh,
                                diaChiTruSo: CoSo.diaChiTruSo,
                                diaDiemKinhDoanh: CoSo.diaDiemKinhDoanh,
                                soGiayPhepDkkd: CoSo.soGiayPhepDkkd,
                                ngayCapGiayPhepDkkd: CoSo.ngayCapGiayPhepDkkd,
                                soChungNhanAttp: CoSo.soChungNhanAttp,
                                ngayCapChungNhanAttp: CoSo.ngayCapChungNhanAttp,
                                ngayHetHanChungNhanAttp: CoSo.ngayHetHanChungNhanAttp,
                            })
                        }
                    }
                })
            }
        }
    }

    const validatetenCoSo = tenCoSo => {
        const count = data.filter(item => tenCoSo && item.tenCoSo && item.tenCoSo === tenCoSo).length;
        return count === 0 || count === 1 ? undefined : "Trùng tên cơ sở";
    }

    const renderData = () => {
        return (data && Array.isArray(data)) ?
            data.map((item, index) => {
                return {
                    ...item,
                    key: index,
                    stt: index + 1,
                    tenCoSo: <Field
                        addonBefore={allowSelect ? <Tooltip placement="top" title="Chọn từ danh sách">
                            <i className="fa fa-bars c-pointer"
                                onClick={() => {
                                    _setIndexActive(index);
                                    setSearchText(danhSachCoSoThamGiaChuoi[index].tenCoSo)
                                    _setVisibleCoSo(true);
                                }}
                            />
                        </Tooltip> : null}
                        name={`danhSachCoSoThamGiaChuoi[${index}].tenCoSo`}
                        component={field.FieldInput}
                        placeholder="Tên cơ sở"
                        checkValid={true}
                        validate={[validatetenCoSo, validate.VALIDATE_HO_SO_CTP_THANHVIEN_CTP_TCS_REQUIRED]}
                        onBlur={(e, value) => allowSelect ? checktenCoSo(value, index) : null}
                    />,
                    tenDangKyKinhDoanh: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].tenDangKyKinhDoanh`}
                        component={field.FieldInput}
                        placeholder="Tên doanh nghiệp"
                        checkValid={true}
                        validate={[validate.VALIDATE_HO_SO_CTP_THANHVIEN_CTP_TDKKD_REQUIRED]}
                    />,
                    loaiHinhThamGia: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].loaiHinhThamGia`}
                        component={field.FieldSelect}
                        placeholder="Loại hình tham gia"
                        options={constants.CONST_CHUOI_THUC_PHAM_AN_TOAN_LOAI_HINH_THAM_GIA_OPTIONS}
                        checkValid={true}
                        validate={[validate.VALIDATE_HO_SO_CTP_THANHVIEN_CTP_LHTG_REQUIRED]}
                    />,
                    sanPham: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].sanPham`}
                        component={field.FieldTextArea}
                        placeholder="Sản phẩm"
                    />,
                    diaChiTruSo: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].diaChiTruSo`}
                        component={field.FieldInput}
                        placeholder="Địa chỉ trụ sở"
                    />,
                    diaDiemKinhDoanh: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].diaDiemKinhDoanh`}
                        component={field.FieldTextArea}
                        placeholder="Địa điểm kinh doanh"
                        autoSize={true}
                    />,
                    soGiayPhepDkkd: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].soGiayPhepDkkd`}
                        component={field.FieldInput}
                        placeholder="Số giấy phép ĐKKD"
                    />,
                    ngayCapGiayPhepDkkd: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].ngayCapGiayPhepDkkd`}
                        component={field.FieldDate}
                        placeholder="Ngày cấp GP ĐKKD"
                    />,
                    soChungNhanAttp: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].soChungNhanAttp`}
                        component={field.FieldInput}
                        placeholder="Số Chứng nhận ATTP"
                    />,
                    ngayCapChungNhanAttp: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].ngayCapChungNhanAttp`}
                        component={field.FieldDate}
                        placeholder="Ngày cấp CN ATTP"
                    />,
                    ngayHetHanChungNhanAttp: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].ngayHetHanChungNhanAttp`}
                        component={field.FieldDate}
                        placeholder="Ngày hết hạn CN ATTP"
                    />,
                    ghiChu: <Field
                        name={`danhSachCoSoThamGiaChuoi[${index}].ghiChu`}
                        component={field.FieldTextArea}
                        placeholder="Ghi chú"
                        autoSize={true}
                    />,
                    actions: <React.Fragment>
                        {
                            (permission_priviliged || []).findIndex(item => item.idChucNang === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_THANH_VIEN_CTP_DELETE) !== -1 &&
                            <Button
                                className="m-r-10"
                                type="danger"
                                size="small"
                                onClick={onDelete && typeof onDelete === "function" ? () => onDelete([index]) : null}
                            >
                                <i className="fa fa-trash" />
                            </Button>
                        }
                        <Button
                            className="m-r-10"
                            size="small"
                            onClick={() => refreshRow(index)}
                        >
                            <i className="fa fa-refresh" />
                        </Button>
                    </React.Fragment>
                }
            })
            : []
    }

    return <React.Fragment>
        <CoSoSanXuatKinhDoanhPopupSearch
            form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM}
            onCancel={() => {
                _setIndexActive(-1);
                _setVisibleCoSo(false)
            }}
            onSelectCoSo={(item) => onSelectCoSo(_indexActive, item)}
            visible={_visibleCoSo}
            searchText={searchText}
            coSoDisabled={danhSachCoSoThamGiaChuoi}
        />
        <Table
            rowSelection={rowSelection()}
            className="table-custom"
            columns={[
                {
                    title: "STT",
                    dataIndex: "stt",
                    width: 50,
                    align: "center",
                    fixed: 'left',
                },
                {
                    title: "Tên cơ sở",
                    dataIndex: "tenCoSo",
                    className: "v-a-top",
                    width: 250
                },
                {
                    title: "Tên doanh nghiệp",
                    dataIndex: "tenDangKyKinhDoanh",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Loại hình tham gia",
                    dataIndex: "loaiHinhThamGia",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Sản phẩm",
                    dataIndex: "sanPham",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Địa chỉ trụ sở",
                    dataIndex: "diaChiTruSo",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Địa điểm kinh doanh",
                    dataIndex: "diaDiemKinhDoanh",
                    className: "v-a-top",
                    width: 300
                },
                {
                    title: "Số giấy phép ĐKKD",
                    dataIndex: "soGiayPhepDkkd",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ngày cấp GP ĐKKD",
                    dataIndex: "ngayCapGiayPhepDkkd",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Số chứng nhận ATTP",
                    dataIndex: "soChungNhanAttp",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ngày cấp CN ATTP",
                    dataIndex: "ngayCapChungNhanAttp",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ngày hết hạn CN ATTP",
                    dataIndex: "ngayHetHanChungNhanAttp",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ghi chú",
                    dataIndex: "ghiChu",
                    className: "v-a-top",
                    width: 300
                },

                {
                    title: "Thao tác",
                    dataIndex: "actions",
                    width: 100,
                    align: "center",
                    fixed: "right",
                }
            ]}
            dataSource={renderData()}
            scroll={{ x: 2600 }}
            bordered
            pagination={false}
            size="small"
            title={() => {
                return <React.Fragment>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_THANH_VIEN_CTP_CREATE) !== -1 &&
                                <Button
                                    className="m-r-10"
                                    type="primary"
                                    size="small"
                                    onClick={onAdd && typeof onAdd === "function" ? onAdd : null}
                                >
                                    <i className="fa fa-plus m-r-10" /> Thêm thành viên
                                </Button>
                            }
                            {
                                permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_HO_SO_CHUOI_THUC_PHAM.ACT_THANH_VIEN_CTP_DELETE) !== -1 &&
                                <Button
                                    className="pull-right ant-btn-dangerous"
                                    disabled={_rowSelected.length === 0}
                                    size="small"
                                    onClick={onDelete && typeof onDelete === "function" ? () => {
                                        onDelete(_rowSelected);
                                        _setRowSelected([]);
                                    } : null}
                                >
                                    <i className="fa fa-trash m-r-10" /> Xóa
                                    {_rowSelected && Array.isArray(_rowSelected) && _rowSelected.length > 0 && ` (${_rowSelected.length})`}
                                </Button>
                            }
                        </div>
                    </div>
                </React.Fragment>
            }}
        />
    </React.Fragment >
}

export default ThanhViens;