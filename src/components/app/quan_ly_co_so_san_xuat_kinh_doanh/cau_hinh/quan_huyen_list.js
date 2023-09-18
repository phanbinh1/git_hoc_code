import React from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { change, arrayPush } from 'redux-form';

const QuanHuyenQuanLy = ({ phongBan, phongBanStores = [], quanHuyens = [], form }) => {
    const getSelectedRowKeys = () => {
        const pb = phongBanStores.find(_pb => _pb.ma === phongBan.ma);
        if (pb && Array.isArray(pb.quanHuyenQuanLys)) {
            return pb.quanHuyenQuanLys;
        }
        return [];
    }
    const dispatch = useDispatch();
    return <Table
        style={{ margin: 20 }}
        rowSelection={{
            selectedRowKeys: getSelectedRowKeys().map(item => item.ma),
            onChange: (_, selectedRows) => {
                const index = phongBanStores.findIndex(_pb => _pb.ma === phongBan.ma);
                if (index < 0) {
                    dispatch(arrayPush(form, "phongBans", { ...phongBan, quanHuyenQuanLys: selectedRows }));
                }
                else {
                    dispatch(change(form, `phongBans[${index}].quanHuyenQuanLys`, selectedRows));
                }
            }
        }}
        rowKey="ma"
        bordered
        size="small"
        pagination={false}
        columns={
            [
                {
                    title: "STT",
                    align: "center",
                    width: 50,
                    render: (_, r, index) => index + 1
                },
                {
                    title: "Mã Quận/Huyện",
                    dataIndex: "ma",
                    width: 120,
                    align: "center"
                },
                {
                    title: "Tên Quận/Huyện",
                    dataIndex: "ten"
                }
            ]}
        dataSource={quanHuyens}
    />
}

export default QuanHuyenQuanLy;