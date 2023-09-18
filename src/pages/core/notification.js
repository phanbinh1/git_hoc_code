import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ConfigProvider, Spin, Empty } from "antd";
import ScrollArea from "react-perfect-scrollbar";
import NotificationItem from "./../../components/core/account_current/notification/notification_item";
import { useHistory, useLocation } from 'react-router';
import { queryString } from '../../constants/main';
import { getAllNotifi } from '../../components/core/account_current/notification';

const styleBody = {
    height: "calc(100vh - 105px)"
}

const Notification = () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [loading, setLoading] = useState(false);

    const [hasMore, setHasMore] = useState(false);
    const notifications = useSelector(state => state.core.notification.page_list);

    const dispatch = useDispatch();

    const pagination = useSelector(state => state.core.notification.page_pagination);
    const { currentPage, pageSize, total } = pagination;

    useEffect(() => {
        if (qs.url_redirect) {
            history.replace(decodeURIComponent(qs.url_redirect));
        }
        else {
            setLoading(true)
            dispatch(getAllNotifi({
                pageSize,
                currentPage: currentPage + 1,
                callback: () => setLoading(false)
            }))
        }
    }, [qs.url_redirect, history])

    useEffect(() => {
        setHasMore(currentPage * pageSize < total);
    }, [pagination])

    const onLoadMore = () => {
        setLoading(true)
        dispatch(getAllNotifi({
            pageSize,
            currentPage: currentPage + 1,
            callback: () => setLoading(false)
        }))
    };

    const getNotifications = () => {
        const lineNew = { type: "line", title: "MỚI" };
        const lineOld = { type: "line", title: "CŨ HƠN" };

        let newNotification = [];
        let oldNotification = [];
        notifications.map((item) => {
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
        if (hasMore) {
            return [...result, { type: "loading" }];
        }
        return result;
    }

    return (
        <React.Fragment>
            <ScrollArea
                style={styleBody}
                onScroll={({ target }) => {
                    const { scrollTop, scrollTopMax } = target;
                    if (scrollTopMax - scrollTop < 80 && !loading && hasMore) {
                        onLoadMore();
                    }
                }}
            >
                <ConfigProvider renderEmpty={() => <Empty description="Không có thông báo" />}>
                    <div className="col-md-12">
                        <List
                            itemLayout="horizontal"
                            dataSource={getNotifications()}
                            className="list-notification"
                            renderItem={item => <NotificationItem item={item} rightAction={false} />}
                        />
                    </div>
                    <Spin
                        style={{
                            padding: "10px 0",
                            width: "100%",
                            textAlign: "center"
                        }}
                        spinning={loading}
                        indicator={<React.Fragment>
                            <i className="fa fa-spinner fa-spin m-r-10" /> <small>Đang tải ...</small>
                        </React.Fragment>}
                    />
                </ConfigProvider>
            </ScrollArea>
        </React.Fragment >
    );
}

export default Notification;