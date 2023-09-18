import React, { useState, useEffect } from 'react';
import elmResizeEvent from "element-resize-event";
import * as main from "./../../../../constants/main";
import { Card, Spin } from 'antd';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
import * as actLinhVuc from "./../../../../actions/app/danh_muc/linh_vuc/linh_vuc"
import { useDispatch } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#413ea0'];

const RADIAN = Math.PI / 180;

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent }) => {
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return <g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 3}
            outerRadius={outerRadius + 5}
            fill="green"
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#8884d8">
            {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="green">
            {`${payload.value}(${(percent * 100).toFixed(2)}%)`}
        </text>
    </g>
};

const CoSoChart = () => {
    const [id] = useState(main.createID());
    const [width, setWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actLinhVuc.countCoSoRequest({
            requestSuccess: (res) => {
                setData(res.result);
                setLoading(false);
            }
        }))
    }, []);
    useEffect(() => {
        const container = document.getElementById(id);
        elmResizeEvent(container, () => setWidth(container.clientWidth));
        container && setWidth(container.clientWidth);
    }, [data]);

    return <Card
        className="card-chart card-chart-info"
        id={id}
        title="Cơ sở "
        bodyStyle={{ height: 305, padding: 0 }}
    >
        <Spin spinning={loading}>
            <PieChart width={width} height={300}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data.map((item) => ({ name: item.ten, value: item.soLuong }))}
                    cx={parseInt(width / 2, 0)}
                    cy={120}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(data, index) => setActiveIndex(index)}
                >
                    {data.map((entry, index) => <Cell opacity={0.8} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend onMouseEnter={(data, index) => setActiveIndex(index)} />
            </PieChart>
        </Spin>
    </Card >
}

export default CoSoChart;
