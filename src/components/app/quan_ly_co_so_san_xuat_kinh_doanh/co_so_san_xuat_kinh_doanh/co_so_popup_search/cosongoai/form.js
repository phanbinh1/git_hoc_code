import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonAddress, CommonForm } from "./../../../../../common";
import * as constants from "./../../../../../../constants/constants";
import { VALIDATE_CO_SO_SXKD_TEN_CO_SO_REQUIRED } from '../../../../../../constants/validate';
import { change, getFormValues, submit } from 'redux-form';
import { API_DANH_MUC_CHO } from '../../../../../../constants/api';

const FormThemCoSoNgoai = ({
    onSubmit
}) => {
    const dispatch = useDispatch();
    const formValues = useSelector(state => getFormValues("FORM_THEM_CO_SO_NGOAI")(state));
    const getSearchExtends = () => {
        let res = ``;
        if (formValues && formValues.tinhThanh && formValues.tinhThanh.ma) {
            res += `maTinh=${formValues.tinhThanh.ma}&`
        }
        if (formValues && formValues.quanHuyen && formValues.quanHuyen.ma) {
            res += `maQuan=${formValues.quanHuyen.ma}&`
        }
        if (formValues && formValues.xaPhuong && formValues.xaPhuong.ma) {
            res += `maPhuong=${formValues.xaPhuong.ma}&`
        }
        return `${res}ten`
    }

    return <Fragment>
        <CommonForm
            data={[
                [//row 1
                    {
                        col: 6,
                        label: "Tên cơ sở",
                        placeholder: "Tên cơ sở",
                        name: "tenCoSo",
                        checkValid: true,
                        validates: [VALIDATE_CO_SO_SXKD_TEN_CO_SO_REQUIRED],
                    },
                    {
                        col: 6,
                        label: "Danh mục chợ",
                        placeholder: "Danh mục chợ",
                        fieldType: "selectLoadMore",
                        url: API_DANH_MUC_CHO,
                        valueKey: "id",
                        labelKey: "ten",
                        searchKey: "searchData",
                        searchKeyExtend: getSearchExtends(),
                        name: "idDanhMucCho",
                        changeCallback: (value, option) => {
                            const ten = option && option.props && option.props.ten;
                            dispatch(change("FORM_THEM_CO_SO_NGOAI", "tenDanhMucCho", ten || null));
                        },
                        key: getSearchExtends(),
                    }
                ],
                // [
                //     {
                //         col: 6,
                //         label: "Số giấy phép ĐKKD",
                //         placeholder: "Số giấy phép ĐKKD",
                //         name: "soGiayPhepDkkd"
                //     },
                //     {
                //         col: 6,
                //         label: "Số chứng nhận ATTP",
                //         placeholder: "Số chứng nhận ATTP",
                //         name: "soChungNhanAttp"
                //     },
                // ],
                [//row 2 
                    {
                        col: 12,
                        type: "custom",
                        renderCustom: <CommonAddress
                            form="FORM_THEM_CO_SO_NGOAI"
                            tinhThanh={{
                                name: "tinhThanh.ma",
                                onChange: (v, option) => {
                                    option && option.props && option.props.label && dispatch(change("FORM_THEM_CO_SO_NGOAI", "tinhThanh.ten", option.props.label));
                                    dispatch(change("FORM_THEM_CO_SO_NGOAI", "quanHuyen.ten", null));
                                    dispatch(change("FORM_THEM_CO_SO_NGOAI", "xaPhuong.ten", null));
                                }
                            }}
                            quanHuyen={{
                                name: "quanHuyen.ma",
                                onChange: (v, option) => {
                                    option && option.props && option.props.label && dispatch(change("FORM_THEM_CO_SO_NGOAI", "quanHuyen.ten", option.props.label))
                                    dispatch(change("FORM_THEM_CO_SO_NGOAI", "xaPhuong.ten", null));
                                }
                            }}
                            xaPhuong={{ name: "xaPhuong.ma", onChange: (v, option) => option && option.props && option.props.label && dispatch(change("FORM_THEM_CO_SO_NGOAI", "xaPhuong.ten", option.props.label)) }}
                            diaChi={{ name: "diaDiem" }}
                        />
                    }
                ],

                [
                    {
                        col: 12,
                        label: "Ghi chú",
                        placeholder: "Ghi chú",
                        name: "ghiChu"
                    }
                ],
            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    hidden: true
                },
                {
                    htmlType: constants.FORM_HTML_TYPE_BUTTON,
                    label: "Thêm cơ sở",
                    icon: "fa fa-save",
                    type: constants.CONST_TYPE_BTN_SUBMIT,
                    handleClick: () => dispatch(submit("FORM_THEM_CO_SO_NGOAI"))
                }
            ]}
            onSubmit={onSubmit}
            form="FORM_THEM_CO_SO_NGOAI"
            initialValues={{
                tinhThanh: constants.CONST_DEFAULT_TINHTHANH,
                loaiCoSo: constants.CONST_LOAI_CO_SO.COSO_NGOAI
            }}
        />
    </Fragment>
}

export default FormThemCoSoNgoai;