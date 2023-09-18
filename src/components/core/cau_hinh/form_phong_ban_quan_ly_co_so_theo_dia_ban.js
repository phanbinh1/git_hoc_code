import React, { useEffect, useState } from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { formValueSelector, change, arrayPush } from 'redux-form';
import { get } from '../../../util/api_call';
import { API_LOCALITY_GET_CHILDREN } from '../../../constants/api';
import { CONST_DEFAULT_TINHTHANH } from '../../../constants/constants';

const FormPhongBanQuanLyCoSoTheoDiaBan = ({ form, VALIDATE_EXIST_CODE, initialValues }) => {

    const phongBans = useSelector(state => state.core.account.phong_bans);
    const phongBanStores = useSelector(state => formValueSelector(form)(state, "phongBans"))
    const [quanHuyens, setQuanHuyens] = useState([]);

    useEffect(() => {
        const quanHuyens = async () => {
            const res = await get({
                url: API_LOCALITY_GET_CHILDREN(CONST_DEFAULT_TINHTHANH.ma)
            })
            if (res && res.status && Array.isArray(res.result)) {
                setQuanHuyens(res.result);
            }
        }
        quanHuyens();
    }, [])

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
                                            expanded
                                            expandedRowRender={(pb, i) => <QuanHuyenQuanLy
                                                key={i}
                                                phongBan={pb}
                                                quanHuyens={quanHuyens}
                                                form={form}
                                                phongBanStores={phongBanStores || []}
                                            />}
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

const QuanHuyenQuanLy = ({ phongBan, phongBanStores = [], quanHuyens = [], form }) => {
    const getSelectedRowKeys = () => {
        const pb = phongBanStores.find(_pb => _pb.ma === phongBan.ma);
        if (pb && Array.isArray(pb.quanHuyenQuanLys)) {
            return pb.quanHuyenQuanLys;
        }
        return [];
    }
    const dispatch = useDispatch();
    return <Table
        style={{ margin: 20 }}
        rowSelection={{
            selectedRowKeys: getSelectedRowKeys().map(item => item.ma),
            onChange: (_, selectedRows) => {
                const index = phongBanStores.findIndex(_pb => _pb.ma === phongBan.ma);
                if (index < 0) {
                    dispatch(arrayPush(form, "phongBans", { ...phongBan, quanHuyenQuanLys: selectedRows }));
                }
                else {
                    dispatch(change(form, `phongBans[${index}].quanHuyenQuanLys`, selectedRows));
                }
            }
        }}
        rowKey="ma"
        bordered
        size="small"
        pagination={false}
        columns={
            [
                {
                    title: "STT",
                    align: "center",
                    width: 50,
                    render: (_, r, index) => index + 1
                },
                {
                    title: "Mã Quận/Huyện",
                    dataIndex: "ma",
                    width: 120,
                    align: "center"
                },
                {
                    title: "Tên Quận/Huyện",
                    dataIndex: "ten"
                }
            ]}
        dataSource={quanHuyens}
    />
}

export default FormPhongBanQuanLyCoSoTheoDiaBan;