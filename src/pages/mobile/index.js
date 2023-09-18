import { Alert, Layout, PageHeader, Tabs } from "antd";
import React, { Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { queryString } from "../../constants/main";
import { URL_LOGIN, URL_M_HOME } from "../../constants/url";
import Home from "./home";
import CoSoSXKDThucPham from "./cososxkdthucpham";
import ThongTinBan from "./thongtinban";
import ThongTinBanDetail from "./thongtinban.detail";
import ChiTietGiayChungNhan from "./chitietgiaychungnhan";

const tabs = [
    "home",
    "tintucsukien",
    "cososanxuatkinhdoanh",
    "vuonuomthucphamantoan",
    "chitietgiaychungnhan",
    "detail-tintucsukien",

]
export default () => {
    const history = useHistory();
    const location = useLocation();
    const qs = queryString.parse(location.search);
    const activeKey = qs.tab && tabs.includes(qs.tab) ? qs.tab : "home";
    return <Fragment>
        <div style={{ width: "100vw", height: "100vh", background: "#fff" }}>
            <div style={{
                background: "#027be3",
                height: "50px",
                lineHeight: "50px",
                color: "#fff",
                display: "flex",
                textAlign: "center",
                padding: "0 10x"
            }}>
                <div style={{ width: 50, fontSize: 25 }}>
                    <i onClick={() => history.go(-1)} className="fa fa-arrow-left " />
                </div>
                <div style={{ flex: 1, fontWeight: "bold" }}>
                    <Link to={URL_M_HOME} style={{ fontSize: 25, color: "#fff" }}>Ban QLATTP</Link>
                </div>
                <div style={{ width: 50 }}>
                    <Link to={{ pathname: URL_LOGIN, search: "mobile_redirect=home" }} style={{ fontSize: 25, color: "#fff" }}>
                        <i className="fa fa-sign-in" />
                    </Link>
                </div>
            </div>
            <div style={{ height: "calc(100vh - 50px)" }}>
                <Tabs tabBarStyle={{ display: "none" }} activeKey={activeKey} destroyInactiveTabPane>
                    <Tabs.TabPane key="home">
                        <Home />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="tintucsukien">
                        <ThongTinBan />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="detail-tintucsukien">
                        <ThongTinBanDetail />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="cososanxuatkinhdoanh">
                        <CoSoSXKDThucPham />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="vuonuomthucphamantoan">
                        <Alert message="Chức năng đang được phát triển" style={{ margin: 20 }} />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="chitietgiaychungnhan">
                        <ChiTietGiayChungNhan />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </Fragment>
}