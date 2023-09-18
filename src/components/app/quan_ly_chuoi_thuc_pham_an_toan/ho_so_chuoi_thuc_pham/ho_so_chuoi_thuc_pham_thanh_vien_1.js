import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, formValueSelector } from "redux-form";
import { Table, Button } from "antd";
import * as formName from "./../../../../constants/form_name";
import { CommonFieldset } from "../../../common";
import CoSoSearchModal from "./co_so_search_modal";

const ThanhViens = ({
    data,
    onAdd,
    onDelete,
    onSelectCoSo
}) => {
    const [_visibleCoSo, _setVisibleCoSo] = useState(false);
    const dispatch = useDispatch();

    const danhSachCoSoThamGiaChuoi = useSelector(state => formValueSelector(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM)(state, "danhSachCoSoThamGiaChuoi")) || []

    return <React.Fragment>
        <CoSoSearchModal
            onCancel={() => _setVisibleCoSo(false)}
            onSelectCoSo={(items) => dispatch(change(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM, "danhSachCoSoThamGiaChuoi", (items || []).map(item => ({ ...item, coSoId: item.id }))))}
            mode="multiple"
            visible={_visibleCoSo}
            coSoSelected={danhSachCoSoThamGiaChuoi}
        />
        <CommonFieldset title="Danh sách cơ sở tham gia chuỗi">
            <Button
                className="m-r-10"
                type="primary"
                onClick={() => _setVisibleCoSo(true)}
            >
                Cập nhật cơ sở
            </Button>
            <Button
                className="m-r-10"
                type="danger"
                disabled={danhSachCoSoThamGiaChuoi.length === 0}
                onClick={() => dispatch(change(formName.FORM_NAME_NHOM_CHUOI_THUC_PHAM, "danhSachCoSoThamGiaChuoi", []))}
            >
                Xóa tất cả
            </Button>
        </CommonFieldset>
        <Table
            columns={[
                {
                    title: "STT",
                    dataIndex: "stt",
                    width: 50,
                    align: "center",
                    fixed: 'left',
                    render: (t, r, i) => i + 1
                },
                {
                    title: "Tên cơ sở",
                    dataIndex: "tenCoSo",
                    className: "v-a-top",
                    width: 250
                },
                {
                    title: "Tên doanh nghiệp",
                    dataIndex: "tenDangKyKinhDoanh",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Loại hình tham gia",
                    dataIndex: "loaiHinhThamGia",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Sản phẩm",
                    dataIndex: "sanPham",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Địa chỉ trụ sở",
                    dataIndex: "diaChiTruSo",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Địa điểm kinh doanh",
                    dataIndex: "diaDiemKinhDoanh",
                    className: "v-a-top",
                    width: 300
                },
                {
                    title: "Số giấy phép ĐKKD",
                    dataIndex: "soGiayPhepDkkd",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ngày cấp GP ĐKKD",
                    dataIndex: "ngayCapGiayPhepDkkd",
                    className: "v-a-top",
                    width: 120
                },
                {
                    title: "Số chứng nhận ATTP",
                    dataIndex: "soChungNhanAttp",
                    className: "v-a-top",
                    width: 200
                },
                {
                    title: "Ngày cấp CN ATTP",
                    dataIndex: "ngayCapChungNhanAttp",
                    className: "v-a-top",
                    width: 150
                },
                {
                    title: "Ngày hết hạn CN ATTP",
                    dataIndex: "ngayHetHanChungNhanAttp",
                    className: "v-a-top",
                    width: 150
                },
                {
                    title: "Ghi chú",
                    dataIndex: "ghiChu",
                    className: "v-a-top",
                    width: 300
                },
            ]}
            scroll={{ x: 2300 }}
            dataSource={data}
            bordered
            pagination={false}
            size="small"
        />
    </React.Fragment >
}

export default ThanhViens;