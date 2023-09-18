import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CommonForm, CommonPagination, CommonTrinhPheDuyet as CommonChuyenXuLy, CommonTrinhPheDuyet } from "./../../../common";
import { Modal, Button, Spin, Table, Tabs, Alert } from "antd";
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import * as actLoaiHinhCoSo from "./../../../../actions/app/danh_muc/loai_hinh_co_so/loai_hinh_co_so";
import * as constants from "./../../../../constants/constants";
import * as formName from "./../../../../constants/form_name";
import { ThongTinCoSo, ThongTinDoanhNghiep, ThongTinChuCoSo, ThongTinGiayChungNhan } from "./form/";
import { AntIcon } from '../../../antd';
import { useLocation } from 'react-router';
import { queryString } from '../../../../constants/main';
import { allow, convertCoSo } from '../../../../pages/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/method';
import { getFormValues } from 'redux-form';

const CoSoSanXuatKinhDoanhForm = ({ handleBack }) => {
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [listCoSo, setListCoSo] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 10, total: 0 });
    const [loading, setLoading] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [visibleListHoSo, setVisibleListHoSo] = useState(false);
    const [item, setItem] = useState({});
    const [status, setStatus] = useState(0);

    const [chuyenXuLy, setChuyenXuLy] = useState({
        visible: false,
        data: null,
        onCancel: () => setChuyenXuLy(cxl => ({ ...cxl, visible: false, data: null })),
        onShow: (data) => setChuyenXuLy(cxl => ({ ...cxl, visible: true, data })),
    })

    const [trinhPheDuyet, setTrinhPheDuyet] = useState({
        visible: false,
        data: null,
        onCancel: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: false, data: null })),
        onShow: (data) => setTrinhPheDuyet(tpd => ({ ...tpd, visible: true, data })),
    })

    const co_so_san_xuat_kinh_doanh = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.co_so_san_xuat_kinh_doanh.item);
    const loai_hinh_co_so_list = useSelector(state => state.app.danh_muc.loai_hinh_co_so.list);
    const account_current = useSelector(state => state.core.account_current);
    const state = useSelector(state => state);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH)(state));
    const _allow = allow(formValues)(state);

    const dispatch = useDispatch();
    const getOneRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.getOneRequest(object));
    const createRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.updateRequest(object));
    const checkExistRequest = object => dispatch(actCoSoSanXuatKinhDoanh.checkExistRequest({ ...object, pageKey: `CO_SO_CHECK_EXIST` }));
    const getLoaiHinhCoSoTree = (object = {}) => dispatch(actLoaiHinhCoSo.getTreeRequest(object));
    const getLoaiHinhCoSoList = (object = {}) => dispatch(actLoaiHinhCoSo.getAllRequest(object));

    useEffect(() => {
        getLoaiHinhCoSoTree();
        getLoaiHinhCoSoList({ isPagination: false });
    }, []);

    useEffect(() => {
        if (qs.id) {
            setStatus(0);
            getOneRequest({
                data: { id: qs.id },
                requestSuccess: () => setStatus(1),
                requestError: (res) => setStatus(res && res.status && !res.result ? -2 : -1)
            });
        }
        else {
            setStatus(1);
            dispatch(actCoSoSanXuatKinhDoanh.handleGetOne({}));
        }
    }, [qs.id])

    const handleSubmit = (values, successCallback) => {
        if (values._tinhThanh && values._tinhThanh.trim() !== "") {
            values.tinhThanh = { ma: values._tinhThanh };
        }
        if (values._quanHuyen && values._quanHuyen.trim() !== "") {
            values.quanHuyen = { ma: values._quanHuyen };
        }
        if (values._xaPhuong && values._xaPhuong.trim() !== "") {
            values.xaPhuong = { ma: values._xaPhuong };
        }
        if (values.dsLoaiHinhCoSo) {
            let danhSachLoaiHinhCoSo = loai_hinh_co_so_list.filter(item => values.dsLoaiHinhCoSo.includes(item.id));
            values.danhSachLoaiHinhCoSo = danhSachLoaiHinhCoSo;
        }
        setItem(values);
        setLoading(true);
        console.log(values)
        checkExistRequest({
            data: {
                currentPage: 1,
                pageSize: 10,
                tenDoanhNghiep: values.tenDangKyKinhDoanh,
                tenCoSo: values.tenCoSo,
                ...(values.soGiayPhepDkkd ? { soGiayPhepDkkd: values.soGiayPhepDkkd } : {})
            },
            requestSuccess: (res) => {
                if (res && res.pagination && res.pagination.total > 0) {
                    setPagination(res.pagination);
                    setListCoSo(res.result);
                    setLoading(false);
                    setVisibleConfirm(true);
                }
                else {
                    if (values.hasOwnProperty("id")) {
                        updateRequest({
                            data: values,
                            requestSuccess: () => {
                                handleBack();
                                successCallback && typeof successCallback === "function" && successCallback();
                            }
                        });
                    }
                    else {
                        createRequest({
                            data: values,
                            requestSuccess: () => {
                                handleBack();
                                successCallback && typeof successCallback === "function" && successCallback();
                            }
                        });
                    }
                    setLoading(false);
                }
            },
            requestError: () => {
                if (values.hasOwnProperty("id")) {
                    updateRequest({
                        data: values,
                        requestSuccess: () => {
                            handleBack();
                            successCallback && typeof successCallback === "function" && successCallback();
                        }
                    });
                }
                else {
                    createRequest({
                        data: values,
                        requestSuccess: () => {
                            handleBack();
                            successCallback && typeof successCallback === "function" && successCallback();
                        }
                    });
                }
                setLoading(false);
            }
        })
    }

    const onSave = () => {
        if (item.hasOwnProperty("id")) {
            updateRequest({
                data: item,
                requestSuccess: () => {
                    setVisibleConfirm(false);
                    handleBack();
                }
            });
        }
        else {
            createRequest({
                data: item,
                requestSuccess: () => {
                    setVisibleConfirm(false);
                    handleBack();
                }
            });
        }
    }

    const xemHoSo = () => {
        setVisibleConfirm(false);
        setVisibleListHoSo(true);
    }

    return (
        <React.Fragment >
            <Modal
                onCancel={() => setVisibleConfirm(false)}
                visible={visibleConfirm}
                title="Cảnh báo"
                footer={[
                    <Button onClick={() => setVisibleConfirm(false)} type="default" key="1"><i className="fa fa-times m-r-5" />Hủy</Button>,
                    <Button onClick={xemHoSo} type="default" key="2"><i className="fa fa-eye m-r-5" />Xem hồ sơ</Button>,
                    <Button onClick={onSave} type="primary" key="3"><i className="fa fa-save m-r-5" />Lưu</Button>,
                ]}
            >
                Tìm thấy <b>{pagination.total}</b> cơ sở tương tự như cơ sở bạn muốn lưu.
            </Modal>
            <CommonChuyenXuLy
                visible={chuyenXuLy.visible}
                maPhongBans={[constants.CONST_PHONG_BAN.NGHIEPVU]}
                title="Chuyển xử lý"
                content="Bạn chắc chắn muốn chuyển xử lý?"
                onOk={({ name, maPhongBan, chucVu }) => {
                    const data = {
                        ...chuyenXuLy.data,
                        trangThaiChuyenHoSo: {
                            ...(chuyenXuLy.data.trangThaiChuyenHoSo || {}),
                            entityType: constants.CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.COSOSXKD,
                            entityId: chuyenXuLy.data.id,
                            nguoiXuLy: name,
                            chucVu,
                            phongBan: maPhongBan,
                            nguoiChuyen: account_current.name,
                        }
                    }
                    handleSubmit(convertCoSo(data, data.id ? constants.CONST_LUAN_CHUYEN.TRANSFER_HANDLING : constants.CONST_LUAN_CHUYEN.NEW_TRANSFER_HANDLING)(state), chuyenXuLy.onCancel);
                }}
                maPhongBanOptions={[constants.CONST_PHONG_BAN.NGHIEPVU]}
                onCancel={chuyenXuLy.onCancel}
            />

            <CommonTrinhPheDuyet
                visible={trinhPheDuyet.visible}
                onOk={({ name, maPhongBan, chucVu }) => {
                    const data = {
                        ...trinhPheDuyet.data,
                        trangThaiChuyenHoSo: {
                            ...(trinhPheDuyet.data.trangThaiChuyenHoSo || {}),
                            entityType: constants.CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.COSOSXKD,
                            entityId: trinhPheDuyet.data.id,
                            nguoiXuLy: name,
                            chucVu,
                            phongBan: maPhongBan,
                            nguoiChuyen: account_current.name,
                        }
                    }

                    handleSubmit(convertCoSo(data, constants.CONST_LUAN_CHUYEN.NEXT)(state), trinhPheDuyet.onCancel);
                }}
                onCancel={trinhPheDuyet.onCancel}
            />
            <Modal
                width={1000}
                onCancel={() => setVisibleListHoSo(false)}
                visible={visibleListHoSo}
                title="Danh sách cơ sở tương tự"
                okText={<React.Fragment><i className="fa fa-save m-r-5" />Lưu</React.Fragment>}
                onOk={onSave}
                cancelText={<React.Fragment><i className="fa fa-times m-r-5" />Hủy</React.Fragment>}
            >
                <Table
                    loading={loading}
                    columns={[
                        {
                            title: "STT",
                            render: (_, r, index) => {
                                const { currentPage, pageSize } = pagination;
                                return (currentPage - 1) * pageSize + index + 1;
                            },
                            width: 50
                        },
                        { title: "Tên doanh nghiệp", dataIndex: "tenDangKyKinhDoanh", width: 200 },
                        { title: "Tên cơ sở", dataIndex: "tenCoSo", width: 150 },
                        {
                            title: "Địa điểm kinh doanh",
                            render: (_, record) => {
                                return `${record.diaDiemKinhDoanh} 
                                ${record.xaPhuong && record.xaPhuong.ten ? ` - ${record.xaPhuong.ten}` : ""}
                                ${record.quanHuyen && record.quanHuyen.ten ? ` - ${record.quanHuyen.ten}` : ""}
                                ${record.tinhThanh && record.tinhThanh.ten ? ` - ${record.tinhThanh.ten}` : ""}`;
                            }
                        },
                        { title: "Số GP DKKD", dataIndex: "soGiayPhepDkkd", width: 150 }
                    ]}
                    dataSource={listCoSo}
                    size="small"
                    bordered
                    pagination={false}
                />
                <CommonPagination
                    firstLoad={false}
                    paginationKey="CO_SO_CHECK_EXIST"
                    onChange={(pagination) => {
                        setLoading(true)
                        checkExistRequest({
                            data: {
                                currentPage: pagination.currentPage,
                                pageSize: pagination.pageSize,
                                diaDiemKinhDoanh: item.diaDiemKinhDoanh,
                                tenDoanhNghiep: item.tenDangKyKinhDoanh,
                                tenCoSo: item.tenCoSo,
                                ...(item.soGiayPhepDkkd ? { soGiayPhepDkkd: item.soGiayPhepDkkd } : {})
                            },
                            requestSuccess: (res) => {
                                if (res && res.pagination && res.pagination.total > 0) {
                                    setPagination(res.pagination);
                                    setListCoSo(res.result);
                                    setLoading(false);
                                }
                                else {
                                    setLoading(false)
                                }
                            },
                            requestError: () => {
                                setLoading(false);
                            }
                        })
                    }}
                />
            </Modal>
            <Tabs activeKey={status === 0 ? "loading" : status < 0 ? "error" : "form"} animated={false} className="tab-none-title">
                <Tabs.TabPane key="loading">
                    <Alert showIcon icon={<AntIcon type="loading" />} type="info" message="Đang tải dữ liệu..." style={{ margin: 20 }} />
                </Tabs.TabPane>
                <Tabs.TabPane key="error">
                    <Alert showIcon icon={<AntIcon type="loading" />} type="error" message={status === -2 ? `Không tìm thấy đối tượng có id là ${qs.id}` : "Có lỗi xảy ra!"} style={{ margin: 20 }} />
                </Tabs.TabPane>
                <Tabs.TabPane key="form">
                    <Spin spinning={loading}>
                        <CommonForm
                            data={[
                                [//row
                                    {
                                        type: "custom",
                                        renderCustom: <div className="col-md-12" key="thong-tin-ho-so">
                                            <ThongTinCoSo />
                                        </div>
                                    }
                                ],
                                [//row
                                    {
                                        type: "custom",
                                        renderCustom: <div className="col-md-12" key="thong-tin-doanh-nghiep">
                                            <ThongTinDoanhNghiep />
                                        </div>
                                    }
                                ],
                                [//row
                                    {
                                        type: "custom",
                                        renderCustom: <div className="col-md-12" key="thong-tin-chu-co-so">
                                            <ThongTinChuCoSo />
                                        </div>
                                    }
                                ],
                                [//row
                                    {
                                        type: "custom",
                                        renderCustom: <div className="col-md-12" key="thong-tin-giay-chung-nhan">
                                            <ThongTinGiayChungNhan />
                                        </div>
                                    }
                                ],
                            ]}
                            actions={[
                                {
                                    htmlType: constants.FORM_HTML_TYPE_BUTTON,
                                    isSubmit: true,
                                    label: "Lưu và chuyển xử lý",
                                    icon: "fa fa-save",
                                    type: constants.CONST_TYPE_BTN_SUCCESS,
                                    handleClick: (data) => chuyenXuLy.onShow(data),
                                    hidden: !_allow.allowChuyenXuLy
                                },
                                {
                                    htmlType: constants.FORM_HTML_TYPE_BUTTON,
                                    isSubmit: true,
                                    label: "Lưu và trình phê duyệt",
                                    icon: "fa fa-save",
                                    type: constants.CONST_TYPE_BTN_SUCCESS,
                                    handleClick: (data) => trinhPheDuyet.onShow(data),
                                    hidden: !_allow.allowTrinhPheDuyet
                                },
                                {
                                    htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                                    label: co_so_san_xuat_kinh_doanh.hasOwnProperty("id") ? constants.FORM_BUTTON_LABEL_UPDATE : constants.FORM_BUTTON_LABEL_CREATE,
                                    icon: "fa fa-save",
                                    type: constants.CONST_TYPE_BTN_SUBMIT,
                                }
                            ]}
                            onSubmit={handleSubmit}
                            form={formName.FORM_NAME_CO_SO_SAN_XUAT_KINH_DOANH}
                            initialValues={{
                                tinhThanh: { ma: constants.CONST_DEFAULT_TINHTHANH.ma },
                                dsLoaiHinhCoSo: co_so_san_xuat_kinh_doanh && co_so_san_xuat_kinh_doanh.danhSachLoaiHinhCoSo
                                    ? co_so_san_xuat_kinh_doanh.danhSachLoaiHinhCoSo.map(item => item.id)
                                    : [],
                                trangThaiPheDuyet: constants.CONST_PHE_DUYET.CHOPHEDUYET,
                                trangThaiChuyenHoSo: {
                                    phongBan: account_current.managementDepartment,
                                    chucVu: account_current.regency,
                                    nguoiXuLy: account_current.name,
                                    nguoiChuyen: account_current.name,
                                    entityType: constants.CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.COSOSXKD
                                },
                                loaiCoSo: "COSO_BANATTP",
                                ...co_so_san_xuat_kinh_doanh
                            }}
                        />
                    </Spin>
                </Tabs.TabPane>
            </Tabs>
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhForm;