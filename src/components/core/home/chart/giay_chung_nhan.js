import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import elmResizeEvent from "element-resize-event";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
import * as actCapGiayChungNhan from "./../../../../actions/app/quan_ly_tham_dinh_cap_giay_chung_nhan_attp/ho_so_cap_giay_chung_nhan";
import { Card, DatePicker, Select, Spin } from 'antd';
import moment from "moment";
import { useDispatch } from 'react-redux';

const GiayChungNhanChart = () => {
    const [id] = useState(main.createID());
    const [width, setWidth] = useState(0);
    const [year, setYear] = useState(moment())
    const [quanHuyen, setQuanHuyen] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const container = document.getElementById(id);
        elmResizeEvent(container, () => {
            setWidth(container.clientWidth)
        });
        container && setWidth(container.clientWidth);
    }, [loading]);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [year, quanHuyen]);

    const getData = () => {
        setLoading(true)
        dispatch(actCapGiayChungNhan.chartCoSoCapGCNRequest({
            data: {
                nam: year.year(),
                ...(quanHuyen ? { id: quanHuyen } : {})
            },
            requestSuccess: (res) => {
                setData(res.result.map(item => ({
                    ...item,
                    thang: `Tháng ${item.thang}`,
                    "Số cơ sở cấp GCN VSATTP": item.tongCoSoCapGiayCN,
                    "Cấp mới": item.capMoi,
                    "Cấp đổi": item.capDoi
                })));
                setLoading(false)
            },
            requestError: () => {
                setData([]);
                setLoading(false);
            }
        }))
    }
    return <Card
        className="card-chart card-chart-success"
        id={id}
        title="Cấp giấy chứng nhận ATVSTP"
        bodyStyle={{ padding: "10px 0 20px 0", overflow: "hidden" }}
    >
        <Spin spinning={loading}>
            <div style={{ lineHeight: "30px", padding: "0 20px", marginBottom: 10 }}>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <label>Quận/Huyện</label>
                        <SelectQuanHuyen
                            value={quanHuyen}
                            onChange={(value) => setQuanHuyen(value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Năm</label>
                        <YearPicker
                            value={year}
                            onChange={year => setYear(year)}
                        />
                    </div>
                </div>
            </div>
            <ComposedChart
                width={width}
                height={200}
                data={data}
                margin={{ right: 20 }}
            >
                <CartesianGrid />
                <XAxis dataKey="thang" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="Số cơ sở cấp GCN VSATTP"
                    fill="#5cb85c"
                />
                <Line
                    type="monotone"
                    dataKey="Cấp mới"
                    stroke="#337ab7"
                />
                <Line
                    type="monotone"
                    dataKey="Cấp đổi"
                    stroke="#d43f3a"
                />
            </ComposedChart>
        </Spin>
    </Card>
}

const SelectQuanHuyen = ({ value, onChange, disabled }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        getDiaBan();
    }, []);

    const getDiaBan = () => {
        dispatch(actDiaBan.getAllRequest({
            data: {
                parentCode: constants.CONST_DEFAULT_TINHTHANH.ma
            },
            requestSuccess: (res) => {
                setData(res.result);
            }
        }))
    }

    return <Select size="default" style={{ width: "100%" }} placeholder="Quận/Huyện" allowClear value={value} onChange={onChange} disabled={disabled}>
        {data.map((item, i) => { return <Select.Option key={i} value={item.id}>{item.ten}</Select.Option> })}
    </Select>
}

const YearPicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    return <DatePicker
        style={{ width: "100%" }}
        size="default"
        allowClear={false}
        dropdownClassName="field-year-dropdown"
        value={value}
        placeholder="Chọn năm"
        format="YYYY"
        mode="year"
        open={open}
        onOpenChange={(open) => setOpen(open)}
        onChange={(date) => {
            onChange(date && date.isValid() ? date : moment())
            setOpen(false);
        }}
        onPanelChange={(date) => {
            onChange(date && date.isValid() ? date : moment())
            setOpen(false);
        }}
    />
}
export default GiayChungNhanChart;