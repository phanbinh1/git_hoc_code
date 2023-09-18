import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Descriptions, Drawer, Dropdown, Menu, Modal, Timeline } from "antd";
import { CONST_PHE_DUYET } from "./../../../../constants/constants";
import { CommonTrangThaiPheDuyet } from "../../../common";
import { CommonForm } from "../../../common";
import * as message from "./../../../../constants/message";
import * as apiUrl from "./../../../../constants/api";
import * as api from "./../../../../util/api_call";
import * as validate from "./../../../../constants/validate"
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";


const { DAPHEDUYET, KHONGPHEDUYET } = CONST_PHE_DUYET
const { CONST_PHONG_BAN, CONST_CHUC_VU } = constants;
const { THANHTRA, NGHIEPVU, DOI1, DOI2, VANPHONG, ADMIN, LANHDAO } = CONST_PHONG_BAN;
const { TRUONGBAN, TRUONGPHONG, CHANHVANPHONG, DOITRUONG, } = CONST_CHUC_VU;

const DrawerDetailNghiPhep = ({
    children,
    nghiPheps = [],
    nghiphep,
    onEdit,
    onDelete
}) => {
    const account_current = useSelector(state => state.core.account_current);
    const accounts = useSelector(state => state.core.account.profiles)
    const [visible, setVisible] = useState(false);


    const nguoiTiepNhan = () => {

        const { regency, managementDepartment } = account_current;

        switch (managementDepartment) {
            case NGHIEPVU:
            case THANHTRA:
                return regency === TRUONGPHONG ? {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                } : {
                    chucVu: TRUONGPHONG,
                    phongBan: managementDepartment
                }
            case DOI1:
            case DOI2:
                return regency === DOITRUONG ? {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                } : {
                    chucVu: DOITRUONG,
                    phongBan: managementDepartment
                }
            case VANPHONG:
                return regency === CHANHVANPHONG ? {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                } : {
                    chucVu: CHANHVANPHONG,
                    phongBan: VANPHONG
                }
            case ADMIN:
                return regency === ADMIN ? {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                } : {
                    chucVu: ADMIN,
                    phongBan: CONST_CHUC_VU.ADMIN
                }
            default:
                return {
                    chucVu: TRUONGBAN,
                    phongBan: LANHDAO
                }
        }
    }

    const [thucHien, setThucHien] = useState({
        visible: false,
        item: null,
        onCancel: () => setThucHien(thucHien => ({ ...thucHien, visible: false }))
    })

    const handleSubmit = async (data) => {
        const res = await api.put({ url: apiUrl.API_THONG_TIN_NGHI_PHEP, data: { ...data } });
        setThucHien(thucHien => ({
            ...thucHien,
            visible: false,
        }))
        if (res && res.status) {
            res.msg && message.success({ content: res.msg });
        }
        else {
            res.msg && message.error({ content: res.msg });
        }
    };

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                const timelineNghiPhepElm = document.querySelector(`.timeline-nghi-phep-${nghiphep.id}`);
                timelineNghiPhepElm && timelineNghiPhepElm.scrollIntoView();
            }, 300)
        }
    }, [visible, nghiPheps, nghiphep]);

    return <Fragment>
        <Drawer
            visible={visible}
            title="Chi tiết"
            onClose={() => setVisible(false)}
            width={400}
            destroyOnClose
        >
            <Timeline className="timeline-nghi-phep">
                {
                    nghiPheps.map(item => <Timeline.Item
                        className={`${nghiphep.id === item.id ? "active" : ""} timeline-nghi-phep-${item.id}`}
                        color={item.trangThaiDuyet === DAPHEDUYET ? "green" : item.trangThaiDuyet === KHONGPHEDUYET ? "red" : "blue"}
                    >
                        <Descriptions column={1} size="small">
                            <Descriptions.Item >Từ ngày {item.tuNgay} - đến ngày {item.denNgay}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái"><CommonTrangThaiPheDuyet trangThaiDuyet={item.trangThaiDuyet} lyDoKhongPheDuyet={item.lyDoKhongPheDuyet} /></Descriptions.Item>
                            <Descriptions.Item label="Số ngày nghỉ">{item.soNgayNghi}</Descriptions.Item>
                            <Descriptions.Item label="Người phê duyệt">{item.nguoiPheDuyet}</Descriptions.Item>
                        </Descriptions>

                    </Timeline.Item>)
                }
            </Timeline>

        </Drawer>
        <Dropdown trigger={["contextMenu"]} overlay={<Menu>
            <Menu.Item onClick={() => onEdit(nghiphep, 0)} disabled={nghiphep.trangThaiDuyet === CONST_PHE_DUYET.DAPHEDUYET || nghiphep.trangThaiDuyet === CONST_PHE_DUYET.KHONGPHEDUYET}>
                <i className="fa fa-pencil-square-o m-r-5" />Cập nhật
            </Menu.Item>

            <Menu.Item
                onClick={() => setThucHien(thucHien => ({
                    ...thucHien,
                    visible: true,
                }))}
                disabled={nghiphep.trangThaiDuyet !== CONST_PHE_DUYET.DAPHEDUYET || (nghiphep.thongTinNghiPhepCaNhanThucTe && (nghiphep.thongTinNghiPhepCaNhanThucTe.trangThai === CONST_PHE_DUYET.DAPHEDUYET || nghiphep.thongTinNghiPhepCaNhanThucTe.trangThai === CONST_PHE_DUYET.KHONGPHEDUYET))}
            >
                <i className="fa fa-pencil m-r-5" />Ngày nghỉ thực tế
            </Menu.Item>

            <Menu.Item
                disabled={nghiphep.trangThaiDuyet === CONST_PHE_DUYET.DAPHEDUYET || nghiphep.trangThaiDuyet === CONST_PHE_DUYET.KHONGPHEDUYET}
                onClick={() => {
                    Modal.confirm({
                        title: "Bạn chắc chắn muốn xoá?",
                        okText: <Fragment><i className="fa fa-check-o m-r-5" />Xác nhận</Fragment>,
                        cancelText: <Fragment><i className="fa fa-times m-r-5" />Huỷ</Fragment>,
                        onOk: () => onDelete(nghiphep, 0)
                    })
                }}>
                <i className="fa fa-trash m-r-5" />Xoá
            </Menu.Item>

        </Menu>}>
            <div onClick={() => setVisible(true)}>
                {children}
            </div>
        </Dropdown>

        <Modal
            title="Ngày nghỉ thực tế"
            style={{ top: 50 }}
            width={800}
            visible={thucHien.visible}
            onCancel={thucHien.onCancel}
            maskClosable={false}
            destroyOnClose
            footer={null}
        >
            <CommonForm
                key="f-c-1"
                data={[
                    [//row 1
                        {
                            col: 6,
                            label: "Số ngày nghỉ",
                            placeholder: "Số ngày nghỉ",
                            fieldType: "currency",
                            name: "thongTinNghiPhepCaNhanThucTe.soNgayNghi",
                            checkValid: true,
                            max: nghiphep && nghiphep.soNgayNghi,
                            min: 0,
                            validates: [validate.VALIDATE_QUAN_LY_THONG_TIN_SO_NGAY_NGHI_REQUIRED]
                        },
                        {
                            col: 6,
                            label: "Người phê duyệt",
                            placeholder: "Người tiếp nhận",
                            fieldType: "select",
                            name: "thongTinNghiPhepCaNhanThucTe.nguoiPheDuyet",
                            checkValid: true,
                            validates: [validate.VALIDATE_QLTTNP_NGUOI_TIEP_NHAN_REQUIRED],
                            options: accounts.filter(acc => acc.managementDepartment === nguoiTiepNhan().phongBan && acc.regency === nguoiTiepNhan().chucVu).map(acc => ({ value: acc.name, label: acc.fullName })),
                        },
                    ],
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_THONG_TIN_NGHI_PHEP}
                initialValues={nghiphep}
            />
        </Modal>
    </Fragment>
}

export default DrawerDetailNghiPhep;