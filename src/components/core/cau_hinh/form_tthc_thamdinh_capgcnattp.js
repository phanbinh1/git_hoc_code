import React, { Fragment, useState, useEffect } from 'react';
import { CommonFormContent, CommonFieldset } from "./../../common";
import * as validate from "./../../../constants/validate"
import { CONST_PAGINATION, CONST_PAGE_SIZE_OPTIONS } from "./../../../constants/constants"
import { Table, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { layCoQuanQuanLyMotCua, layThuTucHanhChinhMotCua } from '../../../actions/mot_cua';

const FormThuTucHanhChinhThamDinhCapGiayCNATTP = ({ initialValues, form, VALIDATE_EXIST_CODE }) => {
    const coQuanQuanLyId = useSelector(state => formValueSelector(form)(state, "coQuanQuanLyId"));
    const [thuTucHanhChinh, setThuTucHanhChinh] = useState([]);
    useEffect(() => {
        layThuTucHanhChinhMotCua({
            data: { coQuanQuanLyId },
            errorNotifi: false,
            requestSuccess: (res) => {
                setThuTucHanhChinh(res.result);
            }
        })
    }, [coQuanQuanLyId])

    return <CommonFormContent
        data={[
            [//row 1
                {
                    type: "custom",
                    renderCustom: <ThongTinChung key="f-0" VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} initialValues={initialValues} />
                },
                {
                    type: "custom",
                    renderCustom: <ThuTucHanhChinh form={form} key="f-1" VALIDATE_EXIST_CODE={VALIDATE_EXIST_CODE} thuTucHanhChinh={thuTucHanhChinh || []} />
                },
            ]
        ]}
    />
}

const ThuTucHanhChinh = ({ form, thuTucHanhChinh }) => {
    const dispatch = useDispatch();
    const thuTucs = useSelector(state => formValueSelector(form)(state, "thuTucs"))
    return <Fragment>
        <CommonFieldset title="Thủ tục hành chính">
            <CommonFormContent
                data={[
                    [
                        {
                            type: "custom",
                            renderCustom: <Table
                                rowKey="maThuTuc"
                                rowSelection={{
                                    selectedRowKeys: (thuTucs || []).map(item => item.maThuTuc),
                                    onChange: (selectedRowKeys) => {
                                        console.log(thuTucs);
                                        const _thuTucs = selectedRowKeys.map(maThuTuc => {
                                            const thuTuc = (thuTucs || []).find(item => item.maThuTuc === maThuTuc)
                                            const _thuTuc = (thuTucHanhChinh || []).find(item => item.maThuTuc === maThuTuc)
                                            const loaiHoSo = thuTuc ? thuTuc.loaiHoSo || "CAPMOI" : "CAPMOI";
                                            // const tenThuTuc = 
                                            return { maThuTuc, loaiHoSo, tenThuTuc: _thuTuc ? _thuTuc.ten : null }
                                        });
                                        dispatch(change(form, "thuTucs", _thuTucs));
                                    }
                                }}
                                columns={[
                                    {
                                        title: "STT",
                                        render: (_, r, index) => index + 1
                                    },
                                    {
                                        title: "Loại hồ sơ",
                                        width: 120,
                                        render: (_, record) => {
                                            const index = thuTucs.findIndex(item => item.maThuTuc === record.maThuTuc);
                                            const thuTuc = thuTucs[index];
                                            const loaiHoSo = thuTuc ? thuTuc.loaiHoSo || "CAPMOI" : "CAPMOI";
                                            return <Select
                                                value={loaiHoSo}
                                                onChange={(value) => {
                                                    let _thuTucs = [...thuTucs];
                                                    _thuTucs[index] = { ..._thuTucs[index], loaiHoSo: value }
                                                    dispatch(change(form, "thuTucs", _thuTucs));
                                                }}
                                                allowClear={false}
                                                disabled={index === -1}
                                            >
                                                <Select.Option value="CAPMOI">Cấp mới</Select.Option>
                                                <Select.Option value="CAPDOI">Cấp đổi</Select.Option>
                                                <Select.Option value="CAPLAI">Cấp lại</Select.Option>
                                            </Select>
                                        }
                                    },
                                    {
                                        title: "Mã thủ tục",
                                        dataIndex: "maThuTuc"
                                    },
                                    {
                                        title: "Tên thủ tục hành chính",
                                        dataIndex: "ten"
                                    }
                                ]}
                                dataSource={thuTucHanhChinh}
                                bordered
                                size="small"
                                pagination={{
                                    size: "default",
                                    pageSizeOptions: CONST_PAGE_SIZE_OPTIONS,
                                    pageSize: CONST_PAGINATION.pageSize,
                                    current: CONST_PAGINATION.currentPage
                                }}
                            />
                        }
                    ],
                ]}
            />
        </CommonFieldset>
    </Fragment >
}

const ThongTinChung = ({ VALIDATE_EXIST_CODE, initialValues }) => {
    const [coQuanQuanLys, setCoQuanQuanLys] = useState([]);

    useEffect(() => {
        layCoQuanQuanLyMotCua({
            requestSuccess: (res) => {
                setCoQuanQuanLys(res.result)
            }
        })
    }, []);

    return <Fragment>
        <CommonFieldset title="Thông tin chung">
            <CommonFormContent
                data={[
                    [
                        {
                            col: 2,
                            label: "Mã cấu hình",
                            placeholder: "Mã cấu hình",
                            name: "ma",
                            disabled: initialValues.hasOwnProperty("id") ? true : false,
                            checkValid: true,
                            validates: [VALIDATE_EXIST_CODE, validate.VALIDATE_CAU_HINH_MA_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Tên cấu hình",
                            placeholder: "Tên cấu hình",
                            name: "ten",
                            checkValid: true,
                            validates: [validate.VALIDATE_CAU_HINH_TEN_REQUIRED]
                        },
                        {
                            col: 4,
                            label: "Cơ quan quản lý",
                            placeholder: "Cơ quan quản lý",
                            name: "coQuanQuanLyId",
                            fieldType: "select",
                            options: coQuanQuanLys.map(item => ({ value: item.id, label: item.name, ...item })),
                            checkValid: true,
                            validates: [validate.VALIDATE_CAU_HINH_CO_QUAN_QUAN_LY_REQUIRED]
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
    </Fragment>
}
export default FormThuTucHanhChinhThamDinhCapGiayCNATTP;