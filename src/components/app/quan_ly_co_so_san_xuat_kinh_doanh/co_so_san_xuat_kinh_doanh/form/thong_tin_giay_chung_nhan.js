import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonFormContent, CommonFieldset } from "./../../../../common";
import { change, getFormValues } from "redux-form";
import * as constants from "./../../../../../constants/constants";
import * as formName from "./../../../../../constants/form_name";
import moment from "moment";
import { dateFormat } from '../../../../../constants/controll';

const ThongTinGiayChungNhan = () => {
    const dispatch = useDispatch();
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH)(state));

    const ngayCap = formValues && formValues.ngayCapChungNhanAttp ? formValues.ngayCapChungNhanAttp : "";
    const ngayHetHan = formValues && formValues.ngayHetHanChungNhanAttp ? formValues.ngayHetHanChungNhanAttp : "";
    const onChangeNgayHetHan = (nc) => {
        const ngayCap = moment(nc, dateFormat).isValid() ? moment(nc, dateFormat) : null;
        if (ngayCap) {
            const ngayHetHan = ngayCap.add(3, "year");
            dispatch(change(formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH, "ngayHetHanChungNhanAttp", ngayHetHan.format(dateFormat)));
        }
    }
    return (
        <React.Fragment >
            <CommonFieldset title="Thông tin giấy chứng nhận">
                <CommonFormContent
                    data={[
                        [ // row 4
                            {
                                col: 4,
                                label: "Số giấy chứng nhận ATTP",
                                placeholder: "Số giấy chứng nhận ATTP",
                                name: "soChungNhanAttp"
                            },
                            {
                                col: 4,
                                fieldType: "date",
                                label: "Ngày cấp",
                                placeholder: "Ngày cấp CN ATTP",
                                maxDate: ngayHetHan,
                                onChange: (e) => { onChangeNgayHetHan(e) },
                                name: "ngayCapChungNhanAttp"
                            },
                            {
                                col: 4,
                                fieldType: "date",
                                label: "Ngày hết hạn",
                                placeholder: "Ngày hết hạn CN ATTP",
                                minDate: ngayCap,
                                name: "ngayHetHanChungNhanAttp"
                            }
                        ],
                        [ // row 4
                            {
                                col: 4,
                                label: "Người ký",
                                placeholder: "Người ký",
                                name: "nguoiKyCapGiayChungNhan"
                            },
                            {
                                col: 4,
                                fieldType: "date",
                                label: "Ngày ký",
                                placeholder: "Ngày ký",
                                name: "ngayKyCapGiayChungNhan"
                            },
                            {
                                col: 4,
                                fieldType: "select",
                                label: "Trạng thái GCN",
                                placeholder: "Trạng thái GCN",
                                name: "trangThaiCapGCN",
                                options: constants.CONST_LOAI_HOSO_CAP_GCN.options
                            },
                        ],
                        [
                            {
                                col: 12,
                                label: "Ghi chú",
                                fieldType: "textarea",
                                placeholder: "Ghi chú",
                                name: "ghiChuGCNATTP"
                            },
                        ]
                    ]}
                />
            </CommonFieldset>
        </React.Fragment >
    );
}

export default ThongTinGiayChungNhan;