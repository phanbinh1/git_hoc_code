import React, { } from "react";
import { useSelector, } from "react-redux";
import { Table } from "antd";

const SoLieuTongHop = () => {
    const so_lieu = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.thong_ke_bao_cao.so_lieu);

    const data = () => {
        let res = [];
        let sumSlcskd = 0, sumSgcn = 0;
        so_lieu.map((item, i) => {
            sumSlcskd += item.tongCoSo;
            sumSgcn += item.tongCapMoiGiayChungNhan;
            return res.push({
                key: `${i}`,
                stt: i + 1,
                ...item,
                children: Array.isArray(item.soLieuTongHop) && item.soLieuTongHop.length > 0 ? item.soLieuTongHop.map((_item, j) => {
                    return {
                        key: `${i}_${j}`,
                        ..._item,
                        stt: `${i + 1}.${j + 1}`
                    }
                }) : undefined
            });
        })
        res.push({
            key: "total",
            showTotal: true,
            tongCoSo: <b>{sumSlcskd}</b>,
            tongCapMoiGiayChungNhan: <b>{sumSgcn}</b>
        })
        return res;
    }
    return <React.Fragment>
        <Table
            pagination={false}
            bordered
            size="small"
            expandIconColumnIndex={1}
            columns={[
                {
                    title: "STT",
                    dataIndex: "stt",
                    align: "center",
                    render: (text, row, index) => {
                        if (row.showTotal) {
                            return {
                                props: {
                                    colSpan: 0,
                                },
                            };
                        }
                        return text;

                    },
                    width: 50
                },
                {
                    title: "Tên đơn vị",
                    dataIndex: "tenDiaBan",
                    render: (text, row, index) => {
                        if (row.showTotal) {
                            return {
                                children: <b>Tổng cộng</b>,
                                props: {
                                    colSpan: 2,
                                },
                            };
                        }
                        return text;

                    },
                },
                {
                    title: "Số lượng CSKD",
                    dataIndex: "tongCoSo",
                    align: "center"
                },
                {
                    title: "Số giấy CN được cấp",
                    dataIndex: "tongCapMoiGiayChungNhan",
                    align: "center"
                }
            ]}
            dataSource={data()}
        />
    </React.Fragment>
}

export default SoLieuTongHop;