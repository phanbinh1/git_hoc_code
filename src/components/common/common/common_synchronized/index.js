import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm } from "antd";
import CommonSyncProcess from "./common_sync_process";
import * as notification from "./../../../constants/notification";
import * as actSyncProcess from "./../../../actions/core/sync_process";
import { findFirstScrollParent } from '../../../constants/main';

const CommonSynchronized = () => {
    const [callBackTime] = useState(3000);
    const [timeouts, setTimeouts] = useState({});
    const [startDisabled, setStartDisabled] = useState(false);
    const [restartDisabled, setRestartDisabled] = useState(false);
    const [runDisabled, setRunDisabled] = useState(false);
    const [pauseDisabled, setPauseDisabled] = useState(false);

    const sync_process = useSelector(state => state.core.sync_process);

    const dispatch = useDispatch();
    const updateSyncProcess = (job) => dispatch(actSyncProcess.updateSyncProcess(job))
    const deleteSyncProcess = (jobCode) => dispatch(actSyncProcess.deleteSyncProcess(jobCode));

    const startSyncProcess = (object = {}) => dispatch(actSyncProcess.startSyncProcessRequest(object));
    const runSyncProcess = (object = {}) => dispatch(actSyncProcess.runSyncProcessRequest(object));
    const pauseSyncProcess = (object = {}) => dispatch(actSyncProcess.pauseSyncProcessRequest(object));
    const destroySyncProcess = (object = {}) => dispatch(actSyncProcess.destroySyncProcessRequest(object));
    const restartSyncProcess = (object = {}) => dispatch(actSyncProcess.restartSyncProcessRequest(object));
    const getStatusSyncProcess = (object = {}) => dispatch(actSyncProcess.getStatusSyncProcessRequest(object));

    useEffect(() => {
        sync_process.map((job) => {
            if (!job.initialized) {
                const _job = { jobCode: job.jobCode, initialized: true }
                updateSyncProcess(_job);
                onGetStatus(_job);
            }
            if (job.initialized && job.show) {
                createNotificationSync(job);
            }
            return null;
        })
    }, [sync_process]);

    const renderMessage = (job) => {
        switch (job.message) {
            case "finish":
                return <label className="label label-success"><i className="fa fa-check-circle m-r-10" />Đồng bộ thành công!</label>
            case "run":
                return <label className="label label-info"><i className="fa fa-spinner fa-pulse m-r-10" />Đang đồng bộ...</label>
            case "pause":
                return <label className="label label-default">Tạm ngừng</label>
            case "error":
                return <label className="label label-danger">Lỗi</label>
            default:
                return <label className="label label-default">Chưa bắt đầu</label>
        }
    }

    const createNotificationSync = (job) => {
        notification.sync({
            icon: <CommonSyncProcess
                key={job.jobCode}
                notiKey={job.jobCode}
                job={job}
            />,
            message: job.jobName,
            duration: 0,
            key: job.jobCode,
            btn: renderActionSync(job),
            onClose: () => onClose(job),
            description: <div>
                <div>Trạng thái: {renderMessage(job)}</div>
            </div>
        });
    }

    const renderActionSync = (job) => {
        return <React.Fragment>
            {
                job.message === "start" && <Button
                    type="primary"
                    className="m-r-10"
                    onClick={() => onStart(job)}
                    disabled={startDisabled}
                >
                    <i className={`fa fa-play m-r-10`} />Bắt đầu
                </Button>
            }
            {
                (job.message !== "start" || job.message === "error") && <Button
                    type="primary"
                    className="m-r-10"
                    onClick={() => onRestart(job)}
                    disabled={restartDisabled}
                >
                    <i className={`fa fa-refresh m-r-10`} />Bắt đầu lại
                </Button>
            }
            {
                job.message === "run" && <Button
                    type="default"
                    className="m-r-10"
                    onClick={() => onPause(job)}
                    disabled={pauseDisabled}
                >
                    <i className={`fa fa-pause m-r-10`} />Tạm ngừng
                </Button>
            }
            {
                job.message === "pause" && <Button
                    type="default"
                    className="m-r-10"
                    onClick={() => onRun(job)}
                    disabled={runDisabled}
                >
                    <i className={`fa fa-play m-r-10`} />Tiếp tục
                </Button>
            }
            {
                !job.readOnly && <Popconfirm
                    title="Bạn chắc chắn muốn hủy tiến trình?"
                    okText="Có"
                    okType="danger"
                    cancelText="Không"
                    onConfirm={() => onDestroy(job)}
                    getPopupContainer={e => findFirstScrollParent(e)}
                >
                    <Button type="danger">
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                </Popconfirm>
            }

        </React.Fragment>
    }

    const onClose = (job) => {
        if (job.message === "finish") {
            onDestroy(job);
        }
        else {
            updateSyncProcess({
                jobCode: job.jobCode,
                show: false
            });
            notification.close(job.jobCode);
        }
    }

    const onDestroy = (job) => {
        destroySyncProcess({
            data: {
                jobCode: job.jobCode
            },
            requestSuccess: () => {
                deleteSyncProcess(job.jobCode);
                notification.close(job.jobCode);
                clearTimeout(timeouts[job.jobCode]);
            },
            requestError: () => { }
        })
    }

    const onRestart = (job) => {
        clearTimeout(timeouts[job.jobCode]);
        setRestartDisabled(true);
        restartSyncProcess({
            data: { jobCode: job.jobCode },
            requestSuccess: (res) => {
                setRestartDisabled(false);
                onGetStatus(res.result);
            },
            requestError: () => { }
        })
    }

    const onStart = (job) => {
        setStartDisabled(true)
        startSyncProcess({
            data: { jobCode: job.jobCode },
            requestSuccess: (res) => {
                setPauseDisabled(false);
                if (res && res.status) {
                    setStartDisabled(false)
                    onGetStatus(job);
                }
            }
        })
    }

    const onPause = (job) => {
        clearTimeout(timeouts[job.jobCode]);
        setPauseDisabled(true);
        setRunDisabled(false);
        pauseSyncProcess({
            data: { jobCode: job.jobCode },
            requestSuccess: (res) => {
                // if (res && res.status && res.result) {
                //     clearTimeout(timeouts[res.result.jobCode]);
                // }
            }
        })
    }

    const onRun = (job) => {
        setRunDisabled(true);
        setPauseDisabled(false);
        runSyncProcess({
            data: { jobCode: job.jobCode },
            requestSuccess: (res) => {
                if (res && res.status) {
                    onGetStatus(job);
                }
            }
        })
    }

    const onGetStatus = (job) => {
        getStatusSyncProcess({
            data: { jobCode: job.jobCode },
            requestSuccess: (res) => {
                if (res && res.status && res.result && res.result.message === "run") {
                    timeouts[job.jobCode] = setTimeout(() => {
                        onGetStatus(res.result);
                    }, callBackTime);
                    setTimeouts(timeouts);
                }
            }
        })
    }
    return <React.Fragment />;
}

export default CommonSynchronized;