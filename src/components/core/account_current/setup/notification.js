import React, { Fragment, useEffect, useState } from "react";
import { Switch, Radio, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { TYPE_CONFIG_NOTIFICATION } from "../../../../constants/type";
import moment from "moment";
import { dateTimeFormat } from "../../../../constants/controll";
import { updateAccountCurrentRequest } from "./../../../../actions/core/account_current";

let timeout = null;
const SetupNotification = () => {

    const account_current = useSelector(state => state.core.account_current);
    const config_notification = useSelector(state => state.core.config.notification);
    const dispatch = useDispatch();

    const [emailNotification, setEmailNotification] = useState(account_current.emailNotification);

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

    useEffect(() => {
        setEmailNotification(account_current.emailNotification);
    }, [account_current.emailNotification])

    return <Fragment>
        <div class="config-item">
            Tắt thông báo
                        <Switch
                size="small"
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
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
            {
                disabled && <div>
                    <Radio.Group
                        value={disabledOption || "forever"}
                        onChange={(e) => {
                            const value = e.target.value;
                            dispatch({
                                type: TYPE_CONFIG_NOTIFICATION,
                                notification: {
                                    disabled: true,
                                    startDisabledTime: moment().format(dateTimeFormat),
                                    disabledOption: value
                                }
                            })
                        }}
                    >
                        <Radio value="1minute" style={{ display: "block", marginBottom: 5 }}>Mở lại sau 1 phút</Radio>
                        <Radio value="5minutes" style={{ display: "block", marginBottom: 5 }}>Mở lại sau 5 phút</Radio>
                        <Radio value="1hour" style={{ display: "block", marginBottom: 5 }}>Mở lại sau 1 tiếng</Radio>
                        <Radio value="1day" style={{ display: "block", marginBottom: 5 }}>Mở lại sau 1 ngày</Radio>
                        <Radio value="forever" style={{ display: "block", marginBottom: 5 }}>Tắt đến khi mở lại</Radio>
                    </Radio.Group>
                </div>
            }
        </div>
        <div className="config-item" onClick={() => {
            dispatch({
                type: TYPE_CONFIG_NOTIFICATION,
                notification: { mute: !mute }
            })
        }}>
            Tắt tiếng
                        <Switch
                size="small"
                checked={mute}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
        </div>
        <div className="config-item">
            Nhận thông báo qua email
                    <Switch
                size="small"
                checked={account_current && account_current.emailNotification}
                onChange={checked => {
                    dispatch(updateAccountCurrentRequest({
                        data: { ...account_current, emailNotification: !checked ? null : account_current.email },
                        errorNotifi: false,
                        hiddenMsg: true,
                    }))
                }}
                checkedChildren={<i className="fa fa-check" />}
                unCheckedChildren={<i className="fa fa-times" />}
                className="config-item-switch-right"
            />
            {
                account_current.emailNotification && <div>
                    <Input
                        placeholder="Nhập email nhận thông báo!"
                        value={emailNotification}
                        onChange={e => setEmailNotification(e.target.value)}
                    />
                    <div style={{ marginTop: 5, textAlign: "right" }} >
                        <Button className="m-r-5" disabled={emailNotification === account_current.emailNotification} onClick={() => setEmailNotification(account_current.emailNotification)}>
                            <i className="fa fa-times m-r-5" />Hủy
                            </Button>
                        <Button
                            type="primary"
                            disabled={emailNotification === account_current.emailNotification || !emailNotification || emailNotification.trim() === ""}
                            onClick={() => {
                                dispatch(updateAccountCurrentRequest({ data: { ...account_current, emailNotification } }))
                            }}
                        >
                            <i className="fa fa-save m-r-5" />Lưu thay đổi
                            </Button>
                    </div>
                </div>
            }
        </div>
    </Fragment >
}
export default SetupNotification;