import React, { Fragment, useState, useEffect } from "react";
import { Modal, Form, Input, AutoComplete, Popover, Spin, Table } from "antd";
import { useSelector } from "react-redux";
import * as main from "../../../../constants/main";
import { getFiles } from "../../../../actions";
import { ThemMoiCongViecVanBanDieuHanh_KeHoachGiamSatATTP_QuyetDinh } from "../../../../actions/app/van_ban_dieu_hanh";
import * as message from "../../../../constants/message";
import { CONST_VBDH_CONFIG } from "../../../../constants/constants";
import { get } from "../../../../util/api_call";
import { API_ACCOUNT, API_CAU_HINH } from "../../../../constants/api";
import moment from "moment";

let timeout = null;
const TrinhKy = ({
    entityId,
    callback,
    visible,
    onCancel,
    attachEntityType
}) => {

    const [files, setFiles] = useState([]);
    useEffect(() => {
        if (visible && entityId) {
            getFiles({
                data: {
                    attachEntityType,
                    entityId,
                },
                requestSuccess: (res) => {
                    const list = res.result;
                    if (Array.isArray(list)) {
                        setFiles(list.map(item => ({ ...item, uid: item.id })));
                    }
                }
            })
            setTenHoSo(`${CONST_VBDH_CONFIG.QDGSATTP.tenHoSo} ${entityId}`);
        }
    }, [entityId, visible]);

    const account_current = useSelector(state => state.core.account_current);

    const [rowSelecteds, setRowSelecteds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);

    const [tenHoSo, setTenHoSo] = useState(`${CONST_VBDH_CONFIG.QDGSATTP.tenHoSo} ${entityId}`);
    const [nguoiNhanEmail, setNguoiNhanEmail] = useState(account_current.email);
    const [noiDung, setNoiDung] = useState(null);

    useEffect(() => {
        setNguoiNhanEmail(account_current.email);
    }, [visible, account_current.email])

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

        const maHoSo = `${identityCode}.${moment().format("YYMMDD")}.${CONST_VBDH_CONFIG.QDGSATTP.maHoSo}${entityId}`;
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

        const data = {
            data: main.Base64.encode(JSON.stringify(_data)),
            idFiles: rowSelecteds.map(item => item.id),
            id: entityId,
            maHoSo,
            nguoiGui: account_current.name
        }
        const res = await ThemMoiCongViecVanBanDieuHanh_KeHoachGiamSatATTP_QuyetDinh(data);
        if (res.result && res.result.error === 0) {
            message.success({ content: "Đã trình ký văn bản" });
            callback && callback(true)
            _onCancel();
        }
        else {
            message.error({ content: "Trình ký văn bản thất bại!" });
            callback && callback(false)
        }
        setLoading(false);
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
            onOk={() => {
                rowSelecteds.length === 0 ?
                    Modal.confirm({
                        title: "Cảnh báo",
                        content: <Fragment>
                            Chưa có tài liệu nào được chọn<br />
                        Bạn chắc chắn muốn trình ký?
                    </Fragment>,
                        onOk,
                        okText: <Fragment><i className="fa fa-check m-r-5" />Đồng ý</Fragment>,
                        cancelText: <Fragment><i className="fa fa-times m-r-5" />Huỷ</Fragment>,
                    })
                    : onOk()
            }}
            okButtonProps={{ disabled: loading || !tenHoSo || tenHoSo.trim() === "" || !nguoiNhanEmail || nguoiNhanEmail.trim() === "" }}
            okText={<Fragment><i className="fa fa-check m-r-10" />Xác nhận trình ký văn bản</Fragment>}
            destroyOnClose
        >
            <Spin spinning={loading}>
                <div className="ant-form-inline">
                    <Form.Item labelCol={{ span: 8 }} label="Tên hồ sơ" required>
                        <Input
                            value={tenHoSo}
                            onChange={e => setTenHoSo(e.target.value)}
                            placeholder="Tên hồ sơ"
                        />
                    </Form.Item>
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
                    <Form.Item >
                        <Table
                            rowSelection={{
                                selectedRowKeys: rowSelecteds.map(item => item.id),
                                onChange: (keys, rows) => setRowSelecteds(rows)
                            }}
                            rowKey="id"
                            className="m-t-10"
                            pagination={false}
                            size="small"
                            columns={[
                                {
                                    title: "STT",
                                    render: (t, r, i) => i + 1,
                                    align: "center"
                                },
                                {
                                    title: "Tên file",
                                    dataIndex: "name"
                                }
                            ]}
                            dataSource={files}
                        />
                    </Form.Item>
                </div>
            </Spin>
        </Modal>
    </Fragment>
}

export default TrinhKy;