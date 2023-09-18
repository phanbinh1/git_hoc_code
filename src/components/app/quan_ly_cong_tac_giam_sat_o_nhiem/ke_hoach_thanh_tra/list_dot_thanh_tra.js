import React, { useEffect, useState } from "react";
import { ConfigProvider, Empty, Table } from "antd";
import { Link } from "react-router-dom";
import { URL_QTNVTT_CUOC_THANH_TRA_DETAIL } from "../../../../constants/url";
import { getAllRequest } from "./../../../../actions/app/quan_ly_quy_trinh_nghiep_vu_thanh_tra/cuoc_thanh_tra/cuoc_thanh_tra";
import { useDispatch } from "react-redux";
import { CommonPhongBan } from "../../../common";
import { queryString } from "../../../../constants/main";
const ListDotThanhTra = ({
    idKeHoachThanhTra,
    keHoachPhongs = []
}) => {
    const dispatch = useDispatch();
    const [listCuocThanhTra, setListCuocThanhTra] = useState([]);
    useEffect(() => {
        if (idKeHoachThanhTra) {
            dispatch(getAllRequest({
                data: {
                    searchData: `idKeHoachThanhTra=${idKeHoachThanhTra}&child=YES&keHoachPhong=${keHoachPhongs}&phongBanPhoiHop=${keHoachPhongs}`
                },
                isPagination: false,
                requestSuccess: (res) => {
                    setListCuocThanhTra(res.result);
                }
            }));
        }
    }, [idKeHoachThanhTra]);

    return <div
        style={{ margin: 10 }}
    >
        <Table
            bordered
            size="small"
            pagination={false}
            rowKey="id"
            columns={[
                { width: 50, title: "STT", render: (_, r, index) => index + 1, align: "center" },
                {
                    title: "Tên cuộc giá sát",
                    render: (_, r) => {
                        return <Link to={{
                            pathname: URL_QTNVTT_CUOC_THANH_TRA_DETAIL,
                            search: queryString.stringify({ id: r.id })
                        }}>
                            <div>{r.tenCuocThanhTra}</div>
                        </Link>
                    }
                },
                { title: "Phòng ban", render: (t, r) => <CommonPhongBan maPhongBan={r.keHoachPhong} /> },
                { title: "Ngày bắt đầu", dataIndex: "ngayBatDau" },
                { title: "Ngày kết thúc", dataIndex: "ngayKetThuc" },
            ]}
            dataSource={listCuocThanhTra}
            expandedRowRender={(record) => <ListCuocThanhTraCon
                list={(record.dotThanhKiemTra || []).filter(ctt => (keHoachPhongs || []).findIndex(khp => khp === ctt.keHoachPhong) >= 0)}
            />}
            de
        />
    </div>
}

const ListCuocThanhTraCon = ({ list = [] }) => {
    return <div style={{ margin: 10 }}>
        <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
            <Table
                bordered
                size="small"
                pagination={false}
                rowKey="id"
                columns={[
                    { width: 50, title: "STT", render: (_, r, index) => index + 1, align: "center" },
                    {
                        title: "Tên cuộc giám sát",
                        render: (_, r) => {
                            return <Link to={{
                                pathname: URL_QTNVTT_CUOC_THANH_TRA_DETAIL,
                                search: queryString.stringify({ id: r.id })
                            }}>
                                <div>{r.tenCuocThanhTra}</div>
                            </Link>
                        }
                    },
                    { title: "Phòng ban", render: (t, r) => <CommonPhongBan maPhongBan={r.keHoachPhong} /> },
                    { title: "Ngày bắt đầu", dataIndex: "ngayBatDau" },
                    { title: "Ngày kết thúc", dataIndex: "ngayKetThuc" },
                ]}
                dataSource={list}
            />
        </ConfigProvider >
    </div>
}

export default ListDotThanhTra;