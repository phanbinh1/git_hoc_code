import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { untouch, touch, change, getFormValues, getFormSyncErrors } from "redux-form";
import { Button, Drawer, Table } from 'antd';
import { CommonFormContent, CommonTableAction, CommonFieldset } from "../../../common";
import * as actID from "../../../../constants/action_id";
import * as main from "../../../../constants/main";
import * as apiUrl from "../../../../constants/api";
import * as constants from "../../../../constants/constants";
import * as validate from "../../../../constants/validate";
import * as formName from "../../../../constants/form_name";
import * as message from "../../../../constants/message";
import * as modal from "../../../../constants/modal";
import { useLocation } from "react-router";

const ChiTieuGiamSat = ({ onClose, initValue = {} }) => {
    const [loaiThucPhamDefault] = useState(initValue.loaiThucPham ? initValue.loaiThucPham : undefined);
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state));
    const syncErrors = useSelector(state => getFormSyncErrors(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state))
    const dispatch = useDispatch();
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, fieldName, value));
    const onTouch = (fieldName) => dispatch(touch(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, fieldName));
    const onUnTouch = (fieldName) => dispatch(untouch(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, fieldName));

    useEffect(() => {
        changeValue("_chiTieu", initValue);
        return () => {
            onUnTouchField();
            changeValue("_chiTieu", {});
        }
    }, []);

    useEffect(() => {
        formValues && formValues.__chiTieu && formValues.__chiTieu.loaiThucPham && formValues.__chiTieu.loaiThucPham.id && changeValue("_chiTieu.loaiThucPham", formValues.__chiTieu.loaiThucPham.id);
        formValues && formValues.__chiTieu && formValues.__chiTieu.chiTieu && formValues.__chiTieu.chiTieu.id && changeValue("_chiTieu.chiTieu", formValues.__chiTieu.chiTieu.id);
    }, [formValues && formValues.__chiTieu])

    const checkIsPristine = () => {
        return main.deepDiffMapper.equal(initValue, formValues._chiTieu);
    }

    const onSave = () => {
        if (checkValidate()) {
            const chiTieu = formValues && formValues._chiTieu ? formValues._chiTieu : {};
            const _chiTieuGiamSatfkid = formValues && formValues.chiTieuGiamSatfkid && Array.isArray(formValues.chiTieuGiamSatfkid) ? formValues.chiTieuGiamSatfkid : [];
            if (chiTieu.hasOwnProperty("_index")) { // Cập nhật
                changeValue(`chiTieuGiamSatfkid[${chiTieu._index}]`, chiTieu);
            }
            else {   // Thêm mới
                changeValue(`chiTieuGiamSatfkid[${_chiTieuGiamSatfkid.length}]`, chiTieu);
            }
            typeof onClose === "function" && onClose();
        }
    };

    const onTouchField = () => {
        if (syncErrors && Object.keys(syncErrors).length > 0) {
            syncErrors._chiTieu && syncErrors._chiTieu.loaiThucPham && syncErrors._chiTieu.loaiThucPham.id && onTouch("_chiTieu.loaiThucPham.id");
            syncErrors._chiTieu && syncErrors._chiTieu.chiTieu && syncErrors._chiTieu.chiTieu.id && onTouch("_chiTieu.chiTieu.id");
        }
    };

    const onUnTouchField = () => {
        onUnTouch("_chiTieu.loaiThucPham.id");
        onUnTouch("_chiTieu.chiTieu.id");
        onUnTouch("_chiTieu.soMauDaLay");
        onUnTouch("_chiTieu.soMauChuaLay");
        onUnTouch("_chiTieu.tongSo");
        onUnTouch("_chiTieu.soMauDatChuan");
        onUnTouch("_chiTieu.soMauChuaDatChuan");
        onUnTouch("_chiTieu.trangThai");
        onUnTouch("_chiTieu.ketLuan");
    }

    const onReset = () => {
        onUnTouchField();
        changeValue("_chiTieu", initValue);
        changeValue("__chiTieu", { chiTieu: initValue.chiTieu, loaiThucPham: initValue.loaiThucPham });
    };

    const checkValidate = () => {
        if (syncErrors && syncErrors._chiTieu) {
            message.error({ content: "Vui lòng nhập đầy đủ thông tin!", key: constants.CONST_CONFIRM_DATA_MSG });
            onTouchField();
            return false;
        }
        else {
            return true;
        }
    }

    return <React.Fragment>
        <div id="drawer-chi-tieu-giam-sat">
            <CommonFormContent
                data={[
                    [
                        {
                            col: 6,
                            fieldType: "selectLoadMore",
                            searchKey: "searchString",
                            searchKeyExtend: "tenLoaiThucPham",
                            valueKey: "id",
                            labelKey: "tenLoaiThucPham",
                            label: "Nhóm thực phẩm",
                            placeholder: "Nhóm thực phẩm",
                            url: apiUrl.API_QL_DM_LOAI_THUC_PHAM,
                            selectDefaultValue: loaiThucPhamDefault,
                            name: "_chiTieu.loaiThucPham.id",
                            checkValid: true,
                            validates: [validate.VALIDATE_QTGSONTP_NGUY_CO_THUC_PHAM_REQUIRED],
                            getPopupContainer: () => document.getElementById("drawer-chi-tieu-giam-sat")
                        },
                        {
                            col: 3,
                            fieldType: "number",
                            label: "Số mẫu đã lấy",
                            placeholder: "Số mẫu đã lấy",
                            name: "_chiTieu.soMauDaLay",
                        },
                        {
                            col: 3,
                            fieldType: "number",
                            label: "Số mẫu chưa lấy",
                            placeholder: "Số mẫu chưa lấy",
                            name: "_chiTieu.soMauChuaLay",
                        },
                    ],
                    [
                        {
                            col: 6,
                            fieldType: "number",
                            label: "Số mẫu đạt chuẩn",
                            placeholder: "Số mẫu đạt chuẩn",
                            name: "_chiTieu.soMauDatChuan",
                        },
                        {
                            col: 6,
                            fieldType: "number",
                            label: "Số mẫu chưa đạt chuẩn",
                            placeholder: "Số mẫu chưa đạt chuẩn",
                            name: "_chiTieu.soMauChuaDatChuan",
                        },

                    ],
                    [
                        {
                            col: 6,
                            fieldType: "select",
                            options: [
                                { value: "Dat", label: "Đạt" },
                                { value: "ChuaDat", label: "Chưa Đạt" },
                                { value: "DaLayMau", label: "Đã lấy mẫu" },
                                { value: "ChuaLayMau", label: "Chưa lấy mẫu" },
                            ],
                            label: "Trạng thái",
                            placeholder: "Trạng thái",
                            name: "_chiTieu.trangThai",
                            getPopupContainer: () => document.getElementById("drawer-chi-tieu-giam-sat")
                        },
                        {
                            col: 6,
                            label: "Kết luận",
                            placeholder: "Kết luận",
                            name: "_chiTieu.ketLuan",
                        },
                    ],
                    [

                        {
                            col: 12,
                            label: "Ghi chú",
                            placeholder: "Ghi chú",
                            name: "_chiTieu.ghiChu",
                            fieldType: "textarea"
                        },
                    ],
                ]}
            />
            <div className="row" style={{ marginTop: 10, marginBottom: 10 }}>
                <div className="col-md-12" style={{ textAlign: "center" }}>
                    <Button type="primary" onClick={onSave} className="m-r-10">
                        <i className="fa fa-save m-r-10" />
                    Lưu
                </Button>
                    <Button type="default" onClick={onReset} disabled={checkIsPristine()}>
                        <i className="fa fa-refresh m-r-10" />
                    Làm mới
                </Button>
                </div>
            </div>
        </div>
    </React.Fragment>
}

const ChiTieuGiamSats = () => {
    const location = useLocation();
    const [_visibleChiTieuGiamSat, _setVisibleChiTieuGiamSat,] = useState(false);
    const [_chiTieuUpdate, _setChiTieuUpdate] = useState({});
    const formValues = useSelector(state => getFormValues(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA)(state));
    const permission_priviliged = useSelector(state => main.getPriviligeds(state.core.permission.menu, location.pathname));
    const dispatch = useDispatch();
    const changeValue = (fieldName, value) => dispatch(change(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, fieldName, value))

    const checkIsPristine = () => {
        return main.deepDiffMapper.equal(_chiTieuUpdate, formValues._chiTieu);
    }

    const renderAction = (item, index) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        onClick: () => {
                            _setChiTieuUpdate(item);
                            _setVisibleChiTieuGiamSat(true);
                        },
                        icon: "fa fa-pencil",
                        label: "Sửa"
                    },
                    {
                        confirm: true,
                        confrimLabel: "Bạn chắc chắn muốn xóa",
                        onClick: () => xoaChiTieuGiamSat(index),
                        icon: "fa fa-trash",
                        label: "Xóa"
                    }
                ]}
            />
        </React.Fragment>
    }

    const xoaChiTieuGiamSat = (index) => {
        let list = formValues.chiTieuGiamSatfkid;
        let result = [];
        result = list.filter((item, j) => index !== j);
        changeValue("chiTieuGiamSatfkid", result);
    }

    const columns = () => {
        return [
            {
                title: "STT",
                dataIndex: "stt",
                width: 50,
                align: "center"
            },
            {
                title: "Nhóm thực phẩm",
                dataIndex: "loaiThucPham.tenLoaiThucPham",
                className: "v-a-top",
                width: 160
            },
            {
                title: "Số mẫu đã lấy",
                dataIndex: "soMauDaLay",
                width: 160,
                align: "center"
            },
            {
                title: "Số mẫu chưa lấy",
                dataIndex: "soMauChuaLay",
                className: "v-a-top",
                width: 160
            },
            {
                title: "Số mẫu đạt chuẩn",
                dataIndex: "soMauDatChuan",
                width: 150,
                align: "center"
            },
            {
                title: "Số mẫu chưa đạt chuẩn",
                dataIndex: "soMauChuaDatChuan",
                className: "v-a-top",
                width: 150
            },
            {
                title: "Trạng thái",
                dataIndex: "trangThai",
                className: "v-a-top",
                width: 160
            },
            {
                title: "Kết luận",
                dataIndex: "ketLuan",
                className: "v-a-top",
                width: 160
            },
            {
                title: "Ghi chú",
                dataIndex: "ghiChu",
                width: 150,
                align: "center"
            },
            {
                title: "Thao tác",
                dataIndex: "actions",
                className: "v-a-top",
                fixed: "right",
                align: "center",
                width: 140
            },
        ]
    }

    const data = () => {
        const _chiTieuGiamSats = formValues && formValues.chiTieuGiamSatfkid && Array.isArray(formValues.chiTieuGiamSatfkid) ?
            formValues.chiTieuGiamSatfkid :
            [];
        return _chiTieuGiamSats.map((item, index) => {
            return {
                ...item,
                key: index,
                _index: index,
                actions: renderAction({ ...item, _index: index }, index)
            };
        });
    };

    return <React.Fragment>
        {
            permission_priviliged.findIndex(item => item.idChucNang === actID.ACT_ID_DOT_KIEM_TRA.ACT_CHI_TIEU_GIAM_SAT_CREATE) !== -1 &&
            <CommonFieldset title="Chỉ tiêu giám sát">
                <Button
                    className="m-r-10"
                    type="primary"
                    onClick={() => {
                        _setVisibleChiTieuGiamSat(true)
                        _setChiTieuUpdate({});
                    }}
                >
                    <i className="fa fa-plus" />Thêm chỉ tiêu giám sát
                    </Button>
            </CommonFieldset>
        }
        <Table
            columns={columns()}
            dataSource={data()}
            scroll={{ x: 1390 }}
            size="small"
            bordered
            pagination={false}
            className="table-custom"
        />
        <Drawer
            title={<React.Fragment><i className="fa fa-list m-r-10" />Chỉ tiêu giám sát</React.Fragment>}
            placement="right"
            onClose={() => {
                if (checkIsPristine()) {
                    _setVisibleChiTieuGiamSat(false)
                }
                else {
                    modal.confirm(
                        "Thông báo!",
                        <div>
                            Dữ liệu thay đổi nhưng chưa được lưu.<br />
                            Bạn chắc chắn muốn đóng?
                        </div>,
                        () => _setVisibleChiTieuGiamSat(false)
                    )
                }
            }}
            visible={_visibleChiTieuGiamSat}
            destroyOnClose
            width={800}

        >
            <ChiTieuGiamSat
                onClose={() => _setVisibleChiTieuGiamSat(false)}
                initValue={{ ..._chiTieuUpdate }}
            />
        </Drawer>
    </React.Fragment >
}

export default ChiTieuGiamSats;