import React, { Fragment } from 'react';
import { Upload, Button, Modal } from 'antd';
import * as message from "./../../../constants/message";
import { getAuth } from "./../../../constants/main";
import { useSelector } from 'react-redux';

const CommonBoxUpload = ({
    fileList,
    changeFileList,
    onDelete,
    action,
    multiple,
    fileTypes,
    fileSize,
    displayType,
    buttonUploadLabel,
    onDownLoad,
    allowChange = true,
    allowRemove = true,
    name = "file"
}) => {
    const account_current = useSelector(state => state.core.account_current);
    const maxSize = fileSize && typeof fileSize === "number" ? fileSize : (1024 * 1024 * 12);

    const onChange = (info) => {
        const { file } = info;
        let { fileList } = info;
        let { status } = file;
        let _fileList = [];
        fileList.map(file => {
            if (file.response) {
                if (file.response.status && file.response.result) {
                    const result = file.response.result;
                    if (Array.isArray(result)) {
                        result.map(_f => {
                            _fileList.push({
                                id: _f.id,
                                uid: _f.id,
                                name: _f.name,
                                size: _f.size,
                                path: _f.path,
                                type: _f.type,
                                nguoiTao: _f.nguoiTao,
                                status: "done"
                            });
                            return _f;
                        })
                    }
                    else {
                        file.id = result.id;
                        file.uid = result.id;
                        file.name = result.name;
                        file.size = result.size;
                        file.path = result.path;
                        file.type = result.type;
                        file.nguoiTao = result.nguoiTao;
                        file.status = "done";
                        file.size < maxSize && _fileList.push(file)
                    }
                }
                else {
                    file.status = "error";
                    status = "error";
                    file.size < maxSize && _fileList.push(file);
                }
            }
            else {
                file.size < maxSize && _fileList.push(file);
            }
            return _fileList;
        });

        let allowChange = true;
        switch (status) {
            case "uploading":
                break;
            case "done":
                message.success({ content: `Tải file ${file.name} lên thành công!`, duration: 1 });
                break;
            case "error":
                message.error({ content: `Tải file ${file.name} lên thất bại!` });
                break;
            case "removed":
                allowChange = false;
                if (file.id) {
                    if (!file.nguoiTao || file.nguoiTao === account_current.name) {
                        Modal.confirm({
                            title: "Xác nhận",
                            style: { top: 50 },
                            content: `Bạn chắc chắn muốn xóa file ${file.name}?`,
                            onOk: () => {
                                onDelete({
                                    data: [file.id],
                                    requestSuccess: () => {
                                        changeFileList(_fileList);
                                    },
                                    requestError: () => {
                                        message.error({ content: "Xóa file thất bại." });
                                    }
                                })
                            },
                            okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                            cancelText: <Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>,
                            okType: "danger"
                        })
                    }
                    else {
                        Modal.error({
                            title: "Cảnh báo!",
                            style: { top: 50 },
                            content: "Bạn không phải người tạo nên không thể thể xoá tài liệu này",
                            okType: "danger",
                            okText: <Fragment><i className="fa fa-times m-r-5" />Đóng</Fragment>
                        })
                    }
                }
                else {
                    changeFileList(_fileList);
                }
                break;
            default:
                break;
        }
        allowChange && changeFileList(_fileList);
    }

    const beforeUpload = (file) => {
        let isTypeInvalid = true;
        let isSizeInvalid = true;
        isTypeInvalid = file.size < maxSize;
        if (!isTypeInvalid) {
            message.error({
                content: `Vui lòng chọn file kích thước nhỏ hơn: ${maxSize} KB`,
                notifi: false
            });
        }
        if (fileTypes && Array.isArray(fileTypes)) {
            isTypeInvalid = fileTypes.indexOf(file.type) !== -1;
            if (!isTypeInvalid) {
                message.error({
                    content: `Vui lòng chọn file theo định dạng: ${fileTypes.toString()}`,
                    notifi: false
                });
            }
        }
        return isTypeInvalid && isSizeInvalid;
    };

    const _onDownload = file => {
        typeof onDownLoad === "function" && onDownLoad(file);
    }
    const _onPreview = file => {
        typeof onDownLoad === "function" && onDownLoad(file);
    }
    const renderContent = () => {
        switch (displayType) {
            case "button":
                return <Upload
                    name={name}
                    headers={{ 'Authorization': getAuth().token }}
                    multiple={multiple === false ? false : true}
                    action={action}
                    onRemove={file => file.nguoiTao === account_current.name && allowRemove}
                    beforeUpload={beforeUpload}
                    showUploadList={{
                        showRemoveIcon: allowRemove,
                        showDownloadIcon: false
                    }}
                    fileList={fileList}
                    onDownload={_onDownload}
                    onPreview={_onPreview}
                    onChange={onChange}
                    style={{ display: allowChange ? "block" : "none" }}
                >
                    <div>
                        <Button block type="success">
                            <i className="fa fa-cloud-upload m-r-5" />
                            {
                                buttonUploadLabel && typeof buttonUploadLabel === "string" ?
                                    buttonUploadLabel :
                                    "Chọn file tải lên"
                            }
                        </Button>
                    </div>
                </Upload >
            default:
                return <Fragment>
                    <Upload.Dragger
                        name={name}
                        headers={{ 'Authorization': getAuth().token }}
                        multiple={multiple === false ? false : true}
                        action={action}
                        onRemove={allowRemove}
                        beforeUpload={beforeUpload}
                        showUploadList={{
                            showRemoveIcon: allowRemove,
                            showDownloadIcon: true,
                        }}
                        fileList={fileList}
                        onDownload={_onDownload}
                        onPreview={_onPreview}
                        onChange={onChange}
                        style={{ display: allowChange ? "" : "none", maxHeight: 90 }}
                    >
                        <p className="ant-upload-drag-icon">
                            <i className="fa fa-inbox fa-3x icon-info" />
                        </p>
                        <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
                    </Upload.Dragger>
                    {
                        !allowChange && fileList.length === 0 && "Không có tài liệu đính kèm!"
                    }
                </Fragment>
        }
    }
    return <Fragment >
        {renderContent()}
    </Fragment >
}

export default CommonBoxUpload;