import { Icon, Input, List, Spin, Button, Dropdown, Tabs, Alert, Descriptions, Form, Avatar } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { get } from "../../util/api_call";
import InfiniteScroll from 'react-infinite-scroller';
import { API_CO_SO_SAN_XUAT_KINH_DOANH } from "../../constants/api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { queryString } from "../../constants/main";
import { getList as getDanhSach } from "./web-api";

export default ({ categoryId }) => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [dataSource, setDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0);
    const getList = async (page = 1) => {
        setLoading(true);
        const res = await getDanhSach({
            categoryId,
            page,
            pageSize: 10,
        })
        if (res.errorCode === 0) {
            const { totalCount, data } = res;
            setDataSource(_data => page === 1 ? [...data] : [..._data, ...data]);
            setHasMore(totalCount > page * 10);
            setCurrentPage(page + 1);
            setTotal(totalCount);
        }
        setLoading(false);
    }
    useEffect(() => {
        const container = document.getElementById("result-thong-tin-ban");
        container && container.scrollTo(0, 0);
        getList(1);
    }, [])
    const [visible, setVisible] = useState(false);
    return <Fragment>
        <div style={{ height: "calc(100vh - 110px)", overflow: "auto" }} id="result-thong-tin-ban">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={() => getList(currentPage)}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            style={{ background: "#f0f0f0", padding: "15px", border: "none", marginBottom: 10 }}
                            onClick={() => history.push({ search: queryString.stringify({ ...qs, id: item.id, tab: "detail-tintucsukien" }) })}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.imageUrl} shape="square" />}
                                title={item.title}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
                {hasMore && <div style={{ textAlign: "center" }}>
                    <Icon type="loading" />
                </div>
                }
            </InfiniteScroll>
        </div>
    </Fragment>
}