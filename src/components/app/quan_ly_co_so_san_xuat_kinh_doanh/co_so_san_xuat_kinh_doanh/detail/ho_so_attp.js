import AbortController from "abort-controller";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Popover, Spin, Tag, Table } from "antd";
import moment from 'moment';
import * as actHoSoCapGiayChungNhan from "./../../../../../actions/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_cap_giay_chung_nhan";
import * as constants from "./../../../../../constants/constants";
import * as main from "./../../../../../constants/main";
import * as url from "./../../../../../constants/url";
import { dateFormat, dateTimeFormat } from "./../../../../../constants/controll";

const HoSoCapGiayChungNhanAttp = ({ item }) => {
    const [hoSos, setHoSos] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const getHoSoCapGiayChungNhanATTP = (object = {}) => dispatch(actHoSoCapGiayChungNhan.getAllRequest(object))

    useEffect(() => {
        if (item && item.id) {
            const controller = new AbortController();
            getHoSoCapGiayChungNhanATTP({
                controller,
                data: {
                    searchData: `idCoSo=${item.id}`,
                    sortData: `ngayHetHanChungNhanAttp desc`
                },
                isPagination: false,
                requestSuccess: (res) => {
                    setLoading(false);
                    if (res.result) {
                        setHoSos(res.result)
                    }
                },
                requestError: () => {
                    setLoading(false);
                }
            })
            return () => {
                controller.abort();
            }
        }
        else {
            setLoading(false);
            setHoSos([]);
        }
    }, []);

    return <React.Fragment>
        <div className="col-md-12">
            <Spin spinning={loading}>
                {/* <ThongTinHoSo hoSo={{}} /> */}
                <Table
                    size="small"
                    bordered
                    pagination={false}
                    columns={[
                        {
                            title: "STT",
                            render: (_, r, i) => (i + 1),
                            width: 50
                        },
                        {
                            title: "Mã số biên nhận",
                            dataIndex: "maSoBienNhan",
                            render: (_, record) => {
                                return <Link to={main.formatUrl({
                                    pathname: url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DETAIL,
                                    objSearch: {
                                        id: record.id
                                    }
                                })} title="Chi tiết">
                                    {record.maSoBienNhan}
                                </Link>
                            }
                        },
                        {
                            title: "Tên cơ sở",
                            dataIndex: "tenCoSo",
                        },
                        {
                            title: "Số chứng nhận ATTP",
                            dataIndex: "soChungNhanAttp"
                        },
                        {
                            title: "Ngày hết hạn",
                            dataIndex: "ngayHetHanChungNhanAttp"
                        },
                        {
                            title: "Tình trạng",
                            width: 100,
                            render: (_, record) => {
                                const ngayHetHan = moment(record.ngayHetHanChungNhanAttp, dateFormat);
                                if (ngayHetHan.isValid()) {
                                    const data = main.formartTimeUnits(ngayHetHan.format(dateTimeFormat), dateTimeFormat);
                                    if (
                                        data.years > 0
                                        || data.months > 0
                                        || data.days > 0
                                        || data.hours > 0
                                        || data.minutes > 0
                                        || data.seconds > 0
                                    ) {
                                        return <React.Fragment>
                                            <Popover content={data.label}>
                                                <Tag color="red">ĐÃ HẾT HẠN</Tag>
                                            </Popover>
                                        </React.Fragment>
                                    }
                                    else {
                                        if (
                                            data.years === 0
                                            && data.months === 0
                                            && data.days >= -30
                                        ) {
                                            return <React.Fragment>
                                                <Popover content={data.label}>
                                                    <Tag color="volcano">SẮP HẾT HẠN</Tag>
                                                </Popover>
                                            </React.Fragment>
                                        }
                                        else {
                                            return <Tag color="green">CÒN HẠN</Tag>;
                                        }
                                    }
                                }
                                else {
                                    return <Tag >KHÔNG XÁC ĐỊNH</Tag>;
                                }
                            }
                        },
                        {
                            title: "Người ký",
                            dataIndex: "nguoiKyCapGiayChungNhan"
                        },
                        {
                            title: "Ngày ký",
                            dataIndex: "ngayKyCapGiayChungNhan"
                        },
                        {
                            title: "Hình thức cấp",
                            dataIndex: "loaiHoSoCapGiayChungNhan",
                            render: (_, record) => {
                                return record.loaiHoSoCapGiayChungNhan ? constants.CONST_LOAI_HOSO_CAP_GCN.options.find(item => record.loaiHoSoCapGiayChungNhan.toString() === item.value.toString()).label.toUpperCase() : "";
                            }
                        }
                    ]}
                    dataSource={hoSos.map((item, i) => ({ key: i, ...item }))}
                />
            </Spin>
        </div>
    </React.Fragment>
}

export default HoSoCapGiayChungNhanAttp;