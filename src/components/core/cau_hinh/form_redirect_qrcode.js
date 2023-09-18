import React, { useState } from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Input, Table } from 'antd';
import { formValueSelector, change, arrayInsert, arrayPush } from 'redux-form';
import { createID } from '../../../constants/main';

const FormRedirectQrcode = ({ form, VALIDATE_EXIST_CODE, initialValues }) => {
    const dataSource = useSelector(state => formValueSelector(form)(state, "giaTri"))
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows);
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
                        <div style={{ marginBottom: 10 }}>
                            <Button
                                type='primary'
                                className='m-r-10'
                                onClick={() => dispatch(arrayPush(form, "giaTri", { ma: createID() }))}
                            >
                                <i className="fa fa-plus m-r-5" />Thêm
                            </Button>
                            <Button
                                type='danger'
                                disabled={selectedRows.length === 0}
                                onClick={() => {
                                    const s = Array.isArray(dataSource) ? dataSource : [];
                                    dispatch(change(form, `giaTri`, s.filter(item => selectedRows.findIndex(_s => _s.ma === item.ma) === -1)))
                                    setSelectedRows([]);
                                }}
                            >
                                <i className='fa fa-trash m-r-5' />Xoá {selectedRows.length > 0 ? `(${selectedRows.length})` : ""}
                            </Button>
                        </div>
                        <CommonFormContent
                            data={[
                                [
                                    {
                                        type: "custom",
                                        renderCustom: <Table
                                            rowKey="ma"
                                            pagination={false}
                                            rowSelection={{
                                                selectedRowKeys: (selectedRows || []).map(item => item.ma),
                                                onChange: (_, selectedRows) => {
                                                    const s = Array.isArray(dataSource) ? dataSource : [];
                                                    setSelectedRows(selectedRows.filter(item => s.findIndex(_s => _s.ma === item.ma) >= 0))
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
                                                    title: "AUTH",
                                                    align: "center",
                                                    render: (_, record, index) => {
                                                        return <Checkbox
                                                            checked={record.auth}
                                                            onChange={(e) => dispatch(change(form, `giaTri[${index}].auth`, e.target.checked))}
                                                        />
                                                    }
                                                },
                                                {
                                                    title: "Loại đối tượng",
                                                    render: (_, record, index) => {
                                                        return <Input
                                                            value={record.loaiDoiTuong}
                                                            onChange={(e) => dispatch(change(form, `giaTri[${index}].loaiDoiTuong`, e.target.value))}
                                                            placeholder="Loại đối tượng"
                                                        />
                                                    }
                                                },
                                                {
                                                    title: "Pathname",
                                                    render: (_, record, index) => {
                                                        return <Input
                                                            value={record.pathname}
                                                            onChange={(e) => dispatch(change(form, `giaTri[${index}].pathname`, e.target.value))}
                                                            placeholder="Pathname"
                                                        />
                                                    }
                                                },
                                                {
                                                    title: "Search query string",
                                                    render: (_, record, index) => {
                                                        return <Input
                                                            value={record.search}
                                                            onChange={(e) => dispatch(change(form, `giaTri[${index}].search`, e.target.value))}
                                                            placeholder="Search (doiTuong=a&type=1)"
                                                        />
                                                    }
                                                }
                                            ]}
                                            dataSource={Array.isArray(dataSource) ? dataSource : []}
                                            bordered
                                            size="small"
                                        />
                                    }
                                ],
                            ]}
                        />
                        <Button
                            type='primary'
                            onClick={() => dispatch(arrayPush(form, "giaTri", { ma: createID() }))}
                            style={{ marginTop: 10 }}
                        >
                            <i className="fa fa-plus m-r-5" />Thêm
                        </Button>
                    </CommonFieldset>
                }
            ]
        ]}
    />
}

export default FormRedirectQrcode;