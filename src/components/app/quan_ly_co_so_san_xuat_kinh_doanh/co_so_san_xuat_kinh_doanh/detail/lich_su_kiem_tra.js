import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Descriptions } from "antd";
import * as actCoSoSanXuatKinhDoanh from "./../../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as constants from "./../../../../../constants/constants";
import { URL_QTNVTT_CUOC_THANH_TRA_DETAIL } from "./../../../../../constants/url";
import { Link } from "react-router-dom";
const LichSuKiemTra = ({ item }) => {
    const dispatch = useDispatch();
    const getLishSu = (object) => dispatch(actCoSoSanXuatKinhDoanh.getLichSuThanhTraRequest(object));
    const lich_su_thanh_tra = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.co_so_san_xuat_kinh_doanh.lich_su_thanh_tra);
    useEffect(() => {
        if (item && item.id) {
            getLishSu({
                data: { idCoSo: item.id }
            })
        }
    }, [])
    return <React.Fragment>
        <div className="col-md-12">
            <Table
                columns={[
                    {
                        title: "STT",
                        dataIndex: "stt",
                        render: (text, _, i) => i + 1,
                        align: "center",
                        width: 50
                    },
                    {
                        title: "Tên cuộc thanh tra",
                        render: (t, item) => <Link to={`${URL_QTNVTT_CUOC_THANH_TRA_DETAIL}?id=${item.cuocThanhKiemTra && item.cuocThanhKiemTra.id}`}>{item.cuocThanhKiemTra && item.cuocThanhKiemTra.tenCuocThanhTra}</Link>
                    }
                ]}
                dataSource={lich_su_thanh_tra.map((item, i) => ({ key: i, ...item }))}
                size="small"
                bordered
                pagination={false}
                expandedRowRender={(item) => <div>
                    <Descriptions title="Thông tin chi tiết">
                        <Descriptions.Item label="Số quyết định">{item.cuocThanhKiemTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra.soQuyetDinh}</Descriptions.Item>
                        <Descriptions.Item label="Người ký">{item.cuocThanhKiemTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra.nguoiKyQuyetDinh}</Descriptions.Item>
                        <Descriptions.Item label="Ngày ký">{item.cuocThanhKiemTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra && item.cuocThanhKiemTra.quyetDinhThanhLapDoanThanhTra.ngayKyQuyetDinh}</Descriptions.Item>

                        <Descriptions.Item label="Số biên bản">{item.bienBanThanhKiemTra && item.bienBanThanhKiemTra.soBienBan}</Descriptions.Item>
                        <Descriptions.Item label="Ngày kiểm tra">{item.bienBanThanhKiemTra && item.bienBanThanhKiemTra.ngayKiemTra}</Descriptions.Item>
                        <Descriptions.Item label="Kết luận">{item.bienBanThanhKiemTra && item.bienBanThanhKiemTra.ketLuan}</Descriptions.Item>
                    </Descriptions>
                </div>}
            />
        </div>
    </React.Fragment>
}

export default LichSuKiemTra;