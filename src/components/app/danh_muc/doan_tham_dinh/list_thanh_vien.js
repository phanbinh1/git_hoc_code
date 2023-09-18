import { Table } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, Field, formValueSelector } from "redux-form";
import { CommonAccount, CommonChucVu, CommonPhongBan } from "../../../common";
import AccountPopupSearch from "../../../core/account/popup_search";
import { Button, Divider } from "antd";
import { FieldSelect } from "../../../../constants/controll";
import { CONST_CHUC_DANH_DOAN_THAM_DINH } from "../../../../constants/constants";
import { VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_GIOITINH_REQUIRED, VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_CHUCDANH_REQUIRED } from "../../../../constants/validate";

const ListThanhVien = ({ form, doanThamDinh }) => {
    const danhSachThanhVien = useSelector(state => formValueSelector(form)(state, "danhSachThanhVien")) || [];
    const dispatch = useDispatch();
    const [popup, setPopup] = useState({
        visible: false,
        onShow: () => setPopup(p => ({ ...p, visible: true })),
        onCancel: () => setPopup(p => ({ ...p, visible: false })),
        onOk: (accounts = [], danhSachThanhVien = [], thanhVienDoanThamDinh = []) => {
            dispatch(change(form, "danhSachThanhVien", accounts.map(account => {
                const res = danhSachThanhVien.find(tv => tv.maNhanVien === account.name);
                const doanRes = thanhVienDoanThamDinh.find(tv => tv.maNhanVien === account.name)
                if (res) {
                    return {
                        ...res,
                        gioiTinh: doanRes ? doanRes.gioiTinh : undefined,
                        chucDanh: doanRes ? doanRes.chucDanh : undefined,
                        id: doanRes ? doanRes.id : res ? res.id : undefined
                    };
                }
                return {
                    maNhanVien: account.name,
                    chucVu: account.regency,
                    hoTen: account.fullName,
                    phongBan: account.managementDepartment,
                    gioiTinh: doanRes ? doanRes.gioiTinh : undefined,
                    chucDanh: doanRes ? doanRes.chucDanh : undefined,
                    id: doanRes ? doanRes.id : res ? res.id : undefined
                }
            })))
            setPopup(p => ({ ...p, visible: false }))
        },
    })

    const getOptionsChucDanh = (index) => {
        const indexTruongDoan = danhSachThanhVien.findIndex(item => item.chucDanh === CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN);
        return CONST_CHUC_DANH_DOAN_THAM_DINH.options.filter(chucDanh => {
            if (chucDanh.value === CONST_CHUC_DANH_DOAN_THAM_DINH.TRUONGDOAN) {
                return indexTruongDoan === index || indexTruongDoan === -1;
            }
            return true;
        })
    }

    return <Fragment>
        <div className="col-md-12">
            <AccountPopupSearch
                accountSelected={danhSachThanhVien.filter(tv => tv.maNhanVien ? true : false).map(item => ({ name: item.maNhanVien }))}
                visible={popup.visible}
                onCancel={popup.onCancel}
                onOk={(acc = []) => popup.onOk(acc, danhSachThanhVien, doanThamDinh ? doanThamDinh.danhSachThanhVien : [])}
                rowKey="name"
            />
            <Divider orientation="left">Danh sách thành viên đoàn:</Divider>
            <Button onClick={popup.onShow} type="primary">Thay đổi</Button>
            <Table
                size="small"
                bordered
                pagination={false}
                columns={[
                    {
                        title: "STT",
                        width: 50,
                        align: "center",
                        render: (_, r, i) => i + 1
                    },
                    {
                        title: "Giới tính",
                        render: (t, r, i) => <Field
                            name={`danhSachThanhVien[${i}].gioiTinh`}
                            component={FieldSelect}
                            placeholder="Ông/Bà"
                            options={[
                                { value: "NAM", label: "Ông" },
                                { value: "NU", label: "Bà" }
                            ]}
                            checkValid
                            validate={VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_GIOITINH_REQUIRED}
                        />
                    },
                    {
                        title: "Chức danh",
                        width: 200,
                        render: (t, r, i) => <Field
                            name={`danhSachThanhVien[${i}].chucDanh`}
                            component={FieldSelect}
                            placeholder="Chức danh"
                            options={getOptionsChucDanh(i)}
                            checkValid
                            validate={VALIDATE_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_DTD_CHUCDANH_REQUIRED}
                        />
                    },
                    {
                        title: "Họ tên",
                        render: (t, r, i) => <CommonAccount username={r.maNhanVien} key={r.maNhanVien}>{r.hoTen}</CommonAccount>
                    },
                    {
                        title: "Chức vụ",
                        width: 200,
                        render: (t, r, i) => <CommonChucVu chucVu={r.chucVu} key={r.chucVu} />
                    },
                    {
                        title: "Phòng ban",
                        render: (t, r) => <CommonPhongBan maPhongBan={r.phongBan} />
                    },
                ]}
                dataSource={danhSachThanhVien}
            />
        </div>
    </Fragment>
}
export default ListThanhVien;