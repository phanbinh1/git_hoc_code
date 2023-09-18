import React, { Fragment } from 'react';
import { Table, ConfigProvider, Empty } from 'antd';
import { CommonFieldset, CommonCurrency } from '../../../../../components/common';

const DetailKinhPhi = ({ item }) => {
    const renderTongTien = (kinhPhis) => {
        let res = 0;
        if (kinhPhis && Array.isArray(kinhPhis)) {
            kinhPhis.map(item => {
                return res += parseInt(item.kinhPhi, 0);
            })
        }
        return res;
    }
    return (
        <Fragment>
            <CommonFieldset scrollIntoView title={<Fragment><i className="fa fa-money m-r-10" />Kinh phí: <CommonCurrency>{renderTongTien(item.chiTietKinhPhis)}</CommonCurrency></Fragment>}>
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu" />}>
                    <Table
                        size="small"
                        rowKey={record => record.key}
                        bordered
                        pagination={false}
                        columns={[
                            { title: "STT", render: (_, r, index) => index + 1, width: 50, align: "center" },
                            { title: "Nội dung", dataIndex: "noiDung" },
                            { title: "Kinh phí", render: (_, r) => <CommonCurrency>{r.kinhPhi}</CommonCurrency>, width: 150, align: "right" }
                        ]}
                        dataSource={item.chiTietKinhPhis ? item.chiTietKinhPhis.map((val, i) => ({ key: i, ...val })) : []}
                    />
                </ConfigProvider>
            </CommonFieldset>
        </Fragment >
    );
}

export default DetailKinhPhi;