import React, { Fragment } from 'react';
import { Table, ConfigProvider, Empty } from 'antd';
import CommonAccount from '../../../../../components/common/common_account';
import * as constants from "./../../../../../constants/constants";
import { CommonFieldset } from '../../../../../components/common';

const DetailThanhVien = ({ item }) => {
    const getThanhVienGiamSat = () => {
        if (item && item.thanhVienGiamSats && Array.isArray(item.thanhVienGiamSats)) {
            const truongDoans = item.thanhVienGiamSats.filter(item => item.chucDanh === constants.CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN);
            const phoTruongDoans = item.thanhVienGiamSats.filter(item => item.chucDanh === constants.CONST_CHUC_DANH_DOAN_THAM_DINH.PHOTRUONGDOAN);
            const thanhViens = item.thanhVienGiamSats.filter(item => item.chucDanh === constants.CONST_CHUC_DANH_DOAN_THAM_DINH.THANHVIEN || item.chucDanh === constants.CONST_CHUC_DANH_DOAN_THAM_DINH.THUKY);
            return [...truongDoans, ...phoTruongDoans, ...thanhViens];
        }
        else {
            return [];
        }
    }

    return (
        <Fragment>
            <CommonFieldset title={<Fragment><i className="fa fa-user-o m-r-10" />Thành viên đoàn thanh tra</Fragment>}>
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        size="small"
                        bordered
                        rowKey={record => record.key}
                        pagination={{
                            size: "default",
                            pageSizeOptions: constants.CONST_PAGE_SIZE_OPTIONS,
                            showSizeChanger: true,
                        }}
                        columns={[
                            { title: "STT", dataIndex: "stt", width: 50, align: "center" },
                            {
                                title: "Họ và tên",
                                render: (_, record) => {
                                    if (record.account) {
                                        return <CommonAccount username={record.account}>{record.hoTen}</CommonAccount>
                                    }
                                    else {
                                        return record.hoTen;
                                    }
                                }
                            },
                            {
                                title: "Phòng ban",
                                render: (_, record) => {
                                    const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === record.phongBan);
                                    return phongBan ? phongBan.label : record.phongBan;
                                }
                            },
                            {
                                title: "Chức vụ",
                                render: (_, record) => {
                                    const chucVu = constants.CONST_CHUC_VU.options.find(item => item.value === record.chucVu);
                                    return chucVu ? chucVu.label : record.chucVu;
                                }
                            },
                            {
                                title: "Chức danh",
                                render: (_, record) => {
                                    const chucDanh = constants.CONST_CHUC_DANH_DOAN_THAM_DINH.options.find(item => item.value === record.chucDanh);
                                    return chucDanh ? chucDanh.label : record.chucDanh;
                                }
                            },
                        ]}
                        dataSource={getThanhVienGiamSat().map((item, i) => ({ ...item, stt: i + 1 }))}
                        scroll={{ x: 700 }}
                    />
                </ConfigProvider>
            </CommonFieldset>
        </Fragment >
    );
}

export default DetailThanhVien;