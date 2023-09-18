import React, { Fragment } from 'react';
import { Table, ConfigProvider, Empty } from 'antd';
import { CommonFieldset, CommonPhongBan } from '../../../../../components/common';
import { Link } from 'react-router-dom';
import * as url from "./../../../../../constants/url";
import * as main from "./../../../../../constants/main";
import { useSelector } from 'react-redux';
import * as actID from "./../../../../../constants/action_id";

const DetailDotGiamSat = ({ item }) => {
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const getKeHoachPhongAllowAccess = () => {
        let result = [];
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_NGHIEP_VU) !== -1 && result.push("NGHIEPVU");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_THANH_TRA) !== -1 && result.push("THANHTRA");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI1) !== -1 && result.push("DOI1");
        permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_QLONATTP.ACT_ALLOW_DOI2) !== -1 && result.push("DOI2");
        return result;
    };
    return (
        <Fragment>
            <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-user-o m-r-10" />Đợt giám sát</Fragment>}>
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        bordered
                        size="small"
                        pagination={false}
                        rowKey="id"
                        columns={[
                            { width: 50, title: "STT", render: (_, r, index) => index + 1, align: "center" },
                            {
                                title: "Tên đợt giám sát",
                                render: (_, r) => {
                                    return <Link to={main.formatUrl({
                                        pathname: url.URL_QTNVTT_DOT_THANH_TRA_DETAIL,
                                        objSearch: { id: r.id }
                                    })}>
                                        <div>{r.tenCuocGiamSat}</div>
                                    </Link>
                                }
                            },
                            { title: "Phòng ban", render: (_, r) => <CommonPhongBan maPhongBan={r.keHoachPhong} /> },
                            { title: "Ngày bắt đầu", dataIndex: "ngayBatDau" },
                            { title: "Ngày kết thúc", dataIndex: "ngayKetThuc" },
                        ]}
                        dataSource={(item && Array.isArray(item.dotGiamSat) ? item.dotGiamSat : [])
                            .filter(ctt => getKeHoachPhongAllowAccess().findIndex(khp => khp === ctt.keHoachPhong) >= 0)}
                    />
                </ConfigProvider>
            </CommonFieldset>
        </Fragment >
    );
}

export default DetailDotGiamSat;