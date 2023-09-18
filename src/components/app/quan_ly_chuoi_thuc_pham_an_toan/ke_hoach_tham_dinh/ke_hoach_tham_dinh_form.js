import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formValueSelector } from 'redux-form';
import moment from 'moment';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate";
import * as actKeHoachThamDinhCTP from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";

const KeHoachThamDinhForm = ({ handleBack }) => {

    const ke_hoach_tham_dinh = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.ke_hoach_tham_dinh.item);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actKeHoachThamDinhCTP.updateRequest(object));

    const getFormValue = (fieldName) => {
        return useSelector(state => formValueSelector(formName.FORM_NAME_KE_HOACH_THAM_DINH_CTPAT)(state, fieldName));
    }

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
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row
                        {
                            col: 3,
                            label: "Số kế hoạch",
                            placeholder: "Số kế hoạch",
                            name: "soKeHoach",
                        },
                        {
                            col: 3,
                            label: "Năm",
                            placeholder: "Năm",
                            name: "nam",
                            fieldType: "year",
                            checkValid: true,
                            validates: [validate.VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_NAM_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Tên kế hoạch",
                            placeholder: "Tên kế hoạch",
                            name: "tenKeHoach",
                            fieldType: "textarea",
                            autoSize: true,
                            checkValid: true,
                            validates: [validate.VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_TEN_KE_HOACH_REQUIRED]
                        }
                    ],
                    [
                        {
                            col: 6,
                            fieldType: "date",
                            label: "Ngày bắt đầu",
                            placeholder: "Ngày bắt đầu",
                            name: "ngayBatDau",
                            maxDate: getFormValue("ngayKetThuc")
                        },
                        {
                            col: 6,
                            fieldType: "date",
                            label: "Ngày kết thúc",
                            placeholder: "Ngày kết thúc",
                            name: "ngayKetThuc",
                            minDate: getFormValue("ngayBatDau")
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            fieldType: "textarea",
                            name: "ghiChu",
                            label: "Ghi chú",
                            placeholder: "Ghi chú"
                        }
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: ke_hoach_tham_dinh.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_KE_HOACH_THAM_DINH_CTPAT}
                initialValues={{
                    trangThaiPheDuyet: constants.CONST_PHE_DUYET.DANGHOANTHIEN,
                    nam: moment(moment().toDate()).format("YYYY"),
                    ...ke_hoach_tham_dinh
                }}
            />
        </React.Fragment>
    );
}

export default KeHoachThamDinhForm;