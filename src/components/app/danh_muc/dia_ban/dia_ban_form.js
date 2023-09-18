import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from "antd";
import { formValueSelector, change } from 'redux-form';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
import * as modal from "./../../../../constants/modal";
import * as constants from "./../../../../constants/constants";

class DiaBanForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaving: false,
            dsTinhThanh: [],
            dsQuanHuyen: [],
            dsXaPhuong: [],
            dsCap: constants.CONST_DIA_BAN_CAP_1,
            maTinhThanh: null,
            maXaPhuong: null,
            maQuanHuyen: null
        }
    }

    componentDidMount() {
        var { getAllRequest, changeValue } = this.props;
        getAllRequest({
            data: { parentCode: "0" },
            requestSuccess: (res) => {
                if (res && res.status && res.result && Array.isArray(res.result)) {
                    changeValue("dsTinhThanh", res.result);
                }
            }
        });
    }

    getMaDiaBanCha = (formValue) => {
        var result = "0";
        if (formValue.xaPhuong) {
            result = formValue.xaPhuong;
        }
        else if (formValue.quanHuyen) {
            result = formValue.quanHuyen;
        }
        else if (formValue.tinhThanh) {
            result = formValue.tinhThanh;
        }
        return result;
    }
    handleSubmit = (values) => {
        this.setState({ isSaving: true });
        var { createRequest, updateRequest } = this.props;
        values.maDiaBanCha = this.getMaDiaBanCha(values);
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: values,
                requestSuccess: this.handleSubmitSuccess,
                requestError: this.handleSubmitFail
            });
        }
        else {
            createRequest({
                data: values,
                requestSuccess: this.handleSubmitSuccess,
                requestError: this.handleSubmitFail
            });
        }
    }

    handleSubmitSuccess = () => {
        var { handleBack } = this.props;
        this.setState({ isSaving: false });
        handleBack();
    }

    handleSubmitFail = (isAgain = false) => {
        this.setState({ isSaving: false });
        if (isAgain) {
            var { handleBack } = this.props;
            modal.confirm(
                "Lỗi",
                <p>Thao tác lưu dữ liệu thất bại.<br />Bạn có muốn thử lại?</p>,
                () => { },
                handleBack
            );
        }
    }

    getDiaBan = (param) => {
        var paramInit = { parentCode: "0", listKey: 1 }
        param = { ...paramInit, ...param };
        const { getAllRequest, changeValue } = this.props;
        getAllRequest({
            data: { parentCode: param.parentCode },
            requestSuccess: (res) => {
                if (res && res.status && res.result && Array.isArray(res.result)) {
                    if (param.listKey === 1) {
                        changeValue("dsQuanHuyen", res.result);
                    }
                    if (param.listKey === 2) {
                        changeValue("dsXaPhuong", res.result);
                    }
                }
            }
        });
    }

    render() {
        var { dia_ban, changeValue, formValue } = this.props;
        var { isSaving } = this.state;
        var data = [
            [ // row 1
                {
                    col: 12,
                    type: "custom",
                    renderCustom: <div className="col-md-12" key="row_1">
                        <Divider orientation="left">
                            Đơn vị cấp cha:
                        </Divider>
                    </div>
                }
            ],
            [
                {
                    col: 4,
                    label: constants.CONST_DIA_BAN_LABEL[0],
                    placeholder: constants.CONST_DIA_BAN_LABEL[0],
                    name: "tinhThanh",
                    fieldType: "select",
                    valueKey: "ma",
                    labelKey: "ten",
                    options: formValue("dsTinhThanh"),
                    onChange: (e, val) => {
                        changeValue("quanHuyen", null);
                        changeValue("xaPhuong", null);
                        changeValue("cap", null);
                        changeValue("dsCap", val ? constants.CONST_DIA_BAN_CAP_2 : constants.CONST_DIA_BAN_CAP_1);
                        val && this.getDiaBan({
                            parentCode: val,
                            listKey: 1
                        })
                    }
                },
                {
                    col: 4,
                    label: constants.CONST_DIA_BAN_LABEL[1],
                    placeholder: constants.CONST_DIA_BAN_LABEL[1],
                    name: "quanHuyen",
                    fieldType: "select",
                    valueKey: "ma",
                    labelKey: "ten",
                    options: formValue("dsQuanHuyen"),
                    onChange: (e, val) => {
                        changeValue("xaPhuong", null);
                        changeValue("cap", null);
                        changeValue("dsCap", val ? constants.CONST_DIA_BAN_CAP_3 : constants.CONST_DIA_BAN_CAP_2);
                        val && this.getDiaBan({
                            parentCode: val,
                            listKey: 2
                        })
                    }
                },
                {
                    col: 4,
                    label: constants.CONST_DIA_BAN_LABEL[2],
                    placeholder: constants.CONST_DIA_BAN_LABEL[2],
                    name: "xaPhuong",
                    fieldType: "select",
                    valueKey: "ma",
                    labelKey: "ten",
                    options: formValue("dsXaPhuong"),
                    onChange: (e, val) => {
                        changeValue("cap", null);
                        changeValue("dsCap", val ? constants.CONST_DIA_BAN_CAP_4 : constants.CONST_DIA_BAN_CAP_3);
                    }
                },
            ],
            [// row 3
                {
                    col: 12,
                    type: "custom",
                    renderCustom: <div className="col-md-12" key="row_2">
                        <Divider />
                    </div>
                }
            ],
            [//row 4
                {
                    col: 6,
                    label: "Mã địa bàn",
                    placeholder: "Mã địa bàn",
                    name: "ma",
                    readOnly: dia_ban.hasOwnProperty("id") ? true : false,
                    checkValid: true,
                    validates: [validate.VALIDATE_DIA_BAN_MA_REQUIRED]
                },
                {
                    col: 6,
                    label: "Tên địa bàn",
                    placeholder: "Tên địa bàn",
                    name: "ten",
                    checkValid: true,
                    validates: [validate.VALIDATE_DIA_BAN_TEN_REQUIRED]
                },
            ],
            [ // row 5

                {
                    col: 4,
                    label: "Cấp",
                    placeholder: "Cấp",
                    name: "cap",
                    fieldType: "select",
                    options: Array.isArray(formValue("dsCap")) ? formValue("dsCap") : [],
                    valueKey: "label",
                    checkValid: true,
                    validates: [validate.VALIDATE_DIA_BAN_CAP_REQUIRED]
                },
                {
                    col: 2,
                    label: "Dân số",
                    placeholder: "Dân số",
                    name: "danSo",
                    fieldType: "number",
                    checkValid: true,
                    validates: [validate.VALIDATE_IS_NUMBER]
                },
                {
                    col: 6,
                    label: "Tên tiếng anh",
                    placeholder: "Tên tiếng anh",
                    name: "tenTiengAnh",
                }
            ],
            [ // row 6
                {
                    col: 12,
                    label: "Ghi chú",
                    placeholder: "Ghi chú",
                    name: "ghiChu",
                    fieldType: "textarea"
                }
            ]
        ];

        var actions = [
            {
                htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                label: dia_ban.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                loading: isSaving,
                icon: "fa fa-save",
                type: constants.CONST_TYPE_BTN_SUBMIT,
            }
        ]
        return (
            <React.Fragment>
                <CommonForm
                    {...this.props}
                    {...this.state}
                    data={data}
                    onSubmit={this.handleSubmit}
                    actions={actions}
                    form="FORM_DIA_BAN"
                    initialValues={dia_ban}
                />
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state) => ({
    initialValues: state.app.danh_muc.dia_ban.item,
    dia_ban: state.app.danh_muc.dia_ban.item,
    formValue: (fieldName) => formValueSelector('FORM_DIA_BAN')(state, fieldName)
});
const mapDispatchToProps = (dispatch) => ({
    createRequest: (object = {}) => {
        dispatch(actDiaBan.createRequest(object));
    },
    updateRequest: (object = {}) => {
        dispatch(actDiaBan.updateRequest(object));
    },
    getAllRequest: (object) => {
        dispatch(actDiaBan.getAllRequest(object));
    },
    changeValue: (fieldName, value) => {
        dispatch(change("FORM_DIA_BAN", fieldName, value));
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(DiaBanForm);