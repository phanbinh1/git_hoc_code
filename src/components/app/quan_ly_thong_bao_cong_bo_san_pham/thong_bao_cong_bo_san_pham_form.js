import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from "antd";
import { change, getFormValues } from "redux-form";
import { CommonForm } from "./../../common";
import ListHoSo from "./list_ho_so";
import * as actThongBaoCongBoSanPham from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";
import * as validate from "./../../../constants/validate";
import moment from "moment";
import { dateTimeFormat } from "./../../../constants/controll";

const ThongBaoCongBoSanPhamForm = ({ handleBack, queryVariable }) => {
    const thong_bao_cong_bo_san_pham = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.thong_bao_cong_bo_san_pham.item);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_THONG_BAO_HO_SO_TU_CONG_BO)(state));
    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actThongBaoCongBoSanPham.updateRequest(object));
    const changeValue = (values) => dispatch(change(formName.FORM_NAME_THONG_BAO_HO_SO_TU_CONG_BO, "listHoSo", values));

    const handleSubmit = (values) => {

        let lichSuLuanChuyenThongBao = [];
        try {
            lichSuLuanChuyenThongBao = JSON.parse(values.lichSuLuanChuyen);
            if (!Array.isArray(lichSuLuanChuyenThongBao)) {
                lichSuLuanChuyenThongBao = [];
            }
        }
        catch (e) {
            lichSuLuanChuyenThongBao = [];
        }
        const lichSuLuanChuyenThongBaoGanNhat = lichSuLuanChuyenThongBao[0];
        if (lichSuLuanChuyenThongBaoGanNhat && lichSuLuanChuyenThongBaoGanNhat.maXuLy === constants.CONST_LUAN_CHUYEN.NEW) {
            lichSuLuanChuyenThongBao[0] = {
                maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                nguoiXyLy: account_current.fullName,
                username: account_current.name,
                lyDo: null,
                thongBaoCongBoSanPham: {
                    id: values.thongBaoCongBo.id || null,
                    tieuDe: values.thongBaoCongBo.tieuDe
                },
                hoSos: (values.listHoSo || []).map(item => ({
                    id: item.id,
                    tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                    diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                    loaiCongBo: item.loaiCongBo,
                    danhSachSanPhamCongBo: (item.danhSachSanPhamCongBo || [])
                })),
                thoiGian: moment().format(dateTimeFormat)
            }
        }
        else {
            lichSuLuanChuyenThongBao.unshift({
                maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                nguoiXyLy: account_current.fullName,
                username: account_current.name,
                lyDo: null,
                thongBaoCongBoSanPham: {
                    id: values.thongBaoCongBo.id || null,
                    tieuDe: values.thongBaoCongBo.tieuDe
                },
                hoSos: (values.listHoSo || []).map(item => ({
                    id: item.id,
                    loaiCongBo: item.loaiCongBo,
                    tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                    diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                    danhSachSanPhamCongBo: (item.danhSachSanPhamCongBo || [])
                })),
                thoiGian: moment().format(dateTimeFormat)
            })
        }

        const data = {
            thongBaoCongBo: { ...values.thongBaoCongBo, lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyenThongBao) },
            listHoSoCongBo: (values.listHoSo || []).map(item => {
                let lichSuLuanChuyen = [];
                try {
                    lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                    if (!Array.isArray(lichSuLuanChuyen)) {
                        lichSuLuanChuyen = [];
                    }
                }
                catch (e) {
                    lichSuLuanChuyen = [];
                }
                const luanChuyenGanNhat = lichSuLuanChuyen[0];
                if (luanChuyenGanNhat && luanChuyenGanNhat.maXuLy === constants.CONST_LUAN_CHUYEN.NEW) {
                    lichSuLuanChuyen[0] = {
                        maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                        nguoiXyLy: account_current.fullName,
                        username: account_current.name,
                        lyDo: null,
                        thongBaoCongBoSanPham: {
                            id: values.thongBaoCongBo.id || null,
                            tieuDe: values.thongBaoCongBo.tieuDe
                        },
                        thoiGian: moment().format(dateTimeFormat)
                    }
                }
                else {
                    lichSuLuanChuyen.unshift({
                        maXuLy: constants.CONST_LUAN_CHUYEN.NEW,
                        nguoiXyLy: account_current.fullName,
                        username: account_current.name,
                        lyDo: null,
                        thongBaoCongBoSanPham: {
                            id: values.thongBaoCongBo.id || null,
                            tieuDe: values.thongBaoCongBo.tieuDe
                        },
                        thoiGian: moment().format(dateTimeFormat)
                    })
                }
                return {
                    id: item.id,
                    lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
                }
            })
        };
        if (data.thongBaoCongBo && data.thongBaoCongBo.hasOwnProperty("id")) {
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

    const onChangeLoaiCongBo = (loaiCongBo) => {
        if (formValues && formValues.listHoSo) {
            const listHoSo = formValues.listHoSo;
            changeValue(listHoSo.filter(item => item.loaiCongBo === loaiCongBo));
        }
        else {
            changeValue([]);
        }
    }
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row
                        {
                            col: 5,
                            label: "Tiêu đề",
                            placeholder: "Tiêu đề",
                            name: "thongBaoCongBo.tieuDe",
                            checkValid: true,
                            validates: [validate.VALIDATE_TBHSTCB_LOAICONGBO],
                            fieldType: "textarea",
                            autoSize: true
                        },
                        {
                            col: 3,
                            label: "Loại công bố",
                            placeholder: "Loại công bố",
                            name: "thongBaoCongBo.loaiCongBo",
                            onChange: onChangeLoaiCongBo,
                            allowClear: false,
                            checkValid: true,
                            validates: [validate.VALIDATE_TBHSTCB_LOAICONGBO],
                            fieldType: "select",
                            options: constants.CONST_LOAI_CONG_BO_SAN_PHAM.options
                        },
                        {
                            col: 2,
                            label: "Từ ngày",
                            placeholder: "Từ ngày",
                            name: "thongBaoCongBo.tuNgay",
                            fieldType: "date",
                            maxDate: formValues && formValues.thongBaoCongBo && formValues.thongBaoCongBo.denNgay ? formValues.thongBaoCongBo.denNgay : null,
                            checkValid: true,
                            validates: [validate.VALIDATE_TU_NGAY_REQUIRED]

                        },
                        {
                            col: 2,
                            label: "Đến ngày",
                            placeholder: "Đến ngày",
                            name: "thongBaoCongBo.denNgay",
                            fieldType: "date",
                            minDate: formValues && formValues.thongBaoCongBo && formValues.thongBaoCongBo.tuNgay ? formValues.thongBaoCongBo.tuNgay : null,
                            checkValid: true,
                            validates: [validate.VALIDATE_DEN_NGAY_REQUIRED]
                        }
                    ],
                    [//row
                        {
                            col: 12,
                            fieldType: "textarea",
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "thongBaoCongBo.ghiChu",
                        },
                    ],
                    [
                        {
                            type: "custom",
                            renderCustom: <Fragment key="list-hs">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <Divider orientation="left">Danh sách hồ sơ:</Divider>
                                            <ListHoSo
                                                queryVariable={queryVariable}
                                                formName={formName.FORM_NAME_THONG_BAO_HO_SO_TU_CONG_BO}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: thong_bao_cong_bo_san_pham.thongBaoCongBo && thong_bao_cong_bo_san_pham.thongBaoCongBo.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                        icon: "fa fa-save",
                        type: constants.CONST_TYPE_BTN_SUBMIT,
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_THONG_BAO_HO_SO_TU_CONG_BO}
                initialValues={{
                    thongBaoCongBo: {
                        trangThaiPheDuyet: constants.CONST_PHE_DUYET.DANGHOANTHIEN,
                        loaiCongBo: constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO,
                        ...(thong_bao_cong_bo_san_pham && thong_bao_cong_bo_san_pham.thongBaoCongBo ? thong_bao_cong_bo_san_pham.thongBaoCongBo : {}),
                        ...(queryVariable.loaiCongBo && (queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO || queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO) ? { loaiCongBo: queryVariable.loaiCongBo } : {})
                    },
                    listHoSo: [
                        ...(
                            thong_bao_cong_bo_san_pham
                                && thong_bao_cong_bo_san_pham.listHoSo
                                && Array.isArray(thong_bao_cong_bo_san_pham.listHoSo) ?
                                (
                                    queryVariable.loaiCongBo && (queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO || queryVariable.loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO) ?
                                        thong_bao_cong_bo_san_pham.listHoSo.filter(item => item.loaiCongBo === queryVariable.loaiCongBo) :
                                        (
                                            thong_bao_cong_bo_san_pham && thong_bao_cong_bo_san_pham.thongBaoCongBo && thong_bao_cong_bo_san_pham.thongBaoCongBo.loaiCongBo ?
                                                thong_bao_cong_bo_san_pham.listHoSo.filter(item => item.loaiCongBo === thong_bao_cong_bo_san_pham.thongBaoCongBo.loaiCongBo) :
                                                []
                                        )
                                ) :
                                []
                        )
                    ]

                }}
            />
        </React.Fragment >
    );
}

export default ThongBaoCongBoSanPhamForm;