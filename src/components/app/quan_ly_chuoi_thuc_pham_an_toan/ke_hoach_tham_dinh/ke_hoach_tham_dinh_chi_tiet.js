import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Descriptions, Spin, Alert, Button, Table, Tag, Badge, Popover } from 'antd';
import * as actions from "./../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";

const HoSoCapGiayChungNhanDetail = ({ queryVariable }) => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});
    const [itemHoSo, setItemHoSo] = useState({});
    const [error, setError] = useState(false);
    const [errorLabel, setErrorLabel] = useState(false);
    const [reload, setReload] = useState(false);

    const dispatch = useDispatch();
    const getOneRequest = (value = {}) => dispatch(actions.getOneRequest(value));
    const getAllHoSoThamDinhRequest = (value = {}) => dispatch(actions.getAllHoSoThamDinhRequest(value));

    const getItem = id => {
        let searchData = { idKeHoachThamDinh: parseInt(id) };
        getOneRequest({
            data: { id },
            requestSuccess: (res) => {
                setLoading(false);
                if (res && res.result) {
                    setError(false);
                    setItem(res.result);
                    setReload(false);
                }
                else {
                    setError(true);
                    setErrorLabel(`Không tìm thấy hồ sơ có id là ${id}`);
                    setReload(true);
                }
            },
            requestError: () => {
                setLoading(false);
                setError(true);
                setReload(false);
            }
        });

        getAllHoSoThamDinhRequest({
            data: { searchData: main.parseObjectToParams(searchData) },
            isPagination: false,
            requestSuccess: (res) => {
                setLoading(false);
                if (res && res.result) {
                    setError(false);
                    setItemHoSo(res.result);
                    setReload(false);
                }
                else {
                    setError(true);
                    setErrorLabel(`Không tìm thấy hồ sơ có id là ${id}`);
                    setReload(true);
                }
            },
            requestError: () => {
                setLoading(false);
                setError(true);
                setReload(false);
            }
        })
    }

    useEffect(() => {
        if (queryVariable.id) {
            getItem(queryVariable.id);
        }
        else {
            setError(true);
            setErrorLabel(`Đường dẫn không hợp lệ`);
        }
    }, [queryVariable.id]);

    const renderTrangThaiHoSo = (trangThaiHoSo) => {
        const trangThai = constants.CONST_TRANG_THAI_HO_SO.options.find(o => o.value === trangThaiHoSo);
        return trangThai ? <Tag color={trangThai.color} key={trangThaiHoSo}>
            {trangThai.label.toUpperCase()}
        </Tag> : "";
    };

    const renderTrangThaiPheDuyet = (keHoach) => {
        const trangThai = constants.CONST_PHE_DUYET.options.find(item => item.value === keHoach.trangThaiPheDuyet);
        if (trangThai && trangThai.value === constants.CONST_PHE_DUYET.KHONGPHEDUYET) {
            return <Tag color={trangThai.color}>
                {trangThai.label.toLocaleUpperCase()}
                <Popover
                    title="Lý do không phê duyệt"
                    content={keHoach.lyDoKhongPheDuyet}
                    trigger={"click"}
                    overlayClassName="popover-warning"
                >
                    <Badge status="processing" color="red" className="m-l-10 c-pointer" />
                </Popover>
            </Tag>
        }
        else {
            return trangThai ? <Tag color={trangThai.color}>{trangThai.label.toLocaleUpperCase()}</Tag> : null;
        }
    }

    return (
        <React.Fragment>
            <div style={{ margin: 20 }}>
                {
                    error ?
                        <Alert
                            type="error"
                            message="Thông báo lỗi"
                            description={<React.Fragment>
                                {errorLabel}
                                {reload &&
                                    <Button type="danger" onClick={() => {
                                        if (queryVariable.id) {
                                            getItem(queryVariable.id);
                                        }
                                    }}>
                                        <i className="fa fa-refresh m-r-5" />Thử lại
                                    </Button>
                                }
                            </React.Fragment>}
                        />
                        : <Spin spinning={loading}>
                            <Divider orientation="left">Thông tin kế hoạch</Divider>
                            <Descriptions column={3} size="small" bordered >
                                <Descriptions.Item label="Ngày bắt đầu">{item.ngayBatDau}</Descriptions.Item>
                                <Descriptions.Item label="Ngày kết thúc">{item.ngayKetThuc}</Descriptions.Item>
                                <Descriptions.Item label="Số kế hoạch">{item.soKeHoach}</Descriptions.Item>

                                <Descriptions.Item label="Quyết định">{item.quyetDinh}</Descriptions.Item>
                                <Descriptions.Item label="Ngày kí">{item.ngayKyQuyetDinh}</Descriptions.Item>
                                <Descriptions.Item label="Người ký">{item.nguoiKyQuyetDinh}</Descriptions.Item>

                                <Descriptions.Item label="Trạng thái phê duyệt">{renderTrangThaiPheDuyet(item)}</Descriptions.Item>
                                <Descriptions.Item label="Ngày phê duyệt">{item.ngayPheDuyet}</Descriptions.Item>
                                <Descriptions.Item label="Người phê duyệt">{item.nguoiPheDuyet}</Descriptions.Item>

                                <Descriptions.Item label="Tên kế hoạch" span={3}>{item.tenKeHoach}</Descriptions.Item>

                            </Descriptions>

                            <Divider orientation="left">Thông tin hồ sơ</Divider>
                            {
                                <Table
                                    size="small"
                                    loading={loading}
                                    pagination={false}
                                    className="table-custom"
                                    scroll={{ x: "300%", y: "calc(100vh - 200px)" }}
                                    columns={[
                                        { dataIndex: "stt", title: "STT", align: "center", width: 50 },
                                        { dataIndex: "chuHoSo", title: "Chủ hồ sơ" },
                                        { dataIndex: "cmnd", title: "CMND" },
                                        { dataIndex: "coQuanTiepNhan", title: "Cơ quan tiếp nhận" },
                                        { dataIndex: "diaChiThuongTru", title: "Địa chỉ thường trú", align: "center" },
                                        { dataIndex: "diaChiTruSo", title: "Địa chỉ Trụ sở" },
                                        { dataIndex: "dienThoaiChuHoSo", title: "Điện thoại chủ hồ sơ" },
                                        { dataIndex: "hoSoMotCuaId", title: "Hồ sơ một cửa" },
                                        { dataIndex: "loaiHoSoCapGiayChungNhan", title: "Loại hồ sơ cấp giấy chứng nhận", align: "center" },
                                        { dataIndex: "lyDoCapDoi", title: "Lý do cấp đổi" },
                                        { dataIndex: "maHoSoMotCua", title: "Mã hồ sơ một cửa" },
                                        { dataIndex: "maSoBienNhan", title: "Mã số biên nhận" },
                                        { dataIndex: "ngayHenTra", title: "Ngày hẹn trả", align: "center" },
                                        { dataIndex: "ngayTiepNhan", title: "Ngày tiếp nhận" },
                                        { dataIndex: "trangThaiHoSo", title: "Trạng thái hồ sơ" },
                                        { dataIndex: "trichYeu", title: "Trích yếu" },
                                    ]}
                                    dataSource={(itemHoSo && Array.isArray(itemHoSo) ? itemHoSo : []).map((item, index) => {
                                        return {
                                            key: item.id,
                                            ...item,
                                            trangThaiHoSo: renderTrangThaiHoSo(item.trangThaiHoSo),
                                            stt: index + 1,
                                        };
                                    })}
                                />
                            }
                        </Spin>
                }
            </div>
        </React.Fragment>
    );
}

export default HoSoCapGiayChungNhanDetail;