import React, { Fragment, useEffect } from "react";
import { Modal, Form, Switch, Button, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { TYPE_CONFIG_NOTIFICATION } from "../../../../constants/type";
import moment from "moment";
import { dateTimeFormat } from "../../../../constants/controll";

// const soundUrls = [
//     {
//         name: "Âm thanh 1",
//         url: "/static/media/sound-notifi-default.mp3",
//     },
//     {
//         name: "Âm thanh 2",
//         url: "/static/media/sound-notifi-default.mp3",
//     },
//     {
//         name: "Âm thanh 3",
//         url: "/static/media/sound-notifi-default.mp3",
//     },
//     {
//         name: "Âm thanh 4",
//         url: "/static/media/sound-notifi-default.mp3",
//     },
// ]

let timeout = null;
const ModalSetup = ({
    visible,
    onCancel
}) => {

    const config_notification = useSelector(state => state.core.config.notification);
    const dispatch = useDispatch();

    const { disabled, mute, disabledOption, startDisabledTime } = config_notification;
    useEffect(() => {
        if (disabled && disabledOption && disabledOption !== "forever") {
            const _startTime = moment(startDisabledTime, dateTimeFormat);
            if (_startTime.isValid()) {
                let _endTime = moment(startDisabledTime, dateTimeFormat);
                switch (disabledOption) {
                    case "1minute":
                        _endTime.add("minute", 1);
                        break;
                    case "5minutes":
                        _endTime.add("minute", 5);
                        break;
                    case "1hour":
                        _endTime.add("hour", 1);
                        break;
                    case "1day":
                        _endTime.add("day", 1);
                        break;
                    default:
                        break;
                }
                if (_endTime - _startTime > 0) {
                    timeout = setTimeout(() => {
                        dispatch({
                            type: TYPE_CONFIG_NOTIFICATION,
                            notification: {
                                disabled: false,
                                startDisabledTime: null,
                                disabledOption: null,
                            }
                        })
                    }, _endTime - _startTime);
                }
                else {
                    dispatch({
                        type: TYPE_CONFIG_NOTIFICATION,
                        notification: {
                            disabled: false,
                            startDisabledTime: null,
                            disabledOption: null,
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: TYPE_CONFIG_NOTIFICATION,
                    notification: {
                        disabled: false,
                        startDisabledTime: null,
                        disabledOption: null,
                    }
                })
            }
        }
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [disabled, startDisabledTime, disabledOption])

    return <Fragment>
        <Modal
            visible={visible}
            onCancel={onCancel}
            title={<Fragment><i className="fa fa-cogs m-r-5" />Cài đặt thông báo</Fragment>}
            style={{ top: 50, zIndex: 11 }}
            destroyOnClose
            footer={[
                <Button onClick={onCancel}><i className="fa fa-times m-r-5" />Đóng</Button>
            ]}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
            >
                <Form.Item label="Tắt thông báo">
                    <Switch
                        checked={disabled}
                        onChange={disabled => {
                            dispatch({
                                type: TYPE_CONFIG_NOTIFICATION,
                                notification: {
                                    disabled,
                                    startDisabledTime: disabled ? moment().format(dateTimeFormat) : null,
                                    disabledOption: disabled ? "forever" : null,
                                }
                            })
                        }}
                    />
                    {
                        disabled && <div>
                            <Radio.Group value={disabledOption || "forever"} onChange={(e) => {
                                const value = e.target.value;
                                dispatch({
                                    type: TYPE_CONFIG_NOTIFICATION,
                                    notification: {
                                        disabled: true,
                                        startDisabledTime: moment().format(dateTimeFormat),
                                        disabledOption: value
                                    }
                                })
                            }}>
                                <Radio value="1minute" style={{ display: "block" }}>Mở lại sau 1 phút</Radio>
                                <Radio value="5minutes" style={{ display: "block" }}>Mở lại sau 5 phút</Radio>
                                <Radio value="1hour" style={{ display: "block" }}>Mở lại sau 1 tiếng</Radio>
                                <Radio value="1day" style={{ display: "block" }}>Mở lại sau 1 ngày</Radio>
                                <Radio value="forever" style={{ display: "block" }}>Tắt đến khi mở lại</Radio>
                            </Radio.Group>
                        </div>
                    }
                </Form.Item>
                <Form.Item label="Tắt tiếng">
                    <Switch
                        checked={mute}
                        onChange={mute => {
                            dispatch({
                                type: TYPE_CONFIG_NOTIFICATION,
                                notification: { mute }
                            })
                        }} />
                </Form.Item>
            </Form>
        </Modal>
    </Fragment >
}
export default ModalSetup;