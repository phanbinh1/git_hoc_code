import React, { Fragment, useState } from "react";
import { Tabs, Table, Checkbox, Alert } from "antd";
import { CommonAccount, CommonChucDanh, CommonChucVu, CommonGioiTinh, CommonGioiTInh, CommonPhongBan } from "../../../common";
import { createID } from "../../../../constants/main"
const LichSuThayDoi = ({ danhSachThanhVien = [], lichSuThayDoi = [] }) => {
    const lichSuThanhDoiLan = (n = 0) => {
        let current = danhSachThanhVien;
        for (let i = 1; i <= n; i++) {
            if (i <= lichSuThayDoi.length && i > 0) {
                const lichSu = lichSuThayDoi[i - 1];
                const { thanhVienDuocThemMoi, thanhVienBiXoaBo, thayDoiChucDanh } = lichSu;
                current = [
                    ...current.filter(item => thanhVienDuocThemMoi.findIndex(tm => tm.maNhanVien === item.maNhanVien) === -1),
                    ...thanhVienBiXoaBo,
                ].map(item => {
                    const nguoiDungThayDoiChucDanh = thayDoiChucDanh && Array.isArray(thayDoiChucDanh) && thayDoiChucDanh.find(c => c.id === item.id)
                    if (nguoiDungThayDoiChucDanh) {
                        return {
                            ...item,
                            chucDanh: nguoiDungThayDoiChucDanh.chucDanhCu
                        }
                    }
                    return item;
                });
            }
            else {
                current = []
            }
        }
        return {
            thanhViens: current,
            ghiChu: lichSuThayDoi[n - 1] && lichSuThayDoi[n - 1].ghiChu,
            thayDoiChucDanh: lichSuThayDoi[n - 1] && Array.isArray(lichSuThayDoi[n - 1].thayDoiChucDanh) ? lichSuThayDoi[n - 1].thayDoiChucDanh : []
        };
    }

    const [id] = useState(createID())
    const [showChanged, setShowChanged] = useState(true);
    return <Fragment>
        <div id={id}>
            <Tabs
                tabPosition="left"
            >
                <Tabs.TabPane tab="Hiện tại" key="1">
                    {lichSuThanhDoiLan(1).ghiChu && <Alert
                        type="warning"
                        banner
                        showIcon
                        message="Lý do thay đổi"
                        description={lichSuThanhDoiLan(1).ghiChu}
                        style={{ marginBottom: 10 }}
                    />}
                    <TableThanhVien
                        id={id}
                        danhSachHienTai={danhSachThanhVien}
                        danhSachTruocChinhSua={lichSuThanhDoiLan(1).thanhViens}
                        showChanged={showChanged}
                        setShowChanged={setShowChanged}
                        thayDoiChucDanh={lichSuThanhDoiLan(1).thayDoiChucDanh}
                    />
                </Tabs.TabPane>
                {
                    lichSuThayDoi.map((item, i) => {
                        const dsTruocChinhSua = lichSuThanhDoiLan(i + 2).thanhViens;
                        const dsHienTai = lichSuThanhDoiLan(i + 1).thanhViens;
                        const thayDoiChucDanh = lichSuThanhDoiLan(i + 2).thayDoiChucDanh;
                        return <Tabs.TabPane
                            tab={<Fragment>
                                <div>Thay đổi lần {lichSuThayDoi.length - i}</div>
                                <div>
                                    <i className="fa fa-user" /> <CommonAccount
                                        getPopupContainer={() => document.getElementById(id)}
                                        username={item.nguoiSua}
                                    />
                                </div>
                                <div>
                                    <small><i className="fa fa-clock-o" /> {item.ngaySua}</small>
                                </div>
                            </Fragment>}
                            key={i + 2}
                        >
                            {lichSuThanhDoiLan(i + 2).ghiChu && <Alert
                                type="warning"
                                banner
                                showIcon
                                message="Lý do thay đổi"
                                description={lichSuThanhDoiLan(i + 2).ghiChu}
                                style={{ marginBottom: 10 }}
                            />}
                            <TableThanhVien
                                thayDoiChucDanh={thayDoiChucDanh}
                                id={id}
                                danhSachHienTai={dsHienTai}
                                danhSachTruocChinhSua={dsTruocChinhSua}
                                showChanged={showChanged}
                                setShowChanged={setShowChanged}
                            />
                        </Tabs.TabPane>
                    })
                }
            </Tabs>
        </div>
    </Fragment>
}

export default LichSuThayDoi;
const TableThanhVien = ({
    danhSachHienTai = [],
    danhSachTruocChinhSua = [],
    showChanged,
    setShowChanged,
    id,
    thayDoiChucDanh = []
}) => {
    return <Fragment>
        <Checkbox checked={!showChanged} onChange={e => setShowChanged(!e.target.checked)}>Ẩn thay đổi</Checkbox>
        <Table
            size="small"
            bordered
            pagination={false}
            rowClassName={record => record.type === "add" ? "row-add" : record.type === "delete" ? "row-delete" : ""}
            columns={[
                {
                    title: "STT",
                    width: 50,
                    align: "center",
                    render: (_, r, i) => i + 1
                },
                {
                    title: "Giới tính",
                    render: (t, r, i) => <CommonGioiTinh gioiTinh={r.gioiTinh} />
                },
                {
                    title: "Chức danh",
                    width: 150,
                    render: (t, r, i) => <CommonChucDanh chucDanh={r.chucDanh} />
                },
                {
                    title: "Họ tên",
                    render: (t, r, i) => <CommonAccount getPopupContainer={() => document.getElementById(id)} username={r.maNhanVien} key={r.maNhanVien}>{r.hoTen}</CommonAccount>
                },
                {
                    title: "Chức vụ",
                    width: 100,
                    render: (t, r, i) => <CommonChucVu chucVu={r.chucVu} key={r.chucVu} />
                },
                {
                    title: "Phòng ban",
                    render: (t, r) => <CommonPhongBan maPhongBan={r.phongBan} />
                },
                ...(showChanged ? [{
                    title: "Thao tác",
                    render: (t, r) => {
                        const renderThaoTac = () => {
                            switch (r.type) {
                                case "add":
                                    return <span className="bt-label bt-label-primary">Thêm vào</span>;
                                case "delete":
                                    return <span className="bt-label bt-label-danger">Xoá bỏ</span>;
                                default:
                                    return <Fragment></Fragment>
                            }
                        }
                        return <Fragment>
                            {renderThaoTac()}
                            {thayDoiChucDanh.findIndex(item => item.id === r.id) >= 0 && <span className="bt-label bt-label-warning">Đổi chức danh</span>}
                        </Fragment>
                    }
                }] : [])
            ]}
            dataSource={[
                ...(showChanged ? danhSachHienTai.map(item => ({ ...item, type: danhSachTruocChinhSua.findIndex(t => t.id === item.id) === -1 ? "add" : undefined })) : danhSachHienTai),
                ...(showChanged ? danhSachTruocChinhSua.filter(item => danhSachHienTai.findIndex(ht => ht.id === item.id) === -1).map(item => ({ ...item, type: "delete" })) : [])
            ]}
        />
    </Fragment>
}