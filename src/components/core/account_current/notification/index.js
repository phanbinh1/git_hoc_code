import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Dropdown, Tooltip } from "antd";
import NotificationList from "./notification_list";
import { getNotifi, receiveAllNotifi } from "./action"
import { URL_NOTIFICATION } from "../../../../constants/url";

let interval = null;
let a = false;
const Notification = ({
    visible,
    onClose,
    onShow
}) => {
    const [loading, setLoading] = useState(true);
    const [mouseEnter, setMouseEnter] = useState(false);
    const count = useSelector(state => state.core.notification.count);
    const account_current = useSelector(state => state.core.account_current);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(getNotifi({ currentPage: 1, callback: () => setLoading(false) }));
    }, [account_current.id]);

    useEffect(() => {
        const title = document.body.getAttribute("_title") || document.title;
        document.title = `${count > 0 ? `(${count})` : ''} ${title} `;
        document.body.setAttribute("_notifi_count", count);

        interval && clearInterval(interval);
        document.body.setAttribute("_notifi_count", count);
        if (count > 0) {
            interval = setInterval(() => {
                const title = document.body.getAttribute("_title") || document.title;
                if (a) { document.title = title; }
                else { document.title = `${count > 0 ? `(${count})` : ''} Thông báo mới! `; }
                a = !a;
            }, 1000);
        }
        return () => {
            interval && clearInterval(interval)
        }
    }, [count]);

    return <Fragment>
        <Dropdown
            placement="bottomRight"
            overlay={<NotificationList setMouseEnter={setMouseEnter} firstLoaded={!loading} />}
            trigger={["click"]}
            className={`nav-action ${visible && "active"} `}
            visible={visible}
            onVisibleChange={(visible) => {
                if (!mouseEnter) {
                    if (visible) {
                        count > 0 && dispatch(receiveAllNotifi({ daNhan: 1 }));
                        onShow();
                    }
                    else {
                        onClose()
                    }
                }
            }}
            overlayStyle={{ zIndex: 10 }}
        >
            <Tooltip title="Thông báo">
                <Badge
                    overflowCount={9}
                    count={count}
                    style={{ position: "absolute", marginTop: "6px", background: "red", }}
                >
                    <i className="fa fa-bell" />
                </Badge>
            </Tooltip>
        </Dropdown>
    </Fragment >
}

export default Notification;

export * from "./notification_code";
export * from "./action";
export { default as convertMaThongBao } from "./convert_notification_code";
export const formatNotifiLink = (link) => `${URL_NOTIFICATION}?url_redirect=${encodeURIComponent(link)}`