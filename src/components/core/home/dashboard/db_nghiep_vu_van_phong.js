import React, { useState, useEffect } from "react";
import AbortController from "abort-controller";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actBCTH from "./../../../../actions/app/bao_cao_tong_hop/bao_cao_tong_hop";
import * as url from "./../../../../constants/url";
import { Badge } from "antd";
const DashboardNghiepVuVanPhong = () => {
    const [controller] = useState(new AbortController());
    const [countBCDVCS, setCountBCDVCS] = useState(0);

    const dispatch = useDispatch();
    const getAllBCDVCS = object => dispatch(actBCTH.getAllRequest(object));
    useEffect(() => {
        getAllBCDVCS({
            controller,
            errorNotifi: false,
            currentPage: 1,
            pageSize: 1,
            requestSuccess: (res) => {
                if (res && res.pagination && res.pagination.total) {
                    setCountBCDVCS(res.pagination.total);
                }
            },
        })
        return () => {
            controller.abort();
        }
    }, []);
    return <React.Fragment>
        <div className="dashboard-item-container" key={0}>
            <div className="dashboard-item">
                <img src="/static/image/vanphong.png" alt="Văn phòng" className="dashboard-img" />
                <div style={{ marginTop: 10 }}>
                    <div>
                        <Badge count={countBCDVCS} showZero className="badge-dashboard badge-primary">
                            <Link to={url.URL_BAO_CAO_TONG_HOP}>
                                Báo cáo từ đơn vị cơ sở
                            </Link>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className="dashboard-title">
                <Link to={url.URL_BAO_CAO_THONG_KE}>
                    NGHIỆP VỤ VĂN PHÒNG
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default DashboardNghiepVuVanPhong;