import React, { useEffect, useState } from 'react';
import { List } from "antd";
import ScrollArea from "react-perfect-scrollbar";
import SearchResultItem from "./search_result_item";
import * as message from "./../../../constants/message";
import { useLocation } from 'react-router';
import { queryString } from '../../../constants/main';

const SearchResultList = ({
    item,
    loading,
    searchIng,
    setSearchIng,
    onSearch,
    setCount
}) => {

    const location = useLocation();
    const qs = queryString.parse(location.search);

    const [loadingMore, setLoadingMore] = useState(false);
    useEffect(() => {
        setCount(item.data.length);
        message.destroy();
    }, [item.data.length, qs.key])



    const onLoadMore = () => {
        onSearch({
            key: qs.key,
            onStartSearch,
            onEndSearch
        });
    }

    const onStartSearch = () => {
        setSearchIng(true);
        setLoadingMore(true);
        message.loading({ content: "Đang tải thêm...", duration: 0, key: "LOAD_MORE" });
    }

    const onEndSearch = () => {
        setSearchIng(false);
        setLoadingMore(false);
        message.destroy();
    }

    return <React.Fragment>
        <ScrollArea
            onScroll={({ target }) => {
                const { scrollTop, scrollTopMax } = target;
                if (
                    scrollTopMax - scrollTop < 10
                    && !loading
                    && !searchIng
                ) {
                    onLoadMore();
                }
            }}
            style={{
                minHeight: "calc(100vh - 220px)",
                maxHeight: "calc(100vh - 220px)",
                height: "100%",
                width: "100%",
                padding: 0,
                position: "relative"
            }}
        >
            <List
                className="search-list"
                itemLayout="horizontal"
                dataSource={item.data}
                grid={qs.type === "grid" ? { gutter: 16, column: 3 } : {}}
                renderItem={item => (
                    <SearchResultItem item={item} />
                )}
            />
            {
                loadingMore && <div style={{ textAlign: "center", margin: "3px 0" }}>
                    <i className="fa fa-spinner fa-spin" /> Đang tải thêm...
                </div>
            }
        </ScrollArea>
    </React.Fragment >;
}
export default SearchResultList;