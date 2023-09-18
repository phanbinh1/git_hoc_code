import { Icon, Input, List, Spin, Button, Dropdown, Tabs, Alert, Descriptions, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { get } from "../../util/api_call";
import InfiniteScroll from 'react-infinite-scroller';
import { API_CO_SO_SAN_XUAT_KINH_DOANH1 } from "../../constants/api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { queryString } from "../../constants/main";

const tabs = ["list", "detail"];
export default () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const activeKey = qs.id && !isNaN(qs.id) ? "detail" : "list";
    return < Fragment >
        <Tabs tabBarStyle={{ display: "none" }} activeKey={activeKey}>
            <Tabs.TabPane key="list">
                <TabList />
            </Tabs.TabPane>
            <Tabs.TabPane key="detail">
                <TabDetail />
            </Tabs.TabPane>
        </Tabs>
    </Fragment >
}
const TabDetail = () => {
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [status, setStatus] = useState(!qs.id || isNaN(qs.id) ? -1 : 0);
    const [item, setItem] = useState(null);
    const getById = async (id) => {
        setStatus(0);
        const res = await get({
            url: `${API_CO_SO_SAN_XUAT_KINH_DOANH1}/${id}`
        })
        if (res && res.status && res.result) {
            setItem(res.result);
            setStatus(1);
        }
        else {
            setStatus(-1);
        }
    }

    useEffect(() => {
        if (!qs.id || isNaN(qs.id)) {
            setStatus(-1);
        }
        else {
            getById(qs.id);
        }
    }, [qs.id])

    return <Fragment>
        {
            status === 0 ?
                <Alert type="info" icon={<Icon type="loading" />} message="Đang tải..." style={{ margin: 20 }} /> :
                (status === -1 || !item) ?
                    <Alert type="error" message="Không tìm thấy cơ sở!" style={{ margin: 20 }} /> :
                    <Fragment>
                        <Descriptions column={2} size="small">
                            <Descriptions.Item span={2} label="Tên cơ sở">{item.tenCoSo}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Địa chỉ">
                                {item.diaDiemKinhDoanh}
                                {item.xaPhuong && item.xaPhuong.ten && ` - ${item.xaPhuong.ten}`}
                                {item.quanHuyen && item.quanHuyen.ten && ` - ${item.quanHuyen.ten}`}
                                {item.tinhThanh && item.tinhThanh.ten && ` - ${item.tinhThanh.ten}`}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số điện thoại" span={2}>
                                {item.soDienThoai}
                            </Descriptions.Item>

                            <Descriptions.Item label="Số CNATTP">
                                {item.soChungNhanAttp}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số GP ĐKKD">
                                {item.soGiayPhepDkkd}
                            </Descriptions.Item>
                        </Descriptions>
                    </Fragment>
        }
    </Fragment>
}
const TabList = () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [dataSource, setDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0);
    const getCoSoSanXuatKinhDoanh = async (page = 1) => {
        setLoading(true);
        const res = await get({
            url: API_CO_SO_SAN_XUAT_KINH_DOANH1,
            data: {
                currentPage: page,
                pageSize: 20,
                searchData: queryString.stringify({
                    tenCoSo: qs.tenCoSo || undefined,
                    soGiayPhepDkkd: qs.soGiayPhepDkkd || undefined,
                    soChungNhanAttp: qs.soChungNhanAttp || undefined,
                    trangThaiCoSo: "DANGHOATDONG",
                    trangThaiPheDuyet: "DAPHEDUYET"
                })
            }
        })

        if (res.status) {
            const { pagination, result } = res;
            const { total, currentPage, pageSize } = pagination;
            setDataSource(data => page === 1 ? [...result] : [...data, ...result]);
            setHasMore(total > currentPage * pageSize);
            setCurrentPage(page + 1);
            setTotal(total);
        }
        setLoading(false);
    }
    useEffect(() => {
        const container = document.getElementById("result-container");
        container && container.scrollTo(0, 0);
        getCoSoSanXuatKinhDoanh(1);
    }, [
        qs.tenCoSo,
        qs.soGiayPhepDkkd,
        qs.soChungNhanAttp,
        qs.reload
    ])
    const [visible, setVisible] = useState(false);
    return <Fragment>
        <div style={{ height: "calc(100vh - 50px)" }}>
            <div style={{ height: "50px", lineHeight: "50px", display: "flex" }}>
                <div style={{ flex: 1, padding: "0 10px" }}>
                    <Input.Search
                        placeholder="Tìm kiếm... (Tên cơ sở)"
                        defaultValue={qs.tenCoSo}
                        onSearch={(tenCoSo) => history.push({
                            search: queryString.stringify({
                                ...qs,
                                ...(qs.tenCoSo === tenCoSo ? { reload: parseInt(qs.reload || "0") + 1 } : {}),
                                tenCoSo
                            })
                        })}
                    />
                </div>
                <div style={{ padding: "0 10px" }}>
                    <Dropdown
                        visible={visible}
                        onVisibleChange={v => setVisible(v)}
                        trigger={["click"]}
                        overlay={<OverlayDropdown setVisible={setVisible} key={visible ? "1" : "-1"} />}
                    >
                        <Button><i className="fa fa-sliders m-r-5" />Lọc</Button>
                    </Dropdown>
                </div>
            </div>
            <div style={{ height: 30, lineHeight: "30px", padding: "0 10px" }}>Tổng cộng <b>{total}</b> Cơ sở</div>
            <Tabs>
                <Tabs.TabPane tab="Cơ sở sản SX-KD">
                    <div style={{ height: "calc(100vh - 173px)", overflow: "auto" }} id="result-container">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={() => getCoSoSanXuatKinhDoanh(currentPage)}
                            hasMore={!loading && hasMore}
                            useWindow={false}
                        >
                            <List
                                dataSource={dataSource}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        style={{ background: "#f0f0f0", padding: "15px", border: "none", marginBottom: 10 }}
                                        onClick={() => history.push({ search: queryString.stringify({ ...qs, id: item.id }) })}
                                    >
                                        <List.Item.Meta
                                            title={item.tenCoSo}
                                            description={<Fragment>
                                                <div style={{ lineHeight: "15px" }}>
                                                    <small>
                                                        {item.diaDiemKinhDoanh}
                                                        {item.xaPhuong && item.xaPhuong.ten && ` - ${item.xaPhuong.ten}`}
                                                        {item.quanHuyen && item.quanHuyen.ten && ` - ${item.quanHuyen.ten}`}
                                                        {item.tinhThanh && item.tinhThanh.ten && ` - ${item.tinhThanh.ten}`}
                                                    </small>
                                                </div>
                                            </Fragment>}
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
                </Tabs.TabPane>
            </Tabs>
        </div>
    </Fragment>
}

const OverlayDropdown = ({ setVisible }) => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const [formValues, setFormValues] = useState({
        soGiayPhepDkkd: qs.soGiayPhepDkkd,
        soChungNhanAttp: qs.soChungNhanAttp
    })

    const onSubmit = () => {
        history.push({
            search: queryString.stringify({
                ...qs,
                ...(qs.soGiayPhepDkkd === formValues.soGiayPhepDkkd && qs.soChungNhanAttp === formValues.soChungNhanAttp ? { reload: parseInt(qs.reload || "0") + 1 } : {}),
                soChungNhanAttp: formValues.soChungNhanAttp || undefined,
                soGiayPhepDkkd: formValues.soGiayPhepDkkd || undefined
            })
        })
        setVisible(false)
    }
    return <div style={{ width: "100vw", background: "#fff", boxShadow: "0px 0px 10px rgb(0,0,0,.25)", zIndex: 9999999999 }}>
        <Form layout="inline">
            <div style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
                <Form.Item style={{ margin: 0 }}>
                    <Input
                        placeholder="Số giấy phép ĐKKD"
                        value={formValues.soGiayPhepDkkd}
                        onChange={e => setFormValues(f => ({ ...f, soGiayPhepDkkd: e.target.value }))}
                    />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                    <Input
                        placeholder="Số chứng nhận ATTP"
                        value={formValues.soChungNhanAttp}
                        onChange={e => setFormValues(f => ({ ...f, soChungNhanAttp: e.target.value }))}
                    />

                </Form.Item>
            </div>
            <div style={{ padding: 10, textAlign: "right" }}>
                <Button className="m-r-5" onClick={() => setVisible(false)}>Huỷ</Button>
                <Button type="primary" onClick={onSubmit} >Tìm kiếm</Button>
            </div>
        </Form>
    </div>
}

