import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SanPhamOcopList from "./list";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import { dateTimeFormat } from '../../../../constants/controll';
import * as main from "./../../../../constants/main";
import { queryString } from "./../../../../constants/main";
import * as actSanPhamOcop from "./../../../../actions/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo";
import { useHistory, useLocation } from 'react-router';
import { Tabs, Form, Modal, Upload, Button, Typography } from "antd";
import { getAllowAction } from '../../../../pages/app/quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo';
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as apiUrl from "./../../../../constants/api";
import moment from "moment";

const SanPhamOcop = ({
    pageKey,
    handleDelete,
    handleSearch,
    handleBack,
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
    const dispatch = useDispatch();
    const uploadRequest = (object = {}) => dispatch(actSanPhamOcop.uploadSPOCopRequest(object));
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const account_current = useSelector(state => state.core.account_current);

    const props = {
        beforeUpload: () => false,
        onChange: ({ file }) => setFile(file),
        fileList: file ? [file] : [],
        showUploadList: false,
        name: "file"
    };

    const onCancel = () => {
        history.replace({ search: queryString.stringify({ ...qs, action: actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST }) })
        setFile(null)
    };

    useEffect(() => {
        if (file) {
            setFileName(file.name.indexOf(".") === -1 ? file.name : file.name.substr(0, file.name.lastIndexOf('.')));
        } else {
            setFileName("");
        }
    }, [file])

    const onDownloadFileMauSPOcop = () => {
        const item = {
            date: moment().format(dateTimeFormat),
            title: "File mẫu danh sách sản phẩm ocop",
            url: main.convertObjectToQueryVariable(apiUrl.API_HO_SO_TU_CONG_BO_OCOP_FILE_MAU)
        }
        createHistoryDownload({
            username: account_current.name,
            process: item
        })
    };

    useEffect(() => {
        onSetAction();
    }, [
        qs.action,
        selected
    ])

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionImport());
        setAction(arrAction);
    }

    const hoSoDeletes = selected.filter(item => {
        const allow = getAllowAction(item)(state);
        return !allow.allowDelete;
    });

    const renderActionDelete = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_DELETE;
        result.disabled = hoSoDeletes.length > 0 ? false : true;
        result.hidden = qs.action !== actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST && qs.action !== actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_SEARCH;
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

    const renderActionImport = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_IMPORT;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST;
        result.handleClick = handleImport;
        result.type = constants.CONST_TYPE_BTN_SUCCESS;
        return result;
    }

    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_SEARCH;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    const getActiveKey = () => {
        if (qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_LIST || qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_IMPORT || qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_SEARCH) {
            return "list";
        }
        if (qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_CREATE || (qs.action === actID.ACT_ID_DANH_SAN_PHAM_OCOP.ACT_UPDATE && qs.id)) {
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
                data: formData,
                requestSuccess: () => {
                    handleAllRequest();
                }
            })
        }
        onCancel()
    }

    const handleDownloadFileMau = () => {
        onDownloadFileMauSPOcop()
    }

    return <Fragment>
        <Modal
            title="Thêm sản phẩm"
            visible={qs.action === "HO_SO_TU_CONG_BO_SP_OCOP_IMPORT_ACT" ? true : false}
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
                <Button
                    block
                    type='dashed'
                    style={{ width: "165px", marginRight: "20px" }}
                    onClick={handleDownloadFileMau}
                >
                    <i class="fa fa-download" aria-hidden="true" style={{ margin: "5px" }}></i>
                    Tải file mẫu
                </Button>
                <Upload {...props} style={{ width: "165px", display: "block" }}>
                    <Button block type='primary' style={{ width: "165px" }}><i class="fa fa-upload" aria-hidden="true" style={{ margin: "5px" }}></i>Import file</Button>
                </Upload>
            </Form>
            <Typography.Text style={{ fontSize: 11, color: "#9e9d9d" }}>
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "10px", color: "#858585" }}>
                    {file && <><i class="fa fa-file-excel-o" aria-hidden="true"></i> {file.name} </>}
                </div>
            </Typography.Text>
        </Modal>
        <Tabs activeKey={getActiveKey()} className="tab-none-title" animated={false}>
            <Tabs.TabPane key="loading">
                Loading...
            </Tabs.TabPane>
            <Tabs.TabPane key="list">
                <SanPhamOcopList
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

export default SanPhamOcop;