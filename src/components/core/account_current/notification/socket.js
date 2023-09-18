import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close, info } from "../../../../constants/notification";
import { seenNotifi, convertMaThongBao, formatNotifiLink } from "./";
import { Avatar } from "antd";
import { formartTimeUnits } from "../../../../constants/main";
import { history } from "./../../../../App";
import { SOCKET_PORT } from "../../../../constants/api";
import { renderToString } from "react-dom/server"

import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { dateTimeFormat } from "../../../../constants/controll";

const Socket = () => {
    const dispatch = useDispatch();
    const seenNotification = ({ ids = [], daXem = 1 }) => dispatch(seenNotifi({ ids, daXem }));

    const account_current = useSelector(state => state.core.account_current);
    const config_notification = useSelector(state => state.core.config.notification);
    const { url, mute, disabled } = config_notification;

    useEffect(() => {
        const socket = new SockJS(SOCKET_PORT);
        const stompClient = Stomp.over(socket);
        stompClient && stompClient.connected && stompClient.disconnect();
        stompClient.debug = null;
        stompClient.connect({},
            () => {
                stompClient.subscribe(`/notification`, (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        const notifi = data.find(item => item.nguoiNhan.name === account_current.name);
                        if (notifi) {
                            const thongBao = convertMaThongBao(notifi.thongBao);
                            dispatch({
                                type: "TYPE_NOTIFICATION_NEW",
                                notification: { ...notifi, isNew: true },
                                count: 1
                            })
                            const audioNotifi = document.getElementById("sound-notification-id");
                            if (!mute && audioNotifi) {
                                audioNotifi.pause();
                                audioNotifi.currentTime = 0;
                                audioNotifi.play();
                            }
                            if (!disabled) {
                                info({
                                    className: "notification",
                                    content: <a
                                        href={thongBao.link}
                                        style={{ color: "#fff", display: "inline-block", lineHeight: "20px", fontWeight: "bold" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            seenNotification({ ids: [notifi.id], daXem: 1 });
                                            history.push(formatNotifiLink(thongBao.link));
                                            close(`notifi-${notifi.id}`);
                                        }}
                                    >
                                        {thongBao.title}
                                    </a>,
                                    description: <div>
                                        <small>{thongBao.content}</small>
                                        <div>
                                            <small>
                                                <i className="fa fa-clock-o m-r-5" />
                                                {formartTimeUnits(notifi.thongBao.ngayTao, dateTimeFormat).label}
                                            </small>
                                        </div>
                                    </div>,
                                    notifi: true,
                                    placement: "bottomLeft",
                                    icon: <div style={{ position: "relative", marginLeft: "-20px" }}>
                                        <Avatar src={thongBao.nguoiGui.avatar} size={50}>
                                            <b>{notifi.thongBao.nguoiGui.fullName.substr(0, 1).toUpperCase()}</b>
                                        </Avatar>
                                        {thongBao.iconClass && <i className={thongBao.iconClass} style={{
                                            position: "absolute",
                                            bottom: "-5px",
                                            right: "-5px",
                                            borderRadius: "50%",
                                            padding: "5px",
                                            fontSize: "10px",
                                            height: 20,
                                            width: 20,
                                            textAlign: "center"
                                        }} />}
                                    </div>,
                                    key: `notifi-${notifi.id}`,
                                    duration: 5
                                });
                                document.body.getAttribute("_focus") !== "1" && browserCreateNotification({
                                    title: thongBao.title,
                                    icon: thongBao.nguoiGui.avatar,
                                    body: thongBao.content && thongBao.description ? `${thongBao.content}\n ${thongBao.description || ""}` : null,
                                    onClick: () => window.focus()
                                })
                            }
                        }
                    }
                    catch (e) {
                        console.error("Nhận thông báo lỗi!")
                    }
                });
            }
        );
        return () => {
            stompClient && stompClient.connected && stompClient.disconnect();
        }
    }, [account_current.name])

    useEffect(() => {
        const sourceElm = document.getElementById("sound-notification-id-source");
        sourceElm && sourceElm.setAttribute("src", url);
    }, [url])

    return <Fragment></Fragment>
}

export default Socket;

export const browserCreateNotification = ({ title, icon, body, onClick }) => {
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
    else {
        const titleElm = document.createElement("span");
        titleElm.innerHTML = renderToString(title);

        const bodyElm = document.createElement("span");
        bodyElm.innerHTML = renderToString(body);

        var notification = new Notification(titleElm.innerText, { icon, body: body ? bodyElm.innerText : "" });
        notification.onclick = () => { onClick && onClick() };
        setTimeout(notification.close, 2000);
    }
}