import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { queryString } from "../../constants/main";
import "./style.css";
import { getListHoatDongBan } from "./web-api";
export default () => {
    const location = useLocation();
    const history = useHistory();
    const qs = queryString.parse(location.search);
    const isMobile = /UnitechApp/i.test(window.navigator.userAgent) || /UnitechAppIos/i.test(window.navigator.userAgent);

    return <Fragment>
        <div className="m-4" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <div onClick={() => history.push({ search: queryString.stringify({ ...qs, tab: "tintucsukien" }) })} style={{ textAlign: "center" }}>
                    <div
                        style={{
                            display: "inline-block",
                            width: "100%",
                            maxWidth: "100px",
                            height: "100px",
                            borderRadius: 10,
                            border: "1px solid #1890ff",
                            color: "#108ee9"
                        }}>
                        <i className="fa fa-newspaper-o fa-4x" style={{ marginTop: 20 }} />
                    </div>
                    <div style={{ color: "#108ee9" }}>
                        Tin tức - sự kiện
                    </div>
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <div onClick={() => history.push({ search: queryString.stringify({ ...qs, tab: "cososanxuatkinhdoanh" }) })} style={{ textAlign: "center" }}>
                    <div style={{
                        display: "inline-block",
                        width: "100%",
                        maxWidth: "100px",
                        height: "100px",
                        border: "1px solid #ccc",
                        borderRadius: 10
                    }}>
                        <i className="fa fa-search fa-4x" style={{ marginTop: 20 }} />
                    </div>
                    <div style={{ color: "#108ee9" }}>
                        Cơ sở SX <br />- KD thực phẩm
                    </div>
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <div
                    onClick={() => {
                        document.getElementById("btn-mb-scan-qrcode").click()
                        const qrcodeValue = document.getElementById("qrcode");
                        qrcodeValue && qrcodeValue.setAttribute("redirect", "user");
                    }}
                    style={{ textAlign: "center" }}
                >
                    <div style={{
                        display: "inline-block",
                        width: "100%",
                        maxWidth: "100px",
                        height: "100px",
                        border: "1px solid #ccc",
                        borderRadius: 10
                    }}>
                        <i className="fa fa-qrcode fa-4x" style={{ marginTop: 20 }} />
                    </div>
                    <div style={{ color: "#108ee9" }}>
                        QR-Code
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="m-4" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <div onClick={() => history.push({ search: queryString.stringify({ ...qs, tab: "vuonuomthucphamantoan" }) })} style={{ textAlign: "center" }}>
                    <div style={{
                        display: "inline-block",
                        width: "100%",
                        maxWidth: "100px",
                        height: "100px",
                        borderRadius: 10,
                        border: "1px solid #ff4d4f",
                        color: "#ff4d4f"
                    }}>

                    </div>
                    <div style={{ color: "#108ee9" }}>
                        Vườn ươm <br />thực phẩm an toàn
                    </div>
                </div>
            </div>
            <div style={{ flex: 1 }}>
            </div>

            <div style={{ flex: 1 }}>
            </div>
        </div> */}
    </Fragment >
}