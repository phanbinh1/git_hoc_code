import React, { Fragment } from 'react';
import { CommonForm } from "./../../../common";
import { change } from "redux-form";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
const SanPhamOcopSearch = () => {
    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);
    const dispatch = useDispatch();
    const onReset = () => {
        const clearData = fields => fields.map(field => dispatch(change(formName.FORM_NAME_HO_SO_TU_CONG_BO_SEARCH, field, null)))
        clearData([
            "tenSanPham",
            "tenCoSo",
            "diaDiemKinhDoanh",
            "daiDienCoSo",
            "soDienThoai"
        ])
    }
    const onSubmit = (values) => {
        history.push({
            search: main.queryString.stringify({
                ...qs,
                ...{
                    ...values
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
                        label: "Tên sản phẩm",
                        placeholder: "Tên sản phẩm",
                        name: "tenSanPham",
                    },
                ],

                [//row
                    {
                        col: 12,
                        label: "Tên cơ sở",
                        placeholder: "Tên cơ sở",
                        name: "tenCoSo",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Địa điểm kinh doanh",
                        placeholder: "Địa điểm kinh doanh",
                        name: "diaDiemKinhDoanh",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Đại diện cơ sở",
                        placeholder: "Đại diện cơ sở",
                        name: "daiDienCoSo",
                    },
                ],
                [//row
                    {
                        col: 12,
                        label: "Số điện thoại",
                        placeholder: "Số điện thoại",
                        name: "soDienThoai",
                    },
                ],

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
                tenSanPham: qs.tenSanPham,
                tenCoSo: qs.tenCoSo,
                diaDiemKinhDoanh: qs.diaDiemKinhDoanh,
                daiDienCoSo: qs.daiDienCoSo,
                soDienThoai: qs.soDienThoai
            }}
        />
    </Fragment>
}

export default SanPhamOcopSearch;