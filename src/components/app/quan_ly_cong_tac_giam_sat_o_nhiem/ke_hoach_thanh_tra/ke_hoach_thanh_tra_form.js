import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hasSubmitFailed, getFormSyncErrors } from "redux-form";
import { Tabs } from "antd";
import KinhPhi from "./tab/tab_kinh_phi";
import KeHoach from "./tab/tab_ke_hoach";
import CoSo from "./tab/tab_co_so";
import { CommonForm } from "./../../../common";
import * as actKeHoachThanhTra from "./../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/ke_hoach_kiem_tra/ke_hoach_kiem_tra";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import TabPhamVi from './tab/tab_pham_vi';

const KeHoachThanhTraForm = ({ handleBack, keHoachPhongs }) => {
    const ke_hoach_thanh_tra = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.ke_hoach_kiem_tra.item);
    const submitFail = useSelector(state => hasSubmitFailed(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA)(state));
    const formErrors = useSelector(state => getFormSyncErrors(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA)(state));

    const [tabActive, setTabActive] = useState("TAB_KE_HOACH");
    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actKeHoachThanhTra.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actKeHoachThanhTra.updateRequest(object));

    const handleSubmit = (values) => {
        let diaBanKeHoachGiamSats = values.diaBanKeHoachThanhKiemTras || [];
        let duToanKinhPhiGiamSats = values.duToanKinhPhis || [];
        let data = {
            diaBanKeHoachGiamSats,
            duToanKinhPhiGiamSats,
            ghiChu: values.ghiChu || "",
            keHoachPhong: values.keHoachPhong || "",
            mucDichYeuCau: values.mucDichYeuCau || "",
            nam: values.nam || "",
            noiDungGiamSat: values.noiDungGiamSat || "",
            tenKeHoach: values.tenKeHoach,
        }
        if (values.nam && !isNaN(parseInt(values.nam, 0))) {
            values.nam = parseInt(values.nam, 0);
        }
        if (values.hasOwnProperty("id")) {
            updateRequest({
                data: {
                    ...values,
                    ...data,
                },
                requestSuccess: handleBack
            });
        }
        else {
            createRequest({
                data: data,
                requestSuccess: handleBack
            });
        }
    };
    useEffect(() => {
        if (submitFail) {
            if (formErrors && (formErrors.tenKeHoach || formErrors.phamVi || formErrors.nam)) {
                setTabActive("TAB_KE_HOACH");
            }
            else if (formErrors && (formErrors.tenKeHoach || formErrors.phamVi || formErrors.nam)) {
                setTabActive("TAB_KINH_PHI")
            }
        }
    }, [submitFail]);
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [{
                        type: "custom",
                        renderCustom: <Tabs
                            key="tab"
                            activeKey={tabActive}
                            onChange={(key) => setTabActive(key)}
                        // type="card"
                        >
                            <Tabs.TabPane key="TAB_KE_HOACH" tab={<React.Fragment><i className="fa fa-file-text-o m-r-10" />Kế hoạch</React.Fragment>}>
                                <KeHoach
                                    keHoachPhongs={keHoachPhongs}
                                    keHoachPhongOptions={constants.CONST_PHONG_BAN.optionsKeHoach}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="TAB_PHAM_VI" tab={<React.Fragment><i className="fa fa-globe m-r-10" />Phạm vi</React.Fragment>}>
                                <TabPhamVi />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="TAB_KINH_PHI" tab={<React.Fragment><i className="fa fa-money m-r-10" />Dự toán kinh phí</React.Fragment>}>
                                <KinhPhi />
                            </Tabs.TabPane>
                            {/* <Tabs.TabPane tab={<React.Fragment><i className="fa fa-id-card-o m-r-10" />Cơ sở thanh - kiểm tra</React.Fragment>}>
                                <CoSo />
                            </Tabs.TabPane> */}
                        </Tabs>
                    }]
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: ke_hoach_thanh_tra.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    },
                ]}
                initialValues={{
                    trangThaiDuyet: constants.CONST_PHE_DUYET.DANGHOANTHIEN,
                    keHoachPhong: keHoachPhongs.length === 1 ? keHoachPhongs[0] : null,
                    ...ke_hoach_thanh_tra,
                    diaBanKeHoachThanhKiemTras: ke_hoach_thanh_tra.diaBanKeHoachGiamSats || []
                }}
            />
        </React.Fragment >
    );
}

export default KeHoachThanhTraForm;