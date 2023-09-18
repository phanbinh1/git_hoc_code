import React from 'react';
import { useSelector } from 'react-redux';
import { CommonTable } from "./../../../common";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";

const ThongKeBaoCaoList = ({
    pageKey,
    onSelectRow
}) => {

    const thong_ke_bao_cao_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.thong_ke_bao_cao.list);

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: "Thực phẩm",
                dataIndex: 'loaiThucPham.tenLoaiThucPham',
                width: 150
            },
            {
                title: "Chỉ tiêu",
                dataIndex: 'chiTieu.tenChiTieu',
                width: 150
            },
            {
                title: "Số mẫu đã lấy",
                dataIndex: 'soMauDaLay',
                width: 150
            },
            {
                title: "Số mẫu chưa lấy",
                dataIndex: 'soMauChuaLay',
                width: 150
            },
            {
                title: "Tổng số mẫu",
                dataIndex: 'tongSo',
                width: 150
            },
            {
                title: "Số mẫu đạt chuẩn",
                dataIndex: 'soMauDatChuan',
                width: 150
            },
            {
                title: "Số mẫu chưa đạt chuẩn",
                dataIndex: 'soMauChuaDatChuan',
                width: 180
            },
        ];
    }
    const data = () => {
        let result = [];
        thong_ke_bao_cao_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
            })
        });
        return result;
    }

    return (
        <React.Fragment>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={false}
                bordered={true}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_QLCT_GS_ONTP_THONG_KE_BAO_CAO)}
            />
        </React.Fragment >
    );
}

export default ThongKeBaoCaoList;