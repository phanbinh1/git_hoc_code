import React, { useState, Fragment } from 'react';
import { CommonForm } from "./../../common";
import * as formName from "./../../../constants/form_name";
import * as constants from "./../../../constants/constants";
import * as validate from "./../../../constants/validate";
import { connect, useDispatch } from "react-redux";
import { formValueSelector } from "redux-form";
import { post } from '../../../util/api_call';
import { API_MOTCUA_DONGBOHOSO } from "./../../../constants/api";
import * as messages from "./../../../constants/message";

let optionsTrangThaiHoSo = [
    { value: -1, label: "Tất cả" },
    { value: 3, label: "Chờ bổ sung hồ sơ" },
    { value: 4, label: "Chờ ký duyệt" },
    { value: 12, label: "Chờ thực hiện liên thông" },
    { value: 9, label: "Chờ thực hiện nghĩa vụ tài chính" },
    { value: 14, label: "Chờ trả thông báo nghĩa vụ tài chính" },
    { value: 2, label: "Chờ xử lý" },
    { value: 7, label: "Công dân yêu cầu rút hồ sơ" },
    { value: 1, label: "Hồ sơ chuyển phòng chuyên môn" },
    { value: 8, label: "Hồ sơ không xử lý được" },
    { value: 19, label: "Hồ sơ mới tiếp nhận" },
    { value: 0, label: "Hồ sơ đăng ký mới trực tuyến" },
    { value: 16, label: "Không tiếp nhận" },
    { value: 15, label: "Đang xử lý" },
    { value: 17, label: "Đã bổ sung - chờ tiếp nhận" },
    { value: 13, label: "Đã nhận kết quả liên thông" },
];
const DongBoMotCuaForm = ({ formValue }) => {
    const [initialValues, setInitialValues] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        let stringListTrangThaiHoSo = "";
        values.listTrangThaiHoSoId.map(x => {
            stringListTrangThaiHoSo += `&listTrangThaiHoSoId=${x}`;
        })
        post({
            url: API_MOTCUA_DONGBOHOSO + `?denNgay=${values.denNgay}&tuNgay=${values.tuNgay}${stringListTrangThaiHoSo}`
        }).then(res => {
            if (res && res.status) {
                messages.success({ content: "Đã đồng bộ hồ sơ một cửa!" });
            } else {
                messages.error({ content: "Đồng bộ hồ sơ một cửa thất bại!" });
            }
        })
    }
    return <Fragment>
        <CommonForm
            data={[
                [
                    {
                        col: 12,
                        label: "Trạng thái hồ sơ",
                        placeholder: "Trạng thái hồ sơ",
                        name: "listTrangThaiHoSoId",
                        fieldType: "select",
                        mode: "multiple",
                        options: optionsTrangThaiHoSo,
                        allowClear: false,
                        checkValid: true,
                        validates: [validate.VALIDATE_CAU_HINH_TRANG_THAI_HO_SO_REQUIRED]
                    }
                ],
                [
                    {
                        col: 6,
                        label: "Từ ngày",
                        placeholder: "Từ ngày",
                        name: "tuNgay",
                        fieldType: "date",
                        checkValid: true,
                        validates: [validate.VALIDATE_TU_NGAY_REQUIRED],
                        maxDate: (formValue("denNgay"))
                    },
                    {
                        col: 6,
                        label: "Đến ngày",
                        placeholder: "Đến ngày",
                        name: "denNgay",
                        fieldType: "date",
                        checkValid: true,
                        validates: [validate.VALIDATE_DEN_NGAY_REQUIRED],
                        minDate: (formValue("tuNgay"))
                    },
                ]

            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    label: constants.FORM_BUTTON_LABEL_SYNTH,
                    icon: "fa fa-refresh",
                    type: constants.CONST_TYPE_BTN_SUBMIT,
                }
            ]}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_DONG_BO_MOT_CUA}
            initialValues={initialValues}
        />
    </Fragment>
}
export default connect(state => ({
    formValue: (fieldName) => formValueSelector(formName.FORM_NAME_DONG_BO_MOT_CUA)(state, fieldName)
}))(DongBoMotCuaForm);