import React from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { formValueSelector, change } from 'redux-form';

const FormPhongBanPhoiHopNghiepVuThanhTra = ({ form, VALIDATE_EXIST_CODE, initialValues }) => {

    const phongBans = useSelector(state => state.core.account.phong_bans);
    const phongBanSelecteds = useSelector(state => formValueSelector(form)(state, "phongBans"))
    const dispatch = useDispatch();
    return <CommonFormContent
        data={[
            [//row 1
                {
                    type: "custom",
                    renderCustom: <CommonFieldset title="THÔNG TIN CHUNG" key="thong-tin-chung">
                        <CommonFormContent
                            data={[
                                [
                                    {
                                        col: 5,
                                        label: "Mã cấu hình",
                                        placeholder: "Mã cấu hình",
                                        name: "ma",
                                        checkValid: true,
                                        disabled: initialValues.hasOwnProperty("id") ? true : false,
                                        validates: [VALIDATE_EXIST_CODE, validate.VALIDATE_CAU_HINH_MA_REQUIRED]
                                    },
                                    {
                                        col: 5,
                                        label: "Tên cấu hình",
                                        placeholder: "Tên cấu hình",
                                        name: "ten",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_CAU_HINH_TEN_REQUIRED]
                                    },
                                    {
                                        col: 2,
                                        label: "Sắp xếp",
                                        placeholder: "Sắp xếp",
                                        name: "sapXep",
                                        fieldType: "number",
                                        checkValid: true,
                                        validates: [validate.VALIDATE_IS_NUMBER]
                                    },
                                ]
                            ]}
                        />
                    </CommonFieldset>
                },
                {
                    type: "custom",
                    renderCustom: <CommonFieldset title="CHI TIẾT" key="chi-tiet">
                        <CommonFormContent
                            data={[
                                [
                                    {
                                        type: "custom",
                                        renderCustom: <Table
                                            rowKey="ma"
                                            pagination={false}
                                            rowSelection={{
                                                selectedRowKeys: (phongBanSelecteds || []).map(item => item.ma),
                                                onChange: (_, selectedRows) => {
                                                    dispatch(change(form, "phongBans", selectedRows));
                                                }
                                            }}
                                            columns={[
                                                {
                                                    title: "STT",
                                                    align: "center",
                                                    width: 50,
                                                    render: (_, r, index) => index + 1
                                                },
                                                {
                                                    title: "Mã phòng ban",
                                                    dataIndex: "ma"
                                                },
                                                {
                                                    title: "Tên phòng ban",
                                                    dataIndex: "ten"
                                                }
                                            ]}
                                            dataSource={phongBans}
                                            bordered
                                            size="small"
                                        />
                                    }
                                ],
                            ]}
                        />
                    </CommonFieldset>
                }
            ]
        ]}
    />
}

export default FormPhongBanPhoiHopNghiepVuThanhTra;