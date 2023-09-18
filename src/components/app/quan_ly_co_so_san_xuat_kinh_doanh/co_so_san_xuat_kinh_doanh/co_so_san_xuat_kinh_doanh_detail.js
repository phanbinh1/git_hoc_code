import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Alert } from 'antd';
import * as actCoSoSanXuatKinhDoanh from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh";
import ScrollArea from "react-perfect-scrollbar";
import HoSoTuCongBoList from "./detail/ho_so_tu_cong_bo"
import HoSoBanCongBoList from "./detail/ho_so_ban_cong_bo"
import HoSoCapGiayChungNhanAttp from "./detail/ho_so_attp";
import PhanAnhKienNghi from "./detail/phan_anh_kien_nghi";
import LichSuKiemTra from "./detail/lich_su_kiem_tra";
import { useLocation } from 'react-router';
import { queryString } from '../../../../constants/main';
import { AntIcon } from '../../../antd';

const Detail = () => {
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const [status, setStatus] = useState(0);
    const item = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.co_so_san_xuat_kinh_doanh.item);
    const [activeTab, setActiveTab] = useState("1");

    const dispatch = useDispatch();
    const getOneRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanh.getOneRequest(object));

    useEffect(() => {
        setStatus(0);
        if (qs.id) {
            setStatus(0);
            getOneRequest({
                data: { id: qs.id },
                requestSuccess: () => setStatus(1),
                requestError: (res) => setStatus(res && res.status && !res.result ? -2 : -1)
            });
        }
        else {
            setStatus(1);
            dispatch(actCoSoSanXuatKinhDoanh.handleGetOne({}));
        }
    }, [qs.id])

    const scrollAreaStyle = {
        maxHeight: "calc(100vh - 180px)",
        height: "100%",
        padding: 0,
        margin: 0
    }

    return <Fragment>
        <Tabs activeKey={status === 0 ? "loading" : status < 0 ? "error" : "content"} animated={false} className="tab-none-title">
            <Tabs.TabPane key="loading">
                <Alert showIcon icon={<AntIcon type="loading" />} type="info" message="Đang tải dữ liệu..." style={{ margin: 20 }} />
            </Tabs.TabPane>
            <Tabs.TabPane key="error">
                <Alert showIcon icon={<AntIcon type="loading" />} type="error" message={status === -2 ? `Không tìm thấy đối tượng có id là ${qs.id}` : "Có lỗi xảy ra!"} style={{ margin: 20 }} />
            </Tabs.TabPane>
            <Tabs.TabPane key="content">
                <Tabs
                    size="small"
                    className="tab-co-so-kinh-doanh-detail"
                    activeKey={activeTab}
                    onChange={activeKey => setActiveTab(activeKey)}
                >
                    <Tabs.TabPane
                        tab={<Fragment><i className="fa fa-file-text-o m-r-10" />Hồ sơ cấp GCN ATTP</Fragment>}
                        key="1"
                    >
                        <ScrollArea style={scrollAreaStyle}>
                            <HoSoCapGiayChungNhanAttp key={item.id} item={item} />
                        </ScrollArea>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={<Fragment><i className="fa fa-history m-r-10" />Lịch sử kiểm tra</Fragment>}
                        key="2"
                    >
                        <ScrollArea
                            speed={1}
                            style={scrollAreaStyle}
                        >
                            <LichSuKiemTra key={item.id} item={item} />
                        </ScrollArea>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={<Fragment><i className="fa fa-reply m-r-10" />Phản ánh kiến nghị</Fragment>}
                        key="3"
                    >
                        <ScrollArea
                            speed={1}
                            style={scrollAreaStyle}
                        >
                            <PhanAnhKienNghi key={item.id} item={item} />
                        </ScrollArea>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={<Fragment><i className="fa fa-address-card-o m-r-10" />Hồ sơ tự công bố</Fragment>}
                        key="4"
                    >
                        <ScrollArea
                            speed={1}
                            style={scrollAreaStyle}
                        >
                            <HoSoTuCongBoList key={item.id} item={item} />
                        </ScrollArea>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={<Fragment><i className="fa fa-address-card-o m-r-10" />Hồ sơ công bố</Fragment>}
                        key="5"
                    >
                        <ScrollArea
                            speed={1}
                            style={scrollAreaStyle}
                        >
                            <HoSoBanCongBoList key={item.id} item={item} />
                        </ScrollArea>
                    </Tabs.TabPane>
                </Tabs>
            </Tabs.TabPane>
        </Tabs>
    </Fragment >
}

export default Detail;