import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from "antd";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as message from "./../../../../constants/message";
import * as notification from "./../../../../constants/notification";
import * as api from "./../../../../util/api_call";
import * as constants from "./../../../../constants/constants";
import * as url from "./../../../../constants/url";
import { useHistory } from 'react-router';


const DownloadNotification = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const updateHistoryDownload = (value) => {
        dispatch(actHistoryDownload.handleUpdate(value));
    }
    const history_download = useSelector(state => state.core.history_download);
    const account_current = useSelector(state => state.core.account_current);

    // Chạy khi history_download có sự thay đổi
    useEffect(() => {
        var history = [];
        var index = history_download.findIndex(item => item.username === account_current.name);
        if (index !== -1) {
            history = history_download[index].history;
            history.map((item) => {
                if (!item.processed) {
                    notification.info({
                        content: constants.CONST_START_DOWNLOAD_MSG,
                        duration: 2,
                        placement: "topLeft",
                        key: constants.CONST_START_DOWNLOAD_KEY
                    })
                    updateHistoryDownload({
                        username: account_current.name,
                        process: { ...item, processed: true }
                    });
                    return api.download({
                        url: item.url,
                        errorNotifi: false
                    }).then(function (res) {
                        if (res) {
                            downloadSuccess(account_current.name, item);
                        }
                        else {
                            downloadError(account_current.name, item);
                        }
                    })
                }
                return null;
            })
        }
    }, [history_download]);

    const downloadSuccess = (username, process) => {
        updateHistoryDownload({
            username,
            process: {
                ...process,
                processed: true,
                status: "success"
            }
        });
        message.success({
            content: <span
                onClick={(e) => {
                    history.push(url.URL_HISTORY_DOWNLOAD)
                }}
            >
                {constants.CONST_DOWNLOAD_SUCCESS_MSG}
            </span>,
            key: constants.CONST_DOWNLOAD_SUCCESS_KEY,
            duration: 3
        })
    }
    const downloadError = (username, process) => {
        updateHistoryDownload({
            username,
            process: {
                ...process,
                processed: true,
                status: "error"
            }
        });
        message.error({
            content: <span
                onClick={(e) => {
                    history.push(url.URL_HISTORY_DOWNLOAD)
                }}
            >
                {constants.CONST_DOWNLOAD_ERROR_MSG}
            </span>,
            key: constants.CONST_DOWNLOAD_ERROR_KEY,
            duration: 3
        })
    }

    const countProcessDownloading = () => {
        let result = [], count = 0;
        let index = history_download.findIndex(item => item.username === account_current.name);
        if (index !== -1) {
            result = history_download[index].history;
        }
        Array.isArray(result) && result.map((item) => {
            if (item.status === "downloading") {
                count++;
            }
            return count;
        })
        return count;
    }

    return <Badge
        count={countProcessDownloading()}
        style={{
            position: "absolute",
            marginTop: "-5px",
            marginRight: "-10px",
            background: "#52c41a",
        }}
    >
        <i className="fa fa-cloud-download" />
    </Badge>
}

export default DownloadNotification;