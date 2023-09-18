import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HoSoTuCongBoList from "./ho_so_tu_cong_bo_list";
import HoSoTuCongBoForm from "./ho_so_tu_cong_bo_form";
import * as act from "./../../../actions/index";
import * as actID from "./../../../constants/action_id";
import * as url from "./../../../constants/url";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";
import * as messages from "./../../../constants/message";
import * as actKeHoachHauKiem from "./../../../actions/app/quan_ly_cong_tac_hau_kiem/cong_tac_hau_kiem";
import { convertListHoSo, getAllowAction } from '../../../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo';
import { CommonTrinhPheDuyet, CommonTrinhPheDuyet as CommonChuyenXuLy, CommonModalBack, CommonPheDuyet } from '../../common';
import { queryString } from "./../../../constants/main";
import * as actHoSoTuCongBo from "./../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import { createNotifi, NOTIFI_CODE_HSTCB_YCCDBSHS, NOTIFI_CODE_HSTCB_CXL, NOTIFI_CODE_HSTCB_DPD, NOTIFI_CODE_HSTCB_KPD, NOTIFI_CODE_HSTCB_TPD, NOTIFI_CODE_HSTCB_YCBS } from '../../core/account_current/notification';
import { useHistory, useLocation } from 'react-router';
import { Tabs, Form, Modal, Upload, Button, Typography } from "antd";
const { CONST_PHE_DUYET, CONST_PHONG_BAN, CONST_CHUC_VU } = constants;
const { NGHIEPVU } = CONST_PHONG_BAN;
const { CHUYENVIEN } = CONST_CHUC_VU;
const { DAPHEDUYET, KHONGPHEDUYET, CHOBOSUNG, CHOPHEDUYET } = CONST_PHE_DUYET;

const HoSoTuCongBo = ({
    pageKey,
    handleCreate,
    handleDelete,
    handleSearch,
    handleBack,
    queryVariable,
    onSelectRow,
    loaiCongBo,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleEdit,
    selectedRowKeys,
    handleAllRequest,
    handleImport
}) => {
    const state = useSelector(state => state);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const selected = main.getItemSelected(rows_selected, pageKey);
    const [fileName, setFileName] = useState("");
    const history = useHistory();
    const location = useLocation();
    const qs = main.queryString.parse(location.search);
    const fresh = (qs.fresh && typeof qs.fresh === "string" && !isNaN(qs.fresh)) ? parseInt(qs.fresh, 0) : 0;
    const hoSoDeletes = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return !allow.allowDelete;
    });
    const hoSoTrinhPheDuyets = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return allow.allowTrinhPheDuyet;
    });
    const hoSoChuyenXuLys = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return allow.allowChuyenXuLy;
    });
    const hoSoYeuCauBoSungs = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return allow.allowYeuCauBoSung;
    });
    const hoSoPheDuyets = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return allow.allowPheDuyet;
    });

    const [trinhPheDuyet, setTrinhPheDuyet] = useState({
        visible: false,
        hoSos: [],
        key: main.createID(),
        maPhongBans: null,
        chucVus: null,
        onCancel: () => setTrinhPheDuyet(tpd => ({ ...tpd, visible: false })),
        onShow: ({ hoSos }) => setTrinhPheDuyet(tpd => {
            const _cvlhs = hoSos.length > 0 ? convertListHoSo(hoSos, CHOPHEDUYET)(state).trangThaiChuyenHS : null;
            const maPhongBans = _cvlhs ? [_cvlhs.phongBan] : null;
            const chucVus = _cvlhs ? [_cvlhs.chucVu] : null;
            return { ...tpd, visible: true, key: main.createID(), hoSos, maPhongBans, chucVus };
        }),
    });

    const [chuyenXuLy, setChuyenXuLy] = useState({
        visible: false,
        hoSos: [],
        key: main.createID(),
        maPhongBans: null,
        chucVus: null,
        onCancel: () => setChuyenXuLy(cxl => ({ ...cxl, visible: false })),
        onShow: ({ hoSos }) => setChuyenXuLy(cxl => {
            const _cvlhs = hoSos.length > 0 ? convertListHoSo(hoSos, "CXL")(state).trangThaiChuyenHS : null;
            const maPhongBans = _cvlhs ? [_cvlhs.phongBan] : null;
            const chucVus = _cvlhs ? [_cvlhs.chucVu] : null;
            return { ...cxl, visible: true, key: main.createID(), hoSos, maPhongBans, chucVus };
        }),
    });

    const [yeuCauBoSung, setYeuCauBoSung] = useState({
        visible: false,
        hoSos: [],
        key: main.createID(),
        maPhongBans: null,
        chucVus: null,
        onCancel: () => setYeuCauBoSung(ycbs => ({ ...ycbs, visible: false })),
        onShow: ({ hoSos }) => setYeuCauBoSung(ycbs => {
            const _cvlhs = hoSos.length > 0 ? convertListHoSo(hoSos, CHOBOSUNG)(state).trangThaiChuyenHS : null;
            const maPhongBans = _cvlhs ? [_cvlhs.phongBan] : null;
            const chucVus = _cvlhs ? [_cvlhs.chucVu] : null;
            return { ...ycbs, visible: true, key: main.createID(), hoSos, maPhongBans, chucVus };
        }),
    });

    const [pheDuyet, setPheDuyet] = useState({
        visible: false,
        hoSos: [],
        key: main.createID(),
        maPhongBans: null,
        chucVus: null,
        onCancel: () => setPheDuyet(pd => ({ ...pd, visible: false })),
        onShow: ({ hoSos }) => setPheDuyet(pd => ({ ...pd, visible: true, key: main.createID(), hoSos })),
    });

    const dispatch = useDispatch();
    const updateListHoSo = (object = {}) => dispatch(actKeHoachHauKiem.updateListHoSo(object));
    const updateListRequest = (object = {}) => dispatch(actHoSoTuCongBo.updateListRequest(object));
    const uploadRequest = (object = {}) => dispatch(actHoSoTuCongBo.uploadRequest(object));
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const props = {
        beforeUpload: () => false,
        onChange: ({ file }) => setFile(file),
        fileList: file ? [file] : [],
        showUploadList: false,
        name: "file"
    };

    const onCancel = () => {
        history.replace({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST }) })
        setFile(null)
    };

    useEffect(() => {
        if (file) {
            setFileName(file.name.indexOf(".") === -1 ? file.name : file.name.substr(0, file.name.lastIndexOf('.')));
        } else {
            setFileName("");
        }
    }, [file])

    useEffect(() => {
        onSetAction();
    }, [
        qs.fresh,
        qs.action,
        selected
    ])

    useEffect(() => {
        if (qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_KE_HOACH_UPDATE_LIST) {
            if (queryVariable.ke_hoach_id && !isNaN(queryVariable.ke_hoach_id) && !isNaN(parseInt(queryVariable.ke_hoach_id, 0))) {
                const arrIdStr = queryVariable.arr_id ? queryVariable.arr_id : "";
                const arrId = arrIdStr.split(",");
                let _arrId = [];
                arrId.map((idStr) => {
                    if (!isNaN(idStr) && !isNaN(parseInt(idStr, 0))) {
                        _arrId.push(parseInt(idStr, 0));
                    }
                    return null;
                })
                onSelectRow(_arrId);
            }
            else {
                history.go(-1);
            }
        }
    }, [qs.action])

    const onUpdateList = () => {
        const ids = selected;
        const idKeHoach = parseInt(qs.ke_hoach_id, 0);
        updateListHoSo({
            data: {
                idKeHoach,
                hoSoTuCongBoIds: ids.map(item => item.id)
            },
            requestSuccess: () => {
                history.go(-1);
            }
        })
    }

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionUpdateList());
        arrAction.push(renderActionThongBaoCongBoSanPham());
        arrAction.push(renderActionTrinhPheDuyet());
        arrAction.push(renderActionPheDuyet());
        arrAction.push(renderActionYeuCauBoSung());
        arrAction.push(renderActionChuyenXuLy());
        arrAction.push(renderActionImport());
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionImport = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_IMPORT;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST;
        result.handleClick = handleImport;
        result.type = constants.CONST_TYPE_BTN_SUCCESS;
        return result;
    }

    const renderActionTrinhPheDuyet = () => {
        let result = {};
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_TRINH_PHE_DUYET;
        result.disabled = hoSoTrinhPheDuyets.length === 0;
        result.handleClick = () => trinhPheDuyet.onShow({ hoSos: hoSoTrinhPheDuyets });
        result.type = constants.CONST_TYPE_BTN_CREATE;
        result.text = `Trình phê duyệt ${hoSoTrinhPheDuyets.length > 0 ? `(${hoSoTrinhPheDuyets.length})` : ""}`;
        result.onMouseEnter = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach(tr => {
                if (hoSoTrinhPheDuyets.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }
        result.onMouseLeave = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (hoSoTrinhPheDuyets.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }
        return result;
    }

    const renderActionPheDuyet = () => {
        let result = {};
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_PHE_DUYET;
        result.disabled = hoSoPheDuyets.length === 0;
        result.handleClick = () => pheDuyet.onShow({ hoSos: hoSoPheDuyets });
        result.type = constants.CONST_TYPE_BTN_CREATE;
        result.text = `Phê duyệt ${hoSoPheDuyets.length > 0 ? `(${hoSoPheDuyets.length})` : ""}`;
        result.onMouseEnter = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach(tr => {
                if (hoSoPheDuyets.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }
        result.onMouseLeave = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (hoSoPheDuyets.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }
        return result;
    }

    const renderActionYeuCauBoSung = () => {
        let result = {};
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_YEU_CAU_BO_SUNG;
        result.disabled = hoSoYeuCauBoSungs.length === 0;
        result.handleClick = () => yeuCauBoSung.onShow({ hoSos: hoSoYeuCauBoSungs });
        result.text = `Yêu cầu bổ sung ${hoSoYeuCauBoSungs.length > 0 ? `(${hoSoYeuCauBoSungs.length})` : ""}`;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.onMouseEnter = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach((tr) => {
                if (hoSoYeuCauBoSungs.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }
        result.onMouseLeave = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (hoSoYeuCauBoSungs.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }
        return result;
    }

    const renderActionChuyenXuLy = () => {
        let result = {};
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CHUYEN_XU_LY;
        result.disabled = hoSoChuyenXuLys.length === 0;
        result.handleClick = () => chuyenXuLy.onShow({ hoSos: hoSoChuyenXuLys });
        result.text = `Chuyển xử lý ${hoSoChuyenXuLys.length > 0 ? `(${hoSoChuyenXuLys.length})` : ""}`;
        result.onMouseEnter = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach((tr) => {
                if (hoSoChuyenXuLys.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }
        result.onMouseLeave = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (hoSoChuyenXuLys.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE;
        result.disabled = hoSoDeletes.length > 0 ? false : true;
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.handleClick = handleDelete;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn xóa"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Xóa ${hoSoDeletes.length > 0 ? `(${hoSoDeletes.length})` : ""} `;
        result.onMouseEnter = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            let i = 0;
            trs.forEach((tr) => {
                if (hoSoDeletes.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    i === 0 && tr.scrollIntoView();
                    i++;
                    tr.classList.add("row-active")
                }
            })
        }
        result.onMouseLeave = () => {
            const trs = document.querySelectorAll(`tr.ant-table-row`);
            trs.forEach(tr => {
                if (hoSoDeletes.findIndex(hs => `${hs.id}` === tr.getAttribute("data-row-key")) >= 0) {
                    tr.classList.remove("row-active")
                }
            })
        }
        return result;
    }

    const renderActionThongBaoCongBoSanPham = () => {
        let result = {};
        const itemsThongBao = selected.filter(item => !item.thongBaoCongBoSanPham && item.trangThaiHoSo === constants.CONST_TRANG_THAI_HO_SO.HOSODAT);
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_THONGBAOCONGBO;
        result.disabled = itemsThongBao.length > 0 ? false : true;
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST && qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.beforeText = `${itemsThongBao.length > 0 ? `(${itemsThongBao.length})` : ""} `;
        result.handleClick = () => {
            history.push(main.formatUrl({
                pathname: url.URL_THONG_BAO_HO_SO_TU_CONG_BO,
                objSearch: {
                    ids: itemsThongBao.map(item => item.id),
                    loaiCongBo,
                    action: actID.ACT_ID_THONG_BAO_HO_SO_TU_CONG_BO.ACT_CREATE
                }
            }))
        };
        return result;
    }

    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionUpdateList = () => {
        let result = {};
        result.key = actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_KE_HOACH_UPDATE_LIST;
        result.disabled = false;
        result.hidden = qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_KE_HOACH_UPDATE_LIST || !qs.ke_hoach_id;
        result.handleClick = onUpdateList;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST;
        result.handleClick = qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_KE_HOACH_UPDATE_LIST ? () => history.go(-1) : handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    const getActiveKey = () => {
        if (qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_LIST || qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_IMPORT || qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH || qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_KE_HOACH_UPDATE_LIST) {
            return "list";
        }
        if (qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE || (qs.action === actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_UPDATE && qs.id)) {
            return "form";
        }
        return "loading"
    }

    const [file, setFile] = useState(null);
    const onSubmit = async (values) => {
        if (file) {
            var formData = new FormData();
            const newFileName = (values.fileName + (".") + (values.file.name.indexOf(".") === -1 ? "" : values.file.name.split('.').pop()));
            if (values.fileName === "" || newFileName === values.file.name) {
                formData.append('file', values.file);
            } else {
                let blob = values.file.slice(0, values.file.size, values.file.type);
                let newFile = new File([blob], newFileName, { type: values.file.type });
                formData.append('file', newFile);
            }
            uploadRequest({
                data: formData
            })
        }
        onCancel()
    }


    return <Fragment>
        {/* Trình phê duyệt */}
        <Modal
            title="Thêm hồ sơ sản phẩm"
            visible={qs.action === "HO_SO_TU_CONG_BO_IMPORT_ACT" ? true : false}
            onCancel={onCancel}
            width={400}
            destroyOnClose
            onOk={() => onSubmit({ fileName: fileName, file })}
            className="customModalHeader"
        >
            <Form
                onSubmit={values => onSubmit({ fileName: fileName, file })}
                initialValues={{}}
                props={props}
                file={file}
                setFile={setFile}
            >
                <Upload {...props} style={{ width: "350px", display: "block" }}>
                    <Button block type='dashed' style={{ width: "350px" }}><i class="fa fa-upload" aria-hidden="true" style={{ margin: "5px" }}></i>Tải file lên</Button>
                </Upload>
            </Form>
            <Typography.Text style={{ fontSize: 11, color: "#9e9d9d" }}>
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "10px", color: "#858585" }}>
                    {file && <><i class="fa fa-file-excel-o" aria-hidden="true"></i> {file.name} </>}
                </div>
            </Typography.Text>
        </Modal>
        <CommonTrinhPheDuyet
            title="Trình phê duyệt"
            content={"Bạn chắc muốn trình phê duyệt?"}
            key={trinhPheDuyet.key}
            visible={trinhPheDuyet.visible}
            onCancel={trinhPheDuyet.onCancel}
            maPhongBans={trinhPheDuyet.maPhongBans}
            chucVus={trinhPheDuyet.chucVus}
            onOk={({ accountSelected }) => {
                const { hoSos, msgSuccess, msgError, trangThaiChuyenHS } = convertListHoSo(trinhPheDuyet.hoSos, CHOPHEDUYET, null, accountSelected)(state);
                updateListRequest({
                    data: [...hoSos].map(hoSo => {
                        delete hoSo.actions;
                        delete hoSo.stt;
                        return { entity: hoSo, listAttachFileId: [] }
                    }),
                    requestSuccess: () => {
                        onSelectRow(selected.filter(item => hoSos.findIndex(hs => hs.id === item.id) < 0));
                        messages.success({ content: msgSuccess })
                        // CREATE_NOTIFICATION
                        hoSos.map(hoSo => {
                            return createNotifi({
                                maThongBao: NOTIFI_CODE_HSTCB_TPD,
                                chucVus: [trangThaiChuyenHS.chucVu],
                                phongBans: [trangThaiChuyenHS.phongBan],
                                nguoiNhans: accountSelected ? [accountSelected] : undefined,
                                noiDungChiTiet: {
                                    id: hoSo.id,
                                    tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                }
                            })
                        })
                        trinhPheDuyet.onCancel()
                    },
                    requestError: () => {
                        messages.error({ content: msgError })
                    }
                })
            }}
        />
        {/* Chuyển xử lý */}
        <CommonChuyenXuLy
            title="Chuyển xử lý"
            content={"Bạn chắc muốn chuyển xử lý?"}
            key={chuyenXuLy.key}
            visible={chuyenXuLy.visible}
            onCancel={chuyenXuLy.onCancel}
            maPhongBans={chuyenXuLy.maPhongBans}
            chucVus={chuyenXuLy.chucVus}
            onOk={({ accountSelected }) => {
                const { hoSos, msgSuccess, msgError, trangThaiChuyenHS } = convertListHoSo(chuyenXuLy.hoSos, "CXL", null, accountSelected)(state);
                updateListRequest({
                    data: [...hoSos].map(hoSo => {
                        delete hoSo.actions;
                        delete hoSo.stt;
                        return { entity: hoSo, listAttachFileId: [] }
                    }),
                    requestSuccess: () => {
                        onSelectRow(selected.filter(item => hoSos.findIndex(hs => hs.id === item.id) < 0));
                        messages.success({ content: msgSuccess })
                        // CREATE_NOTIFICATION
                        hoSos.map(hoSo => {
                            return createNotifi({
                                maThongBao: NOTIFI_CODE_HSTCB_CXL,
                                chucVus: [trangThaiChuyenHS.chucVu],
                                phongBans: [trangThaiChuyenHS.phongBan],
                                nguoiNhans: accountSelected ? [accountSelected] : undefined,
                                noiDungChiTiet: {
                                    id: hoSo.id,
                                    tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                }
                            })
                        })
                        chuyenXuLy.onCancel();
                    },
                    requestError: () => {
                        messages.error({ content: msgError })
                    }
                })
            }}
        />
        {/* Phê duyệt */}
        <CommonPheDuyet
            visible={pheDuyet.visible}
            onCancel={pheDuyet.onCancel}
            onConfirm={() => {
                const { hoSos, msgSuccess, msgError } = convertListHoSo(pheDuyet.hoSos, DAPHEDUYET)(state);
                updateListRequest({
                    data: [...hoSos].map(hoSo => {
                        delete hoSo.actions;
                        delete hoSo.stt;
                        return { entity: hoSo, listAttachFileId: [] }
                    }),
                    requestSuccess: () => {
                        onSelectRow(selected.filter(item => hoSos.findIndex(hs => hs.id === item.id) < 0));
                        messages.success({ content: msgSuccess })
                        // CREATE_NOTIFICATION
                        hoSos.map(hoSo => {
                            return createNotifi({
                                maThongBao: NOTIFI_CODE_HSTCB_DPD,
                                phongBans: [NGHIEPVU],
                                noiDungChiTiet: {
                                    id: hoSo.id,
                                    tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                }
                            })
                        })
                        pheDuyet.onCancel()
                        history.replace({
                            ...location,
                            search: main.queryString.stringify({ ...qs, fresh: fresh + 1 })
                        })
                    },
                    requestError: () => messages.error({ content: msgError })
                })
            }}
            onNotConfirm={({ lyDo }) => {
                const { hoSos, msgSuccess, msgError } = convertListHoSo(pheDuyet.hoSos, KHONGPHEDUYET, lyDo)(state);
                updateListRequest({
                    data: [...hoSos].map(hoSo => {
                        delete hoSo.actions;
                        delete hoSo.stt;
                        return { entity: hoSo, listAttachFileId: [] }
                    }),
                    requestSuccess: () => {
                        onSelectRow(selected.filter(item => hoSos.findIndex(hs => hs.id === item.id) < 0));
                        messages.success({ content: msgSuccess })
                        // CREATE_NOTIFICATION
                        hoSos.map(hoSo => {
                            return createNotifi({
                                maThongBao: NOTIFI_CODE_HSTCB_KPD,
                                phongBans: [NGHIEPVU],
                                noiDungChiTiet: {
                                    id: hoSo.id,
                                    tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                }
                            })
                        })
                        pheDuyet.onCancel();
                    },
                    requestError: () => {
                        messages.error({ content: msgError })
                    }
                })
            }}
        />
        {/* Yêu cầu bổ sung */}
        <CommonModalBack
            visible={yeuCauBoSung.visible}
            key={yeuCauBoSung.key}
            onCancel={yeuCauBoSung.onCancel}
            maPhongBans={yeuCauBoSung.maPhongBans}
            chucVus={yeuCauBoSung.chucVus}
            notifications={convertListHoSo(yeuCauBoSung.hoSos, CHOBOSUNG)(state).guiThongBao ? {
                content: "Gửi văn bản yêu cầu công dân bổ sung hồ sơ.",
                maPhongBans: [NGHIEPVU],
                chucVus: [CHUYENVIEN]
            } : undefined}
            onOk={({ lyDo, accountSelected, nguoiNhans }) => {
                const { hoSos, msgSuccess, msgError, trangThaiChuyenHS } = convertListHoSo(yeuCauBoSung.hoSos, CHOBOSUNG, lyDo, accountSelected)(state);
                updateListRequest({
                    data: [...hoSos].map(hoSo => {
                        delete hoSo.actions;
                        delete hoSo.stt;
                        return { entity: hoSo, listAttachFileId: [] }
                    }),
                    requestSuccess: () => {
                        onSelectRow(selected.filter(item => hoSos.findIndex(hs => hs.id === item.id) < 0));
                        messages.success({ content: msgSuccess })
                        // CREATE_NOTIFICATION
                        hoSos.map(hoSo => {
                            if (nguoiNhans && nguoiNhans.length > 0) {
                                // CREATE_NOTIFICATION
                                createNotifi({
                                    maThongBao: NOTIFI_CODE_HSTCB_YCCDBSHS,
                                    nguoiNhans,
                                    noiDungChiTiet: {
                                        id: hoSo.id,
                                        tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                        lyDo
                                    }
                                })
                            }
                            return createNotifi({
                                maThongBao: NOTIFI_CODE_HSTCB_YCBS,
                                chucVus: [trangThaiChuyenHS.chucVu],
                                phongBans: [trangThaiChuyenHS.phongBan],
                                nguoiNhans: accountSelected ? [accountSelected] : undefined,
                                noiDungChiTiet: {
                                    id: hoSo.id,
                                    tenDangKyKinhDoanh: hoSo.tenDangKyKinhDoanh,
                                    lyDo
                                }
                            })
                        })
                        yeuCauBoSung.onCancel();
                    },
                    requestError: () => {
                        messages.error({ content: msgError })
                    }
                })
            }}
        />
        <Tabs activeKey={getActiveKey()} className="tab-none-title" animated={false}>
            <Tabs.TabPane key="loading">
                Loading...
            </Tabs.TabPane>
            <Tabs.TabPane key="form">
                <HoSoTuCongBoForm
                    handleBack={handleBack}
                    loaiCongBo={loaiCongBo}
                    handleAllRequest={handleAllRequest}
                />
            </Tabs.TabPane>
            <Tabs.TabPane key="list">
                <HoSoTuCongBoList
                    dataLoading={dataLoading}
                    dataSort={dataSort}
                    handleChangeDataSort={handleChangeDataSort}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    loaiCongBo={loaiCongBo}
                    onSelectRow={onSelectRow}
                    pageKey={pageKey}
                    selectedRowKeys={selectedRowKeys}
                />
            </Tabs.TabPane>
        </Tabs>
    </Fragment>
}

export default HoSoTuCongBo;