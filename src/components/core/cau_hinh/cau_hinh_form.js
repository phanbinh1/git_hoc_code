import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDefault from "./form_default";
import FormLogin from "./form_login";
import FormVanBanDieuHanh from "./form_van_ban_dieu_hanh";
import FormThuTucHanhChinhThamDinhCapGiayCNATTP from "./form_tthc_thamdinh_capgcnattp";
import { formValueSelector } from 'redux-form';
import * as formName from "./../../../constants/form_name";
import { CommonForm } from "./../../common";
import * as actCauHinh from "./../../../actions/core/cau_hinh";
import * as constants from "./../../../constants/constants";
import FormVersion from './form_version';
import { createNotifi, NOTIFI_CODE_UPDATE_VERSION } from '../account_current/notification';
import FormEmail from './form_email';
import FormForm from './form_form';
import { deduplicate } from '../../../constants/main';
import FormPhongBanPhoiHopNghiepVuThanhTra from './form_phong_ban_phoi_hop_nghiep_vu_thanh_tra';
import FormPhongBanQuanLyCoSoTheoDiaBan from './form_phong_ban_quan_ly_co_so_theo_dia_ban';
import FormGiaoDien from './form_giao_dien';
import FormRedirectQrcode from './form_redirect_qrcode';

const CauHinhForm = ({ handleBack, getAllRequest }) => {
    const cau_hinh = useSelector(state => state.core.cau_hinh.item);
    const cau_hinh_list = useSelector(state => state.core.cau_hinh.list);

    const maCauHinh = useSelector(state => formValueSelector(formName.FORM_NAME_CAU_HINH)(state, "ma"));
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        getAllRequest();
    }, []);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actCauHinh.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actCauHinh.updateRequest(object));

    const handleSubmit = (values) => {
        let data = {}, info = {}, giaTri = values.giaTri;
        let sendNotifiUpdateVersion = false;
        switch (maCauHinh) {
            case "giao_dien":
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri: JSON.stringify(values.result || {}, null, "\t")
                };
                break;
            case "qrcode_redirect":
                giaTri = JSON.stringify(giaTri, null, "\t");
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri
                };
                break;
            case "cau_hinh_phong_ban_phoi_hop_nghiep_vu_thanh_tra":
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri: JSON.stringify({ phongBans: values.phongBans || [] }, null, "\t")
                };
                break;
            case "cau_hinh_phong_ban_quan_ly_co_so_theo_dia_ban":
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri: JSON.stringify({ phongBans: values.phongBans || [] }, null, "\t")
                };
                break;
            case "ma_tthc_thamdinh_giaycnattp":
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri: JSON.stringify({ result: values.thuTucs || [], coQuanQuanLyId: values.coQuanQuanLyId }, null, "\t")
                };
                break;
            case "vanbandieuhanh_info":
                info = {};
                info.account = values.account;
                info.coQuanQuanLy = values.coQuanQuanLy;
                info.api = values.api;
                giaTri = JSON.stringify(info, null, "\t");
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri
                };
                break;
            case "version_info":
                info = {};
                info.description = values.description;
                giaTri = JSON.stringify(info, null, "\t");
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri
                };
                try {
                    const oldGiaTri = JSON.parse(cau_hinh.giaTri);
                    const newGiaTri = info;
                    if (oldGiaTri && oldGiaTri.description && newGiaTri && newGiaTri.description && newGiaTri.description.version !== oldGiaTri.description.version) {
                        sendNotifiUpdateVersion = true;
                    }
                }
                catch (e) { sendNotifiUpdateVersion = true; }

                break;
            case "cauhinh_guimail":
                info = {};
                info.email = values.email;
                info.password = values.password;
                giaTri = JSON.stringify(info, null, "\t");
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri
                };
                break;
            case "form":
                info = [];
                info.forms = values.forms;
                giaTri = JSON.stringify(info, null, "\t");
                data = {
                    id: values.id,
                    ten: values.ten,
                    ma: values.ma,
                    sapXep: values.sapXep,
                    giaTri
                };
                break;
            default:
                data = values;
                break;
        }
        const guiThongBao = () => {
            if (sendNotifiUpdateVersion) {
                const { NGHIEPVU, VANPHONG, ADMIN, LANHDAO, DOI1, DOI2, THANHTRA } = constants.CONST_PHONG_BAN;
                createNotifi({
                    maThongBao: NOTIFI_CODE_UPDATE_VERSION,
                    phongBans: [NGHIEPVU, VANPHONG, ADMIN, LANHDAO, DOI1, DOI2, THANHTRA]
                })
            }
        }
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data,
                requestSuccess: () => {
                    guiThongBao();
                    handleBack()
                },
            });
        }
        else {
            createRequest({
                data,
                requestSuccess: () => {
                    guiThongBao();
                    handleBack()
                },
            });
        }
    }

    const VALIDATE_EXIST_CODE = (value) => {
        var result = undefined;
        if (cau_hinh.hasOwnProperty("id")) {
            cau_hinh_list.map((item) => {
                if (value === item.ma && cau_hinh.id !== item.id) {
                    result = "Mã đã tồn tại!";
                }
                return null;
            })
        }
        else {
            cau_hinh_list.map((item) => {
                if (value === item.ma) {
                    result = "Mã đã tồn tại!";
                }
                return null;
            })
        }
        return result;
    };

    useEffect(() => {
        let initialValues = { ...(cau_hinh || {}) };
        let data = {};
        let thuTucs = [];
        let phongBans = [];
        let coQuanQuanLyId = null;
        let forms = Object.keys(formName).map(item => ({ code: item }));
        try {
            data = JSON.parse(initialValues.giaTri || "");
            if (cau_hinh.ma === "cau_hinh_phong_ban_phoi_hop_nghiep_vu_thanh_tra") {
                const res = JSON.parse(initialValues.giaTri || "");
                phongBans = res && Array.isArray(res.phongBans) ? res.phongBans : [];
                initialValues = { ...initialValues, ...data, phongBans };
            }
            if (cau_hinh.ma === "cau_hinh_phong_ban_quan_ly_co_so_theo_dia_ban") {
                const res = JSON.parse(initialValues.giaTri || "");
                phongBans = res && Array.isArray(res.phongBans) ? res.phongBans : [];
                initialValues = { ...initialValues, ...data, phongBans };
            }
            if (cau_hinh.ma === "ma_tthc_thamdinh_giaycnattp") {
                const res = JSON.parse(initialValues.giaTri || "");
                thuTucs = res && Array.isArray(res.result) ? res.result : [];
                coQuanQuanLyId = res ? res.coQuanQuanLyId : null;
                initialValues = { ...initialValues, ...data, thuTucs, coQuanQuanLyId };
            }
            if (cau_hinh.ma === "form") {
                const res = JSON.parse(initialValues.giaTri || "[]");
                forms = deduplicate([...(res && Array.isArray(res.result) ? res.result : []), ...forms], "code");
                initialValues = { ...initialValues, ...data, forms };
            }
            if (cau_hinh.ma === "qrcode_redirect") {
                const res = JSON.parse(initialValues.giaTri || "[]");
                initialValues = { ...initialValues, ...data, giaTri: res };
            }
        }
        catch (e) { data = {}; }

        setInitialValues(initialValues)
    }, [cau_hinh]);


    const renderContent = () => {
        switch (maCauHinh) {
            case "login_setup":
                return <FormLogin form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "vanbandieuhanh_info":
                return <FormVanBanDieuHanh form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "ma_tthc_thamdinh_giaycnattp":
                return <FormThuTucHanhChinhThamDinhCapGiayCNATTP form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "version_info":
                return <FormVersion form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "cauhinh_guimail":
                return <FormEmail form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "form":
                return <FormForm form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "cau_hinh_phong_ban_phoi_hop_nghiep_vu_thanh_tra":
                return <FormPhongBanPhoiHopNghiepVuThanhTra form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "cau_hinh_phong_ban_quan_ly_co_so_theo_dia_ban":
                return <FormPhongBanQuanLyCoSoTheoDiaBan form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "giao_dien":
                return <FormGiaoDien form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            case "qrcode_redirect":
                return <FormRedirectQrcode form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
            default:
                return <FormDefault form={formName.FORM_NAME_CAU_HINH} handleBack={handleBack} getAllRequest={getAllRequest} initialValues={initialValues} VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} />
        }
    }
    return <Fragment>
        <CommonForm
            data={[
                [{
                    type: "custom",
                    renderCustom: <div className="col-md-12">{renderContent()}</div>
                }]
            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    label: initialValues.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                    icon: "fa fa-save",
                    type: constants.CONST_TYPE_BTN_SUBMIT,
                }
            ]}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_CAU_HINH}
            initialValues={initialValues}
        />
    </Fragment>
}

export default CauHinhForm;