import { Modal } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formValueSelector, submit } from "redux-form";
import { CommonForm, CommonFormContent } from "../../../common";
import * as validate from "./../../../../constants/validate"
import * as apiUrl from "./../../../../constants/api"
import { CONST_NGUON_THUC_PHAM, CONST_PHUONG_PHAP_KIEM_TRA, CONST_TRANG_THAI_CHI_TIEU } from "../../../../constants/constants";
export default ({
    visible,
    onCancel,
    onOk,
    initValue = {}
}) => {
    const dispatch = useDispatch();
    const onSubmit = (values, loaiThucPham) => {
        const tongSoMauViSinh = values.tongSoMauViSinh || 0;
        const soMauDatChuanViSinh = values.soMauDatChuanViSinh || 0;
        const soMauChuaDatChuanViSinh = tongSoMauViSinh - soMauDatChuanViSinh;

        const tongSoMauHoaHoc = values.tongSoMauHoaHoc || 0;
        const soMauDatChuanHoaHoc = values.soMauDatChuanHoaHoc || 0;
        const soMauChuaDatChuanHoaHoc = tongSoMauHoaHoc - soMauDatChuanHoaHoc;
        onOk && onOk({
            ...values,
            loaiThucPham,
            soMauChuaDatChuanViSinh: soMauChuaDatChuanViSinh > 0 ? soMauChuaDatChuanViSinh : 0,
            soMauChuaDatChuanHoaHoc: soMauChuaDatChuanHoaHoc > 0 ? soMauChuaDatChuanHoaHoc : 0
        });
    }

    return <Modal
        title="Chỉ tiêu giám sát"
        visible={visible}
        onCancel={onCancel}
        onOk={() => dispatch(submit("CHITIEUGIAMSAT"))}
        destroyOnClose
        width={800}
        style={{ top: 50 }}
        okText={<Fragment><i className="fa fa-save mr-2" />Lưu</Fragment>}
        cancelText={<Fragment><i className="fa fa-times mr-2" />Huỷ</Fragment>}
    >
        <div id="modal-chi-tieu-giam-sat">
            <Content onSubmit={onSubmit} initValue={initValue} />
        </div>
    </Modal>
}

const Content = ({ onSubmit, initValue }) => {
    const [loaiThucPhamDefault] = useState(initValue.loaiThucPham ? initValue.loaiThucPham : undefined);
    const [loaiThucPham, setLoaiThucPham] = useState(loaiThucPhamDefault);

    const soMauDaLay = useSelector(state => formValueSelector("CHITIEUGIAMSAT")(state, "soMauDaLay")) || 0;
    const soMauDatChuan = useSelector(state => formValueSelector("CHITIEUGIAMSAT")(state, "soMauDatChuan")) || 0;
    const soMauChuaDatChuan = useSelector(state => formValueSelector("CHITIEUGIAMSAT")(state, "soMauChuaDatChuan")) || 0;
    return <Fragment>
        <CommonForm
            data={[
                [
                    {
                        col: 6,
                        fieldType: "selectLoadMore",
                        searchKey: "searchString",
                        searchKeyExtend: "tenLoaiThucPham",
                        valueKey: "id",
                        labelKey: "tenLoaiThucPham",
                        label: "Nhóm thực phẩm",
                        placeholder: "Nhóm thực phẩm",
                        url: apiUrl.API_QL_DM_LOAI_THUC_PHAM,
                        selectDefaultValue: loaiThucPhamDefault,
                        name: "loaiThucPham.id",
                        checkValid: true,
                        validates: [validate.VALIDATE_QTGSONTP_NGUY_CO_THUC_PHAM_REQUIRED],
                        getPopupContainer: () => document.getElementById("modal-chi-tieu-giam-sat"),
                        changeCallback: (value, option) => setLoaiThucPham(option.props ? {
                            id: option.props.id,
                            tenLoaiThucPham: option.props.tenLoaiThucPham,
                        } : null)
                    },
                    {
                        col: 3,
                        fieldType: "number",
                        label: "Số mẫu đã lấy",
                        placeholder: "Số mẫu đã lấy",
                        name: "soMauDaLay",
                        min: 0
                    },
                    {
                        col: 3,
                        fieldType: "number",
                        label: "Số mẫu chưa lấy",
                        placeholder: "Số mẫu chưa lấy",
                        name: "soMauChuaLay",
                        min: 0
                    },
                ],
                [
                    {
                        col: 6,
                        type: "custom",
                        renderCustom: <Fragment>
                            <div className="col-md-6">
                                <div style={{ textAlign: "center" }}>Chỉ tiêu vi sinh</div>
                                <div className="row">
                                    <CommonFormContent
                                        data={[
                                            [
                                                {
                                                    col: 6,
                                                    fieldType: "number",
                                                    label: "Số mẫu đạt",
                                                    placeholder: "Số mẫu đạt",
                                                    name: "soMauDatChuanViSinh",
                                                    min: 0,
                                                },
                                                {
                                                    col: 6,
                                                    fieldType: "number",
                                                    label: "Tổng số mẫu",
                                                    placeholder: "Tổng số mẫu",
                                                    name: "tongSoMauViSinh",
                                                    min: 0,
                                                }
                                            ]
                                        ]}
                                    />
                                </div>
                            </div>
                        </Fragment>
                    },
                    {
                        col: 6,
                        type: "custom",
                        renderCustom: <Fragment>
                            <div className="col-md-6">
                                <div style={{ textAlign: "center" }}>Chỉ tiêu hoá học</div>
                                <div className="row">
                                    <CommonFormContent
                                        data={[
                                            [
                                                {
                                                    col: 6,
                                                    fieldType: "number",
                                                    label: "Số mẫu đạt",
                                                    placeholder: "Số mẫu đạt",
                                                    name: "soMauDatChuanHoaHoc",
                                                    min: 0,
                                                },
                                                {
                                                    col: 6,
                                                    fieldType: "number",
                                                    label: "Tổng số mẫu",
                                                    placeholder: "Tổng số mẫu",
                                                    name: "tongSoMauHoaHoc",
                                                    min: 0,
                                                }
                                            ]
                                        ]}
                                    />
                                </div>
                            </div>
                        </Fragment>
                    }
                ],
                [
                    {
                        col: 6,
                        fieldType: "select",
                        options: CONST_PHUONG_PHAP_KIEM_TRA.option,
                        label: "Phương pháp kiểm tra",
                        placeholder: "Phương pháp kiểm tra",
                        name: "phuongPhapKiemTra",
                        getPopupContainer: () => document.getElementById("modal-chi-tieu-giam-sat")
                    },
                    {
                        col: 6,
                        fieldType: "select",
                        mode: "multiple",
                        options: CONST_NGUON_THUC_PHAM.map(v => ({ value: v, label: v })),
                        label: "Nguồn thực phẩm",
                        placeholder: "Nguồn thực phẩm",
                        name: "nguonThucPham",
                        getPopupContainer: () => document.getElementById("modal-chi-tieu-giam-sat")
                    },
                ],
                [
                    {
                        col: 6,
                        fieldType: "select",
                        options: CONST_TRANG_THAI_CHI_TIEU.option,
                        label: "Trạng thái",
                        placeholder: "Trạng thái",
                        name: "trangThai",
                        getPopupContainer: () => document.getElementById("modal-chi-tieu-giam-sat")
                    },
                    {
                        col: 6,
                        label: "Kết luận",
                        placeholder: "Kết luận",
                        name: "ketLuan",
                    },
                ],
                [

                    {
                        col: 12,
                        label: "Ghi chú",
                        placeholder: "Ghi chú",
                        name: "ghiChu",
                        fieldType: "textarea"
                    },
                ],
            ]}
            actions={false}
            onSubmit={(values) => onSubmit(values, loaiThucPham)}
            form="CHITIEUGIAMSAT"
            initialValues={{
                ...initValue,
                tongSoMauViSinh: (initValue.soMauDatChuanViSinh || 0) + (initValue.soMauChuaDatChuanViSinh || 0),
                tongSoMauHoaHoc: (initValue.soMauDatChuanHoaHoc || 0) + (initValue.soMauChuaDatChuanHoaHoc || 0),
            }}
        />
    </Fragment>
}