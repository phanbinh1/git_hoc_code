import React, { Fragment } from 'react';
import { Table } from "antd";

const ListCoSoNgoai = ({
    coSos = [],
    coSoNgoaiSelected,
    setCoSoNgoaiSelected
}) => {
    return <Fragment>
        <Table
            bordered
            size="small"
            pagination={false}
            className="ant-table-striped"
            rowSelection={{
                selectedRowKeys: (coSoNgoaiSelected || []).map(item => item.uuid),
                onChange: (keys, rows) => {
                    setCoSoNgoaiSelected(rows)
                }
            }}
            rowKey="uuid"
            columns={[
                { dataIndex: "stt", title: "STT", width: 50, className: "c-pointer", align: "center" },
                { dataIndex: "tenCoSo", title: "Tên cơ sở", width: 200, className: "c-pointer" },
                { dataIndex: "diaChiCoSo", title: "Địa chỉ", className: "c-pointer" },
                // { dataIndex: "soGiayPhepDkkd", title: "Số DKKD", width: 150, className: "c-pointer" },
                // { dataIndex: "soChungNhanAttp", title: "Số CNATTP", width: 150, className: "c-pointer" },
                { dataIndex: "ghiChu", title: "Ghi chú", width: 150, className: "c-pointer" },
            ]}
            dataSource={coSos.map((item, index) => {
                const diaChiCoSo = `${item.diaDiem && typeof item.diaDiem === "string" ? item.diaDiem : item.diaChi && typeof item.diaChi === "string" ? item.diaChi : ""}` +
                    `${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}` +
                    `${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}` +
                    `${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}`;
                return {
                    ...item,
                    key: item.uuid,
                    stt: index + 1,
                    diaChiCoSo
                };
            })}
        />
    </Fragment>
}

export default ListCoSoNgoai;