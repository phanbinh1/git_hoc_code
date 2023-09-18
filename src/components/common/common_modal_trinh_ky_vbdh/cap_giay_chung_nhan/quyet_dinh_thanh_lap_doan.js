import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Select, Form, Input, AutoComplete, Popover, Spin } from "antd";
import * as main from "./../../../../constants/main";
import { ThemMoiCongViecVanBanDieuHanhByHoSoCapGCN } from "./../../../../actions/app/van_ban_dieu_hanh";
import * as message from "./../../../../constants/message";
import { get } from "./../../../../util/api_call";
import { API_CAU_HINH } from "./../../../../constants/api";
import { CONST_QLKHTDCGCN_LOAI_QUYET_DINH, CONST_VBDH_CONFIG } from "./../../../../constants/constants";
import moment from "moment";

const ModalTrinhKy = ({
    visible,
    onCancel,
    callback,
    id
}) => {
    const [loaiQuyetDinh, setLoaiQuyetDinh] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const [nguoiNhanEmail, setNguoiNhanEmail] = useState(null);
    const [account, setAccount] = useState(null);
    const [noiDung, setNoiDung] = useState(null);

    const account_current = useSelector(state => state.core.account_current);
    const accounts = useSelector(state => state.core.account.profiles) || [];

    useEffect(() => {
        setNguoiNhanEmail(account_current.email);
    }, [visible, account_current.email])

    const onOk = async () => {
        setLoading(true);
        const cauhinh = await get({ url: `${API_CAU_HINH}/ma/vanbandieuhanh_info` })
        const _data = {}
        let identityCode = "000.00.02.H17";
        if (cauhinh.status && cauhinh.result) {
            const __data = JSON.parse(cauhinh.result.giaTri);
            const { coQuanQuanLy } = __data;
            if (coQuanQuanLy && coQuanQuanLy.identityCode) {
                identityCode = coQuanQuanLy.identityCode;
            }
            _data.idCoQuan = __data.account.idCoQuan;
            _data.idDonVi = __data.account.idDonVi;
            _data.maCoQuan = __data.account.maCoQuan;
            _data.password = __data.account.password;
            _data.loaiHoSo = __data.account.loaiHoSo;
        }
        else {
            _data.idCoQuan = 15;
            _data.idDonVi = 15;
            _data.maCoQuan = 15;
            _data.password = "b24331b1a138cde62aa1f679164fc62f";
            _data.loaiHoSo = 101;
        }

        const tenHoSo = `${CONST_VBDH_CONFIG.QDTLDTD.tenHoSo} - ${id}`;
        const maHoSo = `${identityCode}.${moment().format("YYMMDD")}.${CONST_VBDH_CONFIG.QDTLDTD.maHoSo}${id}`;
        const nguoiTaoCongViecEmail = account_current.email;
        /**
         *  Data Test
         *  "nguoiTaoCongViecEmail": "admin_stttt@danang.gov.vn",
         *  "nguoiNhanEmail": "duongdtt@danang.gov.vn",
         *  "noiDung": "Chuyển dương xl cccccc",
         */
        _data.tenHoSo = tenHoSo
        _data.maHoSo = maHoSo;
        _data.nguoiTaoCongViecEmail = nguoiTaoCongViecEmail;
        _data.nguoiNhanEmail = nguoiNhanEmail;
        _data.noiDung = noiDung;

        const data = new FormData();
        data.append("data", main.Base64.encode(JSON.stringify(_data)));
        data.append("maHoSo", maHoSo);
        data.append("hoSoId", id);
        data.append("loaiQuyetDinh", loaiQuyetDinh);
        data.append("nguoiGui", account_current.name);
        const res1 = await ThemMoiCongViecVanBanDieuHanhByHoSoCapGCN(data);
        if (res1.result && res1.result.error === 0) {
            message.success({ content: "Đã trình ký văn bản" });
            onCancel()
            callback && callback(true)
        }
        else {
            message.error({ content: "Trình ký văn bản thất bại!" });
            callback && callback(false)
        }
        setLoading(false);
    }

    return <Fragment>
        <Modal
            key="modal-trinh-ky"
            style={{ top: 50 }}
            title={"Xác nhận trình ký văn bản!"}
            visible={visible}
            closable={!loading}
            onCancel={() => {
                if (!loading) {
                    setNguoiNhanEmail(null);
                    setNoiDung(null);
                    onCancel()
                }
            }}
            cancelButtonProps={{ disabled: loading }}
            cancelText={<Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>}
            onOk={onOk}
            okButtonProps={{ disabled: loading || !nguoiNhanEmail || nguoiNhanEmail.trim() === "" || !loaiQuyetDinh }}
            okText={<Fragment><i className="fa fa-check m-r-10" />Xác nhận trình ký văn bản</Fragment>}
            destroyOnClose
        >
            <Spin spinning={loading}>
                <div className="ant-form-inline">
                    <Form.Item labelCol={{ span: 8 }} label="Loại quyết định" required>
                        <Select
                            style={{ width: "100%" }}
                            onChange={value => setLoaiQuyetDinh(value)}
                            placeholder="Vui lòng chọn loại quyết định"
                            value={loaiQuyetDinh}
                            getPopupContainer={e => main.findFirstScrollParent(e)}
                        >
                            {
                                CONST_QLKHTDCGCN_LOAI_QUYET_DINH.options.map((item, i) => <Select.Option key={i} value={item.value}>
                                    {item.label}
                                </Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 8 }} label="Email người nhận" required>
                        <AutoComplete
                            value={nguoiNhanEmail}
                            getPopupContainer={e => main.findFirstScrollParent(e)}
                            dataSource={accounts.map(item => <AutoComplete.Option key={item.email} value={item.email} text={item.email} {...item}>
                                {item.fullName}
                            </AutoComplete.Option>)}
                            onSelect={(value, option) => {
                                setNguoiNhanEmail(value)
                                setAccount(option.props);
                            }}
                            style={{ width: "100%" }}
                        >
                            <Input
                                placeholder="Email người nhận"
                                addonAfter={<Fragment>
                                    <Popover content={account ? <Fragment>
                                        Tên người dùng: {account.fullName}
                                    Email: {account.email}
                                    </Fragment> : null}
                                        getPopupContainer={e => main.findFirstScrollParent(e)}>
                                        <i className="fa fa-info-circle" disabled={!account} />
                                    </Popover>
                                </Fragment>}
                            />
                        </AutoComplete>
                    </Form.Item>
                    <Form.Item labelCol={{ span: 8 }} label="Nội dung">
                        <Input.TextArea
                            value={noiDung}
                            onChange={e => setNoiDung(e.target.value)}
                            placeholder="Nội dung"
                        />
                    </Form.Item>
                </div>
            </Spin>
        </Modal>
    </Fragment>
}
export default ModalTrinhKy;