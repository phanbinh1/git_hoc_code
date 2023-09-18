import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../../common";
import * as validate from "./../../../../../constants/validate"
import { dateFormat } from "./../../../../../constants/controll";
import { formValueSelector, change, getFormValues, Field, arrayRemove, arrayPush } from 'redux-form';
import * as formName from "./../../../../../constants/form_name";
import moment from 'moment';
import { Table, Button, Divider } from "antd";
import * as constants from "./../../../../../constants/constants";
import * as apiUrl from "./../../../../../constants/api";
import * as message from "./../../../../../constants/message";
import * as api from "./../../../../../util/api_call";
import * as main from "./../../../../../constants/main"
import { FieldInput, FieldCurrency } from "./../../../../../constants/controll";

const CongTac = ({ renderActionThemMoi, setDataCongTac, itemUpdate }) => {

    const account_current = useSelector(state => state.core.account_current);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_THONG_TIN_CONG_TAC)(state));

    const onAddKinhPhi = () => dispatch(arrayPush(formName.FORM_NAME_THONG_TIN_CONG_TAC, "duToanKinhPhiCongTacs", {}))
    const onRemoveKinhPhi = (index) => dispatch(arrayRemove(formName.FORM_NAME_THONG_TIN_CONG_TAC, "duToanKinhPhiCongTacs", index))
    const dispatch = useDispatch();
    const getFormValue = (fieldName) => {
        return useSelector(state => formValueSelector(formName.FORM_NAME_THONG_TIN_CONG_TAC)(state, fieldName));
    }

    const nguoiTiepNhan = () => {
        /**
         *  Phòng nghiệp vụ & Phòng thanh tra
         *  Nếu Chức vụ === Trưởng phòng => Trưởng ban
         *  Ngược lại => Trưởng phòng
         */
        if (account_current.managementDepartment === constants.CONST_PHONG_BAN.NGHIEPVU || account_current.managementDepartment === constants.CONST_PHONG_BAN.THANHTRA) {
            if (account_current.regency === constants.CONST_CHUC_VU.TRUONGPHONG) {
                return constants.CONST_CHUC_VU.TRUONGBAN;
            }
            else {
                return constants.CONST_CHUC_VU.TRUONGPHONG;
            }
        }

        /**
         *  Dội 1 && Đội 2
         *  Nếu Chức vụ ===  Đội trưởng => trưởng ban
         *  Ngược lại => Đội trưởng duyệt
         */
        if (account_current.managementDepartment === constants.CONST_PHONG_BAN.DOI1 || account_current.managementDepartment === constants.CONST_PHONG_BAN.DOI2) {
            if (account_current.regency === constants.CONST_CHUC_VU.DOITRUONG) {
                return constants.CONST_CHUC_VU.TRUONGBAN;
            }
            else {
                return constants.CONST_CHUC_VU.DOITRUONG;
            }
        }

        /**
         *  Văn phòng
         *  Nếu chức vụ === Chánh văn phòng => Trưởng ban
         *  Ngược lại => Chánh văn phòng
         */
        if (account_current.managementDepartment === constants.CONST_PHONG_BAN.VANPHONG) {
            if (account_current.regency === constants.CONST_CHUC_VU.CHANHVANPHONG) {
                return constants.CONST_CHUC_VU.TRUONGBAN;
            }
            else {
                return constants.CONST_CHUC_VU.CHANHVANPHONG;
            }
        }

        /**
         *  Phòng quản trị hệ thống
         *  Nếu chức vụ === Admin => Trưởng ban
         *  Ngược lại => Admin
         */
        if (account_current.managementDepartment === constants.CONST_PHONG_BAN.ADMIN) {
            if (account_current.regency === constants.CONST_CHUC_VU.ADMIN) {
                return constants.CONST_CHUC_VU.TRUONGBAN;
            }
            else {
                return constants.CONST_CHUC_VU.ADMIN;
            }
        }

        /**
         *  Lãnh đạo ban hoặc không có phòng ban
         *  Mặc định chuyển cho trưởng ban
         */
        return constants.CONST_CHUC_VU.TRUONGBAN;
    }

    const handleSubmit = async (data) => {
        if (data.hasOwnProperty("id")) {
            const res = await api.put({ url: apiUrl.API_THONG_TIN_CONG_TAC, data });
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        }
        else {
            const res = await api.post({ url: apiUrl.API_THONG_TIN_CONG_TAC, data });
            if (res && res.status) {
                res.msg && message.success({ content: res.msg });
                setDataCongTac(data => [...data, res.result]);
                onAddKinhPhi()
                renderActionThemMoi()
            }
            else {
                res.msg && message.error({ content: res.msg });
            }
        }
    };

    const tuNgay = getFormValue("tuNgay")
    const denNgay = getFormValue("denNgay")

    useEffect(() => {
        if (tuNgay && denNgay) {
            const _tuNgay = moment(tuNgay, dateFormat)
            const _denNgay = moment(denNgay, dateFormat)
            dispatch(change(formName.FORM_NAME_THONG_TIN_CONG_TAC, "soNgayNghi", (_denNgay.diff(_tuNgay, "days") + 1)))
            dispatch(change(formName.FORM_NAME_THONG_TIN_CONG_TAC, "nam", (moment(_tuNgay)).format("YYYY")))
        } else {
            dispatch(change(formName.FORM_NAME_THONG_TIN_CONG_TAC, "soNgayNghi", 0))
            dispatch(change(formName.FORM_NAME_THONG_TIN_CONG_TAC, "nam", 0))
        }

    }, [tuNgay, denNgay])

    return (
        <React.Fragment>
            <CommonForm
                key="f-c-1"
                data={[
                    [//row 1
                        {
                            col: 3,
                            label: "Năm",
                            placeholder: "Năm",
                            name: "nam",
                            fieldType: "year",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_NAM_REQUIRED]
                        },
                        {
                            col: 3,
                            label: "Từ ngày",
                            placeholder: "Từ ngày",
                            fieldType: "date",
                            name: "tuNgay",
                            checkValid: true,
                            maxDate: denNgay,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_TU_NGAY_REQUIRED]
                        },
                        {
                            col: 3,
                            label: "Đến ngày",
                            placeholder: "Đến ngày",
                            fieldType: "date",
                            name: "denNgay",
                            checkValid: true,
                            minDate: tuNgay,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_DEN_NGAY_REQUIRED]
                        },
                        {
                            col: 3,
                            label: "Số ngày công tác",
                            placeholder: "Số ngày tác",
                            fieldType: "number",
                            name: "soNgayNghi",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_SO_NGAY_NGHI_REQUIRED]
                        },
                    ],
                    [//row 2
                        {
                            col: 12,
                            label: "Lý do",
                            placeholder: "Lý do",
                            name: "lyDo",
                            hight: "30%",
                            fieldType: "textarea",
                            checkValid: true,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_NGHI_LY_DO_REQUIRED]
                        },
                    ],
                    [//row 3
                        {
                            type: "custom",
                            renderCustom: <React.Fragment>
                                <div className="col-md-12">
                                    <Divider orientation="left"><i className="fa fa-info-circle m-r-5" /><strong>Dự toán kinh phí công tác</strong></Divider>
                                </div>
                            </React.Fragment>
                        }
                    ],
                    [//row 4
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="list-kp">
                                <KinhPhi
                                    list={formValues && formValues.duToanKinhPhiCongTacs && Array.isArray(formValues.duToanKinhPhiCongTacs) ? formValues.duToanKinhPhiCongTacs : []}
                                    onAdd={onAddKinhPhi}
                                    onRemove={onRemoveKinhPhi}
                                />
                            </React.Fragment>
                        }
                    ]

                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_THONG_TIN_CONG_TAC}
                initialValues={{
                    trangThaiDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
                    nhanSu: { userName: account_current.name },
                    nguoiTiepNhan: nguoiTiepNhan(),
                    ...itemUpdate
                }}
            />
        </React.Fragment >
    );
}

const KinhPhi = ({
    onAdd,
    onRemove,
    list = []
}) => {

    const sumTongTien = useCallback(() => {
        let res = 0;
        if (list && Array.isArray(list)) {
            list.map((item, i) => {
                if (item.kinhPhi && !isNaN(item.kinhPhi)) {
                    res += parseInt(item.kinhPhi, 0);
                }
                return res;
            })
        }
        return {
            number: res,
            currency: main.convertNumberToCurrency(res)
        };
    }, [list])

    return <React.Fragment>
        <div className="col-md-12">
            <Table
                size="small"
                pagination={false}
                bordered
                dataSource={list.map((item, i) => { return { ...item, key: i } })}
                columns={[
                    {
                        title: "STT",
                        width: 50,
                        align: "center",
                        render: (_, r, index) => (index + 1)
                    },
                    {
                        title: "Nội dung",
                        render: (_, r, index) => {
                            return <React.Fragment>
                                <Field
                                    component={FieldInput}
                                    name={`duToanKinhPhiCongTacs[${index}].noiDung`}
                                    placeholder="Nội dung"
                                    checkValid={true}
                                    validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_NOIDUNG_REQUIRED}
                                />
                            </React.Fragment>
                        }
                    },
                    {
                        title: "Kinh phí (VNĐ)",
                        render: (_, r, index) => {
                            return <React.Fragment>
                                <Field
                                    component={FieldCurrency}
                                    name={`duToanKinhPhiCongTacs[${index}].kinhPhi`}
                                    placeholder="Kinh phí"
                                    checkValid={true}
                                    validate={validate.VALIDATE_QTNVTT_KEHOACHTHANHTRA_KINHPHI_KINHPHI_REQUIRED}
                                />
                            </React.Fragment>
                        }
                    },
                    {
                        title: "Thao tác",
                        width: 80,
                        align: "center",
                        render: (_, r, index) => {
                            return <React.Fragment>
                                <Button onClick={() => onRemove(index)} className="ant-btn-dangerous">
                                    <i className="fa fa-trash m-r-10" />Xóa
                                </Button>
                            </React.Fragment>
                        }
                    }
                ]}
                title={() => {
                    return <React.Fragment>
                        <Button type="primary" onClick={onAdd} >
                            <i className="fa fa-plus m-r-10" /> Thêm
                        </Button>
                    </React.Fragment>
                }}
            />
            <Divider orientation="right">Tổng kinh phí: <b>{sumTongTien().currency} VNĐ</b></Divider>
        </div>
    </React.Fragment>
}

export default CongTac;