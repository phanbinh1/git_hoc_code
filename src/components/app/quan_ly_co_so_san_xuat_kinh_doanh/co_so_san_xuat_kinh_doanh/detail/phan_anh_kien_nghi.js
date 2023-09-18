import AbortController from "abort-controller";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tag, Table } from "antd";
import * as actPhanAnhKienNghi from "./../../../../../actions/app/quan_ly_tiep_nhan_xu_ly_phan_anh_kien_nghi/ho_so/ho_so";
import * as constants from "./../../../../../constants/constants";

const PhanAnhKienNghi = ({ item }) => {
    const [phanAnhKienNghis, setPhanAnhKienNghis] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const getDsPhanAnhKienNghi = (object = {}) => dispatch(actPhanAnhKienNghi.getAllRequest(object))

    useEffect(() => {
        const controller = new AbortController();
        if (item && item.id) {
            getDsPhanAnhKienNghi({
                controller,
                isPagination: false,
                data: {
                    searchData: `idCoSo=${item.id}`
                },
                requestSuccess: (res) => {
                    if (res.result.length > 0) {
                        setPhanAnhKienNghis(res.result);
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
                        title: "Số hồ sơ",
                        dataIndex: "hoSoPhanAnhKienNghi.soHoSo"
                    },
                    {
                        title: "Tên cơ sở",
                        dataIndex: "hoSoPhanAnhKienNghi.tenCoSo",
                    },
                    {
                        title: "Địa chỉ",
                        dataIndex: "hoSoPhanAnhKienNghi.diaChiCoSo"
                    },
                    {
                        title: "Nội dung",
                        dataIndex: "hoSoPhanAnhKienNghi.noiDung"
                    },
                    {
                        title: "Tên người gởi",
                        dataIndex: "hoSoPhanAnhKienNghi.tenNguoiGui"
                    },
                    {
                        title: "Địa chỉ",
                        dataIndex: "hoSoPhanAnhKienNghi.diaChi"
                    },
                    {
                        title: "Trạng thái",
                        render: (_, record) => {
                            const index = constants.CONST_HSPAKN_TRANG_THAI_XU_LY.findIndex(val => val.value === record.hoSoPhanAnhKienNghi.trangThaiXuLy);
                            const trangThai = constants.CONST_HSPAKN_TRANG_THAI_XU_LY[index];
                            return trangThai ? <span>
                                <Tag color={trangThai.color} key={trangThai.value}>
                                    {trangThai.label.toUpperCase()}
                                </Tag>
                            </span> : null

                        }
                    }
                ]}
                dataSource={phanAnhKienNghis.map((item, i) => ({ key: i, ...item }))}
                size="small"
                bordered
                pagination={false}
            />
        </div>
    </React.Fragment >
}

export default PhanAnhKienNghi;