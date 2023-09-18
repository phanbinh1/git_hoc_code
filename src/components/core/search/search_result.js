import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Spin } from "antd";
import SearchResultList from "./search_result_list";
import * as main from "./../../../constants/main"
import { useHistory, useLocation } from 'react-router';

const SearchResult = () => {
    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);

    const [searchIng, setSearchIng] = useState(true);
    const [loading, setLoading] = useState(true);
    const [startSearch, setStartSearch] = useState(0);
    const [endSearch, setEndSearch] = useState(0);
    const [count, setCount] = useState(0);
    const [timeoutSearch, setTimeoutSearch] = useState(null);
    const dispatch = useDispatch();

    const search = useSelector(state => state.core.search);
    useEffect(() => {
        onSearch({
            key: qs.key,
            onStartSearch,
            onEndSearch
        })
    }, [qs.q, qs.key])

    const onStartSearch = () => {
        setStartSearch(Date.now());
        setSearchIng(true);
        setLoading(true);
    }

    const onEndSearch = () => {
        setEndSearch(Date.now());
        setSearchIng(false);
        setLoading(false);
    }

    const onSearch = ({
        key,
        onStartSearch,
        onEndSearch
    }) => {
        typeof onStartSearch === "function" && onStartSearch()
        if (timeoutSearch) {
            clearTimeout(timeoutSearch);
        }
        setTimeoutSearch(setTimeout(() => {
            dispatch({
                type: "TYPE_COMMON_SEARCH",
                key,
            })
            typeof onEndSearch === "function" && onEndSearch();
        }, 1789));
    }

    const keyDefault = search.data[search.data.findIndex(item => item.default)].key;
    const onChange = (activeKey) => {
        if (qs.page) {
            qs.page = 1;
        }
        const href = main.formatUrl({
            pathname: location.pathname,
            objSearch: {
                ...qs,
                key: activeKey
            }
        });
        history.push(href);
    }

    return <React.Fragment>
        <div className="search-result">
            <div style={{ height: "30px", lineHeight: "30px", padding: "0 20px" }}>
                <span>
                    {
                        searchIng ?
                            <React.Fragment>
                                <i className="fa fa-spinner fa-spin" /> Đang tìm...
                        </React.Fragment> :
                            <React.Fragment>
                                Khoảng {count} kết quả <small> ( {endSearch - startSearch} giây )</small>
                            </React.Fragment>
                    }
                </span>
            </div>
            <Tabs
                activeKey={qs.key ? qs.key : keyDefault}
                onChange={onChange}
            >
                {
                    search.data.map((item) => {
                        return <Tabs.TabPane tab={item.title} key={item.key} >
                            <Spin
                                spinning={loading}
                                style={{ margin: "0 15px" }}
                                size="large"
                            >
                                <SearchResultList
                                    item={item}
                                    onSearch={onSearch}
                                    searchIng={searchIng}
                                    loading={loading}
                                    setSearchIng={setSearchIng}
                                    setCount={setCount}
                                />
                            </Spin>
                        </Tabs.TabPane>
                    })
                }
            </Tabs>
        </div>
    </React.Fragment >;
}
export default SearchResult;