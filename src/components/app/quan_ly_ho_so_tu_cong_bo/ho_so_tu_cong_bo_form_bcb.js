import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import { Tooltip, Divider, Drawer, Descriptions, Tabs, Alert } from "antd";
import { dateFormat, dateTimeFormat } from "./../../../constants/controll";
import { CommonAttachments, CommonForm, CommonAddress } from "./../../common";
import CoSoSanXuatKinhDoanhPopupSearch from "./../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_popup_search";
import moment from "moment";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import * as constants from "./../../../constants/constants";
import * as formName from "./../../../constants/form_name";
import * as validate from "./../../../constants/validate";
import ListSanPham from './list_san_pham';
import {
    createNotifi,
    NOTIFI_CODE_HSTCB_MTN
} from '../../core/account_current/notification';
import { useLocation } from 'react-router';
import { queryString } from '../../../constants/main';
import { AntIcon } from '../../antd';

const HoSoTuCongBoForm = ({ handleBack }) => {
    const { CONST_LUAN_CHUYEN } = constants;
    const { RECEIVE } = CONST_LUAN_CHUYEN;
    const [searchText, setSearchText] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleDetail, setVisibleDetail] = useState(false);
    const [addressInit, setAddressInit] = useState(null);
    const [status, setStatus] = useState(0);

    const location = useLocation();
    const qs = queryString.parse(location.search);

    const ho_so_tu_cong_bo = useSelector(state => state.app.quan_ly_ho_so_tu_cong_bo.ho_so_tu_cong_bo.item);
    const account_current = useSelector(state => state.core.account_current);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_HO_SO_TU_CONG_BO)(state));

    const dispatch = useDispatch();
    const getOneRequest = (object = {}) => dispatch(actHoSoTuCongBo.getOneRequest(object));
    const createRequest = (object = {}) => dispatch(actHoSoTuCongBo.createRequest(object))
    const updateRequest = (object = {}) => dispatch(actHoSoTuCongBo.updateRequest(object))
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_HO_SO_TU_CONG_BO, fieldName, value))

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
            dispatch(actHoSoTuCongBo.handleGetOne({}));
        }
    }, [qs.id])

    const handleSubmit = (values) => {
        const data = { ...values, loaiCongBo: constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO };
        if (data.hasOwnProperty("id")) {
            let lichSuLuanChuyen = [];
            try {
                lichSuLuanChuyen = JSON.parse(data.lichSuLuanChuyen);
                if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
            }
            catch (e) { lichSuLuanChuyen = []; }

            updateRequest({
                data: {
                    entity: data,
                    listAttachFileId: []
                },
                requestSuccess: () => {
                    handleBack();
                }
            });
        }
        else {
            let lichSuLuanChuyen = [];
            lichSuLuanChuyen.unshift({
                maXuLy: RECEIVE,
                nguoiXyLy: account_current.fullName,
                username: account_current.name,
                lyDo: null,
                thoiGian: moment().format(dateTimeFormat)
            })
            createRequest({
                data: {
                    entity: data,
                    listAttachFileId: data.files ? data.files.filter(item => item && item.status === "done").map(item => item.uid) : []
                },
                requestSuccess: (res) => {
                    const item = res.result;
                    handleBack();
                    // CREATE_NOTIFICATION
                    createNotifi({
                        maThongBao: NOTIFI_CODE_HSTCB_MTN,
                        chucVus: [constants.CONST_CHUC_VU.CHUYENVIEN],
                        phongBans: [constants.CONST_PHONG_BAN.NGHIEPVU],
                        noiDungChiTiet: {
                            id: item.id,
                            tenDangKyKinhDoanh: item.tenDangKyKinhDoanh,
                        }
                    })
                }
            });
        }
    }

    const onSearchCoSo = () => {
        const tenCoSo = formValues && formValues.tenCoSo ? formValues.tenCoSo : "";
        setSearchText(tenCoSo);
        setVisibleModal(true);
    }

    const capNhatThongTinCoSo = ({
        id = "",
        tenCoSo = "",
        diaDiemKinhDoanh = "",
        tenDangKyKinhDoanh = "",
        diaChiTruSo = "",
        soDienThoai = "",
        soGiayPhepDkkd = "",
        ngayCapGiayPhepDkkd = "",
        soChungNhanAttp = "",
        ngayCapChungNhanAttp = "",
        ngayHetHanChungNhanAttp = "",
        hoSoMotCuaId = "",
        tinhThanh = "",
        quanHuyen = "",
        xaPhuong = "",
    }) => {
        changeValue("coSoId", id);
        changeValue("tenCoSo", tenCoSo);
        changeValue("diaDiemKinhDoanh", diaDiemKinhDoanh);
        changeValue("tenDangKyKinhDoanh", tenDangKyKinhDoanh);
        changeValue("diaChiTruSo", diaChiTruSo);
        changeValue("soDienThoai", soDienThoai);
        changeValue("soGiayPhepDkkd", soGiayPhepDkkd);
        changeValue("ngayCapGiayPhepDkkd", ngayCapGiayPhepDkkd);
        changeValue("soChungNhanAttp", soChungNhanAttp);
        changeValue("ngayCapChungNhanAttp", ngayCapChungNhanAttp);
        changeValue("ngayHetHanChungNhanAttp", ngayHetHanChungNhanAttp);
        changeValue("hoSoMotCuaId", hoSoMotCuaId);
        changeValue("tinhThanh", tinhThanh);
        changeValue("quanHuyen", quanHuyen);
        changeValue("xaPhuong", xaPhuong);
        setAddressInit({ tinhThanh, quanHuyen, xaPhuong })
    }

    const coSoSelected = formValues && formValues.coSoId ? [{
        id: formValues.coSoId,
        idCoSo: formValues.coSoId,
        tenCoSo: formValues.tenCoSo,
    }] : [];

    const isTiepNhan = account_current.managementDepartment === constants.CONST_PHONG_BAN.VANPHONG;

    const getTrangThaiHoSoDefault = () => {
        const { CONST_TRANG_THAI_HO_SO } = constants;
        const { managementDepartment, regency } = account_current;
        if (!ho_so_tu_cong_bo.id) {
            return CONST_TRANG_THAI_HO_SO.MOITIEPNHAN;
        }

        if (managementDepartment === constants.CONST_PHONG_BAN.NGHIEPVU && regency === constants.CONST_CHUC_VU.CHUYENVIEN) {
            if (ho_so_tu_cong_bo.trangThaiHoSo === CONST_TRANG_THAI_HO_SO.MOITIEPNHAN) {
                return CONST_TRANG_THAI_HO_SO.DATIEPNHAN;
            }
        }
        return ho_so_tu_cong_bo.trangThaiHoSo;
    }

    return <Fragment>
        <Drawer visible={visibleDetail} title={<Fragment><i className="fa fa-info-circle m-r-10" /> Thông tin cơ sở</Fragment>} onClose={() => setVisibleDetail(false)} width={500}>
            {formValues && <CoSoDetail {...formValues} />}
        </Drawer>
        <CoSoSanXuatKinhDoanhPopupSearch
            form={formName.FORM_NAME_HO_SO_TU_CONG_BO}
            onCancel={() => setVisibleModal(false)}
            onSelectCoSo={(item) => capNhatThongTinCoSo(item)}
            visible={visibleModal}
            searchText={searchText}
            coSoSelected={coSoSelected}
        />
        <Tabs activeKey={status === 0 ? "loading" : status < 0 ? "error" : "form"} animated={false} className="tab-none-title">
            <Tabs.TabPane key="loading">
                <Alert showIcon icon={<AntIcon type="loading" />} type="info" message="Đang tải dữ liệu..." style={{ margin: 20 }} />
            </Tabs.TabPane>
            <Tabs.TabPane key="error">
                <Alert showIcon icon={<AntIcon type="loading" />} type="error" message={status === -2 ? `Không tìm thấy đối tượng có id là ${qs.id}` : "Có lỗi xảy ra!"} style={{ margin: 20 }} />
            </Tabs.TabPane>
            <Tabs.TabPane key="form">
                <CommonForm
                    data={[
                        [
                            {
                                col: 3,
                                label: <Fragment>
                                    Tên cơ sở
                                <Tooltip title="Chọn từ danh sách quản lý" key="search">
                                        <i className="fa fa-plus c-pointer m-l-10" onClick={onSearchCoSo} />
                                    </Tooltip>
                                </Fragment>,
                                name: "tenCoSo",
                                placeholder: "Tên cơ sở",
                                checkValid: true,
                                validates: [validate.VALIDATE_HS_TCB_CO_SO_REQUIRED],
                                readOnly: formValues && formValues.coSoId,
                                suffix: <React.Fragment>
                                    {
                                        formValues && formValues.coSoId && < Tooltip title="Xóa cơ sở" key="delete">
                                            <i className="fa fa-times-circle m-l-10 c-pointer" onClick={capNhatThongTinCoSo} style={{ color: "#bbb" }} />
                                        </Tooltip>
                                    }
                                </React.Fragment>,
                                allowClear: !formValues || !formValues.coSoId
                            },
                            {
                                col: 3,
                                label: "Số điện thoại",
                                name: "soDienThoai",
                                placeholder: "Số điện thoại",
                                disabled: formValues && formValues.coSoId
                            },
                            {
                                col: 3,
                                label: "Số giấy chứng nhận ATTP",
                                name: "soChungNhanAttp",
                                placeholder: "Số giấy chứng nhận ATTP",
                                disabled: formValues && formValues.coSoId
                            },
                            {
                                col: 3,
                                label: "Ngày cấp",
                                fieldType: "date",
                                name: "ngayCapChungNhanAttp",
                                placeholder: "Ngày cấp",
                                disabled: formValues && formValues.coSoId
                            }
                        ],
                        [
                            {
                                type: "custom",
                                renderCustom: <CommonAddress
                                    form={formName.FORM_NAME_HO_SO_TU_CONG_BO}
                                    tinhThanh={{ name: "tinhThanh.ma", }}
                                    quanHuyen={{ name: "quanHuyen.ma" }}
                                    xaPhuong={{ name: "xaPhuong.ma" }}
                                    diaChi={{ name: "diaDiemKinhDoanh" }}
                                    disabled={formValues && formValues.coSoId}
                                    dataInit={addressInit}
                                />
                            }
                        ],
                        [//row
                            {
                                col: 3,
                                label: "Người nộp",
                                placeholder: "Người nộp",
                                name: "nguoiNopHoSo",
                                checkValid: true,
                                validates: [validate.VALIDATE_HS_TCB_NGUOI_NOP_REQUIRED]
                            },
                            {
                                col: 3,
                                fieldType: "select",
                                label: "Trạng thái hồ sơ",
                                placeholder: "Trạng thái hồ sơ",
                                name: "trangThaiHoSo",
                                allowClear: false,
                                options: constants.CONST_TRANG_THAI_HO_SO.tuCongBoOption[ho_so_tu_cong_bo.trangThaiHoSo || constants.CONST_TRANG_THAI_HO_SO.MOITIEPNHAN],
                                checkValid: true,
                                validates: [validate.VALIDATE_HS_TCB_THOI_TRANG_THAI_HO_SO_REQUIRED],
                                hidden: account_current.managementDepartment === constants.CONST_PHONG_BAN.VANPHONG && getTrangThaiHoSoDefault() === constants.CONST_TRANG_THAI_HO_SO.MOITIEPNHAN
                            },
                            {
                                col: 3,
                                fieldType: "date",
                                label: "Ngày tiếp nhận",
                                placeholder: "Ngày tiếp nhận",
                                name: "ngayTiepNhan",
                                checkValid: true,
                                validates: [validate.VALIDATE_HS_TCB_NGAY_TIEP_NHAN_REQUIRED]
                            },
                        ],
                        [
                            {
                                type: "custom",
                                renderCustom: <div className="col-md-12" key="list-sp">
                                    <Divider orientation="left">Danh sách sản phẩm</Divider>
                                    <ListSanPham
                                        add={!ho_so_tu_cong_bo.hasOwnProperty("id")}
                                        form={formName.FORM_NAME_HO_SO_TU_CONG_BO}
                                        fieldName="danhSachSanPhamCongBo"
                                        loaiCongBo={constants.CONST_LOAI_CONG_BO_SAN_PHAM.BANCONGBO}
                                        checkMin={true}
                                        isTiepNhan={isTiepNhan}
                                        isUpdate={ho_so_tu_cong_bo.hasOwnProperty("id")}
                                    />
                                </div>
                            }
                        ],
                        [//row
                            {
                                col: 6,
                                label: "Số giấy xác nhận công bố",
                                placeholder: "Số giấy xác nhận công bố",
                                name: "soGiayXacNhanCongBo",
                                hidden: isTiepNhan,
                            },
                            {
                                col: 6,
                                fieldType: "date",
                                label: "Ngày cấp xác nhận công bố",
                                placeholder: "Ngày cấp xác nhận công bố",
                                name: "ngayCapXacNhanCongBo",
                                hidden: isTiepNhan,
                            }
                        ],
                        [
                            {
                                type: "custom",
                                renderCustom: <div className="col-md-12" key="attch-file">
                                    <Divider orientation="left">Tài liệu đính kèm:</Divider>
                                    <CommonAttachments
                                        entityId={!ho_so_tu_cong_bo.hasOwnProperty("id") ? null : ho_so_tu_cong_bo.id}
                                        attachEntityType={constants.CONST_ATTACH_TYPE.HOSO_CONGBOSANPHAM}
                                        onChange={(files) => {
                                            if (!ho_so_tu_cong_bo.hasOwnProperty("id")) {
                                                changeValue("files", files);
                                            }
                                        }}
                                        listFile={ho_so_tu_cong_bo && ho_so_tu_cong_bo.id ? [] : (formValues && formValues.files && formValues.files ? formValues.files : [])}
                                    />
                                </div>,
                            }
                        ],
                        [//row
                            {
                                col: 12,
                                fieldType: "textarea",
                                label: "Trích yếu",
                                placeholder: "Trích yếu",
                                name: "trichYeu",
                            }
                        ],
                        [//row
                            {
                                col: 12,
                                fieldType: "textarea",
                                label: "Ghi chú",
                                placeholder: "Ghi chú",
                                name: "ghiChu",
                            }
                        ],
                    ]}
                    actions={[
                        {
                            htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                            label: ho_so_tu_cong_bo.hasOwnProperty("id") ?
                                constants.FORM_BUTTON_LABEL_UPDATE :
                                "Lưu",
                            icon: "fa fa-save",
                            type: constants.CONST_TYPE_BTN_SUBMIT,
                        }
                    ]}
                    onSubmit={handleSubmit}
                    form={formName.FORM_NAME_HO_SO_TU_CONG_BO}
                    initialValues={{
                        tinhThanh: { ma: constants.CONST_DEFAULT_TINHTHANH.ma },
                        ketQuaHauKiem: constants.CONST_KET_QUA_THAM_DINH.CHOHOANTHIEN,
                        ngayTiepNhan: moment().format(dateFormat),
                        trangThaiChuyenHS: {
                            entityType: constants.CONST_TYPE_TRANG_THAI_CHUYEN_HO_SO.HOSOTUCONGBO,
                            chucVu: constants.CONST_CHUC_VU.CHUYENVIEN,
                            phongBan: constants.CONST_PHONG_BAN.VANPHONG
                        },
                        danhSachSanPhamCongBo: [{}],
                        ...ho_so_tu_cong_bo,
                        trangThaiHoSo: getTrangThaiHoSoDefault()
                    }}
                />
            </Tabs.TabPane>
        </Tabs>
    </Fragment>
}

export const CoSoDetail = ({
    coSoId,
    tenCoSo,
    diaDiemKinhDoanh,
    tenDangKyKinhDoanh,
    diaChiTruSo,
    soDienThoai,
    soGiayPhepDkkd,
    ngayCapGiayPhepDkkd,
    soChungNhanAttp,
    ngayCapChungNhanAttp,
    ngayHetHanChungNhanAttp,
    tinhThanh,
    quanHuyen,
    xaPhuong
}) => {
    return <Fragment>
        <Descriptions size="small" column={1}>
            <Descriptions.Item label="Tên cơ sở">{tenCoSo}</Descriptions.Item>
            <Descriptions.Item label="Tên đăng ký kinh doanh">{tenDangKyKinhDoanh}</Descriptions.Item>
            <Descriptions.Item label="Địa điểm kinh doanh">{diaDiemKinhDoanh}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ trụ sở">{diaChiTruSo}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{soDienThoai}</Descriptions.Item>
            <Descriptions.Item label="Số giấy phép ĐKKD">{soGiayPhepDkkd}</Descriptions.Item>
            <Descriptions.Item label="Ngày cấp">{ngayCapGiayPhepDkkd}</Descriptions.Item>
            <Descriptions.Item label="Số chứng nhận ATTP">{soChungNhanAttp}</Descriptions.Item>
            <Descriptions.Item label="Ngày cấp">{ngayCapChungNhanAttp}</Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">{ngayHetHanChungNhanAttp}</Descriptions.Item>
        </Descriptions>
    </Fragment>
}

export default HoSoTuCongBoForm;