import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, arrayRemove, formValueSelector } from 'redux-form';
import * as formName from "./../../../../../constants/form_name";
// import CoSoPopupSearch from "./../../cuoc_thanh_tra/co_so_popup_search";
import * as constants from "./../../../../../constants/constants";
import { Table, Button, ConfigProvider, Empty } from "antd";
const TabCoSo = () => {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const fId = useSelector(state => formValueSelector(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA)(state, "id"));
    const fCoSoKinhDoanhs = useSelector(state => formValueSelector(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA)(state, "coSoKinhDoanhs")) || [];
    const onRemove = (index) => dispatch(arrayRemove(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA, "coSoKinhDoanhs", index))
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA, fieldName, value));
    const onAdd = () => {
        setVisible(true);
    };

    const renderData = () => {
        if (fCoSoKinhDoanhs) {
            return fCoSoKinhDoanhs.map((coSo, i) => {
                return {
                    key: i,
                    ...coSo,
                }
            })
        }
        return [];
    }
    const changeCoSo = (values) => {
        changeValue("coSoKinhDoanhs", values)
    }

    return (
        <React.Fragment>
            {/* <div className="col-md-12">
                <CoSoPopupSearch
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    form={formName.FORM_NAME_QTNVTT_KE_HOACH_THANH_TRA}
                    idCuocThanhKiemTra={fId}
                    coSoSelected={fCoSoKinhDoanhs.filter(cs => cs.idCoSo)}
                    onSelectCoSo={(values) => {
                        const oldCoSo = fCoSoKinhDoanhs.filter(cs => !cs.idCoSo);
                        const coSos = [
                            ...oldCoSo,
                            ...values.map((item) => {
                                return {
                                    ...item,
                                    tenLoaiHinhCoSo: item.danhSachLoaiHinhCoSo && Array.isArray(item.danhSachLoaiHinhCoSo) ? item.danhSachLoaiHinhCoSo.map(item => item.ten).toString() : "",
                                    tenDoanhNghiep: item.tenDangKyKinhDoanh,
                                    diaChi: item.diaDiemKinhDoanh,
                                    soGiayPhepDKKD: item.soGiayPhepDkkd,
                                    ngayCap: item.ngayCapGiayPhepDkkd,
                                    soChungNhanAttp: item.soChungNhanAttp
                                }
                            })
                        ]
                        changeCoSo(coSos);
                    }}
                    mode="multiple"
                />
                <ConfigProvider renderEmpty={() => <Empty description="Không có dữ liệu!" />}>
                    <Table
                        size="small"
                        pagination={false}
                        bordered
                        dataSource={renderData()}
                        columns={[
                            {
                                title: "STT",
                                width: 50,
                                align: "center",
                                render: (_, item, index) => {
                                    return index + 1;
                                }
                            },
                            {
                                title: "Tên cơ sở",
                                render: (_, item) => {
                                    return item.tenCoSo;
                                }
                            },
                            {
                                title: "Tên DKKD",
                                render: (_, item) => {
                                    return item.tenDoanhNghiep;
                                }
                            },
                            {
                                title: "Địa chỉ",
                                render: (_, item) => {
                                    return `${item.diaChi ? item.diaChi : ""} ${item.xaPhuong && item.xaPhuong.ten ? " - " + item.xaPhuong.ten : ""} ${item.quanHuyen && item.quanHuyen.ten ? " - " + item.quanHuyen.ten : ""} ${item.tinhThanh && item.tinhThanh.ten ? " - " + item.tinhThanh.ten : ""}`;
                                }
                            },
                            {
                                title: "Số điện thoại",
                                render: (_, item) => {
                                    return item.soDienThoai;
                                }
                            },
                            {
                                title: "Thao tác",
                                width: 120,
                                align: "center",
                                render: (_, item, index) => {
                                    return <React.Fragment>
                                        <Button shape="circle" type="danger" onClick={() => onRemove(index)}>
                                            <i className="fa fa-trash" />
                                        </Button>
                                    </React.Fragment>
                                }
                            }
                        ]}
                        title={() => {
                            return <React.Fragment>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Button type="primary" onClick={onAdd} size={constants.CONST_BTN_SIZE_DEFAULT} className="m-r-5">
                                            <i className="fa fa-plus m-r-5" /> Chọn cơ sở quản lý
                                    </Button>
                                    </div>
                                </div>
                            </React.Fragment>
                        }}
                    />
                </ConfigProvider>
            </div> */}
        </React.Fragment >
    );
}
export default TabCoSo;