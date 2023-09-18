import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateFormat } from "./../../../constants/controll";
import * as constants from "./../../../constants/constants";
import * as apiUrl from "./../../../constants/api";
import * as act from "./../../../actions";
import * as actHistoryDownload from "./../../../actions/core/history_download";
import CommonBoxUpload from './../common_box_upload';
import moment from "moment";
import { Drawer, message } from 'antd';

const CommonAttachments = ({
    entityId,
    attachEntityType = constants.CONST_ATTACH_TYPE.KEHOACHTHAMDINHCAPGCN,
    allowUpdate = true,
    onChange,
    listFile,
    drawer,
    addQrCode,
    displayType
}) => {

    const account_current = useSelector(state => state.core.account_current);
    const dispatch = useDispatch();
    const [files, setFiles] = useState(listFile && Array.isArray(listFile) ? listFile : []);
    useEffect(() => {
        entityId && act.getFiles({
            data: {
                attachEntityType,
                entityId
            },
            requestSuccess: (res) => {
                const list = res.result;
                if (Array.isArray(list)) {
                    setFiles(list.map(item => ({ ...item, uid: item.id, status: "done" })));
                }
            }
        })
    }, [entityId]);

    useEffect(() => {
        if (onChange && typeof onChange === "function") {
            onChange(files);
        }
    }, [files])

    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));

    const onDownload = (file) => {
        if (file && file.id) {
            const item = {
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`),
                title: "Tài liệu đính kèm",
                url: `${apiUrl.API_ATTACH_FILE}/${file.id}/download`
            }
            createHistoryDownload({
                username: account_current.name,
                process: item
            })
        }
    }

    return drawer ?
        <Drawer
            width={drawer.width || 400}
            visible={drawer.visible}
            title={drawer.title === false ? undefined : (drawer.title || "Tài liệu đính kèm")}
            onClose={() => {
                if (files.filter(item => item.status === "uploading").length > 0) {
                    message.error({ content: "Không thể đóng cửa sổ do có 1 tệp đang được tải lên!" })
                }
                else {
                    typeof drawer.onClose === "function" && drawer.onClose();
                }
            }}
            destroyOnClose={drawer.destroyOnClose === false ? false : true}
        >
            <CommonBoxUpload
                displayType={displayType}
                allowChange={allowUpdate}
                allowRemove={allowUpdate}
                onDownLoad={onDownload}
                fileList={files}
                changeFileList={(fileList) => {
                    setFiles(fileList)
                }}
                onDelete={act.deleteFiles}
                action={`${apiUrl.API_ATTACH_FILE}?addQrCode=${addQrCode ? 1 : 0}&attachEntityType=${attachEntityType}${entityId ? `&entityId=${entityId}` : ''}`}
                name="files"
                addQrCode={addQrCode}
            />
        </Drawer>
        : <CommonBoxUpload
            displayType={displayType}
            allowChange={allowUpdate}
            allowRemove={allowUpdate}
            onDownLoad={onDownload}
            fileList={files}
            changeFileList={(fileList) => {
                setFiles(fileList)
            }}
            onDelete={act.deleteFiles}
            action={`${apiUrl.API_ATTACH_FILE}?addQrCode=${addQrCode ? 1 : 0}&attachEntityType=${attachEntityType}${entityId ? `&entityId=${entityId}` : ''}`}
            name="files"
            addQrCode={addQrCode}
        />
}
export default CommonAttachments;