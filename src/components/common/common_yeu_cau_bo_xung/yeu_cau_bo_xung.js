import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import AccountSelect from "./accounts_select";
import PhongBanSelect from "./phong_ban_select";
import ChucVuSelect from "./chuc_vu_select";

const CommonYeuCauBoXung = ({
    visible,
    onCancel,
    onOk,
    okText = <Fragment><i className="fa fa-check-circle m-r-10" />Xác nhận</Fragment>,
    cancelText = <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
    title = "Trình phê duyệt",
    content = "Bạn chắc chắn muốn trình phê duyệt",
    maPhongBans,
    maPhongBanOptions,
    chucVus,
    nguoiXuLy
}) => {
    const [phongBanValues, setPhongBanValues] = useState(maPhongBans || []);
    const [chucVusValues, setChucVuValues] = useState(chucVus || []);
    const [accountSelected, setAccountSelected] = useState(nguoiXuLy);
    const [lyDoKhongPheDuyet, setLyDoKhongPheDuyet] = useState(null);

    useEffect(() => {
        setAccountSelected(nguoiXuLy ? { name: nguoiXuLy } : null);
    }, [nguoiXuLy])

    useEffect(() => {
        setPhongBanValues(maPhongBans || []);
    }, [maPhongBans])

    useEffect(() => {
        setChucVuValues(chucVus || []);
    }, [chucVus])

    useEffect(() => {
        setLyDoKhongPheDuyet(null);
    }, [visible])
    return <Fragment>
        <Modal
            key="modalConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            destroyOnClose
            style={{ top: 50 }}
            maskClosable={false}
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">{title}</span>
                    <div className="ant-modal-confirm-content">
                        <div className="form-group">{content}</div>
                        <Form layout="inline" labelCol={{ span: 8 }}>
                            <Form.Item label="Phòng ban" style={{ marginRight: 0 }}>
                                <PhongBanSelect
                                    value={phongBanValues}
                                    onChange={values => setPhongBanValues(values)}
                                    maPhongBanOptions={maPhongBanOptions}
                                />
                            </Form.Item>
                            <Form.Item label="Chức vụ" style={{ marginRight: 0 }}>
                                <ChucVuSelect
                                    phongBans={phongBanValues}
                                    value={chucVusValues}
                                    onChange={values => setChucVuValues(values)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Người tiếp nhận"
                                required
                                style={{ marginRight: 0 }}
                            >
                                <AccountSelect
                                    value={accountSelected && accountSelected.name}
                                    maPhongBans={phongBanValues}
                                    chucVus={chucVusValues}
                                    onChange={(name, maPhongBan, chucVu) => setAccountSelected(name ? { name, maPhongBan, chucVu } : null)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Yêu cầu bổ sung"
                                required
                                style={{ marginRight: 0 }}
                            >
                                <Input.TextArea
                                    value={lyDoKhongPheDuyet}
                                    onChange={e => setLyDoKhongPheDuyet(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button onClick={onCancel}>{cancelText}</Button>
                    <Button
                        type="primary"
                        onClick={() => onOk({ accountSelected: accountSelected.name, ...accountSelected, lyDoKhongPheDuyet: lyDoKhongPheDuyet })}
                        disabled={!accountSelected || (!lyDoKhongPheDuyet || lyDoKhongPheDuyet.trim() === "")}
                    >
                        {okText}
                    </Button>
                </div>
            </div>
        </Modal>
    </Fragment>
}

export default CommonYeuCauBoXung;
