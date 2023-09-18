import React from "react";
import { Table } from "antd";

const CoSoThamGiaChuoi = ({
    coSos = []
}) => {
    return <React.Fragment>
        <Table
            pagination={false}
            bordered
            size="small"
            className="table-custom full-text"
            columns={[
                { title: "STT", render: (_, r, i) => (i + 1), width: 50 },
                { title: "Tên cơ sở", width: 200, render: (_, r) => r.tenCoSo },
                { title: "Địa chỉ", render: (_, r) => r.diaDiemKinhDoanh },
                { title: "Loại hình SXKD", width: 250, render: (_, r) => r.loaiHinhThamGia },
                { title: "Sản phẩm", width: 200, render: (_, r) => r.sanPham },
            ]}
            dataSource={coSos.map((item, i) => ({ key: i, ...item }))}
        />
    </React.Fragment>
}

export default CoSoThamGiaChuoi;