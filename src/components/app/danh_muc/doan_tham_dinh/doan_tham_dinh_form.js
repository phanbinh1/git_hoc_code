import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm } from "./../../../common";
import * as validate from "./../../../../constants/validate"
import * as actDoanThamDinh from "./../../../../actions/app/danh_muc/doan-tham-dinh";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import ListThanhVien from "./list_thanh_vien";
import { Modal, Input } from "antd";

const DoanThamDinhForm = ({ handleBack }) => {
    const doan_tham_dinh = useSelector(state => state.app.danh_muc.doan_tham_dinh.item);
    const dispatch = useDispatch();

    const createRequest = (object = {}) => dispatch(actDoanThamDinh.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actDoanThamDinh.updateRequest(object));

    const [ghiChu, setGhiChu] = useState(null);
    const [popup, setPopup] = useState({
        visible: false,
        data: null,
        onShow: (data) => setPopup(p => ({ ...p, visible: true, data })),
        onCancel: () => setPopup(p => ({ ...p, visible: false, data: null })),
    })

    const handleSubmit = (values) => {
        const danhSachThanhVien = values.danhSachThanhVien || [];
        const thanhViens = doan_tham_dinh ? doan_tham_dinh.danhSachThanhVien : [];
        const data = {
            id: values.id,
            soThuTu: values.soThuTu,
            danhSachThanhVien
        }

        if (data.id) {
            const thanhVienThayDoi = [
                ...thanhViens.filter(tv => danhSachThanhVien.findIndex(t => t.id === tv.id) === -1),
                ...danhSachThanhVien.filter(tv => thanhViens.findIndex(t => t.id === tv.id) === -1)
            ]
            const chucDanhThayDoi = thanhViens.filter(tv => {
                const newThanhVien = danhSachThanhVien.find(ntv => ntv.id === tv.id);
                return !newThanhVien || newThanhVien.chucDanh !== tv.chucDanh;
            })
            if (thanhVienThayDoi.length > 0 || chucDanhThayDoi.length > 0) {
                popup.onShow(data);
            }
            else {
                updateRequest({
                    data,
                    requestSuccess: handleBack
                });
            }
        }
        else {
            createRequest({
                data,
                requestSuccess: handleBack
            });
        }
    };

    return (
        <React.Fragment>
            <Modal
                visible={popup.visible}
                title="Lý do thay đổi thành viên"
                onCancel={popup.onCancel}
                onOk={() => {
                    updateRequest({
                        data: { ...(popup.data || {}), ghiChu },
                        requestSuccess: () => {
                            popup.onCancel();
                            handleBack()
                        }
                    });
                }}
                okButtonProps={{
                    disabled: !ghiChu || ghiChu.trim() === ""
                }}
            >
                <Input.TextArea
                    placeholder="Lý do thay đổi thành viên"
                    value={ghiChu}
                    onChange={e => setGhiChu(e.target.value)}
                />
            </Modal>
            <CommonForm
                data={[
                    [//row 1 
                        {
                            col: 12,
                            label: "Số thứ tự đoàn",
                            placeholder: "Số thứ tự đoàn",
                            name: "soThuTu",
                            fieldType: "number",
                            checkValid: true,
                            validates: [validate.VALIDATE_DOAN_THAM_DINH_STT]
                        }
                    ],
                    [
                        {
                            type: "custom",
                            renderCustom: <Fragment key='listtv'>
                                <ListThanhVien form={formName.FORM_NAME_DOAN_THAM_DINH} doanThamDinh={doan_tham_dinh} />
                            </Fragment>
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: doan_tham_dinh.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_DOAN_THAM_DINH}
                initialValues={doan_tham_dinh}
            />
        </React.Fragment >
    );
}

export default DoanThamDinhForm;