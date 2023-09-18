import AbortController from "abort-controller";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import * as actTuCongBo from "../../../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as constants from "../../../../../constants/constants";

const BanCongBoSanPham = ({ item }) => {
    const [listBanCongBoSanPham, setListBanCongBoSanPham] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const getDsBanCongBoSanPham = (object = {}) => dispatch(actTuCongBo.getAllRequest(object))

    useEffect(() => {
        const controller = new AbortController();
        if (item && item.id) {
            getDsBanCongBoSanPham({
                controller,
                isPagination: false,
                data: {
                    searchData: `idCoSo=${item.id}&loaiCongBo=${constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}`
                },
                requestSuccess: (res) => {
                    if (res.result.length > 0) {
                        setListBanCongBoSanPham(res.result);
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

    const getData = () => {
        let result = [];
        listBanCongBoSanPham.map((item, i) => {
            return item.danhSachSanPhamCongBo.map((sp, j) => {
                return result.push({ ...item, key: item.id, tenSanPham: sp.tenSanPham, nguonGoc: sp.nguonGoc });
            })
        })
        return result;
    }
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
                        dataIndex: "tenSanPham",
                    },
                    {
                        title: "Ngày tiếp nhận",
                        dataIndex: "ngayTiepNhan"
                    },
                    {
                        title: "Số giấy xác nhận",
                        dataIndex: "soGiayXacNhanCongBo"
                    },
                    {
                        title: "Ngày cấp xác nhận",
                        dataIndex: "ngayCapXacNhanCongBo"
                    },
                    {
                        title: "Nguồn gốc",
                        dataIndex: "nguonGoc",
                        render: (_, record) => {
                            return record.nguonGoc ?
                                constants.CONST_NGUOC_GOC_SAN_PHAM.options.find(item => record.nguonGoc.toString() === item.value.toString()).label :
                                "";
                        }
                    },
                    {
                        title: "Xuất xứ",
                        dataIndex: "xuatXu"
                    }
                ]}
                dataSource={getData()}
                size="small"
                bordered
                pagination={false}
            />
        </div>
    </React.Fragment >
}

export default BanCongBoSanPham;