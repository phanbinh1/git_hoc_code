import React from "react";
import { Link } from "react-router-dom";
import * as url from "./../../../../constants/url";

const DashboardNghiepVuChung = () => {
    return <React.Fragment>
        <div className="dashboard-item-container" key={0}>
            <div className="dashboard-item">
                <img src="/static/image/nvchung.png" alt="Nghiệp vụ chung" />
                <div style={{ marginTop: 10 }}>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_VAN_BAN_PHAP_LUAT}>
                    NGHIỆP VỤ CHUNG
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default DashboardNghiepVuChung;