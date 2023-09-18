import React, { Fragment, useState, useEffect } from "react";
import { Modal, Form, Input, AutoComplete, Popover, Spin } from "antd";
import { useSelector } from "react-redux";
import * as main from "./../../../../constants/main";
import { ConvertHtmlToPdfBase64 } from "./../../../../actions";
import { ThemMoiCongViecVanBanDieuHanh } from "./../../../../actions/app/van_ban_dieu_hanh";
import * as message from "./../../../../constants/message";
import { CONST_BIEUMAU_TYPE } from "./../../../../constants/constants";
import { get } from "./../../../../util/api_call";
import { API_ACCOUNT, API_CAU_HINH } from "./../../../../constants/api";
import moment from "moment";

let timeout = null;
const TrinhKy = ({
    bieuMauType,
    entityId,
    bieuMau,
    callback,
    visible,
    onCancel,
}) => {
    const [loading, setLoading] = useState(false);

    const [nguoiNhanEmail, setNguoiNhanEmail] = useState(null);
    const [account, setAccount] = useState(null);
    const [noiDung, setNoiDung] = useState(null);
    const [accounts, setAccounts] = useState([]);

    const account_current = useSelector(state => state.core.account_current);

    useEffect(() => {
        setNguoiNhanEmail(account_current.email);
    }, [account_current.email])

    const findAccount = async (email) => {
        const res = await get({ url: API_ACCOUNT, data: { emailSearch: email } });
        setAccounts(res.status ? res.result : []);
    }

    const onChangeEmail = (email) => {
        setNguoiNhanEmail(email);
        setAccount(null);
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            findAccount(email);
        }, 500);
    }

    const onOk = async () => {
        const div = document.createElement("div");
        div.innerHTML = `${bieuMau.maHtml}${bieuMau.qrCode ? `<p><center><img src='${bieuMau.qrCode}' /></center></p>` : ''}`;
        if (div) {
            setLoading(true);
            const res = await ConvertHtmlToPdfBase64({ data: { fileName: bieuMau.tenBieuMau, html: div.innerHTML } });
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

            const tenHoSo = `${CONST_BIEUMAU_TYPE.data[bieuMauType].tenHoSo}`;
            const maHoSo = `${identityCode}.${moment().format("YYMMDD")}.${CONST_BIEUMAU_TYPE.data[bieuMauType].maHoSo}${bieuMau.id}`;
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

            if (res.status) {
                const base64 = res.result;
                const file_res = await fetch(base64);
                const blob = await file_res.blob();
                const file = new File([blob], `${bieuMau.tenBieuMau}.pdf`, { type: "application/pdf" })

                const data = new FormData();
                data.append("file", file);
                data.append("data", main.Base64.encode(JSON.stringify(_data)));
                data.append("maHoSo", maHoSo);
                data.append("entityId", entityId);
                data.append("entityType", bieuMauType);
                data.append("bieuMauId", bieuMau.id);
                data.append("nguoiGui", account_current.name);
                const res1 = await ThemMoiCongViecVanBanDieuHanh(data);
                if (res1.result && res1.result.error === 0) {
                    message.success({ content: "Đã trình ký văn bản" });
                    callback && callback(true)
                    _onCancel();
                }
                else {
                    message.error({ content: "Trình ký văn bản thất bại!" });
                    callback && callback(false)
                }
            }
            setLoading(false);
        }
    }

    const _onCancel = () => {
        if (!loading) {
            setNguoiNhanEmail(null);
            setNoiDung(null);
            onCancel()
        }
    }

    return <Fragment>
        <Modal
            key="modal-trinh-ky"
            style={{ top: 50 }}
            title={"Xác nhận trình ký văn bản!"}
            visible={visible}
            closable={!loading}
            onCancel={_onCancel}
            cancelButtonProps={{ disabled: loading }}
            cancelText={<Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>}
            onOk={onOk}
            okButtonProps={{ disabled: loading || !nguoiNhanEmail || nguoiNhanEmail.trim() === "" }}
            okText={<Fragment><i className="fa fa-check m-r-10" />Xác nhận trình ký văn bản</Fragment>}
            destroyOnClose
        >
            <Spin spinning={loading}>
                <div className="ant-form-inline">
                    <Form.Item labelCol={{ span: 8 }} label="Email người nhận" required>
                        <AutoComplete
                            value={nguoiNhanEmail}
                            dataSource={accounts.map(item => <AutoComplete.Option key={item.email} text={item.email} {...item}>
                                {item.email}
                            </AutoComplete.Option>)}
                            onSelect={(value, option) => {
                                setNguoiNhanEmail(value)
                                setAccount(option.props);
                            }}
                            onSearch={onChangeEmail}
                            style={{ width: "100%" }}
                        >
                            <Input
                                placeholder="Email người nhận"
                                addonAfter={<Fragment>
                                    <Popover content={account ? <Fragment>
                                        Tên người dùng: {account.fullName}
                                    Email: {account.email}
                                    </Fragment> : null}>
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

export default TrinhKy;