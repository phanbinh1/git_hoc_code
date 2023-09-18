import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ConfigProvider, Button, Spin } from "antd";
import ScrollArea from "react-perfect-scrollbar";
import moment from 'moment';
import * as act from "./../../../../actions";
import * as actHistoryDownload from "./../../../../actions/core/history_download";
import * as constants from './../../../../constants/constants';
import * as actID from './../../../../constants/action_id';
import { dateFormat } from "./../../../../constants/controll";
const styleBody = {
    height: "calc(100vh - 105px)"
}

const HistoryDownload = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const history_download = useSelector(state => state.core.history_download);
    const account_current = useSelector(state => state.core.account_current);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);

    const dispatch = useDispatch();
    const createHistoryDownload = (value) => dispatch(actHistoryDownload.handleCreate(value));
    const deleteHistoryDownload = (value) => dispatch(actHistoryDownload.handleDelete(value));
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    useEffect(() => {
        const delAllAct = renderActionDeleteAll();
        const countItem = getHistoryByAccountCurrent().length;
        setAction([{ ...delAllAct, disabled: countItem === 0 }]);
    }, [permission_priviliged, history_download])

    const renderActionDeleteAll = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.text = "Xóa tất cả";
        result.handleClick = deleteAll;
        result.iconClass = "fa fa-trash m-r-10";
        return result;
    };

    const countAllData = () => {
        const index = history_download.findIndex(item => item.username === account_current.name);
        return index !== -1 ? history_download[index].history.length : 0
    }

    const getHistoryByAccountCurrent = () => {
        let result = [];
        const index = history_download.findIndex(item => item.username === account_current.name);
        if (index !== -1) {
            result = history_download[index].history;
        }
        return result.slice(0, pageSize * currentPage - 1);
    };

    const renderStatus = (item) => {
        switch (item.status) {
            case "success":
                return <label className="label label-success">
                    <i className="fa fa-check-circle m-r-10" />
                    Thành công
                </label>;
            case "error":
                return <label className="label label-danger">
                    <i className="fa fa-time m-r-10" />
                    Tải file lỗi!
                </label>;
            case "downloading":
                return <label className="label label-info">
                    <i className="fa fa-spinner fa-spin m-r-10" />
                    Đang tải
                </label>;
            default: return <label className="label label-default">Chưa xác định</label>;
        }
    };

    const renderAvatar = (item) => {
        if (item.status === "downloading") {
            return <i className="fa fa-spinner fa-pulse fa-3x icon-primary" />;
        }
        switch (item.type) {
            // image
            case "image/jpeg":
                return <i className="fa fa-file-image-o fa-3x" />;
            case "image/png":
                return <i className="fa fa-file-image-o fa-3x" />;

            // file
            case "application/pdf":
                return <i className="fa fa-file-pdf-o fa-3x" style={{ color: "#d60b0c" }} />;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return <i className="fa fa-file-word-o fa-3x" style={{ color: "#2b579a" }} />;
            case "application/msword":
                return <i className="fa fa-file-word-o fa-3x" style={{ color: "#2b579a" }} />;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return <i className="fa fa-file-excel-o fa-3x" style={{ color: "#01723a" }} />;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return <i className="fa fa-file-powerpoint-o fa-3x" style={{ color: "#b83614" }} />;
            case "application/octet-stream":
                return <i className="fa fa-file-archive-o fa-3x" style={{ color: "#2b579a" }} />;
            default:
                return <i className="fa fa-file-text-o fa-3x" />;
        }
    };

    const renderTitle = (item) => {
        let valueDel = {
            username: account_current.name,
            keys: [item.key]
        }
        return <React.Fragment>
            <div style={{ width: "calc(100% - 200px", float: "left" }}>
                <span className="tag-a" onClick={() => reDownload(item)} title="Tải lại file" style={{ color: "#306583" }}>
                    {item.title}
                </span>
            </div>
            <div style={{ width: "200px", float: "left", textAlign: "center" }}>
                <Button
                    className="m-r-10"
                    disabled={item.status === "downloading"}
                    onClick={() => reDownload(item)}
                    type="success"
                >
                    <i className="fa fa-download m-r-10" />
                    Tải lại
                </Button>
                <Button
                    type="danger"
                    onClick={() => deleteHistoryDownload(valueDel)}
                >
                    <i className="fa fa-trash m-r-10" />
                    Xóa
                </Button>
            </div>
        </React.Fragment>
    };

    const renderDescription = (item) => {
        return <React.Fragment>
            <div style={{ color: "green" }}>
                <i className="fa fa-calendar" /> <small>{item.date}</small>
            </div>
            <div>
                <small>Trạng thái:</small> {renderStatus(item, "label")}
            </div>
        </React.Fragment>
    };

    const reDownload = (item) => {
        createHistoryDownload({
            username: account_current.name,
            process: {
                ...item,
                date: moment(new Date().toISOString()).format(`${dateFormat} hh:mm:ss`)
            }
        })
    };

    const deleteAll = () => {
        const history = getHistoryByAccountCurrent();
        let keys = [];
        history.map((item) => {
            return keys.push(item.key);
        })
        const valueDel = {
            username: account_current.name,
            keys
        }
        return deleteHistoryDownload(valueDel);
    };

    return (
        <React.Fragment>
            <ScrollArea
                style={styleBody}
                onScroll={({ target }) => {
                    const count = countAllData();
                    const { scrollTop, scrollTopMax } = target;
                    if (scrollTopMax - scrollTop < 10 && !loading && count > currentPage * pageSize) {
                        setLoading(true);
                        setTimeout(() => {
                            setCurrentPage(currentPage + 1);
                            setLoading(false);
                        }, 500)

                    }
                }}
            >
                <ConfigProvider renderEmpty={
                    () => <div className="row">
                        <div className="none-data" >
                            <center><p><i className="fa fa-file-text-o fa-5x" /></p></center>
                            <center><div>Không có lịch sử</div></center>
                        </div>
                    </div>}
                >
                    <div className="col-md-12">
                        <List
                            itemLayout="horizontal"
                            dataSource={getHistoryByAccountCurrent()}
                            className="list-history-download"
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={renderAvatar(item)}
                                        title={renderTitle(item)}
                                        description={renderDescription(item)}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <Spin
                        spinning={loading}
                        style={{
                            padding: "10px 0",
                            width: "100%",
                            textAlign: "center"
                        }}
                        indicator={<React.Fragment>
                            <i className="fa fa-spinner fa-spin m-r-10" /> <small>Đang tải ...</small>
                        </React.Fragment>}
                    />
                </ConfigProvider>
            </ScrollArea>
        </React.Fragment >
    );
}

export default HistoryDownload;