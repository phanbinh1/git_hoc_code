import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, arrayRemove, getFormValues } from 'redux-form';
import { Divider, Tooltip } from "antd";
import moment from 'moment';
import { CommonForm } from "./../../../common";
import ThanhViens from "./ho_so_chuoi_thuc_pham_thanh_vien_1";
import CoSoSanXuatKinhDoanhPopupSearch from "./../../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_popup_search";
import * as actHoSoChuoiThucPham from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ho_so_chuoi_thuc_pham/ho_so_chuoi_thuc_pham";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import { dateFormat } from "./../../../../constants/controll";

const HoSoChuoiThucPhamForm = ({ handleBack }) => {

    const ho_so_chuoi_thuc_pham = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ho_so_chuoi_thuc_pham.item);

    const [searchText, setSearchText] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);

    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM)(state));
    const danhSachCoSoThamGiaChuoi = formValues && formValues.danhSachCoSoThamGiaChuoi && Array.isArray(formValues.danhSachCoSoThamGiaChuoi) ? formValues.danhSachCoSoThamGiaChuoi : [];
    const [nhomChuoiThucPhamDefault] = useState(ho_so_chuoi_thuc_pham.nhomChuoiThucPham ? ho_so_chuoi_thuc_pham.nhomChuoiThucPham : undefined);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actHoSoChuoiThucPham.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actHoSoChuoiThucPham.updateRequest(object));

    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM, fieldName, value));
    const removeFieldArray = (field, index) => dispatch(arrayRemove(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM, field, index));

    const handleSubmit = (values) => {
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
        else {
            createRequest({
                data: values,
                requestSuccess: handleBack
            });
        }
    }

    const onSearchCoSo = () => {
        const tenCoSo = formValues && formValues.tenCoSo ? formValues.tenCoSo : "";
        setSearchText(tenCoSo);
        setVisibleModal(true);
    }

    const capNhatThongTinCoSo = ({
        id = "",
        tenCoSo = "",
        diaDiemKinhDoanh = "",
        tenDangKyKinhDoanh = "",
        diaChiTruSo = "",
        soDienThoai = "",
        soGiayPhepDkkd = "",
        ngayCapGiayPhepDkkd = "",
        soChungNhanAttp = "",
        ngayCapChungNhanAttp = "",
        ngayHetHanChungNhanAttp = "",
        hoSoMotCuaId = "",
        tinhThanh = "",
        quanHuyen = "",
        xaPhuong = "",
    }) => {
        changeValue("coSoId", id);
        changeValue("tenCoSo", tenCoSo);
        changeValue("diaDiemKinhDoanh", diaDiemKinhDoanh);
        changeValue("tenDangKyKinhDoanh", tenDangKyKinhDoanh);
        changeValue("diaChiTruSo", diaChiTruSo);
        changeValue("soDienThoai", soDienThoai);
        changeValue("soGiayPhepDkkd", soGiayPhepDkkd);
        changeValue("ngayCapGiayPhepDkkd", ngayCapGiayPhepDkkd);
        changeValue("soChungNhanAttp", soChungNhanAttp);
        changeValue("ngayCapChungNhanAttp", ngayCapChungNhanAttp);
        changeValue("ngayHetHanChungNhanAttp", ngayHetHanChungNhanAttp);
        changeValue("hoSoMotCuaId", hoSoMotCuaId);
        changeValue("tinhThanh", tinhThanh);
        changeValue("quanHuyen", quanHuyen);
        changeValue("xaPhuong", xaPhuong);
    }

    const getThanhVienChuoiThucPham = () => {
        return danhSachCoSoThamGiaChuoi.map((item) => {
            if (!item.uid) {
                return { ...item, uid: main.createID() };
            }
            else {
                return { ...item }
            }
        });
    }

    const addThanhVien = () => {
        let danhSachCoSoThamGiaChuoi = getThanhVienChuoiThucPham();
        danhSachCoSoThamGiaChuoi.push({})
        changeValue("danhSachCoSoThamGiaChuoi", danhSachCoSoThamGiaChuoi);
    }

    const delThanhVien = (arrIndex = []) => {
        arrIndex.sort((a, b) => b - a);
        arrIndex.map((index) => removeFieldArray("danhSachCoSoThamGiaChuoi", index));
    }

    const onSelectCoSo = (index, item) => {
        if (index !== -1) {
            changeValue(`danhSachCoSoThamGiaChuoi[${index}]`, item);
        }
    };

    const coSoSelected = formValues && formValues.coSoId ? [{
        id: formValues.coSoId,
        idCoSo: formValues.coSoId,
        tenCoSo: formValues.tenCoSo,
    }] : [];

    return (
        <React.Fragment>
            <CoSoSanXuatKinhDoanhPopupSearch
                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM}
                onCancel={() => setVisibleModal(false)}
                onSelectCoSo={(item) => capNhatThongTinCoSo(item)}
                coSoSelected={coSoSelected}
                visible={visibleModal}
                searchText={searchText}
            />
            <CommonForm
                data={[
                    [//row 
                        {
                            col: 6,
                            label: "Tên cơ sở",
                            placeholder: "Tên cơ sở",
                            name: "tenCoSo",
                            readOnly: true,
                            checkValid: true,
                            validates: [validate.VALIDATE_HO_SO_CTP_CO_SO_DANG_KY_REQUIRED],
                            onKeyDown: (e) => {
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                    onSearchCoSo();
                                }
                            },
                            suffix: <React.Fragment>
                                {
                                    formValues && formValues.coSoId && <Tooltip title="Xóa cơ sở">
                                        <i
                                            className="fa fa-times-circle m-r-10 c-pointer"
                                            onClick={capNhatThongTinCoSo}
                                            style={{ color: "#bbb" }}
                                        />
                                    </Tooltip>
                                }
                                <Tooltip title="Tìm kiếm cơ sở">
                                    <i className="fa fa-search c-pointer" onClick={onSearchCoSo} />
                                </Tooltip>
                            </React.Fragment>
                        },
                        {
                            col: 6,
                            fieldType: "date",
                            label: "Ngày tiếp nhận",
                            placeholder: "Ngày tiếp nhận",
                            name: "ngayTiepNhan",
                            checkValid: true,
                            validates: [validate.VALIDATE_HO_SO_CTP_NGAY_TIEP_NHAN_REQUIRED]
                        }
                    ],
                    [//row
                        {
                            col: 6,
                            label: "Số giấy xác nhận chuổi thực phẩm an toàn",
                            placeholder: "Số giấy xác nhận chuổi thực phẩm an toàn",
                            name: "soGiayXacNhanChuoi"
                        },
                        {
                            col: 6,
                            fieldType: "date",
                            label: "Ngày cấp",
                            placeholder: "Ngày cấp",
                            name: "ngayCapXacNhanChuoi"
                        },
                    ],
                    [//row
                        {
                            col: 6,
                            fieldType: "selectLoadMore",
                            url: apiUrl.API_NHOM_CHUOI_THUC_PHAM,
                            searchKey: "searchData",
                            searchKeyExtend: "tenNhom",
                            valueKey: "id",
                            labelKey: "tenNhom",
                            label: "Nhóm chuỗi thực phẩm",
                            placeholder: "Nhóm chuỗi thực phẩm",
                            name: "nhomChuoiThucPham.id",
                            selectDefaultValue: nhomChuoiThucPhamDefault,
                            checkValid: true,
                            validates: [validate.VALIDATE_HO_SO_CTP_NHOM_CTP_REQUIRED]
                        },
                        {
                            col: 3,
                            disabled: true,
                            fieldType: "select",
                            label: "Trạng thái hồ sơ",
                            placeholder: "Trạng thái hồ sơ",
                            name: "trangThaiHoSo",
                            options: constants.CONST_TRANG_THAI_HO_SO.xuLyOptions,
                            checkValid: true,
                            validates: [validate.VALIDATE_HO_SO_CTP_TTHS_REQUIRED]
                        },
                        {
                            col: 3,
                            fieldType: "select",
                            disabled: true,
                            label: "Kết quả thẩm định",
                            placeholder: "Kết quả thẩm định",
                            name: "ketQuaThamDinh",
                            options: constants.CONST_KET_QUA_THAM_DINH.options,
                            checkValid: true,
                            validates: [validate.VALIDATE_HO_SO_CTP_KQTD_REQUIRED]
                        }
                    ],
                    [//row
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="thanh-vien">
                                <div className="col-md-12">
                                    <Divider orientation="left">Danh sách cơ sở tham gia chuỗi</Divider>
                                    <ThanhViens
                                        data={getThanhVienChuoiThucPham()}
                                        onAdd={addThanhVien}
                                        onDelete={delThanhVien}
                                        onSelectCoSo={onSelectCoSo}
                                    />
                                </div>
                            </React.Fragment>
                        }
                    ],
                    [//row
                        {
                            col: 12,
                            fieldType: "textarea",
                            name: "ghiChu",
                            label: "Ghi chú",
                            placeholder: "Ghi chú"
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: ho_so_chuoi_thuc_pham.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM}
                initialValues={{
                    trangThaiHoSo: constants.CONST_CHUOI_THUC_PHAM_AN_TOAN_TRANG_THAI_HO_SO_OPTIONS[0].value,
                    ketQuaThamDinh: constants.CONST_CHUOI_THUC_PHAM_AN_TOAN_KET_QUA_THAM_DINH_OPTIONS[2].value,
                    ngayTiepNhan: moment(moment().toDate()).format(dateFormat),
                    ...ho_so_chuoi_thuc_pham,
                }}
            />
        </React.Fragment>
    );
}

export default HoSoChuoiThucPhamForm;