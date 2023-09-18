import React, { Fragment } from 'react';
import { CommonForm, CommonAddress } from "./../../common";
import { change } from "redux-form";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";
import * as formName from "./../../../constants/form_name";
import { Divider } from 'antd';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
const HoSoTuCongBoSearch = ({
    loaiCongBo
}) => {

    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);
    const dispatch = useDispatch();
    const onReset = () => {
        const clearData = fields => fields.map(field => dispatch(change(formName.FORM_NAME_HO_SO_TU_CONG_BO_SEARCH, field, null)))
        clearData([
            "so_gbn",
            "ten_co_so",
            "ten_san_pham",
            "tcb_from",
            "tcb_to",
            "ntn_from",
            "ntn_to",
            "so_thong_bao",
            "ngay_thong_bao",
            "ma_quan_huyen",
            "ma_xa_phuong",
            "dia_chi",
        ])
    }
    const onSubmit = (values) => {
        history.push({
            search: main.queryString.stringify({
                ...qs,
                ...{
                    so_gbn: values.so_gbn && values.so_gbn.trim() !== "" ? encodeURIComponent(values.so_gbn) : undefined,
                    ten_co_so: values.ten_co_so && values.ten_co_so.trim() !== "" ? encodeURIComponent(values.ten_co_so) : undefined,
                    ten_san_pham: values.ten_san_pham && values.ten_san_pham.trim() !== "" ? encodeURIComponent(values.ten_san_pham) : undefined,
                    tcb_from: values.tcb_from || undefined,
                    tcb_to: values.tcb_to || undefined,
                    ntn_from: values.ntn_from || undefined,
                    ntn_to: values.ntn_to || undefined,
                    so_thong_bao: values.so_thong_bao && values.so_thong_bao.trim() !== "" ? encodeURIComponent(values.so_thong_bao) : undefined,
                    ngay_thong_bao: values.ngay_thong_bao || undefined,
                    ma_quan_huyen: values.ma_quan_huyen || undefined,
                    ma_xa_phuong: values.ma_xa_phuong || undefined,
                    dia_chi: values.dia_chi && values.dia_chi.trim() !== "" ? encodeURIComponent(values.dia_chi) : undefined
                }
            })
        })
    }

    return <Fragment>
        <CommonForm
            data={[
                [//row
                    {
                        col: 12,
                        label: "Số giấy biên nhận",
                        placeholder: "Số giấy biên nhận",
                        name: "so_gbn",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Tên cơ sở",
                        placeholder: "Tên cơ sở",
                        name: "ten_co_so",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Tên sản phẩm",
                        placeholder: "Tên sản phẩm",
                        name: "ten_san_pham",
                    },
                ],
                [
                    {
                        type: "custom",
                        renderCustom: <div className="col-md-12" key="tdtcb">
                            <Divider style={{ margin: 0 }} orientation="left">Thời điểm tự công bố</Divider>
                        </div>,
                        hidden: loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO
                    }
                ],
                [//row
                    {
                        col: 6,
                        label: "Từ ngày",
                        placeholder: "Từ ngày",
                        name: "tcb_from",
                        fieldType: "date",
                        hidden: loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO
                    },
                    {
                        col: 6,
                        label: "Đến ngày",
                        placeholder: "Đến ngày",
                        name: "tcb_to",
                        fieldType: "date",
                        hidden: loaiCongBo === constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO
                    },
                ],
                [
                    {
                        type: "custom",
                        renderCustom: <div className="col-md-12" key="ntn">
                            <Divider style={{ margin: 0 }} orientation="left">Ngày tiếp nhận</Divider>
                        </div>
                    }
                ],
                [//row
                    {
                        col: 6,
                        label: "Từ ngày",
                        placeholder: "Từ ngày",
                        name: "ntn_from",
                        fieldType: "date",
                    },
                    {
                        col: 6,
                        label: "Đến ngày",
                        placeholder: "Đến ngày",
                        name: "ntn_to",
                        fieldType: "date",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Số thông báo",
                        placeholder: "Số thông báo",
                        name: "so_thong_bao",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Ngày thông báo",
                        placeholder: "Ngày thông báo",
                        name: "ngay_thong_bao",
                        fieldType: "date",
                    },
                ],
                [
                    {
                        type: "custom",
                        renderCustom: <React.Fragment key="dc">
                            <CommonAddress
                                mode="block"
                                form={formName.FORM_NAME_HO_SO_TU_CONG_BO_SEARCH}
                                tinhThanh={{ name: "tinhThanh", hidden: true }}
                                quanHuyen={{ name: "ma_quan_huyen", validate: false }}
                                xaPhuong={{ name: "ma_xa_phuong", validate: false }}
                                diaChi={{ name: "dia_chi", validate: false }}
                            />
                        </React.Fragment>
                    }
                ]
            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    label: "Tìm kiếm",
                    icon: "fa fa-search",
                },
                {
                    htmlType: constants.FORM_HTML_TYPE_RESET,
                    hidden: true,
                },
                {
                    htmlType: constants.FORM_HTML_TYPE_BUTTON,
                    label: "Huỷ",
                    icon: "fa fa-times",
                    handleClick: onReset
                }
            ]}
            onSubmit={onSubmit}
            form={formName.FORM_NAME_HO_SO_TU_CONG_BO_SEARCH}
            initialValues={{
                so_gbn: qs.so_gbn && decodeURIComponent(qs.so_gbn),
                ten_co_so: qs.ten_co_so && decodeURIComponent(qs.ten_co_so),
                ten_san_pham: qs.ten_san_pham && decodeURIComponent(qs.ten_san_pham),
                tcb_from: qs.tcb_from,
                tcb_to: qs.tcb_to,
                ntn_from: qs.ntn_from,
                ntn_to: qs.ntn_to,
                so_thong_bao: qs.so_thong_bao && decodeURIComponent(qs.so_thong_bao),
                ngay_thong_bao: qs.ngay_thong_bao,
                ma_quan_huyen: qs.ma_quan_huyen,
                ma_xa_phuong: qs.ma_xa_phuong,
                dia_chi: qs.dia_chi && decodeURIComponent(qs.dia_chi),
                tinhThanh: constants.CONST_DEFAULT_TINHTHANH.ma,
            }}
        />
    </Fragment>
}

export default HoSoTuCongBoSearch;