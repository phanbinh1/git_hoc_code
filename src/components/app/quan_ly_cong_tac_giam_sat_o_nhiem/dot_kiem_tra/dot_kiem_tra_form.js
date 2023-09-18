import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { Tooltip, Divider } from "antd";
import { CommonForm, CommonAddress } from "./../../../common";
import ChiTieuGiamSat from "./dot_kiem_tra_chi_tieu_giam_sat";
import * as actDotKiemTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/dot_kiem_tra/dot_kiem_tra";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as validate from "./../../../../constants/validate"
import CoSoSanXuatKinhDoanhPopupSearch from "./../../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_popup_search";
import CoSoGiamSat from "./form_list_co_so";

const DotKiemTraForm = ({ handleBack, ketQuaOptions }) => {

    const dot_kiem_tra = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.dot_kiem_tra.item);

    const dispatch = useDispatch();
    const coSoKiemTras = useSelector(state => formValueSelector(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state, "coSoKiemTras")) || []
    const fIdCoSo = useSelector(state => formValueSelector(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state, "idCoSo"));
    const fCoSo = useSelector(state => formValueSelector(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state, "coSo"));
    const createRequest = (object = {}) => dispatch(actDotKiemTra.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actDotKiemTra.updateRequest(object));
    const [searchText, setSearchText] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);
    const [addressInit, setAddressInit] = useState({ idTinh: constants.CONST_DEFAULT_TINHTHANH.ma });
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, fieldName, value));
    const handleSubmit = (values) => {
        let data = { ...values };
        if (values.ngayKiemTra) {
            if (values.ngayKiemTra.from) {
                data.ngayKiemTraTu = values.ngayKiemTra.from
            }
            if (values.ngayKiemTra.to) {
                data.ngayKiemTraDen = values.ngayKiemTra.to
            }
        }
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data,
                requestSuccess: handleBack
            });
        }
        else {
            createRequest({
                data,
                requestSuccess: handleBack
            });
        }
    };

    const capNhatThongTinCoSo = ({ idCoSo = null, tenCoSo = "", diaDiemKinhDoanh = "", tinhThanh = null, quanHuyen = null, xaPhuong = null }) => {
        changeValue("idCoSo", idCoSo);
        changeValue("coSo", tenCoSo);
        changeValue("diaDiem", diaDiemKinhDoanh);
        changeValue("tinhThanh", tinhThanh);
        changeValue("quanHuyen", quanHuyen);
        changeValue("xaPhuong", xaPhuong);
        setAddressInit({ tinhThanh, quanHuyen, xaPhuong });
    };



    const onSearchCoSo = () => {
        setSearchText(fCoSo);
        setVisibleModal(true);
    }

    const coSoSelected = fIdCoSo && fCoSo ? [{
        id: fIdCoSo,
        idCoSo: fIdCoSo,
        tenCoSo: fCoSo,
    }] : [];

    return (
        <React.Fragment>
            <CoSoSanXuatKinhDoanhPopupSearch
                form={formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA}
                onCancel={() => setVisibleModal(false)}
                onSelectCoSo={(item) => capNhatThongTinCoSo(item)}
                visible={visibleModal}
                searchText={searchText}
                coSoSelected={coSoSelected}
                loaiCoSos={[
                    constants.CONST_LOAI_CO_SO.COSO_BANATTP,
                    constants.CONST_LOAI_CO_SO.COSO_QUANHUYEN,
                    constants.CONST_LOAI_CO_SO.COSO_NGOAI,
                ]}
            />
            <CommonForm
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Mã đợt kiểm tra",
                            placeholder: "Mã đợt kiểm tra",
                            name: "maDotKiemTra",
                            readOnly: dot_kiem_tra.hasOwnProperty("id"),
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DOT_KIEM_TRA_MA_REQUIRED],
                        },
                        {
                            col: 6,
                            label: "Tên đợt kiểm tra",
                            placeholder: "Tên đợt kiểm tra",
                            name: "tenDotKiemTra",
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_DOT_KIEM_TRA_TEN_REQUIRED],
                        },
                    ],
                    [//row 2 
                        {
                            col: 6,
                            label: "Thành phần thực hiện",
                            placeholder: "Thành phần thực hiện",
                            name: "thanhPhanThucHien",
                        },
                        {
                            col: 6,
                            fieldType: "dateRange",
                            label: "Ngày kiểm tra",
                            name: "ngayKiemTra"
                        },
                    ],
                    [//row 3
                        {
                            col: 3,
                            label: "Số quyết định",
                            placeholder: "Số quyết định",
                            name: "soQuyetDinh",
                        },
                        {
                            col: 3,
                            fieldType: "date",
                            label: "Ngày kí quyết định",
                            placeholder: "Ngày kiểm tra",
                            name: "ngayKyQuyetDinh",
                        },
                        {
                            col: 3,
                            fieldType: "date",
                            label: "Ngày phê duyệt",
                            placeholder: "Ngày phê duyệt",
                            name: "ngayPheDuyet",
                        },
                        {
                            col: 3,
                            label: "Kết luận",
                            placeholder: "Kết luận",
                            name: "ketLuan",
                        },
                    ],
                    [//row 7
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "ghiChu",
                        },
                    ],
                    [//row 8
                        {
                            type: "custom",
                            renderCustom: <React.Fragment key="row-8">
                                <div className="col-md-12">
                                    <Divider orientation="left">Cơ sở giám sát</Divider>
                                    <CoSoGiamSat coSoKiemTras={coSoKiemTras} />
                                </div>
                            </React.Fragment>
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: dot_kiem_tra.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA}
                initialValues={{
                    ...dot_kiem_tra
                }}
            />
        </React.Fragment >
    );
}

export default DotKiemTraForm;