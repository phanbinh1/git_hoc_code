import React from 'react';
import { useSelector } from 'react-redux';
import * as validate from "./../../../../../constants/validate"
import * as constants from "./../../../../../constants/constants";
import * as formName from "./../../../../../constants/form_name";
import * as apiUrl from "./../../../../../constants/api";
import { CommonFormContent, CommonAddress, CommonFieldset } from './../../../../common';
import { formValueSelector, getFormValues } from 'redux-form';

const ThongTinHoSo = () => {

    const co_so_san_xuat_kinh_doanh = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.co_so_san_xuat_kinh_doanh.item);
    const loai_hinh_co_so_tree = useSelector(state => state.app.danh_muc.loai_hinh_co_so.tree);
    const loaiCoSo = useSelector(state => formValueSelector(formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH)(state, "loaiCoSo"))

    return (
        <React.Fragment >
            <CommonFieldset title="Thông tin hồ sơ">
                <CommonFormContent
                    data={[
                        [//row 1
                            {
                                col: 6,
                                label: "Tên cơ sở",
                                placeholder: "Tên cơ sở",
                                name: "tenCoSo",
                                checkValid: true,
                                validates: [validate.VALIDATE_CO_SO_SXKD_TEN_CO_SO_REQUIRED]
                            },
                            {
                                col: 3,
                                label: "Số điện thoại",
                                placeholder: "Số điện thoại",
                                name: "soDienThoai",
                            },
                            {
                                col: 3,
                                fieldType: "select",
                                label: "Trạng thái",
                                placeholder: "Trạng thái",
                                name: "trangThai",
                                allowClear: false,
                                options: constants.CONST_TRANG_THAI_HOAT_DONG.options
                            }
                        ],
                        [
                            {
                                col: 12,
                                type: "custom",
                                renderCustom: <CommonAddress
                                    key="address"
                                    form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH}
                                    tinhThanh={{ name: "tinhThanh.ma", hidden: true }}
                                    quanHuyen={{ name: "quanHuyen.ma" }}
                                    xaPhuong={{ name: "xaPhuong.ma", validate: false }}
                                    diaChi={{ name: "diaDiemKinhDoanh", validate: false }}
                                />
                            }
                        ],
                        [
                            {
                                col: 3,
                                label: "Loại hình cơ sở",
                                placeholder: "Loại hình cơ sở",
                                fieldType: "selectTree",
                                valueKey: "id",
                                labelKey: "label",
                                name: "dsLoaiHinhCoSo",
                                mode: "multiselect",
                                options: loai_hinh_co_so_tree,
                                checkValid: true,
                                validates: [validate.VALIDATE_CO_SO_SXKD_LOAI_HINH_CO_SO_REQUIRED]
                            },
                            {
                                col: 3,
                                label: "Ngành",
                                placeholder: "Ngành",
                                fieldType: "selectLoadMore",
                                url: apiUrl.API_LINH_VUC,
                                valueKey: "id",
                                labelKey: "ten",
                                searchKey: "searchData",
                                searchKeyExtend: "tenLinhVuc",
                                name: "linhVuc.id",
                                selectDefaultValue: co_so_san_xuat_kinh_doanh.linhVuc
                            },
                            // {
                            //     col: 3,
                            //     label: "Loại cơ sở",
                            //     placeholder: "Loại cơ sở",
                            //     fieldType: "select",
                            //     name: "loaiCoSo",
                            //     options: [
                            //         { value: "COSO_BANATTP", label: "Cơ sở ban ATTP" },
                            //         { value: "COSO_QUANHUYEN", label: "Cơ sở dữ liệu quận huyện" },
                            //         { value: "COSO_NGOAI", label: "Cơ sở ngoài" }
                            //     ]
                            // },
                            // {
                            //     col: 3,
                            //     label: "Chợ",
                            //     placeholder: "Chợ",
                            //     fieldType: "selectLoadMore",
                            //     url: apiUrl.API_DANH_MUC_CHO,
                            //     valueKey: "id",
                            //     labelKey: "ten",
                            //     searchKey: "searchData",
                            //     searchKeyExtend: "ten",
                            //     name: "idDanhMucCho",
                            //     selectDefaultValue: co_so_san_xuat_kinh_doanh.idDanhMucCho,
                            //     disabled: loaiCoSo !== "COSO_NGOAI"
                            // },
                        ],
                        [
                            {
                                col: 12,
                                fieldType: "textarea",
                                name: "ghiChu",
                                label: "Ghi chú",
                                placeholder: "Ghi chú",
                                autoSize: true
                            }
                        ]
                    ]}
                />
            </CommonFieldset>
        </React.Fragment >
    );
}

export default ThongTinHoSo;