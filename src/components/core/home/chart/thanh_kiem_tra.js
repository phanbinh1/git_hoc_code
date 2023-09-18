import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import elmResizeEvent from "element-resize-event";
import * as main from "./../../../../constants/main";
import * as constants from "./../../../../constants/constants";
import * as actDiaBan from "./../../../../actions/app/danh_muc/dia_ban/dia_ban";
import { Card, DatePicker, Select, Spin } from 'antd';
import moment from "moment";
import { useDispatch } from 'react-redux';

const data = [
    { thang: 'Tháng 1', "Số cơ sở cấp GCN VSATTP": 10, "Cấp mới": 7, "Cấp đổi": 3 },
    { thang: 'Tháng 2', "Số cơ sở cấp GCN VSATTP": 8, "Cấp mới": 5, "Cấp đổi": 3 },
    { thang: 'Tháng 3', "Số cơ sở cấp GCN VSATTP": 15, "Cấp mới": 10, "Cấp đổi": 5 },
    { thang: 'Tháng 4', "Số cơ sở cấp GCN VSATTP": 20, "Cấp mới": 12, "Cấp đổi": 8 },
    { thang: 'Tháng 5', "Số cơ sở cấp GCN VSATTP": 40, "Cấp mới": 25, "Cấp đổi": 15 },
    { thang: 'Tháng 6', "Số cơ sở cấp GCN VSATTP": 10, "Cấp mới": 6, "Cấp đổi": 4 },
    { thang: 'Tháng 7', "Số cơ sở cấp GCN VSATTP": 25, "Cấp mới": 13, "Cấp đổi": 8 },
    { thang: 'Tháng 8', "Số cơ sở cấp GCN VSATTP": 30, "Cấp mới": 19, "Cấp đổi": 11 },
    { thang: 'Tháng 9', "Số cơ sở cấp GCN VSATTP": 60, "Cấp mới": 40, "Cấp đổi": 20 },
    { thang: 'Tháng 10', "Số cơ sở cấp GCN VSATTP": 39, "Cấp mới": 10, "Cấp đổi": 29 },
    { thang: 'Tháng 11', "Số cơ sở cấp GCN VSATTP": 80, "Cấp mới": 60, "Cấp đổi": 20 },
    { thang: 'Tháng 12', "Số cơ sở cấp GCN VSATTP": 10, "Cấp mới": 5, "Cấp đổi": 5 },
];

const ThanhKiemTraChart = () => {
    const [id] = useState(main.createID());
    const [width, setWidth] = useState(0);
    const [year, setYear] = useState(moment())
    const [quanHuyen, setQuanHuyen] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const container = document.getElementById(id);
        elmResizeEvent(container, () => {
            setWidth(container.clientWidth)
        });
        container && setWidth(container.clientWidth);
    }, []);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [year, quanHuyen]);

    return <Card
        className="card-chart card-chart-primary"
        id={id}
        title="Thanh kiểm tra"
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
                height={310}
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
                <Bar dataKey="Cấp mới" fill="#337ab7" stackId="a" />
                <Bar dataKey="Cấp đổi" stackId="a" fill="#d43f3a" />
                <Bar dataKey="Cấp mới" fill="#337ab7" />
                <Bar dataKey="Cấp đổi" fill="#d43f3a" />
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

const SelectQuanHuyen = ({ value, onChange }) => {
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

    return <Select size="small" style={{ width: "100%" }} placeholder="Quận/Huyện" allowClear value={value} onChange={onChange}>
        {data.map((item, i) => { return <Select.Option key={i} value={item.ma}>{item.ten}</Select.Option> })}
    </Select>
}

const YearPicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    return <DatePicker
        style={{ width: "100%" }}
        size="small"
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
export default ThanhKiemTraChart;