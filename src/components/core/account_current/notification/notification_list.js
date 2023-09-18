import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Skeleton, Tooltip, ConfigProvider, Empty, Button } from "antd";
import ScrollArea from "react-perfect-scrollbar";
import NotificationItem from "./notification_item";
import * as url from "./../../../../constants/url";
import { Link } from "react-router-dom";
import { getNotifi, seenAllNotifi } from "./"
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import ModalSetup from "./modal_setup";

const styleWrapperList = {
    marginTop: 0,
    background: "#fff",
    border: "1px solid var(--nav-bg-color-item)",
    boxShawdow: "0 0 15px rgb(0,0,0,.25)"
}
const styleWrapper = {
    width: "350px",
    height: "calc(100vh - 60px)",
    maxHeight: "460px",
    overflow: "hidden"
}
const styleHeader = {
    background: "var(--nav-bg-color-item)",
    color: "var(--nav-color-item)",
    padding: "5px 10px",
}

const styleBody = {
    maxHeight: "400px",
    height: "calc(100vh - 120px)"
}

const styleFooter = {
    background: "var(--nav-bg-color-item)",
    color: "var(--nav-color-item)",
    padding: "5px 10px",
    textAlign: "center"
}
const NotificationList = ({ setMouseEnter, firstLoaded = false }) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [visibleNotificationSetup, setVisibleNotificationSetup] = useState(false);
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();

    const notification = useSelector(state => state.core.notification.list);
    const pagination = useSelector(state => state.core.notification.pagination);
    const { currentPage, pageSize, total } = pagination;

    useEffect(() => {
        setHasMore(currentPage * pageSize < total);
    }, [pagination])

    const onLoadMore = () => {
        setLoading(true);
        dispatch(getNotifi({
            currentPage: currentPage + 1,
            callback: () => setLoading(false)
        }));
    };

    const getNotifications = () => {
        const lineNew = { type: "line", title: "MỚI" };
        const lineOld = { type: "line", title: "CŨ HƠN" };

        let newNotification = [];
        let oldNotification = [];
        notification.map((item) => {
            if (item.isNew) {
                newNotification.push(item);
            }
            else {
                oldNotification.push(item);
            }
            return null;
        })

        let result = [...oldNotification];
        if (newNotification.length > 0) {
            result = [lineNew, ...newNotification, ...(result.length > 0 ? [lineOld] : []), ...result];
        }

        if (!firstLoaded || reload) {
            return [{ type: "loading" }, { type: "loading" }, { type: "loading" }, { type: "loading" }];
        }
        else if (hasMore) {
            return [...result, { type: "loading" }];
        }
        return result;
    }

    return <div
        className="wrapper-list-notification"
        onMouseEnter={() => setMouseEnter && typeof setMouseEnter === "function" && setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter && typeof setMouseEnter === "function" && setMouseEnter(false)}
        style={styleWrapperList}
    >
        <ModalSetup
            visible={visibleNotificationSetup}
            onCancel={() => setVisibleNotificationSetup(false)}
        />
        <div style={styleWrapper}>
            <div style={styleHeader}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-left">
                            <Tooltip title="Cài đặt thông báo">
                                <i className={`fa fa-cogs c-pointer m-r-5`} onClick={() => {
                                    setVisibleNotificationSetup(true);
                                }} />
                            </Tooltip>
                            <b>
                                <Link to={url.URL_NOTIFICATION} style={{ color: "#fff" }}>
                                    Thông báo
                                </Link>
                            </b>
                        </div>
                        <div className="pull-right" onClick={() => dispatch(seenAllNotifi({ daXem: 1 }))}>
                            <small>Đánh dấu tất cả là đã xem</small>
                            <i className="fa fa-check-circle c-pointer m-l-10" />
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <ScrollArea
                    style={styleBody}
                    onScroll={({ target }) => {
                        const { scrollTop, scrollTopMax } = target;
                        if (scrollTopMax - scrollTop < 80 && !loading && hasMore) {
                            onLoadMore();
                        }
                    }}
                >
                    <ConfigProvider renderEmpty={() => <Empty description={<Fragment>
                        <p>Không có thông báo nào để hiển thị!</p>
                        <div>
                            <Button type="primary" onClick={() => {
                                setLoading(true);
                                setReload(true);
                                dispatch(getNotifi({
                                    currentPage: 1,
                                    callback: () => {
                                        setLoading(false);
                                        setReload(false);
                                    }
                                }));
                            }} >
                                <i className="fa fa-refresh m-r-10" /> Thử lại
                            </Button>
                        </div>
                    </Fragment>} />}>
                        <List
                            size="small"
                            dataSource={getNotifications()}
                            renderItem={item => {
                                if (item.type === "loading") {
                                    return <List.Item >
                                        <List.Item.Meta
                                            style={{ background: "#fff" }}
                                            className="notification c-pointer notification-seen"
                                            title={<Skeleton
                                                className="notification-skeleton"
                                                active
                                                avatar={<SkeletonAvatar shape="circle" size={60} />}

                                            />}
                                        />
                                    </List.Item>
                                }
                                return <NotificationItem item={item} />
                            }}
                        />
                    </ConfigProvider>
                </ScrollArea>
            </div>
            <div style={styleFooter}>
                <Link to={url.URL_NOTIFICATION} style={{ color: "#fff" }}>
                    Tất cả thông báo
                </Link>
            </div>
        </div >
    </div >
}

export default NotificationList;