import React, { Fragment, useState, useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
import AccountSelect from "./accounts_select";
import PhongBanSelect from "./phong_ban_select";
import ChucVuSelect from "./chuc_vu_select";

const CommonModalBack = ({
    visible,
    onCancel,
    onOk,
    okText = <Fragment><i className="fa fa-check-circle m-r-10" />Xác nhận</Fragment>,
    cancelText = <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
    title = "Bạn chắc chắn muốn yêu cầu bổ sung?",
    content = "Vui lòng nhập lý do",
    maPhongBans,
    chucVus,
    nguoiXuLy,
    notifications
}) => {
    const [lyDo, setLyDo] = useState(null);
    const [accountSelected, setAccountSelected] = useState(nguoiXuLy || null);
    const [_nguoiNhans, _setNguoiNhans] = useState([]);

    const [phongBanValues, setPhongBanValues] = useState(maPhongBans || []);
    const [chucVusValues, setChucVuValues] = useState(chucVus || []);

    useEffect(() => {
        setAccountSelected(nguoiXuLy || null);
    }, [nguoiXuLy])

    useEffect(() => {
        setPhongBanValues(Array.isArray(maPhongBans) ? maPhongBans : []);
    }, [maPhongBans])

    useEffect(() => {
        setChucVuValues(Array.isArray(chucVus) ? chucVus : []);
    }, [chucVus])

    useEffect(() => {
        setLyDo(null);
    }, [visible])

    return <Fragment>
        <Modal
            key="modalNotConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">{title}</span>
                    <div className="ant-modal-confirm-content">
                        <Form layout="inline" labelCol={{ span: 7 }}>
                            <Form.Item label="Phòng ban">
                                <PhongBanSelect
                                    value={phongBanValues.filter(pb => pb)}
                                    onChange={values => setPhongBanValues(values)}
                                />
                            </Form.Item>
                            <Form.Item label="Chức vụ">
                                <ChucVuSelect
                                    phongBans={phongBanValues.filter(pb => pb)}
                                    value={chucVusValues.filter(cv => cv)}
                                    onChange={values => setChucVuValues(values)}
                                />
                            </Form.Item>
                            <Form.Item label="Người tiếp nhận">
                                <AccountSelect
                                    value={accountSelected}
                                    maPhongBans={phongBanValues.filter(pb => pb)}
                                    chucVus={chucVusValues.filter(cv => cv)}
                                    onChange={accountSelected => setAccountSelected(accountSelected)}
                                />
                            </Form.Item>
                            <Form.Item label="Lý do">
                                <Input.TextArea
                                    placeholder="Lý do"
                                    value={lyDo}
                                    onChange={e => setLyDo(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                        <NotificationExtend
                            nguoiNhans={_nguoiNhans}
                            setNguoiNhans={_setNguoiNhans}
                            notifications={notifications}
                        />
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button type="danger" disabled={!lyDo || lyDo.trim() === ""} onClick={() => {
                        onOk({
                            lyDo,
                            _nguoiNhans,
                            accountSelected,
                        });
                    }}>
                        {okText}
                    </Button>
                    <Button onClick={onCancel}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </Modal>
    </Fragment>
}

const NotificationExtend = ({
    setNguoiNhans,
    notifications
}) => {
    return notifications ? <Fragment>
        <div className="m-t-10">
            {notifications.content || "Người nhận thông báo"}
        </div>
        <AccountSelect
            mode="multiple"
            maPhongBans={notifications.maPhongBans && Array.isArray(notifications.maPhongBans) ? notifications.maPhongBans : undefined}
            chucVus={notifications.chucVus && Array.isArray(notifications.chucVus) ? notifications.chucVus : undefined}
            onChange={nguoiNhans => setNguoiNhans(nguoiNhans)}
        />
    </Fragment> : null;
}
export default CommonModalBack;