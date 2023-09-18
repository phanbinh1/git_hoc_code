import AbortController from "abort-controller";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import * as actTuCongBo from "../../../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as constants from "../../../../../constants/constants";

const TuCongBoSanPham = ({ item }) => {
    const [listTuCongBoSanPham, setListTuCongBoSanPham] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const getDsTuCongBoSanPham = (object = {}) => dispatch(actTuCongBo.getAllRequest(object))

    useEffect(() => {
        const controller = new AbortController();
        if (item && item.id) {
            getDsTuCongBoSanPham({
                controller,
                isPagination: false,
                data: {
                    searchData: `idCoSo=${item.id}&loaiCongBo=${constants.CONST_LOAI_CONG_BO_SAN_PHAM.TUCONGBO}`
                },
                requestSuccess: (res) => {
                    if (res.result.length > 0) {
                        setListTuCongBoSanPham(res.result);
                    }
                    setLoading(false);
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
        else {
            setLoading(false);
        }
        return () => {
            controller.abort();
        }
    }, []);

    return <React.Fragment>
        <div className="col-md-12">
            <Table
                loading={loading}
                columns={[
                    {
                        title: "STT",
                        dataIndex: "stt",
                        render: (text, _, i) => i + 1,
                        width: 50
                    },
                    {
                        title: "Tên sản phẩm",
                        render: (_, record) => {
                            const sanPhamCongBo = record.danhSachSanPhamCongBo && record.danhSachSanPhamCongBo[0] ? record.danhSachSanPhamCongBo[0] : {};
                            return sanPhamCongBo.tenSanPham;
                        }
                    },
                    {
                        title: "Ngày tiếp nhận",
                        dataIndex: "ngayTiepNhan"
                    },
                    {
                        title: "Số tự công bố",
                        dataIndex: "soTuCongBo",
                        render: (_, record) => {
                            const sanPhamCongBo = record.danhSachSanPhamCongBo && record.danhSachSanPhamCongBo[0] ? record.danhSachSanPhamCongBo[0] : {};
                            return sanPhamCongBo ? sanPhamCongBo.soTuCongBo : "";
                        }
                    },
                    {
                        title: "Ngày tự công bố",
                        dataIndex: "thoiDiemTuCongBo",
                        render: (_, record) => {
                            const sanPhamCongBo = record.danhSachSanPhamCongBo && record.danhSachSanPhamCongBo[0] ? record.danhSachSanPhamCongBo[0] : {};
                            return sanPhamCongBo ? sanPhamCongBo.thoiDiemTuCongBo : "";
                        }
                    },
                    {
                        title: "Nguồn gốc",
                        render: (_, record) => {
                            const sanPhamCongBo = record.danhSachSanPhamCongBo && record.danhSachSanPhamCongBo[0] ? record.danhSachSanPhamCongBo[0] : {};
                            return sanPhamCongBo.nguonGoc ?
                                constants.CONST_NGUOC_GOC_SAN_PHAM.options.find(item => sanPhamCongBo.nguonGoc.toString() === item.value.toString()).label :
                                "";
                        }
                    },
                    {
                        title: "Xuất xứ",
                        render: (_, record) => {
                            const sanPhamCongBo = record.danhSachSanPhamCongBo && record.danhSachSanPhamCongBo[0] ? record.danhSachSanPhamCongBo[0] : {};
                            return sanPhamCongBo.xuatXu;
                        }
                    }
                ]}
                dataSource={listTuCongBoSanPham.map((item, i) => ({ key: i, ...item }))}
                size="small"
                bordered
                pagination={false}
            />
        </div>
    </React.Fragment >
}

export default TuCongBoSanPham;