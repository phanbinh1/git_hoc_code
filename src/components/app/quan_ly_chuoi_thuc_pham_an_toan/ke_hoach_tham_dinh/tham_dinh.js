import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Descriptions, Tag, Tabs, Table, Button, Drawer, Spin } from "antd";
import { CommonForm } from "./../../../common";
import DanhSachMau from "./danh_sach_mau";
import moment from 'moment';
import * as validate from "./../../../../constants/validate";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import * as actBienBanThamDinh from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/bien_ban_tham_dinh";
import { dateFormat } from "./../../../../constants/controll";

const ThongTinHoSo = ({ hoSo }) => {
    return <React.Fragment>
        <Descriptions layout="vertical" bordered size="small">
            <Descriptions.Item label="Tên doanh nghiệp" span={2}>
                {hoSo.tenDangKyKinhDoanh}
            </Descriptions.Item>
            <Descriptions.Item label="Tên cơ sở" >
                {hoSo.tenCoSo}
            </Descriptions.Item>

            <Descriptions.Item label="Địa điểm kinh doanh" span={3}>
                {hoSo.diaDiemKinhDoanh}
                {hoSo.xaPhuong && hoSo.xaPhuong.ten ? ` - ${hoSo.xaPhuong.ten}` : ""}
                {hoSo.quanHuyen && hoSo.quanHuyen.ten ? ` - ${hoSo.quanHuyen.ten}` : ""}
                {hoSo.tinhThanh && hoSo.tinhThanh.ten ? ` - ${hoSo.tinhThanh.ten}` : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ trụ sở" span={3}>
                {hoSo.diaChiTruSo}
            </Descriptions.Item>

            <Descriptions.Item label="Số điện thoại">
                {hoSo.soDienThoai}
            </Descriptions.Item>
            <Descriptions.Item label="Nhóm chuỗi thực phẩm">
                {hoSo.nhomChuoiThucPham.tenNhom}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tiếp nhận" >
                {hoSo.ngayTiepNhan}
            </Descriptions.Item>

            <Descriptions.Item label="Giấy phép ĐKKD">
                {hoSo.soGiayPhepDkkd}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cấp" span={2}>
                {hoSo.ngayCapGiayPhepDkkd}
            </Descriptions.Item>

            <Descriptions.Item label="Số chứng nhận ATTP">
                {hoSo.soChungNhanAttp}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cấp" >
                {hoSo.ngayCapChungNhanAttp}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn" >
                {hoSo.ngayHetHanChungNhanAttp}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày tiếp nhận" >
                {hoSo.ngayTiepNhan}
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú" span={3}>
                {hoSo.ghiChu}
            </Descriptions.Item>
        </Descriptions>
    </React.Fragment>
}

const DanhSachBienBan = ({
    danhSachBienBan,
    handleCreate,
    handleEdit
}) => {
    const renderKetQua = (ketQua) => {
        const objKetQua = constants.CONST_KET_QUA_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_OPTIONS.find(o => o.value === ketQua) || { label: "" };
        return (
            <span>
                <Tag color={objKetQua.color} key={ketQua}>
                    {objKetQua.label.toUpperCase()}
                </Tag>
            </span>
        )
    };
    return <React.Fragment>
        <Table
            bordered
            pagination={false}
            size="small"
            title={() => (<React.Fragment>
                <Button type="primary" onClick={handleCreate} >
                    <i className="fa fa-plus m-r-5" />
                    Thêm biên bản
                </Button>
            </React.Fragment>)}
            onRow={(item, index) => {
                return {
                    onClick: () => {
                        handleEdit({ ...item, _lan: index + 1 })
                    }
                }
            }}
            columns={[
                {
                    dataIndex: "index",
                    title: "#"
                },
                {
                    dataIndex: "ngayLapBienBan",
                    title: "Ngày lập biên bản",
                },
                {
                    dataIndex: "daiDienCoSo",
                    title: "Đại diện cơ sở",
                },
                {
                    dataIndex: "truongDoanThamDinh",
                    title: "Trưởng đoàn",
                },
                {
                    dataIndex: "ketQua",
                    title: "Kết quả",
                },
            ]}
            dataSource={danhSachBienBan.map((item, index) => {
                return {
                    key: index,
                    ...item,
                    index: `Lần ${index + 1}`,
                    ketQua: renderKetQua(item.ketQuaThamDinh)
                }
            })}
        />
    </React.Fragment>
}

const ThamDinh = ({ hoSo, danhSachBienBan = [] }) => {
    const [activeKey, setActiveKey] = useState("DANH_SACH_BIEN_BAN");
    const [bienBanActiveKey, setBienBanActiveKey] = useState("BIEN_BAN_THAM_DINH");
    const [visibleForm, setVisibleForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bienBan, setBienBan] = useState({});
    const [dsBienBan, setDsBienBan] = useState(danhSachBienBan)
    const dispatch = useDispatch();
    const getBienBan = (object = {}) => dispatch(actBienBanThamDinh.getOneRequest(object))

    const handleCreate = () => {
        setBienBan({ _lan: dsBienBan.length + 1 });
        setVisibleForm(true);
    };

    const handleEdit = (item) => {
        setLoading(true);
        getBienBan({
            data: {
                id: item.id
            },
            requestSuccess: (res) => {
                setBienBan({ ...res.result, _lan: item._lan });
                setVisibleForm(true);
                setLoading(false);
            },
            requestError: () => {
                setLoading(false);
            }
        })
    };

    return (
        <React.Fragment>
            <Spin spinning={loading} size="large">
                <Tabs activeKey={activeKey} onChange={key => setActiveKey(key)}>
                    <Tabs.TabPane key="THONG_TIN_HO_SO" tab="Thông tin hồ sơ">
                        <ThongTinHoSo hoSo={hoSo} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="DANH_SACH_BIEN_BAN" tab="Danh sách biên bản" >
                        <DanhSachBienBan
                            danhSachBienBan={dsBienBan}
                            handleCreate={handleCreate}
                            handleEdit={handleEdit}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Spin>
            <Drawer
                title={`Biên bản thẩm định - Lần ${bienBan._lan}`}
                visible={visibleForm}
                onClose={() => {
                    setVisibleForm(false);
                    setBienBanActiveKey("BIEN_BAN_THAM_DINH");
                }}
                width={1000}
                destroyOnClose
            >
                <Tabs activeKey={bienBanActiveKey} onChange={key => setBienBanActiveKey(key)}>
                    <Tabs.TabPane key="BIEN_BAN_THAM_DINH" tab="Biên bản">
                        <BienBanForm
                            hoSoChuoiThucPham={hoSo}
                            bienBan={bienBan}
                            onClose={() => setVisibleForm(false)}
                            setDsBienBan={setDsBienBan}
                            dsBienBan={dsBienBan}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="DANH_SACH_MAU" tab="Danh sách mẫu" disabled={!bienBan.id} >
                        <DanhSachMau
                            onClose={() => {
                                setVisibleForm(false);
                                setBienBanActiveKey("BIEN_BAN_THAM_DINH");
                            }}
                            setDsBienBan={setDsBienBan}
                            dsBienBan={dsBienBan}
                            bienBan={bienBan}
                            danhSachMauThamDinhChuoiThucPham={bienBan.danhSachMauThamDinhChuoiThucPham}
                        />
                    </Tabs.TabPane>
                </Tabs>

            </Drawer>
        </React.Fragment>
    );
}

const BienBanForm = ({
    bienBan,
    hoSoChuoiThucPham,
    onClose,
    setDsBienBan,
    dsBienBan
}) => {
    const dispatch = useDispatch();
    const create = (object) => dispatch(actBienBanThamDinh.createRequest(object));
    const update = (object) => dispatch(actBienBanThamDinh.updateRequest(object));
    const handleSubmit = (values) => {
        if (bienBan && bienBan.id) {
            update({
                data: values,
                requestSuccess: (res) => {
                    typeof onClose === "function" && onClose();
                    setDsBienBan(dsBienBan.map((item) => item.id === res.result.id ? res.result : item
                    ));
                },
                requestError: () => { }
            })
        }
        else {
            create({
                data: values,
                requestSuccess: (res) => {
                    typeof onClose === "function" && onClose();
                    setDsBienBan([...dsBienBan, res.result]);
                },
                requestError: () => { }
            })
        }

    }
    return <React.Fragment>
        <CommonForm
            data={[
                [//row
                    {
                        col: 4,
                        label: "Trưởng đoàn",
                        placeholder: "Trưởng đoàn",
                        name: "truongDoanThamDinh",
                        checkValid: true,
                        validates: [validate.VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_TRUONG_DOAN_REQUIRED]
                    },
                    {
                        col: 4,
                        label: "Đại diện cơ sở",
                        placeholder: "Đại diện cơ sở",
                        name: "daiDienCoSo",
                        checkValid: true,
                        validates: [validate.VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_DAI_DIEN_CO_SO_REQUIRED]
                    },
                    {
                        col: 4,
                        label: "Ngày lập biên bản",
                        placeholder: "Ngày lập biên bản",
                        name: "ngayLapBienBan",
                        fieldType: "date",
                        checkValid: true,
                        validates: [validate.VALIDATE_KE_HOACH_THAM_DINH_HO_SO_CTP_BIEN_BAN_NGAY_LAP_REQUIRED]
                    }
                ],
                [//row
                    {
                        col: 4,
                        label: "Kết luận điều kiện ATTP",
                        placeholder: "Kết luận điều kiện ATTP",
                        name: "ketLuanDieuKienAttp",
                        fieldType: "textarea",
                        autoSize: true
                    },
                    {
                        col: 4,
                        label: "Kết luận đối chiếu hồ sơ",
                        placeholder: "Kết luận đối chiếu hồ sơ",
                        name: "ketLuanDoiChieuHoSo",
                        fieldType: "textarea",
                        autoSize: true
                    },
                    {
                        col: 4,
                        fieldType: "select",
                        label: "Kết quả",
                        placeholder: "Kết quả",
                        name: "ketQuaThamDinh",
                        options: constants.CONST_KET_QUA_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_OPTIONS,
                    }
                ],
                [//row
                    {
                        col: 6,
                        label: "Kiến nghị",
                        placeholder: "Kiến nghị",
                        name: "kienNghi",
                        fieldType: "textarea",
                        autoSize: true
                    },
                    {
                        col: 6,
                        label: "Nhận xét",
                        placeholder: "Nhận xét",
                        name: "nhanXetDieuKienAttp",
                        fieldType: "textarea",
                        autoSize: true
                    }
                ],
                [//row
                    {
                        col: 12,
                        label: "Ghi chú",
                        placeholder: "Ghi chú",
                        name: "ghiChu",
                        fieldType: "textarea",
                    }
                ]
            ]}
            actions={[
                {
                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                    label: "Thẩm định",
                    icon: "fa fa-save",
                    type: constants.CONST_TYPE_BTN_SUBMIT,
                }
            ]}
            onSubmit={handleSubmit}
            form={formName.FORM_NAME_KE_HOACH_THAM_DINH_THAM_DINH}
            showSetup={false}
            initialValues={{
                ketQuaThamDinh: constants.CONST_KET_QUA_THAM_DINH_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP_OPTIONS[2].value,
                ngayLapBienBan: moment(moment().toDate()).format(dateFormat),
                hoSoChuoiThucPham,
                danhSachMauThamDinhChuoiThucPham: [],
                ...bienBan
            }}
        />
    </React.Fragment>
}

export default ThamDinh;